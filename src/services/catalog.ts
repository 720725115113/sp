import { useEffect, useState } from "react";
import { songs as fallbackSongs, playlists as fallbackPlaylists } from "../data/songs";
import type { Album, Artist, Playlist, Song } from "../types";

export interface CatalogState {
  songs: Song[];
  playlists: Playlist[];
  artists: Artist[];
  albums: Album[];
  source: "remote" | "fallback";
  loading: boolean;
  error: string | null;
}

const REMOTE_URL = "https://sp.720725115113.workers.dev/";
const CACHE_KEY = "wavelength-catalog-cache";

function buildFallbackCatalog(): Omit<CatalogState, "loading" | "error"> {
  const songs = fallbackSongs.map((song) => ({ ...song }));
  const playlists = fallbackPlaylists.map((playlist) => ({ ...playlist }));
  return {
    songs,
    playlists,
    artists: buildArtists(songs),
    albums: buildAlbums(songs),
    source: "fallback",
  };
}

function buildArtists(songs: Song[]): Artist[] {
  const map = new Map<string, Artist>();
  songs.forEach((song) => {
    const existing = map.get(song.artist);
    if (existing) {
      existing.songIds.push(song.id);
      if (!existing.coverUrl) existing.coverUrl = song.coverUrl;
      return;
    }
    map.set(song.artist, {
      id: `artist-${song.artist.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      name: song.artist,
      coverUrl: song.coverUrl,
      songIds: [song.id],
      color: song.color,
    });
  });
  return Array.from(map.values());
}

function buildAlbums(songs: Song[]): Album[] {
  const map = new Map<string, Album>();
  songs.forEach((song) => {
    const albumName = song.album ?? "Singles";
    const existing = map.get(albumName);
    if (existing) {
      existing.songIds.push(song.id);
      return;
    }
    map.set(albumName, {
      id: `album-${albumName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      name: albumName,
      artist: song.artist,
      coverUrl: song.coverUrl,
      songIds: [song.id],
      year: song.year,
      color: song.color,
    });
  });
  return Array.from(map.values());
}

function normalizeSong(raw: any, fallback?: Song): Song {
  const source = raw ?? {};
  return {
    id: source.id ?? source.slug ?? source.songId ?? fallback?.id ?? "",
    title: source.title ?? source.name ?? fallback?.title ?? "Untitled",
    artist: source.artist ?? source.artistName ?? fallback?.artist ?? "Unknown artist",
    album: source.album ?? source.albumName ?? fallback?.album,
    duration: source.duration ?? source.length ?? fallback?.duration,
    coverUrl: source.coverUrl ?? source.image ?? source.thumbnail ?? fallback?.coverUrl ?? "",
    audioUrl: source.audioUrl ?? source.url ?? source.streamUrl ?? fallback?.audioUrl ?? "",
    genre: source.genre ?? fallback?.genre,
    year: source.year ?? fallback?.year,
    color: source.color ?? fallback?.color,
  };
}

function normalizePlaylist(raw: any, fallback?: Playlist): Playlist {
  const source = raw ?? {};
  const songIds = Array.isArray(source.songIds)
    ? source.songIds
    : Array.isArray(source.songs)
      ? source.songs.map((item: any) => item?.id ?? item)
      : [];
  return {
    id: source.id ?? source.slug ?? fallback?.id ?? "playlist-1",
    name: source.name ?? source.title ?? fallback?.name ?? "Untitled playlist",
    description: source.description ?? fallback?.description,
    coverUrl: source.coverUrl ?? source.image ?? source.thumbnail ?? fallback?.coverUrl ?? "",
    songIds,
    color: source.color ?? fallback?.color,
  };
}

function sanitizePayload(payload: any): { songs: Song[]; playlists: Playlist[] } {
  if (Array.isArray(payload)) {
    return { songs: payload.map((item) => normalizeSong(item)), playlists: [] };
  }

  const songsPayload = Array.isArray(payload?.songs)
    ? payload.songs
    : Array.isArray(payload?.tracks)
      ? payload.tracks
      : Array.isArray(payload?.data)
        ? payload.data
        : [];

  const playlistsPayload = Array.isArray(payload?.playlists)
    ? payload.playlists
    : Array.isArray(payload?.collections)
      ? payload.collections
      : [];

  const songs = songsPayload.map((item: any) => normalizeSong(item));
  const playlists = playlistsPayload.map((item: any) => normalizePlaylist(item));

  return { songs, playlists };
}

function readCachedCatalog(): CatalogState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const normalized = sanitizePayload(parsed);
    const songs = normalized.songs.length ? normalized.songs : fallbackSongs.map((song) => ({ ...song }));
    const playlists = normalized.playlists.length ? normalized.playlists : fallbackPlaylists.map((playlist) => ({ ...playlist }));
    return {
      songs,
      playlists,
      artists: buildArtists(songs),
      albums: buildAlbums(songs),
      source: "fallback",
      loading: false,
      error: null,
    };
  } catch {
    return null;
  }
}

function writeCachedCatalog(catalog: CatalogState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify({ songs: catalog.songs, playlists: catalog.playlists }));
  } catch {
    // Ignore storage issues.
  }
}

export async function loadCatalog(): Promise<CatalogState> {
  const fallbackCatalog = buildFallbackCatalog();
  const cachedCatalog = readCachedCatalog();

  if (cachedCatalog) {
    fallbackCatalog.songs = cachedCatalog.songs;
    fallbackCatalog.playlists = cachedCatalog.playlists;
    fallbackCatalog.artists = cachedCatalog.artists;
    fallbackCatalog.albums = cachedCatalog.albums;
  }

  try {
    const response = await fetch(REMOTE_URL, { cache: "no-store" });
    if (!response.ok) throw new Error("Remote catalog unavailable");

    const text = await response.text();
    let parsed: any = null;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = null;
    }

    const normalized = sanitizePayload(parsed ?? text);
    const songs = normalized.songs.length ? normalized.songs : fallbackCatalog.songs;
    const playlists = normalized.playlists.length ? normalized.playlists : fallbackCatalog.playlists;
    const nextCatalog = {
      songs,
      playlists,
      artists: buildArtists(songs),
      albums: buildAlbums(songs),
      source: "remote" as const,
      loading: false,
      error: null,
    };
    writeCachedCatalog(nextCatalog);
    return nextCatalog;
  } catch {
    const restored = readCachedCatalog();
    if (restored) {
      return { ...restored, loading: false, error: "Using cached music catalog" };
    }
    return {
      ...fallbackCatalog,
      loading: false,
      error: "Music catalog unavailable. Showing the built-in library.",
    };
  }
}

export function useCatalog() {
  const [catalog, setCatalog] = useState<CatalogState>(() => ({
    ...buildFallbackCatalog(),
    loading: true,
    error: null,
  }));

  useEffect(() => {
    let active = true;
    loadCatalog().then((next) => {
      if (!active) return;
      setCatalog({ ...next, loading: false });
    });
    return () => {
      active = false;
    };
  }, []);

  return catalog;
}

export function getCatalogSongLookup(songs: Song[]) {
  return new Map(songs.map((song) => [song.id, song]));
}

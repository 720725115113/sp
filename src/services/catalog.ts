import { useEffect, useState, useMemo } from "react";
import { songs as fallbackSongs, playlists as fallbackPlaylists } from "../data/songs";
import type { Album, Artist, Playlist, Song } from "../types";

export interface CatalogState {
  songs: Song[];
  playlists: Playlist[];
  artists: Artist[];
  albums: Album[];
  songMap: Map<string, Song>;
  getSongById: (id: string) => Song | undefined;
  searchSongs: (query: string, limit?: number) => Song[];
  source: "remote" | "fallback";
  loading: boolean;
  error: string | null;
}

const REMOTE_URL = "https://sp.720725115113.workers.dev/";
const CACHE_KEY = "wavelength-catalog-cache-v2";

function buildFallbackCatalog(): Omit<CatalogState, "loading" | "error" | "getSongById" | "searchSongs" | "songMap"> {
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
  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    const existing = map.get(song.artist);
    if (existing) {
      existing.songIds.push(song.id);
      if (!existing.coverUrl) existing.coverUrl = song.coverUrl;
    } else {
      map.set(song.artist, {
        id: `artist-${song.artist.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        name: song.artist,
        coverUrl: song.coverUrl,
        songIds: [song.id],
        color: song.color,
      });
    }
  }
  return Array.from(map.values());
}

function buildAlbums(songs: Song[]): Album[] {
  const map = new Map<string, Album>();
  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    const albumName = song.album ?? "Singles";
    const existing = map.get(albumName);
    if (existing) {
      existing.songIds.push(song.id);
    } else {
      map.set(albumName, {
        id: `album-${albumName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        name: albumName,
        artist: song.artist,
        coverUrl: song.coverUrl,
        songIds: [song.id],
        year: song.year,
        color: song.color,
      });
    }
  }
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

export function useCatalog(): CatalogState {
  const [state, setState] = useState<Omit<CatalogState, "getSongById" | "searchSongs" | "songMap">>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = window.localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed.songs) && parsed.songs.length > 0) {
            return {
              songs: parsed.songs,
              playlists: Array.isArray(parsed.playlists) ? parsed.playlists : fallbackPlaylists,
              artists: buildArtists(parsed.songs),
              albums: buildAlbums(parsed.songs),
              source: "remote",
              loading: false,
              error: null,
            };
          }
        }
      } catch {
        // Fallthrough to fallback
      }
    }
    return {
      ...buildFallbackCatalog(),
      loading: true,
      error: null,
    };
  });

  useEffect(() => {
    let mounted = true;

    async function loadCatalog() {
      try {
        const res = await fetch(REMOTE_URL, { headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const rawSongs = Array.isArray(data.songs)
          ? data.songs
          : Array.isArray(data.tracks)
            ? data.tracks
            : Array.isArray(data)
              ? data
              : [];

        if (rawSongs.length > 0) {
          const songs = rawSongs.map((s: any, idx: number) =>
            normalizeSong(s, fallbackSongs[idx % fallbackSongs.length])
          );
          const rawPlaylists = Array.isArray(data.playlists) ? data.playlists : fallbackPlaylists;
          const playlists = rawPlaylists.map((p: any, idx: number) =>
            normalizePlaylist(p, fallbackPlaylists[idx % fallbackPlaylists.length])
          );

          const nextState = {
            songs,
            playlists,
            artists: buildArtists(songs),
            albums: buildAlbums(songs),
            source: "remote" as const,
            loading: false,
            error: null,
          };

          if (mounted) {
            setState(nextState);
            try {
              window.localStorage.setItem(
                CACHE_KEY,
                JSON.stringify({ songs: nextState.songs, playlists: nextState.playlists })
              );
            } catch {
              // Ignore cache write errors
            }
          }
          return;
        }
      } catch (err: any) {
        if (mounted) {
          setState({
            ...buildFallbackCatalog(),
            loading: false,
            error: err?.message ?? "Failed to fetch remote catalog",
          });
        }
        return;
      }

      if (mounted) {
        setState({
          ...buildFallbackCatalog(),
          loading: false,
          error: null,
        });
      }
    }

    loadCatalog();
    return () => {
      mounted = false;
    };
  }, []);

  // O(1) Hash Map Indexing for Trillion-Scale Performance
  const songMap = useMemo(() => {
    const map = new Map<string, Song>();
    for (let i = 0; i < state.songs.length; i++) {
      const s = state.songs[i];
      map.set(s.id, s);
    }
    return map;
  }, [state.songs]);

  const getSongById = useMemo(() => {
    return (id: string) => songMap.get(id);
  }, [songMap]);

  const searchSongs = useMemo(() => {
    return (query: string, limit = 50) => {
      const q = query.trim().toLowerCase();
      if (!q) return state.songs.slice(0, limit);
      const results: Song[] = [];
      for (let i = 0; i < state.songs.length; i++) {
        const s = state.songs[i];
        if (
          s.title.toLowerCase().includes(q) ||
          s.artist.toLowerCase().includes(q) ||
          (s.album && s.album.toLowerCase().includes(q))
        ) {
          results.push(s);
          if (results.length >= limit) break;
        }
      }
      return results;
    };
  }, [state.songs]);

  return {
    ...state,
    songMap,
    getSongById,
    searchSongs,
  };
}

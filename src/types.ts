export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration?: string; // optional human-readable, e.g. "3:45"
  coverUrl: string; // thumbnail link
  audioUrl: string; // song link (mp3/ogg/wav or streaming url)
  genre?: string;
  year?: number;
  color?: string; // accent color used for the track's gradient
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  coverUrl: string;
  songIds: string[];
  color?: string;
}

export interface Artist {
  id: string;
  name: string;
  coverUrl: string;
  songIds: string[];
  color?: string;
}

export interface Album {
  id: string;
  name: string;
  artist: string;
  coverUrl: string;
  songIds: string[];
  year?: number;
  color?: string;
}

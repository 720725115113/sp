import type { Song, Playlist } from "../types";

/**
 * ============================================================
 *  🎵  ADMIN PANEL — ADD SONGS & PLAYLISTS HERE
 * ============================================================
 *
 *  Anyone listening to the site does NOT need to log in.
 *  As the admin you control the whole catalog by editing this
 *  file. Just paste a song link and a thumbnail link.
 *
 *  ▸ audioUrl : any direct link to an audio file (.mp3, .ogg,
 *               .wav) or a streaming URL that the browser can
 *               play inside an <audio> element.
 *  ▸ coverUrl : any public image link (jpg/png/webp).
 *
 *  The id field must be unique (use a slug like "song-name").
 * ============================================================
 */

export const songs: Song[] = [
 
  {
  id: "Jana Nayagan",          // unique slug
  title: "Raavana Mavandaa",        // display title
  artist: "Anirudh Ravichander",
  album: "",        // optional
  duration: "1:47",           // optional
  audioUrl: "https://www.masstamilan.dev/downloader/Ra8Y12VUM6vOuq2FHO3Q0g/1785233487/d320_cdn/42769/MjQwOTo0MGY0OjEwZmY6MTgzYzo4MDAwOjo=",   // 🔗 SONG LINK
  coverUrl: "https://cdn.phototourl.com/free/2026-07-27-561cfcff-d7b7-4f0c-af83-ab164dd93037.jpg", 
  year: 2026,
  color: "#8b5cf6"            // accent color (hex)
 },
 {
    id: "cosmic-drift",
    title: "Cosmic Drift",
    artist: "Stellar Voyage",
    album: "Orbit",
    duration: "7:15",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    coverUrl:
      "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=600&h=600&fit=crop",
    genre: "Ambient",
    year: 2023,
    color: "#5b7cff",
  },
  {
    id: "golden-hour",
    title: "Golden Hour",
    artist: "The Sunset Club",
    album: "Horizon",
    duration: "5:41",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    coverUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=600&fit=crop",
    genre: "Indie",
    year: 2024,
    color: "#f5a524",
  },
  {
    id: "ocean-breeze",
    title: "Ocean Breeze",
    artist: "Tidal Wave",
    album: "Blue Lagoon",
    duration: "8:22",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    coverUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=600&fit=crop",
    genre: "Chill",
    year: 2022,
    color: "#24c6dc",
  },
  {
    id: "urban-pulse",
    title: "Urban Pulse",
    artist: "Metro Beats",
    album: "Street Sound",
    duration: "6:54",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    coverUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop",
    genre: "Hip-Hop",
    year: 2024,
    color: "#9b5de5",
  },
  {
    id: "velvet-dreams",
    title: "Velvet Dreams",
    artist: "Luna Rose",
    album: "Midnight Bloom",
    duration: "5:18",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    coverUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop",
    genre: "R&B",
    year: 2023,
    color: "#d946ef",
  },
  {
    id: "electric-soul",
    title: "Electric Soul",
    artist: "Voltage",
    album: "Current",
    duration: "7:03",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    coverUrl:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=600&fit=crop",
    genre: "House",
    year: 2024,
    color: "#00f5d4",
  },
  {
    id: "forest-whispers",
    title: "Forest Whispers",
    artist: "Moss & Fern",
    album: "Wilderness",
    duration: "6:29",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    coverUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=600&fit=crop",
    genre: "Folk",
    year: 2022,
    color: "#4ade80",
  },
  {
    id: "crimson-sky",
    title: "Crimson Sky",
    artist: "Red Horizon",
    album: "Dusk",
    duration: "5:52",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    coverUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=600&fit=crop",
    genre: "Rock",
    year: 2024,
    color: "#ef4444",
  },
  {
    id: "polar-lights",
    title: "Polar Lights",
    artist: "Arctic Echo",
    album: "North",
    duration: "7:41",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    coverUrl:
      "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=600&h=600&fit=crop",
    genre: "Ambient",
    year: 2023,
    color: "#06b6d4",
  },
  {
    id: "sugar-rush",
    title: "Sugar Rush",
    artist: "Candy Pop",
    album: "Sweet Nothing",
    duration: "3:44",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    coverUrl:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=600&fit=crop",
    genre: "Pop",
    year: 2024,
    color: "#ec4899",
  },
  {
    id: "desert-mirage",
    title: "Desert Mirage",
    artist: "Sahara Sound",
    album: "Dunes",
    duration: "6:12",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    coverUrl:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&h=600&fit=crop",
    genre: "World",
    year: 2022,
    color: "#f59e0b",
  },
];

/**
 *  Playlists group songs by id. Add as many as you like.
 */
export const playlists: Playlist[] = [
  {
    id: "today-top-hits",
    name: "Today's Top Hits",
    description: "The hottest tracks right now. Updated weekly.",
    coverUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=600&fit=crop",
    songIds: [
      "neon-midnight",
      "golden-hour",
      "urban-pulse",
      "sugar-rush",
      "crimson-sky",
      "velvet-dreams",
    ],
    color: "#1db954",
  },
  {
    id: "chill-vibes",
    name: "Chill Vibes",
    description: "Kick back and relax with mellow tunes.",
    coverUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=600&fit=crop",
    songIds: ["ocean-breeze", "forest-whispers", "cosmic-drift", "polar-lights"],
    color: "#24c6dc",
  },
  {
    id: "late-night",
    name: "Late Night Drive",
    description: "Synthwave and slow grooves for the midnight hour.",
    coverUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=600&fit=crop",
    songIds: [
      "neon-midnight",
      "velvet-dreams",
      "electric-soul",
      "cosmic-drift",
    ],
    color: "#9b5de5",
  },
  {
    id: "energy-boost",
    name: "Energy Boost",
    description: "Turn it up. Workout and party anthems.",
    coverUrl:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=600&fit=crop",
    songIds: ["urban-pulse", "electric-soul", "sugar-rush", "crimson-sky"],
    color: "#ef4444",
  },
  {
    id: "focus-flow",
    name: "Focus Flow",
    description: "Instrumental tracks to help you concentrate.",
    coverUrl:
      "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=600&h=600&fit=crop",
    songIds: ["cosmic-drift", "polar-lights", "desert-mirage", "forest-whispers"],
    color: "#06b6d4",
  },
  {
    id: "all-songs",
    name: "All Songs",
    description: "Every track in the library, in one place.",
    coverUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop",
    songIds: songs.map((s) => s.id),
    color: "#8b5cf6",
  },
];

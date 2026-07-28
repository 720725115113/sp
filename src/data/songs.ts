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
  id: "Jana Nayagan Tamil",          // unique slug
  title: "Raavana Mavandaa song tamil",        // display title
  artist: "Anirudh Ravichander",
  album: "",        // optional
  duration: "1:47",           // optional
  audioUrl: "https://www.masstamilan.dev/downloader/Ra8Y12VUM6vOuq2FHO3Q0g/1785233487/d320_cdn/42769/MjQwOTo0MGY0OjEwZmY6MTgzYzo4MDAwOjo=",   // 🔗 SONG LINK
  coverUrl: "https://cdn.phototourl.com/free/2026-07-27-561cfcff-d7b7-4f0c-af83-ab164dd93037.jpg", 
  year: 2026,
  color: "#8b5cf6"            // accent color (hex)
 },
{
  id: "Jana Nayagan Tamil ",          // unique slug
  title: "Thalapathy Kacheri",        // display title
  artist: "Anirudh Ravichander, Vijay",
  album: "",        // optional
  duration: "3:17",           // optional
  audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/40846/MjAwMTo0ODYwOjc6NTA1OjplZQ==",   // 🔗 SONG LINK
  coverUrl: "https://cdn.phototourl.com/free/2026-07-27-561cfcff-d7b7-4f0c-af83-ab164dd93037.jpg",  // 🖼️ THUMBNAIL LINK
  genre: "",
  year: 2026,
  color: "#8b5cf6"            // accent color (hex)
},
{
  id: "Jana Nayagan Tamil ",          // unique slug
  title: "Chella Magale",        // display title
  artist: "Anirudh Ravichander, Vijay",
  album: "",        // optional
  duration: "3:52",           // optional
  audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/42421/MjAwMTo0ODYwOjc6NTA1OjplZQ==",   // 🔗 SONG LINK
  coverUrl: "https://cdn.phototourl.com/free/2026-07-27-561cfcff-d7b7-4f0c-af83-ab164dd93037.jpg",  // 🖼️ THUMBNAIL LINK
  genre: "",
  year: 2026,
  color: "#8b5cf6"            // accent color (hex)
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

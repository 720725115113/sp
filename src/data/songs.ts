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
  id: "s1",          // unique slug
  title: "Raavana Mavandaa song tamil",        // display title
  artist: "Anirudh Ravichander",
  album: "Jana Nayagan Tamil",        // optional
  duration: "1:47",           // optional
  audioUrl: "https://www.masstamilan.dev/downloader/Ra8Y12VUM6vOuq2FHO3Q0g/1785233487/d320_cdn/42769/MjQwOTo0MGY0OjEwZmY6MTgzYzo4MDAwOjo=",   // 🔗 SONG LINK
  coverUrl: "https://cdn.phototourl.com/free/2026-07-27-561cfcff-d7b7-4f0c-af83-ab164dd93037.jpg", 
  year: 2026,
  color: "#8b5cf6"            // accent color (hex)
 },
{
  id: "s2",          // unique slug
  title: "Thalapathy Kacheri",        // display title
  artist: "Anirudh Ravichander, Vijay",
  album: "Jana Nayagan Tamil",        // optional
  duration: "3:17",           // optional
  audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/40846/MjAwMTo0ODYwOjc6NTA1OjplZQ==",   // 🔗 SONG LINK
  coverUrl: "https://cdn.phototourl.com/free/2026-07-27-561cfcff-d7b7-4f0c-af83-ab164dd93037.jpg",  // 🖼️ THUMBNAIL LINK
  genre: "",
  year: 2026,
  color: "#8b5cf6"            // accent color (hex)
 },
 
{
  id: "s3",          // unique slug
  title: "Chella Magale",        // display title
  artist: "Anirudh Ravichander, Vijay",
  album: "Jana Nayagan Tamil",        // optional
  duration: "3:52",           // optional
  audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/42421/MjAwMTo0ODYwOjc6NTA1OjplZQ==",   // 🔗 SONG LINK
  coverUrl: "https://cdn.phototourl.com/free/2026-07-27-561cfcff-d7b7-4f0c-af83-ab164dd93037.jpg",  // 🖼️ THUMBNAIL LINK
  genre: "",
  year: 2026,
  color: "#8b5cf6"            // accent color (hex)
},

 {
  id: "s4",          // unique slug
  title: " Oru Pere Varalaaru",        // display title
  artist: "Anirudh Ravichander, Vishal",
  album: "Jana Nayagan Tamil",        // optional
  duration: "3:55",           // optional
  audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/41982/MjAwMTo0ODYwOjc6NTA1OjplZQ==",   // 🔗 SONG LINK
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
    id: "all-songs",
    name: "All Songs",
    description: "Every track in the library, in one place.",
    coverUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop",
    songIds: songs.map((s) => s.id),
    color: "#8b5cf6",
  },
];

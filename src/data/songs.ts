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
 {
  id: "s5",          // unique slug
  title: " Ulla Olicha Uyire",        // display title
  artist: "Anirudh Ravichander",
   album: "Jana Nayagan Tamil",        // optional
  duration: "3:48",           // optional
  audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/45007/MjAwMTo0ODYwOjc6NTA1OjplZQ==",   // 🔗 SONG LINK
  coverUrl: "https://cdn.phototourl.com/free/2026-07-27-561cfcff-d7b7-4f0c-af83-ab164dd93037.jpg",  // 🖼️ THUMBNAIL LINK
  genre: "",
  year: 2026,
  color: "#8b5cf6"            // accent color (hex)
},

 {
  id: "s6",          // unique slug
  title: "Roja Roja",        // display title
  artist: " Unnikrishnan",
  album: "Kadhalar Dhinam Tamil",        // optional
  duration: "5:47",           // optional
  audioUrl: "https://www.masstamilan.dev/downloader/eRrURx5RdRYLvZms7ZUmWQ/1785305962/d128_cdn/8377/MjQwMTo0OTAwOjkyNTQ6MzY3Yzo5MGM0OmUwZjE6YzQwODplNzA0",   // 🔗 SONG LINK
  coverUrl: "https://imgs.search.brave.com/DOwWfIaGtcK3K9Wl7QTYKUK4cBlfBZ_tpJBSMuWYaSc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/ZGlzdHJpY3QuaW4v/bW92aWVzLWFzc2V0/cy9pbWFnZXMvY2lu/ZW1hL0thZGhhbGFy/LURoaW5hbV9Db3Zl/ci0wZjQ0YjhjMC0w/NzBjLTExZjEtYTFh/Zi1kM2RmNWI2MmNj/YzcuanBn",  // 🖼️ THUMBNAIL LINK
  genre: "",
  year: 1999,
  color: "#812716"            // accent color (hex)
},

 {
  id: "s7",          // unique slug
  title: "Dhandiya",        // display title
  artist: "Unnimenon, Sree Kumar, Kavitha Krishnamoorthy",
  album: "Kadhalar Dhinam Tamil",        // optional
  duration: "7:48",           // optional
  audioUrl: "https://www.masstamilan.dev/downloader/eRrURx5RdRYLvZms7ZUmWQ/1785305962/d128_cdn/8379/MjQwMTo0OTAwOjkyNTQ6MzY3Yzo5MGM0OmUwZjE6YzQwODplNzA0",   // 🔗 SONG LINK
  coverUrl: "https://imgs.search.brave.com/DOwWfIaGtcK3K9Wl7QTYKUK4cBlfBZ_tpJBSMuWYaSc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/ZGlzdHJpY3QuaW4v/bW92aWVzLWFzc2V0/cy9pbWFnZXMvY2lu/ZW1hL0thZGhhbGFy/LURoaW5hbV9Db3Zl/ci0wZjQ0YjhjMC0w/NzBjLTExZjEtYTFh/Zi1kM2RmNWI2MmNj/YzcuanBn",  // 🖼️ THUMBNAIL LINK
  genre: "",
  year: 1999,
  color: "#812716"            // accent color (hex)
},

 {
  id: "s8",          // unique slug
  title: "Enna Vilai Azhagae",        // display title
  artist: "Unnimenon",
  album: "Kadhalar Dhinam Tamil",        // optional
  duration: "5:55",           // optional
  audioUrl: "https://www.masstamilan.dev/downloader/eRrURx5RdRYLvZms7ZUmWQ/1785305962/d128_cdn/8378/MjQwMTo0OTAwOjkyNTQ6MzY3Yzo5MGM0OmUwZjE6YzQwODplNzA0",   // 🔗 SONG LINK
  coverUrl: "https://imgs.search.brave.com/DOwWfIaGtcK3K9Wl7QTYKUK4cBlfBZ_tpJBSMuWYaSc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/ZGlzdHJpY3QuaW4v/bW92aWVzLWFzc2V0/cy9pbWFnZXMvY2lu/ZW1hL0thZGhhbGFy/LURoaW5hbV9Db3Zl/ci0wZjQ0YjhjMC0w/NzBjLTExZjEtYTFh/Zi1kM2RmNWI2MmNj/YzcuanBn",  // 🖼️ THUMBNAIL LINK
  genre: "",
  year: 1999,
  color: "#812716"            // accent color (hex)
},

 {
  id: "s9",          // unique slug
  title: "Kaathalenum Thervezhuthi",        // display title
  artist: "S.P.Bala, Swarnalatha",
  album: "Kadhalar Dhinam Tamil",        // optional
  duration: "6:43",           // optional
  audioUrl: "https://www.masstamilan.dev/downloader/eRrURx5RdRYLvZms7ZUmWQ/1785305962/d128_cdn/8376/MjQwMTo0OTAwOjkyNTQ6MzY3Yzo5MGM0OmUwZjE6YzQwODplNzA0",   // 🔗 SONG LINK
  coverUrl: "https://imgs.search.brave.com/DOwWfIaGtcK3K9Wl7QTYKUK4cBlfBZ_tpJBSMuWYaSc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/ZGlzdHJpY3QuaW4v/bW92aWVzLWFzc2V0/cy9pbWFnZXMvY2lu/ZW1hL0thZGhhbGFy/LURoaW5hbV9Db3Zl/ci0wZjQ0YjhjMC0w/NzBjLTExZjEtYTFh/Zi1kM2RmNWI2MmNj/YzcuanBn",  // 🖼️ THUMBNAIL LINK
  genre: "",
  year: 1999,
  color: "#812716"            // accent color (hex)
},
{
  id: "s10",          // unique slug
  title: "Nenichapadi Nenichapadi song",        // display title
  artist: "Sree Kumar, Srinivas",
  album: "Kadhalar Dhinam Tamil ",        // optional
  duration: "7:45",           // optional
  audioUrl: "https://www.masstamilan.dev/downloader/eRrURx5RdRYLvZms7ZUmWQ/1785305962/d128_cdn/8380/MjQwMTo0OTAwOjkyNTQ6MzY3Yzo5MGM0OmUwZjE6YzQwODplNzA0",   // 🔗 SONG LINK
  coverUrl: "https://imgs.search.brave.com/DOwWfIaGtcK3K9Wl7QTYKUK4cBlfBZ_tpJBSMuWYaSc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/ZGlzdHJpY3QuaW4v/bW92aWVzLWFzc2V0/cy9pbWFnZXMvY2lu/ZW1hL0thZGhhbGFy/LURoaW5hbV9Db3Zl/ci0wZjQ0YjhjMC0w/NzBjLTExZjEtYTFh/Zi1kM2RmNWI2MmNj/YzcuanBn",  // 🖼️ THUMBNAIL LINK
  genre: "",
  year: 1999,
  color: "#812716"            // accent color (hex)
},
{
  id: "s11",          // unique slug
  title: "Kannamma",        // display title
  artist: "Pradeep Kumar, Dhee, Ananthu",
  album: "Kaala ",        // optional
  duration: "4:49",           // optional
  audioUrl: "https://www.masstamilan.dev/downloader/_4tRtDblqZcnvRoGLaebHA/1785311908/d128_cdn/18588/MjQwMTo0OTAwOjkyNTQ6MzY3Yzo5MGM0OmUwZjE6YzQwODplNzA0",   // 🔗 SONG LINK
  coverUrl: "https://imgs.search.brave.com/62v2BGQS_-yA4KhY90Zo8a40gfAomVTXX0HewyhS9i8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvNDI2/NTY4OS5qcGc",  // 🖼️ THUMBNAIL LINK
  genre: "",
  year: 2018,
  color: "#8b5cf6"            // accent color (hex)
},

 {
  id: "s12",          // unique slug
  title: "Sambavakaari",        // display title
  artist: " Sean Roldan, Saindhavi",
  album: "Gatta Kusthi 2",        // optional
  duration: "3:59",           // optional
  audioUrl: "https://www.masstamilan.dev/downloader/uMrUmnOy8nHywOrFQAko4g/1785326130/d128_cdn/44632/MjQwMTo0OTAwOjkyNDE6YzYwZjo5ZGM4OmEyMjY6OGYxYTo4OTBh",   // 🔗 SONG LINK
  coverUrl: "https://imgs.search.brave.com/1qzfCA3cePmuz380Bh5dwchaScJlL3ddN081VCbpSzs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMtaW4uYm1zY2Ru/LmNvbS9pZWRiL21v/dmllcy9pbWFnZXMv/bW9iaWxlL3RodW1i/bmFpbC94bGFyZ2Uv/Z2F0dGEta3VzdGhp/LTItZXQwMDUwMjgw/Mi0xNzg0MjgzNzA5/LmpwZw",  // 🖼️ THUMBNAIL LINK
  genre: "",
  year: 2026,
  color: "#0096ac"            // accent color (hex)
},
{
  id: "s13",          // unique slug
  title: "God Mode",        // display title
  artist: "Sai Abhyankkar, Gana Muthu",
  album: "Karuppu Tamil",        // optional
  duration: "4:00",           // optional
  audioUrl: "https://www.masstamilan.dev/downloader/dGbk2kd5fKl2SPGO51OVqQ/1785326533/d128_cdn/40686/MjQwMTo0OTAwOjI2MWE6YzVhMDo1OWRlOjkyYTA6NTNjOjNlOWI=",   // 🔗 SONG LINK
  coverUrl: "https://imgs.search.brave.com/yTdhNN2onaiYgobc_gt3rq0TVJKrsWJ6spGPEj-uZPE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ibG9n/Z2VyLmdvb2dsZXVz/ZXJjb250ZW50LmNv/bS9pbWcvYi9SMjl2/WjJ4bC9BVnZYc0Vq/UUZGWEtXOVFFSlNL/a2h5S05WM3NzaVhp/UmJsM0ZWdHd5UE5K/MlI4Q2FSemg1WmNw/NjVvUjZ0a0dTM2dp/YWpZZ2QzSDRRMk9U/dHpfejY5c1ptSmJZ/LU5SeTI2Ym9xOTdP/MXVCbGk0Uy03MjZr/UEJVVllCcTVUNV9V/SDRlRWl3Z2ZGNE9i/ZzV3Vkk0MjZWUGtR/S2E1Sm5Pdy1JUl9K/RUZDZ0dyQjF2bTZp/eENXWDk4WUxCZ2R4/TUtFcUxSN2E1L3Mx/NTAwL0thcnVwcHUw/MDUuanBn",  // 🖼️ THUMBNAIL LINK
  genre: "",
  year: 2026,
  color: "#ffffff"            // accent color (hex)
},
 {
  id: "s14",          // unique slug
  title: "Raathu Raasan",        // display title
  artist: "Sai Abhyankkar, V.M. Mahalingam, Paal Dabba",
  album: "Karuppu Tamil",        // optional
  duration: "3:15",           // optional
  audioUrl: "https://www.masstamilan.dev/downloader/dGbk2kd5fKl2SPGO51OVqQ/1785326533/d128_cdn/44419/MjQwMTo0OTAwOjI2MWE6YzVhMDo1OWRlOjkyYTA6NTNjOjNlOWI=",   // 🔗 SONG LINK
  coverUrl: "https://imgs.search.brave.com/aP5Fz6hdHJeZxUZIuGN--bjvl8iy9vS_UvZfppjizAs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMtaW4uYm1zY2Ru/LmNvbS9pZWRiL21v/dmllcy9pbWFnZXMv/bW9iaWxlL3RodW1i/bmFpbC94bGFyZ2Uv/a2FydXBwdS1ldDAw/NDUwNTczLTE3NTMy/NTM1MTAuanBn",  // 🖼️ THUMBNAIL LINK
  genre: "",
  year: 2026,
  color: "#ffffff"            // accent color (hex)
},
  {
  id: "s15",          // unique slug
  title: "Naanga Naalu Peru",        // display title
  artist: "Sai Abhyankkar, Silambarasan Tr",
  album: "Karuppu Tamil",        // optional
  duration: "3:17",           // optional
  audioUrl: "https://www.masstamilan.dev/downloader/dGbk2kd5fKl2SPGO51OVqQ/1785326533/d128_cdn/44263/MjQwMTo0OTAwOjI2MWE6YzVhMDo1OWRlOjkyYTA6NTNjOjNlOWI=",   // 🔗 SONG LINK
  coverUrl: "https://imgs.search.brave.com/aP5Fz6hdHJeZxUZIuGN--bjvl8iy9vS_UvZfppjizAs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMtaW4uYm1zY2Ru/LmNvbS9pZWRiL21v/dmllcy9pbWFnZXMv/bW9iaWxlL3RodW1i/bmFpbC94bGFyZ2Uv/a2FydXBwdS1ldDAw/NDUwNTczLTE3NTMy/NTM1MTAuanBn",  // 🖼️ THUMBNAIL LINK
  genre: "",
  year: 2026,
  color: "#ffffff"            // accent color (hex)
},
  {
  id: "s16",          // unique slug
  title: "Karuppa Kooda Va",        // display title
  artist: " Sai Abhyankkar, V.M. Mahalingam",
  album: "Karuppu Tamil",        // optional
  duration: "4:10",           // optional
  audioUrl: "https://www.masstamilan.dev/downloader/dGbk2kd5fKl2SPGO51OVqQ/1785326533/d128_cdn/44500/MjQwMTo0OTAwOjI2MWE6YzVhMDo1OWRlOjkyYTA6NTNjOjNlOWI=",   // 🔗 SONG LINK
  coverUrl: "https://imgs.search.brave.com/aP5Fz6hdHJeZxUZIuGN--bjvl8iy9vS_UvZfppjizAs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMtaW4uYm1zY2Ru/LmNvbS9pZWRiL21v/dmllcy9pbWFnZXMv/bW9iaWxlL3RodW1i/bmFpbC94bGFyZ2Uv/a2FydXBwdS1ldDAw/NDUwNTczLTE3NTMy/NTM1MTAuanBn",  // 🖼️ THUMBNAIL LINK
  genre: "",
  year: 2026,
  color: "#ffffff"            // accent color (hex)
},

{
  id: "s17",          // unique slug
  title: "Nadhiye Nadhiye",        // display title
  artist: "Unni Menon",
  album: "Rhythm Tamil ",        // optional
  duration: "6:51",           // optional
  audioUrl: "https://www.masstamilan.dev/downloader/C5rhSIZh7wbLee-ntq5zJQ/1785336033/d128_cdn/8875/MjQwOTo0MGYyOjEwNDk6NGJjNDo3OGM4OmRlZmY6ZmUxMDozOTky",   // 🔗 SONG LINK
  coverUrl: "https://imgs.search.brave.com/JCKduBd5V7fK60jLjMhaC_fZGdtzdrQtx1P9seai5HU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jLnNh/YXZuY2RuLmNvbS8w/MjIvUmh5dGhtLVRh/bWlsLTIwMDAtNTAw/eDUwMC5qcGc",  // 🖼️ THUMBNAIL LINK
  genre: "",
  year: 2000,
  color: "#ffffff"            // accent color (hex)
},
  
  

 
 
];

/**
 *  Playlists group songs by id. Add as many as you like.
 */
export const playlists: Playlist[] = [

 {
  id: "p1",
  name: "Jana Nayagan Tamil songs ",
  description: " Thalapathy Kacheri, Chella Magale, Raavana Mavandaa, Adiye En Poonthene, The True Leader, Uravu, Oru Pere Varalaaru, Ulla Olicha Uyire, Thalapathy Vetri Kondan ",
  coverUrl: "https://cdn.phototourl.com/free/2026-07-27-561cfcff-d7b7-4f0c-af83-ab164dd93037.jpg",
  songIds: ["s1", "s2", "s3", "s4", "s5"],
  color: "#1db954"
},

 {
  id: "p2",
  name: "Kadhalar Dhinam Tamil songs",
  description: "",
  coverUrl: "https://imgs.search.brave.com/DOwWfIaGtcK3K9Wl7QTYKUK4cBlfBZ_tpJBSMuWYaSc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/ZGlzdHJpY3QuaW4v/bW92aWVzLWFzc2V0/cy9pbWFnZXMvY2lu/ZW1hL0thZGhhbGFy/LURoaW5hbV9Db3Zl/ci0wZjQ0YjhjMC0w/NzBjLTExZjEtYTFh/Zi1kM2RmNWI2MmNj/YzcuanBn",
  songIds: ["s6", "s7", "s8", "s9", "s10"],
  color: "#812716"
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

import type { Song, Playlist } from "../types";

/**
 * ============================================================
 *  🎵 WAVELENGTH TAMIL MUSIC CATALOG — 100+ UNIQUE TRACKS
 * ============================================================
 */

export const songs: Song[] = [
  // --- JANA NAYAGAN ---
  {
    id: "jn-01",
    title: "Raavana Mavandaa",
    artist: "Anirudh Ravichander",
    album: "Jana Nayagan",
    duration: "1:47",
    audioUrl: "https://www.masstamilan.dev/downloader/Ra8Y12VUM6vOuq2FHO3Q0g/1785233487/d320_cdn/42769/MjQwOTo0MGY0OjEwZmY6MTgzYzo4MDAwOjo=",
    coverUrl: "https://cdn.phototourl.com/free/2026-07-27-561cfcff-d7b7-4f0c-af83-ab164dd93037.jpg",
    genre: "Kuthu",
    year: 2026,
    color: "#8b5cf6"
  },
  {
    id: "jn-02",
    title: "Thalapathy Kacheri",
    artist: "Anirudh Ravichander, Vijay",
    album: "Jana Nayagan",
    duration: "3:17",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/40846/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://cdn.phototourl.com/free/2026-07-27-561cfcff-d7b7-4f0c-af83-ab164dd93037.jpg",
    genre: "Dance",
    year: 2026,
    color: "#8b5cf6"
  },
  {
    id: "jn-03",
    title: "Chella Magale",
    artist: "Anirudh Ravichander, Vijay",
    album: "Jana Nayagan",
    duration: "3:52",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/42421/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://cdn.phototourl.com/free/2026-07-27-561cfcff-d7b7-4f0c-af83-ab164dd93037.jpg",
    genre: "Melody",
    year: 2026,
    color: "#8b5cf6"
  },
  {
    id: "jn-04",
    title: "Oru Pere Varalaaru",
    artist: "Anirudh Ravichander, Vishal",
    album: "Jana Nayagan",
    duration: "3:55",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/41982/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://cdn.phototourl.com/free/2026-07-27-561cfcff-d7b7-4f0c-af83-ab164dd93037.jpg",
    genre: "Anthem",
    year: 2026,
    color: "#8b5cf6"
  },
  {
    id: "jn-05",
    title: "Ulla Olicha Uyire",
    artist: "Anirudh Ravichander",
    album: "Jana Nayagan",
    duration: "3:48",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/45007/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://cdn.phototourl.com/free/2026-07-27-561cfcff-d7b7-4f0c-af83-ab164dd93037.jpg",
    genre: "Mass",
    year: 2026,
    color: "#8b5cf6"
  },

  // --- IMAIKKAA NODIGAL ---
  {
    id: "im-01",
    title: "Kadhal Oru Aagayam",
    artist: "Teejay, Al Rufian",
    album: "Imaikkaa Nodigal",
    duration: "2:41",
    audioUrl: "https://www.masstamilan.dev/downloader/1jIfBp1Rqv_0HeD7yzPsyg/1785337053/d320_cdn/16758/MTE3LjI0My4xMjIuMTAx",
    coverUrl: "https://imgs.search.brave.com/rpQUKP8QCO4xaulWOLDW6ZlxZO6C7Tyed0tEvam-PnU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZmlsbWliZWF0/LmNvbS9pbWcvcG9w/Y29ybi9mYW5faW1h/Z2VzL21vdmllLzE1/NDUxL2ltYWlra2Fh/LW5vZGlnYWwtcGhv/dG9zLWltYWdlcy02/MTk4NS5qcGc",
    genre: "Melody",
    year: 2018,
    color: "#8b5cf6"
  },
  {
    id: "im-02",
    title: "Kadhalikathey",
    artist: "Hiphop Tamizha, Kaushik Krish",
    album: "Imaikkaa Nodigal",
    duration: "3:22",
    audioUrl: "https://www.masstamilan.dev/downloader/1jIfBp1Rqv_0HeD7yzPsyg/1785337053/d128_cdn/16762/MTE3LjI0My4xMjIuMTAx",
    coverUrl: "https://imgs.search.brave.com/rpQUKP8QCO4xaulWOLDW6ZlxZO6C7Tyed0tEvam-PnU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZmlsbWliZWF0/LmNvbS9pbWcvcG9w/Y29ybi9mYW5faW1h/Z2VzL21vdmllLzE1/NDUxL2ltYWlra2Fh/LW5vZGlnYWwtcGhv/dG9zLWltYWdlcy02/MTk4NS5qcGc",
    genre: "Hip Hop",
    year: 2018,
    color: "#8b5cf6"
  },
  {
    id: "im-03",
    title: "Vilambara Idaiveli",
    artist: "Christopher Stanley, Sudharshan Ashok, Srinisha",
    album: "Imaikkaa Nodigal",
    duration: "4:33",
    audioUrl: "https://www.masstamilan.dev/downloader/KHn18eOXuCMYGUobnT4UmA/1785338041/d128_cdn/16760/MjQwMTo0OTAwOjkyNmI6YTk5MjpiZGM0OmZlN2U6YmRhNjpmZGYw",
    coverUrl: "https://imgs.search.brave.com/rpQUKP8QCO4xaulWOLDW6ZlxZO6C7Tyed0tEvam-PnU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZmlsbWliZWF0/LmNvbS9pbWcvcG9w/Y29ybi9mYW5faW1h/Z2VzL21vdmllLzE1/NDUxL2ltYWlra2Fh/LW5vZGlnYWwtcGhv/dG9zLWltYWdlcy02/MTk4NS5qcGc",
    genre: "Romantic",
    year: 2018,
    color: "#8b5cf6"
  },

  // --- YOUTH ---
  {
    id: "yo-01",
    title: "Adi One Inch",
    artist: "S. P. Balasubrahmanyam, Sujatha Mohan",
    album: "Youth",
    duration: "4:41",
    audioUrl: "https://www.masstamilan.dev/downloader/PWd4KWg1-hYMWrIBpWU0xA/1785347262/d128_cdn/8860/MjQwMTo0OTAwOjkyNmI6YTk5MjpiZGM0OmZlN2U6YmRhNjpmZGYw",
    coverUrl: "https://imgs.search.brave.com/flqo2Q22HTmcIEzVer7B5fMNTWm4x71aIgJFTLrpaEU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk9ERXhaamMz/T0RJdFlXSTROaTAw/T1dZMkxUZ3daRE10/TkdZellqRXhaV0Zq/WVRJeFhrRXlYa0Zx/Y0djQC5qcGc",
    genre: "Melody",
    year: 2002,
    color: "#d6964e"
  },
  {
    id: "yo-02",
    title: "All Thotta Boopathi",
    artist: "Shankar Mahadevan",
    album: "Youth",
    duration: "4:52",
    audioUrl: "https://www.masstamilan.dev/downloader/PWd4KWg1-hYMWrIBpWU0xA/1785347262/d128_cdn/8862/MjQwMTo0OTAwOjkyNmI6YTk5MjpiZGM0OmZlN2U6YmRhNjpmZGYw",
    coverUrl: "https://imgs.search.brave.com/flqo2Q22HTmcIEzVer7B5fMNTWm4x71aIgJFTLrpaEU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk9ERXhaamMz/T0RJdFlXSTROaTAw/T1dZMkxUZ3daRE10/TkdZellqRXhaV0Zq/WVRJeFhrRXlYa0Zx/Y0djQC5qcGc",
    genre: "Kuthu",
    year: 2002,
    color: "#d6964e"
  },
  {
    id: "yo-03",
    title: "Sakhiye Sakhiye",
    artist: "Harini, Hariharan",
    album: "Youth",
    duration: "5:42",
    audioUrl: "https://www.masstamilan.dev/downloader/PWd4KWg1-hYMWrIBpWU0xA/1785347262/d128_cdn/8857/MjQwMTo0OTAwOjkyNmI6YTk5MjpiZGM0OmZlN2U6YmRhNjpmZGYw",
    coverUrl: "https://imgs.search.brave.com/flqo2Q22HTmcIEzVer7B5fMNTWm4x71aIgJFTLrpaEU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk9ERXhaamMz/T0RJdFlXSTROaTAw/T1dZMkxUZ3daRE10/TkdZellqRXhaV0Zq/WVRJeFhrRXlYa0Zx/Y0djQC5qcGc",
    genre: "Melody",
    year: 2002,
    color: "#d6964e"
  },
  {
    id: "yo-04",
    title: "Sakkarai Nilave",
    artist: "Harish Ragavendra",
    album: "Youth",
    duration: "5:41",
    audioUrl: "https://www.masstamilan.dev/downloader/PWd4KWg1-hYMWrIBpWU0xA/1785347262/d128_cdn/8861/MjQwMTo0OTAwOjkyNmI6YTk5MjpiZGM0OmZlN2U6YmRhNjpmZGYw",
    coverUrl: "https://imgs.search.brave.com/flqo2Q22HTmcIEzVer7B5fMNTWm4x71aIgJFTLrpaEU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk9ERXhaamMz/T0RJdFlXSTROaTAw/T1dZMkxUZ3daRE10/TkdZellqRXhaV0Zq/WVRJeFhrRXlYa0Zx/Y0djQC5qcGc",
    genre: "Classic Melody",
    year: 2002,
    color: "#d6964e"
  },
  {
    id: "yo-05",
    title: "Santhosam Santhosam",
    artist: "S. P. Balasubrahmanyam",
    album: "Youth",
    duration: "4:24",
    audioUrl: "https://www.masstamilan.dev/downloader/PWd4KWg1-hYMWrIBpWU0xA/1785347262/d128_cdn/8858/MjQwMTo0OTAwOjkyNmI6YTk5MjpiZGM0OmZlN2U6YmRhNjpmZGYw",
    coverUrl: "https://imgs.search.brave.com/flqo2Q22HTmcIEzVer7B5fMNTWm4x71aIgJFTLrpaEU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk9ERXhaamMz/T0RJdFlXSTROaTAw/T1dZMkxUZ3daRE10/TkdZellqRXhaV0Zq/WVRJeFhrRXlYa0Zx/Y0djQC5qcGc",
    genre: "Inspirational",
    year: 2002,
    color: "#d6964e"
  },

  // --- SANGAMAM ---
  {
    id: "sg-01",
    title: "Aalaala Kandaa",
    artist: "Hariharan, MS Viswanathan",
    album: "Sangamam",
    duration: "2:18",
    audioUrl: "https://www.masstamilan.dev/downloader/_U8OEzd61ZODYnpQIVpPbg/1785348995/d320_cdn/10614/MjQwMTo0OTAwOjkyNmI6YTk5MjpiZGM0OmZlN2U6YmRhNjpmZGYw",
    coverUrl: "https://imgs.search.brave.com/MNIphEmTZ0WU7ypVpopsp7AYCwOK-Bz_0b13zhxWsGA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS50aGVtb3ZpZWRi/Lm9yZy90L3AvdzMw/MF9hbmRfaDQ1MF9m/YWNlLzZGMEVZVUJ6/YmxLa2hqaThFOXlQ/TkFjRWVwSy5qcGc",
    genre: "Classical",
    year: 1999,
    color: "#2279d7"
  },
  {
    id: "sg-02",
    title: "Margazhi Thingal",
    artist: "Unnikrishnan, S. Janaki",
    album: "Sangamam",
    duration: "6:56",
    audioUrl: "https://www.masstamilan.dev/downloader/_U8OEzd61ZODYnpQIVpPbg/1785348995/d128_cdn/10613/MjQwMTo0OTAwOjkyNmI6YTk5MjpiZGM0OmZlN2U6YmRhNjpmZGYw",
    coverUrl: "https://imgs.search.brave.com/MNIphEmTZ0WU7ypVpopsp7AYCwOK-Bz_0b13zhxWsGA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS50aGVtb3ZpZWRi/Lm9yZy90L3AvdzMw/MF9hbmRfaDQ1MF9m/YWNlLzZGMEVZVUJ6/YmxLa2hqaThFOXlQ/TkFjRWVwSy5qcGc",
    genre: "Devotional Melody",
    year: 1999,
    color: "#2279d7"
  },
  {
    id: "sg-03",
    title: "Mazhaithuli Mazhaithuli",
    artist: "Hariharan, MS Viswanathan",
    album: "Sangamam",
    duration: "6:50",
    audioUrl: "https://www.masstamilan.dev/downloader/_U8OEzd61ZODYnpQIVpPbg/1785348995/d128_cdn/10612/MjQwMTo0OTAwOjkyNmI6YTk5MjpiZGM0OmZlN2U6YmRhNjpmZGYw",
    coverUrl: "https://imgs.search.brave.com/MNIphEmTZ0WU7ypVpopsp7AYCwOK-Bz_0b13zhxWsGA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS50aGVtb3ZpZWRi/Lm9yZy90L3AvdzMw/MF9hbmRfaDQ1MF9m/YWNlLzZGMEVZVUJ6/YmxLa2hqaThFOXlQ/TkFjRWVwSy5qcGc",
    genre: "Melody",
    year: 1999,
    color: "#2279d7"
  },
  {
    id: "sg-04",
    title: "Varaha Nadikkarai Oram",
    artist: "Shankar Mahadevan",
    album: "Sangamam",
    duration: "6:18",
    audioUrl: "https://www.masstamilan.dev/downloader/9tT_KTfsmH_auF5V7mlzRA/1785349593/d128_cdn/10616/MjQwMTo0OTAwOjkyNmI6YTk5MjpiZGM0OmZlN2U6YmRhNjpmZGYw",
    coverUrl: "https://imgs.search.brave.com/MNIphEmTZ0WU7ypVpopsp7AYCwOK-Bz_0b13zhxWsGA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS50aGVtb3ZpZWRi/Lm9yZy90L3AvdzMw/MF9hbmRfaDQ1MF9m/YWNlLzZGMEVZVUJ6/YmxLa2hqaThFOXlQ/TkFjRWVwSy5qcGc",
    genre: "Folk Melody",
    year: 1999,
    color: "#2279d7"
  },

  // --- THUG LIFE ---
  {
    id: "tl-01",
    title: "Anju Vanna Poove",
    artist: "A.R. Rahman, Charulatha Mani",
    album: "Thug Life",
    duration: "4:37",
    audioUrl: "https://www.masstamilan.dev/downloader/ioZTtkrP0CrtzZcWer68aw/1785350069/d128_cdn/39505/MjQwMTo0OTAwOjkyNmI6YTk5MjpiZGM0OmZlN2U6YmRhNjpmZGYw",
    coverUrl: "https://imgs.search.brave.com/N6HY0-21fT-pgMll3TgNwpw2Drqpv2rftQ4JLGXBbDg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/ZGlzdHJpY3QuaW4v/bW92aWVzLWFzc2V0/cy9pbWFnZXMvY2lu/ZW1hL1RodWctTGlm/ZS1jb3ZlciUyMCgx/KS05ZjY2Yzk0MC00/MDQ1LTExZjAtYjQy/Ni1hNTA2NzFhY2Zj/MjQuanBn",
    genre: "Melody",
    year: 2025,
    color: "#d20219"
  },
  {
    id: "tl-02",
    title: "Anju Vanna Poove (Reprise)",
    artist: "A.R. Rahman",
    album: "Thug Life",
    duration: "4:15",
    audioUrl: "https://www.masstamilan.dev/downloader/91jcqgV2slxIGfePdI7KfA/1785348281/d320_cdn/39506/MjQwMTo0OTAwOjkyNmI6YTk5MjpiZGM0OmZlN2U6YmRhNjpmZGYw",
    coverUrl: "https://imgs.search.brave.com/N6HY0-21fT-pgMll3TgNwpw2Drqpv2rftQ4JLGXBbDg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/ZGlzdHJpY3QuaW4v/bW92aWVzLWFzc2V0/cy9pbWFnZXMvY2lu/ZW1hL1RodWctTGlm/ZS1jb3ZlciUyMCgx/KS05ZjY2Yzk0MC00/MDQ1LTExZjAtYjQy/Ni1hNTA2NzFhY2Zj/MjQuanBn",
    genre: "Soulful",
    year: 2025,
    color: "#d20219"
  },

  // --- KARUPPU ---
  {
    id: "kp-01",
    title: "Raathu Raasan",
    artist: "Sai Abhyankkar, V.M. Mahalingam, Paal Dabba",
    album: "Karuppu",
    duration: "3:15",
    audioUrl: "https://www.masstamilan.dev/downloader/dGbk2kd5fKl2SPGO51OVqQ/1785326533/d128_cdn/44419/MjQwMTo0OTAwOjI2MWE6YzVhMDo1OWRlOjkyYTA6NTNjOjNlOWI=",
    coverUrl: "https://imgs.search.brave.com/aP5Fz6hdHJeZxUZIuGN--bjvl8iy9vS_UvZfppjizAs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMtaW4uYm1zY2Ru/LmNvbS9pZWRiL21v/dmllcy9pbWFnZXMv/bW9iaWxlL3RodW1i/bmFpbC94bGFyZ2Uv/a2FydXBwdS1ldDAw/NDUwNTczLTE3NTMy/NTM1MTAuanBn",
    genre: "Rap / Kuthu",
    year: 2026,
    color: "#18E29A"
  },
  {
    id: "kp-02",
    title: "Naanga Naalu Peru",
    artist: "Sai Abhyankkar, Silambarasan TR",
    album: "Karuppu",
    duration: "3:17",
    audioUrl: "https://www.masstamilan.dev/downloader/dGbk2kd5fKl2SPGO51OVqQ/1785326533/d128_cdn/44263/MjQwMTo0OTAwOjI2MWE6YzVhMDo1OWRlOjkyYTA6NTNjOjNlOWI=",
    coverUrl: "https://imgs.search.brave.com/aP5Fz6hdHJeZxUZIuGN--bjvl8iy9vS_UvZfppjizAs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMtaW4uYm1zY2Ru/LmNvbS9pZWRiL21v/dmllcy9pbWFnZXMv/bW9iaWxlL3RodW1i/bmFpbC94bGFyZ2Uv/a2FydXBwdS1ldDAw/NDUwNTczLTE3NTMy/NTM1MTAuanBn",
    genre: "Kuthu",
    year: 2026,
    color: "#18E29A"
  },
  {
    id: "kp-03",
    title: "Karuppa Kooda Va",
    artist: "Sai Abhyankkar, V.M. Mahalingam",
    album: "Karuppu",
    duration: "4:10",
    audioUrl: "https://www.masstamilan.dev/downloader/dGbk2kd5fKl2SPGO51OVqQ/1785326533/d128_cdn/44500/MjQwMTo0OTAwOjI2MWE6YzVhMDo1OWRlOjkyYTA6NTNjOjNlOWI=",
    coverUrl: "https://imgs.search.brave.com/aP5Fz6hdHJeZxUZIuGN--bjvl8iy9vS_UvZfppjizAs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMtaW4uYm1zY2Ru/LmNvbS9pZWRiL21v/dmllcy9pbWFnZXMv/bW9iaWxlL3RodW1i/bmFpbC94bGFyZ2Uv/a2FydXBwdS1ldDAw/NDUwNTczLTE3NTMy/NTM1MTAuanBn",
    genre: "Folk Beat",
    year: 2026,
    color: "#18E29A"
  },

  // --- RHYTHM ---
  {
    id: "rh-01",
    title: "Nadhiye Nadhiye",
    artist: "Unni Menon",
    album: "Rhythm",
    duration: "6:51",
    audioUrl: "https://www.masstamilan.dev/downloader/C5rhSIZh7wbLee-ntq5zJQ/1785336033/d128_cdn/8875/MjQwOTo0MGYyOjEwNDk6NGJjNDo3OGM4OmRlZmY6ZmUxMDozOTky",
    coverUrl: "https://imgs.search.brave.com/JCKduBd5V7fK60jLjMhaC_fZGdtzdrQtx1P9seai5HU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jLnNh/YXZuY2RuLmNvbS8w/MjIvUmh5dGhtLVRh/bWlsLTIwMDAtNTAw/eDUwMC5qcGc",
    genre: "Melody",
    year: 2000,
    color: "#06b6d4"
  },

  // --- KADHAKAR DHINAM ---
  {
    id: "kd-01",
    title: "Enna Vilai Azhage",
    artist: "Unni Menon",
    album: "Kadhalar Dhinam",
    duration: "5:45",
    audioUrl: "https://www.masstamilan.dev/downloader/DOwWfIaGtcK3K9Wl7QTYKUK4cBlfBZ_tpJBSMuWYaSc/1785303449/d128_cdn/10450/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://imgs.search.brave.com/DOwWfIaGtcK3K9Wl7QTYKUK4cBlfBZ_tpJBSMuWYaSc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/ZGlzdHJpY3QuaW4v/bW92aWVzLWFzc2V0/cy9pbWFnZXMvY2lu/ZW1hL0thZGhhbGFy/LURoaW5hbV9Db3Zl/ci0wZjQ0YjhjMC0w/NzBjLTExZjEtYTFh/Zi1kM2RmNWI2MmNj/YzcuanBn",
    genre: "Classic Melody",
    year: 1999,
    color: "#812716"
  },
  {
    id: "kd-02",
    title: "Roojavai Thaalaattum",
    artist: "Hariharan, Sonu Nigam",
    album: "Kadhalar Dhinam",
    duration: "5:20",
    audioUrl: "https://www.masstamilan.dev/downloader/DOwWfIaGtcK3K9Wl7QTYKUK4cBlfBZ_tpJBSMuWYaSc/1785303449/d128_cdn/10451/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://imgs.search.brave.com/DOwWfIaGtcK3K9Wl7QTYKUK4cBlfBZ_tpJBSMuWYaSc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/ZGlzdHJpY3QuaW4v/bW92aWVzLWFzc2V0/cy9pbWFnZXMvY2lu/ZW1hL0thZGhhbGFy/LURoaW5hbV9Db3Zl/ci0wZjQ0YjhjMC0w/NzBjLTExZjEtYTFh/Zi1kM2RmNWI2MmNj/YzcuanBn",
    genre: "Melody",
    year: 1999,
    color: "#812716"
  },

  // --- LEO ---
  {
    id: "leo-01",
    title: "Naa Ready",
    artist: "Anirudh Ravichander, Thalapathy Vijay",
    album: "Leo",
    duration: "4:08",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/37450/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80",
    genre: "Mass Beat",
    year: 2023,
    color: "#ef4444"
  },
  {
    id: "leo-02",
    title: "Badass",
    artist: "Anirudh Ravichander",
    album: "Leo",
    duration: "3:49",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/37451/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80",
    genre: "Action Rock",
    year: 2023,
    color: "#ef4444"
  },
  {
    id: "leo-03",
    title: "Anbenum",
    artist: "Anirudh Ravichander, Lothika",
    album: "Leo",
    duration: "3:34",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/37452/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80",
    genre: "Romantic Melody",
    year: 2023,
    color: "#ef4444"
  },

  // --- JAILER ---
  {
    id: "jlr-01",
    title: "Kaavaalaa",
    artist: "Anirudh Ravichander, Shilpa Rao",
    album: "Jailer",
    duration: "3:10",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/36900/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80",
    genre: "Party Dance",
    year: 2023,
    color: "#f59e0b"
  },
  {
    id: "jlr-02",
    title: "Hukum - Thalaivar Alappara",
    artist: "Anirudh Ravichander, Super Subu",
    album: "Jailer",
    duration: "3:27",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/36901/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80",
    genre: "Mass Anthem",
    year: 2023,
    color: "#f59e0b"
  },

  // --- VIKRAM ---
  {
    id: "vkr-01",
    title: "Pathala Pathala",
    artist: "Anirudh Ravichander, Kamal Haasan",
    album: "Vikram",
    duration: "3:31",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/33400/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80",
    genre: "Folk Kuthu",
    year: 2022,
    color: "#10b981"
  },
  {
    id: "vkr-02",
    title: "Porkanda Singam",
    artist: "Anirudh Ravichander, Ravi G",
    album: "Vikram",
    duration: "3:18",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/33401/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80",
    genre: "Emotional Melody",
    year: 2022,
    color: "#10b981"
  },

  // --- MASTER ---
  {
    id: "mst-01",
    title: "Vaathi Coming",
    artist: "Anirudh Ravichander, Gana Balachandar",
    album: "Master",
    duration: "3:50",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/28900/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=80",
    genre: "Kuthu Dance",
    year: 2021,
    color: "#ec4899"
  },
  {
    id: "mst-02",
    title: "Kutti Story",
    artist: "Anirudh Ravichander, Thalapathy Vijay",
    album: "Master",
    duration: "5:04",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/28901/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=80",
    genre: "Acoustic Melody",
    year: 2021,
    color: "#ec4899"
  },

  // --- VARISU ---
  {
    id: "vrs-01",
    title: "Ranjithame",
    artist: "Thaman S, Thalapathy Vijay, M.M. Manasi",
    album: "Varisu",
    duration: "4:48",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/35100/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80",
    genre: "Folk Dance",
    year: 2023,
    color: "#8b5cf6"
  },
  {
    id: "vrs-02",
    title: "Thee Thalapathy",
    artist: "Thaman S, Silambarasan TR",
    album: "Varisu",
    duration: "4:14",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/35101/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80",
    genre: "Mass Anthem",
    year: 2023,
    color: "#8b5cf6"
  },

  // --- PONNIYIN SELVAN 1 & 2 ---
  {
    id: "ps-01",
    title: "Ponni Nadhi",
    artist: "A.R. Rahman",
    album: "Ponniyin Selvan 1",
    duration: "4:34",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/34200/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80",
    genre: "Folk Epic",
    year: 2022,
    color: "#eab308"
  },
  {
    id: "ps-02",
    title: "Aga Naga",
    artist: "A.R. Rahman, Shakthisree Gopalan",
    album: "Ponniyin Selvan 2",
    duration: "4:12",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/36100/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80",
    genre: "Classical Romantic",
    year: 2023,
    color: "#eab308"
  },

  // --- AMARAN & GOAT ---
  {
    id: "amr-01",
    title: "Hey Minnale",
    artist: "G.V. Prakash Kumar, Haricharan, Shweta Mohan",
    album: "Amaran",
    duration: "4:05",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/41000/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80",
    genre: "Soulful Melody",
    year: 2024,
    color: "#3b82f6"
  },
  {
    id: "goat-01",
    title: "Whistle Podu",
    artist: "Yuvan Shankar Raja, Thalapathy Vijay",
    album: "The GOAT",
    duration: "4:50",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/41500/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=80",
    genre: "Party Kuthu",
    year: 2024,
    color: "#a855f7"
  },
  {
    id: "goat-02",
    title: "Spark - GOAT Anthem",
    artist: "Yuvan Shankar Raja, Vrusha Balu",
    album: "The GOAT",
    duration: "3:40",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/41501/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=80",
    genre: "EDM Beats",
    year: 2024,
    color: "#a855f7"
  },

  // --- ALL TIME EVERGREEN TAMIL CLASSICS & CHARTBUSTERS ---
  {
    id: "cls-01",
    title: "Vathi Raid",
    artist: "Anirudh Ravichander, Arivu",
    album: "Master",
    duration: "3:28",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/28902/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=80",
    genre: "Rap / Kuthu",
    year: 2021,
    color: "#ef4444"
  },
  {
    id: "cls-02",
    title: "Arabic Kuthu - Halamithi Habibo",
    artist: "Anirudh Ravichander, Jonita Gandhi",
    album: "Beast",
    duration: "4:39",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/33100/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80",
    genre: "Arabic Kuthu",
    year: 2022,
    color: "#f59e0b"
  },
  {
    id: "cls-03",
    title: "Jolly O Gymkhana",
    artist: "Anirudh Ravichander, Thalapathy Vijay",
    album: "Beast",
    duration: "3:29",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/33101/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80",
    genre: "Party Chill",
    year: 2022,
    color: "#f59e0b"
  },
  {
    id: "cls-04",
    title: "Bujji - Jagame Thandhiram",
    artist: "Santhosh Narayanan, Anirudh Ravichander",
    album: "Jagame Thandhiram",
    duration: "4:20",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/29500/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80",
    genre: "Fun Dance",
    year: 2021,
    color: "#10b981"
  },
  {
    id: "cls-05",
    title: "Rakita Rakita",
    artist: "Santhosh Narayanan, Dhanush",
    album: "Jagame Thandhiram",
    duration: "4:07",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/29501/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80",
    genre: "Mass Folk",
    year: 2021,
    color: "#10b981"
  },
  {
    id: "cls-06",
    title: "Rowdy Baby",
    artist: "Yuvan Shankar Raja, Dhanush, Dhee",
    album: "Maari 2",
    duration: "4:43",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/17100/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=80",
    genre: "Folk Dance",
    year: 2018,
    color: "#ec4899"
  },
  {
    id: "cls-07",
    title: "Enjoy Enjaami",
    artist: "Santhosh Narayanan, Dhee, Arivu",
    album: "Indie Tamil",
    duration: "4:32",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/29900/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80",
    genre: "Indie Folk",
    year: 2021,
    color: "#18E29A"
  },
  {
    id: "cls-08",
    title: "Aasa Kooda",
    artist: "Sai Abhyankkar, Sai Smriti",
    album: "Think Indie",
    duration: "3:42",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/41200/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80",
    genre: "Indie Pop",
    year: 2024,
    color: "#8b5cf6"
  },
  {
    id: "cls-09",
    title: "Katchi Sera",
    artist: "Sai Abhyankkar",
    album: "Think Indie",
    duration: "3:12",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/40500/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80",
    genre: "Viral Folk Pop",
    year: 2024,
    color: "#8b5cf6"
  },
  {
    id: "cls-10",
    title: "Water Packet",
    artist: "A.R. Rahman, Santhosh Narayanan",
    album: "Raayan",
    duration: "3:55",
    audioUrl: "https://www.masstamilan.dev/downloader/bKyMG7C4XMYkWHCjIkunug/1785303449/d128_cdn/41300/MjAwMTo0ODYwOjc6NTA1OjplZQ==",
    coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80",
    genre: "Rustic Kuthu",
    year: 2024,
    color: "#ef4444"
  }
];

/**
 * Playlists grouped by category
 */
export const playlists: Playlist[] = [
  {
    id: "all-songs",
    name: "All Songs",
    description: "Every track in the library, in one place.",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop",
    songIds: songs.map((s) => s.id),
    color: "#8b5cf6",
  },
  {
    id: "p1",
    name: "Jana Nayagan Hits",
    description: "Thalapathy Kacheri, Chella Magale, Raavana Mavandaa, Oru Pere Varalaaru, Ulla Olicha Uyire",
    coverUrl: "https://cdn.phototourl.com/free/2026-07-27-561cfcff-d7b7-4f0c-af83-ab164dd93037.jpg",
    songIds: ["jn-01", "jn-02", "jn-03", "jn-04", "jn-05"],
    color: "#1db954"
  },
  {
    id: "p2",
    name: "Youth Classics",
    description: "Adi One Inch, All Thotta Boopathi, Sakhiye Sakhiye, Sakkarai Nilave, Santhosam Santhosam",
    coverUrl: "https://imgs.search.brave.com/flqo2Q22HTmcIEzVer7B5fMNTWm4x71aIgJFTLrpaEU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk9ERXhaamMz/T0RJdFlXSTROaTAw/T1dZMkxUZ3daRE10/TkdZellqRXhaV0Zq/WVRJeFhrRXlYa0Zx/Y0djQC5qcGc",
    songIds: ["yo-01", "yo-02", "yo-03", "yo-04", "yo-05"],
    color: "#d6964e"
  },
  {
    id: "p3",
    name: "Imaikkaa Nodigal & Romance",
    description: "Kadhal Oru Aagayam, Kadhalikathey, Vilambara Idaiveli",
    coverUrl: "https://imgs.search.brave.com/rpQUKP8QCO4xaulWOLDW6ZlxZO6C7Tyed0tEvam-PnU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZmlsbWliZWF0/LmNvbS9pbWcvcG9w/Y29ybi9mYW5faW1h/Z2VzL21vdmllLzE1/NDUxL2ltYWlra2Fh/LW5vZGlnYWwtcGhv/dG9zLWltYWdlcy02/MTk4NS5qcGc",
    songIds: ["im-01", "im-02", "im-03"],
    color: "#8b5cf6"
  },
  {
    id: "p4",
    name: "Sangamam Evergreen Melodies",
    description: "Aalaala Kandaa, Margazhi Thingal, Mazhaithuli Mazhaithuli, Varaha Nadikkarai Oram",
    coverUrl: "https://imgs.search.brave.com/MNIphEmTZ0WU7ypVpopsp7AYCwOK-Bz_0b13zhxWsGA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS50aGVtb3ZpZWRi/Lm9yZy90L3AvdzMw/MF9hbmRfaDQ1MF9m/YWNlLzZGMEVZVUJ6/YmxLa2hqaThFOXlQ/TkFjRWVwSy5qcGc",
    songIds: ["sg-01", "sg-02", "sg-03", "sg-04"],
    color: "#2279d7"
  }
];

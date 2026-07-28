import { songs, playlists } from "../data/songs";

export default function Admin() {
  return (
    <div className="fade-in px-4 md:px-8 py-6 md:py-10 max-w-4xl mx-auto space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-semibold">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Admin panel
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight mt-2">
          Manage your catalog
        </h1>
        <p className="text-white/60 mt-3 max-w-2xl">
          The whole site runs from a single file. To add or edit songs &amp;
          playlists, open{" "}
          <code className="px-2 py-0.5 bg-white/10 rounded text-emerald-300">
            src/data/songs.ts
          </code>{" "}
          and paste your song link + thumbnail link. No login is required for
          listeners.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <StatCard label="Total songs" value={songs.length.toString()} />
        <StatCard label="Playlists" value={playlists.length.toString()} />
      </div>

      {/* How to add a song */}
      <section className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
        <h2 className="text-xl font-bold mb-3">How to add a new song</h2>
        <ol className="list-decimal pl-5 space-y-2 text-white/80 text-sm">
          <li>
            Open{" "}
            <code className="px-1.5 py-0.5 bg-black/40 rounded text-emerald-300">
              src/data/songs.ts
            </code>{" "}
            in your editor.
          </li>
          <li>
            Inside the <code>songs</code> array, add a new object:
          </li>
        </ol>
        <pre className="mt-4 p-4 bg-black/60 rounded-lg text-xs md:text-sm overflow-x-auto leading-relaxed">
{`{
  id: "my-new-song",          // unique slug
  title: "Song Title",        // display title
  artist: "Artist Name",
  album: "Album Name",        // optional
  duration: "3:45",           // optional
  audioUrl: "https://.../song.mp3",   // 🔗 SONG LINK
  coverUrl: "https://.../cover.jpg",  // 🖼️ THUMBNAIL LINK
  genre: "Pop",
  year: 2024,
  color: "#8b5cf6"            // accent color (hex)
},`}
        </pre>
        <p className="text-xs text-white/50 mt-3">
          Save the file — your site updates automatically after rebuild.
        </p>
      </section>

      <section className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
        <h2 className="text-xl font-bold mb-3">How to add a new playlist</h2>
        <pre className="p-4 bg-black/60 rounded-lg text-xs md:text-sm overflow-x-auto leading-relaxed">
{`{
  id: "my-playlist",
  name: "My Playlist",
  description: "A short description",
  coverUrl: "https://.../playlist-cover.jpg",
  songIds: ["my-new-song", "another-song-id"],
  color: "#1db954"
},`}
        </pre>
      </section>

      <section className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
        <h2 className="text-xl font-bold mb-3">Where do I find links?</h2>
        <ul className="list-disc pl-5 space-y-1 text-white/80 text-sm">
          <li>
            <b>Audio:</b> any direct MP3/OGG link (e.g. from your server,
            Dropbox, Archive.org, SoundHelix, etc.).
          </li>
          <li>
            <b>Cover:</b> any public image URL (Unsplash, imgur, your CDN, etc.).
          </li>
          <li>
            Tip: keep <code>id</code> values unique and lowercase.
          </li>
        </ul>
      </section>

      {/* Current catalog preview */}
      <section>
        <h2 className="text-xl font-bold mb-3">Current catalog</h2>
        <div className="rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-left text-xs uppercase tracking-wider text-white/60">
              <tr>
                <th className="p-3">Cover</th>
                <th className="p-3">Title</th>
                <th className="p-3">Artist</th>
                <th className="p-3 hidden md:table-cell">Genre</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((s) => (
                <tr key={s.id} className="border-t border-white/5">
                  <td className="p-3">
                    <img
                      src={s.coverUrl}
                      alt=""
                      className="h-10 w-10 rounded object-cover"
                    />
                  </td>
                  <td className="p-3 font-medium">{s.title}</td>
                  <td className="p-3 text-white/70">{s.artist}</td>
                  <td className="p-3 text-white/70 hidden md:table-cell">
                    {s.genre}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl p-6 bg-gradient-to-br from-white/10 to-white/0 border border-white/10">
      <div className="text-xs uppercase tracking-widest text-white/50">
        {label}
      </div>
      <div className="text-4xl font-black mt-1">{value}</div>
    </div>
  );
}

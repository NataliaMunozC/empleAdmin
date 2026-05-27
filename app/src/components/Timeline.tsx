type Post = {
  id: string;
  author: string;
  body: string;
};

const seedPosts: Post[] = [
  { id: "1", author: "emple-admin", body: "Primer post de prueba del timeline." },
  { id: "2", author: "soporte", body: "Ya esta listo el scaffolding inicial." }
];

export const Timeline = () => {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
      <h2 className="mb-4 text-lg font-medium">Timeline inicial</h2>
      <ul className="space-y-3">
        {seedPosts.map((post) => (
          <li key={post.id} className="rounded-lg border border-slate-700 p-3">
            <p className="text-sm text-sky-300">@{post.author}</p>
            <p className="text-slate-100">{post.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

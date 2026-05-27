const domainModules = [
  "Empleadas",
  "Seguridad social",
  "Pagos",
  "Liquidaciones",
  "Reportes"
];

const App = () => {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-4 py-10">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wider text-sky-400">EmpleAdmin</p>
        <h1 className="text-3xl font-semibold">
          Gestion de seguridad social para empleo domestico
        </h1>
        <p className="text-slate-300">
          Plataforma para administrar empleadas domesticas, aportes y pagos mensuales.
        </p>
      </header>
      <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
        <h2 className="mb-4 text-lg font-medium">Modulos iniciales</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {domainModules.map((moduleName) => (
            <li key={moduleName} className="rounded-lg border border-slate-700 p-3">
              {moduleName}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default App;



export default function Footer() {

  return (
    <footer className="relative overflow-hidden bg-[#09090B] px-20">
      <div className="border-t border-white/10 py-8">
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
          <p className="text-sm text-zinc-500">© {new Date().getFullYear()}</p>

          <p className="flex items-center gap-1 text-sm text-zinc-400">
            Made with
            <span className="animate-pulse text-red-500">❤️</span>
            by
            <span className="font-semibold">Komal Khokale</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
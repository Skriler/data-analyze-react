function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm">
      {children}
    </div>
  );
}

export { SectionCard };

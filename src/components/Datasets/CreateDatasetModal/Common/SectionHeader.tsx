interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  badge?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon,
  title,
  badge,
}) => (
  <div className="flex items-center gap-3">
    <div className="p-2 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
    {badge && (
      <span className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full font-medium">
        {badge}
      </span>
    )}
  </div>
);

export { SectionHeader };

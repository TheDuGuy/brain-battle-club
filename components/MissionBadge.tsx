import { MissionColor, getMissionColorClasses } from '@/lib/missions';

type MissionBadgeProps = {
  label?: string | null;
  size?: 'lg' | 'sm';
  color?: MissionColor;
  className?: string;
};

export function MissionBadge({ label, size = 'lg', color = 'purple', className = '' }: MissionBadgeProps) {
  if (!label) return null;

  const colors = getMissionColorClasses(color);

  if (size === 'sm') {
    return (
      <span
        className={`inline-flex items-center rounded-full ${colors.bg} text-white px-2.5 py-0.5 text-[10px] uppercase tracking-wide shadow-soft ${className}`}
      >
        {label}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-full ${colors.bgLight} ${colors.text} px-3 py-1 text-xs font-semibold ${className}`}
    >
      {label}
    </span>
  );
}

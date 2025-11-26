'use client';

import { useRouter } from 'next/navigation';
import { MissionColor, getMissionColorClasses } from '@/lib/missions';

type MissionBadgeProps = {
  label?: string | null;
  slug?: string | null;
  size?: 'lg' | 'sm';
  color?: MissionColor;
  className?: string;
};

export function MissionBadge({ label, slug, size = 'lg', color = 'purple', className = '' }: MissionBadgeProps) {
  const router = useRouter();

  if (!label) return null;

  const colors = getMissionColorClasses(color);

  const baseClasses = size === 'sm'
    ? `inline-flex items-center rounded-full ${colors.bg} text-white px-2.5 py-0.5 text-[10px] uppercase tracking-wide shadow-soft ${className}`
    : `inline-flex items-center rounded-full ${colors.bgLight} ${colors.text} px-3 py-1 text-xs font-semibold ${className}`;

  const hoverClasses = slug
    ? 'hover:scale-105 hover:shadow-md transition-all cursor-pointer'
    : '';

  // If slug is provided, render as a clickable button (not <a> to avoid nested links)
  if (slug) {
    return (
      <button
        type="button"
        className={`${baseClasses} ${hoverClasses}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          router.push(`/missions/${slug}`);
        }}
      >
        {label}
      </button>
    );
  }

  // Otherwise render as a non-clickable span
  return (
    <span className={baseClasses}>
      {label}
    </span>
  );
}

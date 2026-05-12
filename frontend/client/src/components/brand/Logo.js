import React from 'react';

/**
 * Shambasmart logo system
 * - <LogoMark/>  : the standalone icon (rounded badge with leaf + smart node)
 * - <Logo/>      : full lockup (mark + wordmark + tagline)
 *
 * The mark combines a stylized leaf (the "S" of Shamba) with a glowing
 * data node — symbolizing smart, AI-powered farming.
 */

let _id = 0;
const useUid = () => React.useMemo(() => `sl-${++_id}`, []);

export const LogoMark = ({ size = 40, className = '', tone = 'gradient' }) => {
  const uid = useUid();
  const gradId = `${uid}-g`;
  const nodeGradId = `${uid}-n`;
  const veinGradId = `${uid}-v`;

  const isMono = tone === 'mono' || tone === 'white';
  const bg = isMono
    ? (tone === 'white' ? '#ffffff' : 'currentColor')
    : `url(#${gradId})`;
  const leafFill = isMono ? (tone === 'white' ? '#047857' : '#ffffff') : '#ffffff';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Shambasmart"
      role="img"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#065f46" />
          <stop offset="55%"  stopColor="#10b981" />
          <stop offset="100%" stopColor="#a3e635" />
        </linearGradient>
        <linearGradient id={veinGradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id={nodeGradId} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%"   stopColor="#fef9c3" />
          <stop offset="60%"  stopColor="#fde047" />
          <stop offset="100%" stopColor="#facc15" />
        </radialGradient>
      </defs>

      {/* Rounded badge */}
      <rect x="0" y="0" width="48" height="48" rx="12" fill={bg} />

      {/* Subtle inner highlight */}
      {!isMono && (
        <rect x="0" y="0" width="48" height="22" rx="12" fill="white" opacity="0.08" />
      )}

      {/* Stylized leaf forming an "S" sweep */}
      <path
        d="M34 12c-9 0-16 5-18 13 4 0 7-1 10-3-3 4-7 6-12 6 1 6 6 9 12 9 9 0 16-7 16-16 0-3-2-6-3-7-1-1-3-2-5-2z"
        fill={leafFill}
        opacity="0.96"
      />

      {/* Leaf vein (S curve) */}
      <path
        d="M14 32c5-2 9-6 12-11s8-7 14-7"
        stroke={isMono ? (tone === 'white' ? '#065f46' : 'rgba(255,255,255,0.5)') : `url(#${veinGradId})`}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Smart data node */}
      <circle cx="34" cy="14" r="3.2" fill={isMono ? '#fde047' : `url(#${nodeGradId})`} />
      <circle cx="34" cy="14" r="5.5" fill={isMono ? '#fde047' : '#fde047'} opacity="0.25" />
    </svg>
  );
};

export const Logo = ({
  size = 36,
  showTagline = false,
  className = '',
  tone = 'gradient',
  textClassName = '',
}) => {
  const isLight = tone === 'white';
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} tone={tone} />
      <div className="leading-none">
        <div className={`font-extrabold tracking-tight ${textClassName || (isLight ? 'text-white' : 'text-ink-900')}`}
             style={{ fontSize: Math.round(size * 0.5) }}>
          Shamba
          <span className={isLight
            ? 'bg-gradient-to-r from-accent-200 to-white bg-clip-text text-transparent'
            : 'bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent'}>
            smart
          </span>
        </div>
        {showTagline && (
          <div className={`mt-1 text-[10px] uppercase tracking-[0.18em] font-bold ${isLight ? 'text-white/70' : 'text-ink-400'}`}>
            AgriTech · Tanzania
          </div>
        )}
      </div>
    </div>
  );
};

export default Logo;

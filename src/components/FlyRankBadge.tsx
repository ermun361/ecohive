import React from 'react';

interface FlyRankBadgeProps {
  variant?: 'banner' | 'chip' | 'seal';
  className?: string;
}

export const FlyRankBadge: React.FC<FlyRankBadgeProps> = ({ variant = 'banner', className = '' }) => {
  const verifyUrl = 'https://internship.flyrank.ai/verify?first_name=Eric';
  const ariaLabel = "Verify Eric Munyi's FlyRank AI Internship credential";

  if (variant === 'chip') {
    return (
      <a
        href={verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#051F21] border border-white/10 hover:border-[#54E399]/40 text-white text-xs font-semibold transition-all shadow-xs group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#54E399] focus-visible:outline-hidden ${className}`}
      >
        <svg
          width="12"
          height="16"
          viewBox="26 18 44 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="shrink-0"
        >
          <path
            d="M28.2354 74.2202V67.9039C29.6419 68.4369 31.3724 68.7055 33.4311 68.7055C35.3235 68.7055 36.8153 68.2396 37.8979 67.3079C38.9805 66.3762 39.9566 64.8695 40.8218 62.792L42.6887 58.3139L29.8976 29.2879C35.0038 29.2879 39.6028 32.3307 41.5294 36.9893L47.0746 50.3985L56.0126 28.6038C57.9221 23.9452 62.5168 20.894 67.6187 20.894L50.0795 63.5936C48.4556 67.5933 46.5205 70.5102 44.2743 72.3484C42.0281 74.1867 39.1169 75.1058 35.5451 75.1058C32.6212 75.1058 30.1875 74.812 28.2354 74.2244V74.2202Z"
            fill="#54E399"
          />
        </svg>
        <span className="text-white">FlyRank verified</span>
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="text-[#54E399] shrink-0"
        >
          <circle cx="12" cy="12" r="10" stroke="#54E399" strokeWidth="1.5" />
          <path d="M7.9 12.3l2.8 2.8 5.4-5.8" stroke="#54E399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    );
  }

  // Standard Banner Variant (Official FlyRank Badge Design)
  return (
    <a
      href={verifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`inline-flex items-center gap-3.5 px-4 py-3 bg-[#051F21] border border-white/10 hover:border-[#54E399]/40 rounded-2xl shadow-sm transition-all group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#54E399] focus-visible:outline-hidden max-w-full ${className}`}
    >
      {/* Tile Icon */}
      <div className="w-10 h-10 rounded-xl bg-[#54E399] flex items-center justify-center shrink-0 shadow-xs">
        <svg
          width="18"
          height="24"
          viewBox="26 18 44 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M28.2354 74.2202V67.9039C29.6419 68.4369 31.3724 68.7055 33.4311 68.7055C35.3235 68.7055 36.8153 68.2396 37.8979 67.3079C38.9805 66.3762 39.9566 64.8695 40.8218 62.792L42.6887 58.3139L29.8976 29.2879C35.0038 29.2879 39.6028 32.3307 41.5294 36.9893L47.0746 50.3985L56.0126 28.6038C57.9221 23.9452 62.5168 20.894 67.6187 20.894L50.0795 63.5936C48.4556 67.5933 46.5205 70.5102 44.2743 72.3484C42.0281 74.1867 39.1169 75.1058 35.5451 75.1058C32.6212 75.1058 30.1875 74.812 28.2354 74.2244V74.2202Z"
            fill="#051F21"
          />
        </svg>
      </div>

      {/* Meta Text */}
      <div className="flex flex-col gap-0.5 min-w-0 text-left">
        <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-white/55">
          FlyRank AI Internship
        </span>
        <span className="text-sm font-semibold text-white tracking-tight whitespace-nowrap">
          Verified Credential
        </span>
        <span className="text-[11px] text-white/60 whitespace-nowrap">
          Frontend AI Engineering • Eric Munyi
        </span>
      </div>

      {/* Verify Action Pill */}
      <div className="hidden sm:flex items-center gap-1.5 ml-2 px-3 py-1.5 rounded-full bg-[#54E399]/10 border border-[#54E399]/25 text-[#54E399] text-xs font-semibold shrink-0 group-hover:bg-[#54E399]/20 transition-colors">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" stroke="#54E399" strokeWidth="1.5" />
          <path d="M7.9 12.3l2.8 2.8 5.4-5.8" stroke="#54E399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Verify</span>
      </div>
    </a>
  );
};

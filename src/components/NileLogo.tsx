import React from 'react';

interface NileLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export const NileLogo: React.FC<NileLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: {
      text: 'text-2xl',
      eagleSize: 'w-5 h-5',
      badge: 'text-[10px] px-1.5 py-0.5',
      subtext: 'text-[10px]',
    },
    md: {
      text: 'text-3xl sm:text-4xl',
      eagleSize: 'w-6 h-6',
      badge: 'text-xs px-2 py-0.5',
      subtext: 'text-xs',
    },
    lg: {
      text: 'text-5xl sm:text-6xl',
      eagleSize: 'w-8 h-8 sm:w-10 sm:h-10',
      badge: 'text-xs px-2.5 py-1',
      subtext: 'text-sm',
    },
    xl: {
      text: 'text-6xl sm:text-7xl md:text-8xl',
      eagleSize: 'w-10 h-10 sm:w-14 sm:h-14',
      badge: 'text-sm px-3 py-1',
      subtext: 'text-base sm:text-lg',
    },
  };

  const current = sizeClasses[size];

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Brand Name Lockup with Red and Black */}
      <div className="flex items-center gap-2 relative">
        <div className={`font-black tracking-tight ${current.text} flex items-baseline leading-none font-['Cairo']`}>
          {/* "نا" in Egyptian Flag Red */}
          <span className="text-[#C8102E] drop-shadow-sm transition-transform hover:scale-105 inline-block">
            نا
          </span>
          {/* "يل" in Egyptian Sleek Black */}
          <span className="text-[#0B0F19] transition-transform hover:scale-105 inline-block">
            يل
          </span>
        </div>

        {/* Minimal Golden Eagle of Saladin Icon */}
        <div
          title="نسر مصر الذهبي"
          className="text-[#C69214] flex items-center justify-center transition-transform hover:rotate-6"
        >
          <svg
            className={current.eagleSize}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Elegant Egyptian Eagle silhouette */}
            <path d="M12 2C11.5 2 11 2.3 10.7 2.7L9.5 4.5C8.8 4.2 8 4.3 7.4 4.8L4.2 7.4C3.5 8 3.2 9 3.5 9.8L4.8 13.2C5.1 14 6 14.5 6.9 14.3L8.5 14C8.9 15.3 9.9 16.3 11.2 16.7V19.5C10.5 19.8 10 20.6 10 21.5C10 21.8 10.2 22 10.5 22H13.5C13.8 22 14 21.8 14 21.5C14 20.6 13.5 19.8 12.8 19.5V16.7C14.1 16.3 15.1 15.3 15.5 14L17.1 14.3C18 14.5 18.9 14 19.2 13.2L20.5 9.8C20.8 9 20.5 8 19.8 7.4L16.6 4.8C16 4.3 15.2 4.2 14.5 4.5L13.3 2.7C13 2.3 12.5 2 12 2ZM12 4.2L12.9 5.5C12.6 5.8 12.3 6.1 12 6.5C11.7 6.1 11.4 5.8 11.1 5.5L12 4.2ZM8 6.5L10.3 8.3C9.7 9.1 9.4 10.1 9.3 11.1L6.2 11.7L5.2 9.1L8 6.5ZM16 6.5L18.8 9.1L17.8 11.7L14.7 11.1C14.6 10.1 14.3 9.1 13.7 8.3L16 6.5ZM12 8C13.1 8 14 9.1 14 10.5C14 11.9 13.1 13 12 13C10.9 13 10 11.9 10 10.5C10 9.1 10.9 8 12 8Z" />
          </svg>
        </div>
      </div>

      {/* Subtitle / Tagline */}
      {showSubtitle && (
        <div className="flex items-center gap-1.5 mt-1">
          <span className={`font-semibold tracking-wider text-slate-500 font-['Readex_Pro'] ${current.subtext}`}>
            Nile Egyptian Search
          </span>
          <span className="text-slate-300">·</span>
          <span className={`text-slate-600 font-medium ${current.subtext}`}>
            محرك بحث مصري وعربي
          </span>
        </div>
      )}
    </div>
  );
};

import React from 'react';

export const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Refined Dark Outer Circle - More prominent as requested */}
      <circle 
        cx="20" 
        cy="20" 
        r="18" 
        className="text-secondary" 
        fill="currentColor" 
        fillOpacity="0.05" 
        stroke="currentColor" 
        strokeWidth="1.5" 
      />
      
      {/* Symmetrical Crescent Lines representing path and exploration */}
      <path 
        d="M14 12C11 16 11 24 14 28" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        className="text-primary"
      />
      <path 
        d="M26 12C29 16 29 24 26 28" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        className="text-primary"
      />
      
      {/* Central Diamond Prism - The Point of Decision */}
      <path 
        d="M20 14L23.5 20L20 26L16.5 20L20 14Z" 
        fill="currentColor"
        className="text-secondary"
      />
      
      {/* Vertical Alignment Points */}
      <circle cx="20" cy="9" r="1.8" fill="currentColor" className="text-secondary" />
      <circle cx="20" cy="31" r="1.8" fill="currentColor" className="text-secondary" />
      
      {/* Clean Intersection Lines (Subtle) */}
      <line x1="20" y1="14" x2="20" y2="10.8" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.3" className="text-primary" />
      <line x1="20" y1="26" x2="20" y2="29.2" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.3" className="text-primary" />
    </svg>
  );
};

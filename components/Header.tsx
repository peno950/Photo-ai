import React from 'react';

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    <path d="M2 8L3.5 11.5L7 13L3.5 14.5L2 18" />
    <path d="M17 6L18 8L20 9L18 10L17 12" />
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="py-4 px-8 border-b border-gray-800">
      <div className="container mx-auto flex items-center gap-3">
        <SparklesIcon className="text-purple-400 w-8 h-8" />
        <div>
          <h1 className="text-2xl font-bold text-white leading-none">PHOTO AI 8K</h1>
          <p className="text-xs text-gray-400 font-mono">by RIGARIx</p>
        </div>
      </div>
    </header>
  );
};
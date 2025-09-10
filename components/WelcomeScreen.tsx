import React from 'react';

const WandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 4V2" />
    <path d="M15 10V8" />
    <path d="M12.5 7.5 14 6" />
    <path d="M11 6 9.5 7.5" />
    <path d="M18 13v-2" />
    <path d="M21 11h-2" />
    <path d="M16 16.5 15 15" />
    <path d="M19.5 15 21 16.5" />
    <path d="M2 22s2-4 4-6 4-2 6-2 6 4 6 4" />
    <path d="M12 2v2" />
    <path d="M7.5 4.5 9 6" />
    <path d="M6 9H4" />
  </svg>
);

export const WelcomeScreen: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center h-full text-center text-gray-400">
            <WandIcon className="w-16 h-16 text-purple-400 mb-4"/>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome to PHOTO AI 8K</h2>
            <p className="max-w-md">Describe your vision, fine-tune the settings, and let our AI bring your ideas to life in stunning high-resolution.</p>
            <p className="text-xs mt-6 text-gray-500">Proudly developed by the innovators at RIGARIx.</p>
        </div>
    );
};
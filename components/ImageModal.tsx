import React, { useEffect } from 'react';
import { ImageResult } from '../types';

interface ImageModalProps {
  image: ImageResult;
  onClose: () => void;
  onDownload: (image: ImageResult) => void;
}

const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
);
const UpscaleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.59a2 2 0 0 1-2.83-2.83l.79-.79"/><polyline points="15 5 21 5 21 11"/><line x1="21" y1="5" x2="11" y2="15"/></svg>
);
const VariationsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
);
const SeedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M14.5 10.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" /><path d="M12 13v9" /></svg>
);


export const ImageModal: React.FC<ImageModalProps> = ({ image, onClose, onDownload }) => {

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
           if (event.key === 'Escape') {
              onClose();
           }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
           window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row gap-4 p-4 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-grow flex items-center justify-center bg-black/50 rounded-md overflow-hidden">
            <img src={image.url} alt={image.alt} className="max-w-full max-h-[80vh] object-contain" />
        </div>
        <div className="flex-shrink-0 w-full md:w-64 flex flex-col gap-3 p-2">
            <h3 className="text-lg font-semibold text-white">Actions</h3>
            <button onClick={() => onDownload(image)} className="w-full flex items-center justify-start gap-3 bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200">
                <DownloadIcon className="w-5 h-5"/> Download Image
            </button>
             <button disabled className="w-full flex items-center justify-start gap-3 bg-gray-600 text-gray-400 font-semibold py-2 px-4 rounded-md cursor-not-allowed">
                <UpscaleIcon className="w-5 h-5"/> Upscale to 8K
            </button>
             <button disabled className="w-full flex items-center justify-start gap-3 bg-gray-600 text-gray-400 font-semibold py-2 px-4 rounded-md cursor-not-allowed">
                <VariationsIcon className="w-5 h-5"/> Create Variations
            </button>
            <button disabled className="w-full flex items-center justify-start gap-3 bg-gray-600 text-gray-400 font-semibold py-2 px-4 rounded-md cursor-not-allowed">
                <SeedIcon className="w-5 h-5"/> Use as Seed
            </button>
            <div className="flex-grow"></div>
            <button onClick={onClose} className="w-full bg-red-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200">
                Close
            </button>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
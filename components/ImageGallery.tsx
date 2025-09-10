
import React from 'react';
import { ImageResult } from '../types';

interface ImageGalleryProps {
  images: ImageResult[];
  onImageSelect: (image: ImageResult) => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="aspect-square bg-gray-700 rounded-lg overflow-hidden cursor-pointer group relative"
          onClick={() => onImageSelect(image)}
        >
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <p className="text-white opacity-0 group-hover:opacity-100 font-semibold">View</p>
          </div>
        </div>
      ))}
    </div>
  );
};

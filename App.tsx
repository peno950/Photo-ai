import React, { useState, useCallback } from 'react';
import { ImageGeneratorForm } from './components/ImageGeneratorForm';
import { ImageGallery } from './components/ImageGallery';
import { ImageModal } from './components/ImageModal';
import { Header } from './components/Header';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { generateImages as generateImagesFromApi } from './services/geminiService';
import { GeneratorOptions, ImageResult } from './types';
import { WelcomeScreen } from './components/WelcomeScreen';

const App: React.FC = () => {
  const [options, setOptions] = useState<GeneratorOptions>({
    prompt: '',
    negativePrompt: '',
    style: 'photorealistic',
    aspectRatio: '1:1',
    numberOfImages: 1,
    quality: 75,
    seed: -1,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<ImageResult[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageResult | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!options.prompt) {
      setError('Please enter a prompt to generate images.');
      return;
    }

    setIsLoading(true);
setError(null);
    setImages([]);

    try {
      // --- Advanced Prompt Engineering ---
      let qualityTerms = '';
      if (options.quality > 85) {
          qualityTerms = '8k, ultra-detailed, photorealistic, masterpiece, best quality,';
      } else if (options.quality > 60) {
          qualityTerms = 'high quality, detailed,';
      }

      // The Imagen API doesn't have a dedicated negative prompt field.
      // This is a UI feature; a more advanced backend could potentially use this.
      // For now, we focus on strengthening the positive prompt.
      const fullPrompt = `${options.prompt}, ${qualityTerms} ${options.style} style`;

      // NOTE: The seed parameter is for UI demonstration.
      // The current @google/genai generateImages API does not support a seed parameter.
      console.log('Generating with seed:', options.seed === -1 ? 'Random' : options.seed);
      console.log('Full Prompt:', fullPrompt);
      
      const generatedImages = await generateImagesFromApi(fullPrompt, {
        numberOfImages: options.numberOfImages,
        aspectRatio: options.aspectRatio,
      });
      setImages(generatedImages);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  const handleDownload = (image: ImageResult) => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `${options.prompt.slice(0, 20).replace(/\s/g, '_')}_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
      <Header />
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <ImageGeneratorForm
              options={options}
              setOptions={setOptions}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:col-span-8">
            <div className="bg-gray-800/50 rounded-lg p-6 min-h-[60vh] border border-gray-700 backdrop-blur-sm">
              {isLoading ? (
                <div className="flex flex-col justify-center items-center h-full">
                    <LoadingSpinner />
                    <p className="mt-4 text-gray-400">Generating your masterpiece...</p>
                </div>
              ) : error ? (
                <ErrorMessage message={error} />
              ) : images.length > 0 ? (
                <ImageGallery images={images} onImageSelect={setSelectedImage} />
              ) : (
                <WelcomeScreen />
              )}
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} PHOTO AI 8K. Developed by RIGARIx.</p>
      </footer>
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
};

export default App;
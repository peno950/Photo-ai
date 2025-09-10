import React, { useState } from 'react';
import { GeneratorOptions } from '../types';
import { STYLES, ASPECT_RATIOS, NUM_IMAGES_OPTIONS } from '../constants';

interface ImageGeneratorFormProps {
  options: GeneratorOptions;
  setOptions: React.Dispatch<React.SetStateAction<GeneratorOptions>>;
  onGenerate: () => void;
  isLoading: boolean;
}

const GeneratorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m15 5 4 4" /><path d="M12.5 11.5 10 9 5 14" /><path d="M18 13v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3" /><path d="M21 15.5V18a1 1 0 0 1-1 1h-2.5" /><path d="M21 9.5V7a1 1 0 0 0-1-1h-2.5" />
    </svg>
);
const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m6 9 6 6 6-6"/></svg>
);
const DiceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M16 8h.01"/><path d="M12 12h.01"/><path d="M8 16h.01"/><path d="M8 8h.01"/><path d="M16 16h.01"/></svg>
);


export const ImageGeneratorForm: React.FC<ImageGeneratorFormProps> = ({ options, setOptions, onGenerate, isLoading }) => {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  
  const handleOptionChange = <K extends keyof GeneratorOptions,>(key: K, value: GeneratorOptions[K]) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const randomizeSeed = () => {
    handleOptionChange('seed', Math.floor(Math.random() * 1000000000));
  };

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 space-y-6 border border-gray-700 backdrop-blur-sm">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
          Describe what you want to create (Prompt)
        </label>
        <textarea
          id="prompt"
          rows={5}
          className="w-full bg-gray-900/50 border border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 resize-none placeholder-gray-500"
          placeholder="e.g., A majestic lion wearing a crown, studio lighting"
          value={options.prompt}
          onChange={(e) => handleOptionChange('prompt', e.target.value)}
          disabled={isLoading}
        />
      </div>
      
       <div>
        <label htmlFor="negativePrompt" className="block text-sm font-medium text-gray-300 mb-2">
          Describe what to avoid (Negative Prompt)
        </label>
        <textarea
          id="negativePrompt"
          rows={2}
          className="w-full bg-gray-900/50 border border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 resize-none placeholder-gray-500"
          placeholder="e.g., blurry, cartoon, disfigured"
          value={options.negativePrompt}
          onChange={(e) => handleOptionChange('negativePrompt', e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="style" className="block text-sm font-medium text-gray-300 mb-2">
          Artistic Style
        </label>
        <select
          id="style"
          className="w-full bg-gray-900/50 border border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
          value={options.style}
          onChange={(e) => handleOptionChange('style', e.target.value)}
          disabled={isLoading}
        >
          {STYLES.map(style => (
            <option key={style} value={style} className="bg-gray-800 text-white">{style.charAt(0).toUpperCase() + style.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="aspectRatio" className="block text-sm font-medium text-gray-300 mb-2">
            Aspect Ratio
          </label>
          <select
            id="aspectRatio"
            className="w-full bg-gray-900/50 border border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
            value={options.aspectRatio}
            onChange={(e) => handleOptionChange('aspectRatio', e.target.value as GeneratorOptions['aspectRatio'])}
            disabled={isLoading}
          >
            {ASPECT_RATIOS.map(ratio => (
              <option key={ratio} value={ratio} className="bg-gray-800 text-white">{ratio}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="numberOfImages" className="block text-sm font-medium text-gray-300 mb-2">
            # of Images
          </label>
          <select
            id="numberOfImages"
            className="w-full bg-gray-900/50 border border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
            value={options.numberOfImages}
            onChange={(e) => handleOptionChange('numberOfImages', parseInt(e.target.value, 10))}
            disabled={isLoading}
          >
            {NUM_IMAGES_OPTIONS.map(num => (
              <option key={num} value={num} className="bg-gray-800 text-white">{num}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Advanced Settings */}
      <div className="border-t border-gray-700 pt-4">
        <button onClick={() => setAdvancedOpen(!advancedOpen)} className="w-full flex justify-between items-center text-gray-300 hover:text-white">
          <span className="font-medium">Advanced Settings</span>
          <ChevronDownIcon className={`w-5 h-5 transition-transform ${advancedOpen ? 'rotate-180' : ''}`} />
        </button>
        {advancedOpen && (
          <div className="mt-4 space-y-6">
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label htmlFor="quality" className="block text-sm font-medium text-gray-300">
                      Quality (up to 8K)
                    </label>
                    <span className="text-sm font-mono text-purple-300">{options.quality}</span>
                </div>
                <input
                    id="quality"
                    type="range"
                    min="1"
                    max="100"
                    value={options.quality}
                    onChange={(e) => handleOptionChange('quality', parseInt(e.target.value, 10))}
                    disabled={isLoading}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-thumb"
                />
            </div>
             <div>
                <label htmlFor="seed" className="block text-sm font-medium text-gray-300 mb-2">
                  Seed (-1 for random)
                </label>
                <div className="flex items-center gap-2">
                    <input
                        id="seed"
                        type="number"
                        className="w-full bg-gray-900/50 border border-gray-600 rounded-md p-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                        placeholder="-1"
                        value={options.seed}
                        onChange={(e) => handleOptionChange('seed', parseInt(e.target.value, 10))}
                        disabled={isLoading}
                    />
                    <button onClick={randomizeSeed} disabled={isLoading} className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors" aria-label="Randomize Seed">
                        <DiceIcon className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>
          </div>
        )}
      </div>
      
      <button
        onClick={onGenerate}
        disabled={isLoading || !options.prompt}
        className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white font-bold py-3 px-4 rounded-md hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:scale-100"
      >
        <GeneratorIcon className="w-5 h-5" />
        {isLoading ? 'Generating...' : 'Generate'}
      </button>

      <style>{`
        .range-thumb::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            background: #a855f7; /* purple-500 */
            cursor: pointer;
            border-radius: 50%;
            border: 2px solid white;
        }

        .range-thumb::-moz-range-thumb {
            width: 20px;
            height: 20px;
            background: #a855f7; /* purple-500 */
            cursor: pointer;
            border-radius: 50%;
            border: 2px solid white;
        }
      `}</style>
    </div>
  );
};
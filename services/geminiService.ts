import { GoogleGenAI } from "@google/genai";
import { ImageResult, GenerationConfig, AspectRatio } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateImages = async (prompt: string, config: GenerationConfig): Promise<ImageResult[]> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: config.numberOfImages,
        outputMimeType: 'image/png',
        aspectRatio: config.aspectRatio,
      },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      throw new Error("The API did not return any images.");
    }
    
    return response.generatedImages.map(img => {
        const base64ImageBytes: string = img.image.imageBytes;
        return {
            url: `data:image/png;base64,${base64ImageBytes}`,
            alt: `AI generated image for: ${prompt}`
        }
    });

  } catch (error) {
    console.error("Error generating images with the API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate images: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating images.");
  }
};
export type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

export interface GeneratorOptions {
  prompt: string;
  negativePrompt: string;
  style: string;
  aspectRatio: AspectRatio;
  numberOfImages: number;
  quality: number;
  seed: number;
}

export interface ImageResult {
  url: string;
  alt: string;
}

export interface GenerationConfig {
    numberOfImages: number;
    aspectRatio: AspectRatio;
}
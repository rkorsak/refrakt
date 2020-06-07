import { ImageData, NoiseGenerator, PixelGenerator, NoiseSettings, Settings, NoiseAxes } from './types';
import { makeNoise } from './noise';
import { mutateNoise } from './mutators';
import { clamp } from './utils';

/** Retrieve a specific pixel from a source image using the provided noise functions */
export const imageSampler = (noiseX: NoiseGenerator, noiseY: NoiseGenerator, image: ImageData): PixelGenerator => (
  x,
  y
) => {
  const pixelX = Math.floor(noiseX(x, y) * image.width);
  const pixelY = Math.floor(noiseY(x, y) * image.height);

  return image.getPixel(clamp(0, image.width - 1, pixelX), clamp(0, image.height - 1, pixelY));
};

/** For visualizing a noise field - returns a greyscale value */
export const noiseSampler = (noise: NoiseGenerator): PixelGenerator => (x, y) => {
  const value = noise(x, y) * 256;
  return [value, value, value];
};

/** Creates a noise function which will be run through the provided mutators */
const noiseMaker = (width: number, height: number, seed: number, settings: NoiseSettings) => {
  const noise = makeNoise(width, height, {
    seed,
    noise: settings.noise,
  });

  const mutators = settings.mutators.map((m) => m({ width, height }));

  return mutateNoise(noise, mutators);
};

export const makeNoiseGenerators = (width: number, height: number, settings: Settings, seed: number): NoiseAxes => {
  const noiseX = noiseMaker(width, height, seed, settings.x);
  const noiseY = noiseMaker(width, height, seed + 1, settings.y);

  return {
    noiseX,
    noiseY,
  };
};

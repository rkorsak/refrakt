import { makeNoise2D } from 'open-simplex-noise';
import { makeRectangle, Options } from 'fractal-noise';
import { NoiseField } from './types';

type NoiseOptions = {
  seed: number;
  noise: Options;
};

export function makeNoise(width: number, height: number, options: NoiseOptions): NoiseField {
  const { seed = Date.now(), noise: noiseOptions = {} } = options || {};

  const noise2D = makeNoise2D(seed);
  // This generates noise where each value is between -1 and 1
  const noiseData = makeRectangle(width, height, noise2D, noiseOptions);

  return noiseData.map((col) => col.map((noiseValue) => (noiseValue - 1) / 2));
}

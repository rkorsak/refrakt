import { makeNoise2D } from 'open-simplex-noise';
import { makeRectangle, Options } from 'fractal-noise';
import { NoiseGenerator } from './types';
import { clamp } from './utils';

type NoiseOptions = {
  seed: number;
  noise: Options;
};

export function makeNoise(width: number, height: number, options: NoiseOptions): NoiseGenerator {
  const { seed = Date.now(), noise: noiseOptions = {} } = options || {};

  const noise2D = makeNoise2D(seed);
  // This generates noise where each value should be between -1 and 1, but note that
  // higher amplitudes can generate out-of-range values
  const noiseData = makeRectangle(width, height, noise2D, noiseOptions);

  return (x, y) => (noiseData[x][y] + 1) / 2;
}

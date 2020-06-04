import { Options as NoiseOptions } from 'fractal-noise';

//#region Image Generation

export type Coordinates = [number, number];

export type ImageData = {
  width: number;
  height: number;
  uri?: string;
  getPixel: PixelGenerator;
};

export type PixelGenerator = (x: number, y: number) => PixelValue;

export type PixelValue = [number, number, number, number?];

//#endregion

//#region Mutators

export type ConfigurableMutatorFn = (settings: MutatorSettings) => MutatorFn;

export type MutatorFn = (noiseFn: NoiseGenerator) => NoiseGenerator;

export type MutatorSettings = {
  width: number;
  height: number;
};

//#endregion

//#region Noise Generation

/**
 * The source for generating the final product - two noise fields.
 * One will be used to sample the image along the x-axis, the other along the y-axis.
 */
export type NoiseAxes = {
  x: NoiseGenerator;
  y: NoiseGenerator;
};

export type NoiseGenerator = (x: number, y: number) => number;

export type NoiseSettings = {
  /**
   * Controls the raw noise function
   */
  noise: NoiseOptions;

  /**
   * A pipeline of functions that mutate the noise output, applied in order
   */
  mutators: ConfigurableMutatorFn[];
};

//#endregion

//#region Settings

/**
 * This high-level settings used by frakt
 */
export type Settings = {
  /**
   * Noise generator settings for the x-axis sampler
   */
  x: NoiseSettings;
  /**
   * Noise generator settings for the y-axis sampler
   */
  y: NoiseSettings;
};

/**
 * A pre-configured bundle of settings that produces an interesting result
 */
export type SettingsPreset = {
  name: string;
  description: string;
  settings: Settings;
};

//#endregion

export type Coordinates = [number, number];
export type ImageData = {
  width: number;
  height: number;
  uri?: string;
  getPixel: (x: number, y: number) => PixelValue;
};
export type PixelValue = [number, number, number, number?];
export type NoiseField = number[][];

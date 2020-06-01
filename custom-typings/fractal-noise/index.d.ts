/**
 * Overrides the types from `fractal-noise` to fix function return values
 */
declare module 'fractal-noise' {
  export declare type Noise1Fn = (x: number) => number;
  export declare type Noise2Fn = (x: number, y: number) => number;
  export declare type Noise3Fn = (x: number, y: number, z: number) => number;
  export declare type Noise4Fn = (x: number, y: number, z: number, w: number) => number;
  export interface Options {
    amplitude?: number;
    frequency?: number;
    octaves?: number;
    persistence?: number;
  }
  export declare function makeCuboid(
    width: number,
    height: number,
    depth: number,
    noise3: Noise3Fn,
    options?: Options
  ): number[][];
  export declare function makeCylinderSurface(
    circumference: number,
    height: number,
    noise3: Noise3Fn,
    options?: Options
  ): number[][];
  export declare function makeLine(length: number, noise1: Noise1Fn, options?: Options): number[];
  export declare function makeRectangle(width: number, height: number, noise2: Noise2Fn, options?: Options): number[][];
  export declare function makeSphereSurface(circumference: number, noise3: Noise3Fn, options?: Options): number[][];
}

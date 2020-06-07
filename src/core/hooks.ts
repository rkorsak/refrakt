import { useState, useEffect } from 'react';

import { loadImage } from './image';
import { makeNoiseGenerators, imageSampler } from './frakt';
import { ImageData, NoiseAxes, Settings, PixelGenerator } from './types';

/**
 * A react hook to create the frakt pixel generator, which samples the given image
 * using the provided x and y axis noise fields.
 *
 * Returns `null` until it can produce a generator.
 */
export function useArtGenerator(noiseGenerators: NoiseAxes | null, image: ImageData | null): PixelGenerator | null {
  const [artGenerator, setArtGenerator] = useState<{ generate: PixelGenerator | null }>({ generate: null });

  useEffect(() => {
    if (noiseGenerators && image) {
      const { noiseX, noiseY } = noiseGenerators;
      const generator = imageSampler(noiseX, noiseY, image);
      setArtGenerator({ generate: generator });
    }
  }, [image, noiseGenerators]);

  return artGenerator.generate;
}

/**
 * A react hook to load an image with the given URI
 * Returns `null` until the image loads.
 */
export function useImage(uri: string): ImageData | null {
  const [image, setImage] = useState<ImageData | null>(null);

  useEffect(() => {
    var subscribed = true;
    loadImage(uri).then((image) => {
      if (subscribed) {
        setImage(image);
      }
    });
    return () => {
      subscribed = false;
    };
  }, [uri]);

  return image;
}

/**
 * A react hook which creates a pair of noise generators that can be fed into
 * the frakt generator to control x and y output pixel values.
 *
 * Returns `null` until the generators are available
 */
export function useNoiseGenerators(settings: Settings, width: number, height: number, seed: number): NoiseAxes | null {
  const [noiseGenerators, setNoiseGenerators] = useState<NoiseAxes | null>(null);
  useEffect(() => {
    const generators = makeNoiseGenerators(width, height, settings, seed);
    setNoiseGenerators(generators);
  }, [width, height, seed, settings]);

  return noiseGenerators;
}

import { ImageData, PixelValue } from './types';
import { useState, useEffect } from 'react';

export function loadImage(uri: string): Promise<ImageData> {
  return new Promise((resolve) => {
    var img = new Image();

    img.onload = () => {
      var canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      const getPixel = (x: number, y: number): PixelValue => {
        const i = (x + y * canvas.width) * 4;
        return [imageData[i], imageData[i + 1], imageData[i + 2], imageData[i + 3]];
      };

      resolve({
        uri,
        width: img.width,
        height: img.height,
        getPixel,
      });
    };

    img.src = uri;
  });
}

/**
 * A react hook which loads the image with the given URI
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

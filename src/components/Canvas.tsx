import React, { useRef, useEffect } from 'react';
import { ImageData, Coordinates, PixelValue } from '../core/types';

export interface CanvasProps {
  width: number;
  height: number;
  className?: string;
  image?: ImageData;
}

/**
 * An HTML5 canvas element which draws the provided 2D pixel array
 */
export default function Canvas({ width, height, className, image }: CanvasProps) {
  const canvasEl: React.MutableRefObject<HTMLCanvasElement | null> = useRef(null);

  useEffect(() => {
    if (!canvasEl.current) {
      return;
    }
    if (image) {
      drawCanvas(canvasEl.current, width, height, image);
    } else {
      clearCanvas(canvasEl.current);
    }
  }, [width, height, image]);

  return <canvas className={className} ref={canvasEl} width={width} height={height} />;
}

/**
 * Wipe the canvas of all visual data
 */
function clearCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Write the provided 2D array of pixels to an existing canvas
 */
function drawCanvas(canvas: HTMLCanvasElement, width: number, height: number, image: ImageData) {
  const ctx = canvas.getContext('2d')!;
  const outputImage = ctx.createImageData(width, height);

  if (image.width !== width || image.height !== height) {
    console.error('Pixel dimensions do not match canvas dimensions!', {
      canvas: { width, height },
      image: { width: image.width, height: image.height },
    });
    clearCanvas(canvas);
  }

  const setPixel = ([x, y]: Coordinates, [r, g, b, a = 255]: PixelValue) => {
    const index = (x + y * outputImage.width) * 4;
    outputImage.data[index] = r;
    outputImage.data[index + 1] = g;
    outputImage.data[index + 2] = b;
    outputImage.data[index + 3] = a;
  };

  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      const pixel = image.getPixel(x, y);
      setPixel([x, y], pixel);
    }
  }

  ctx.putImageData(outputImage, 0, 0);
}

import React, { useRef, useEffect } from 'react';
import { Coordinates, PixelValue, PixelGenerator } from '../core/types';

export interface CanvasProps {
  width: number;
  height: number;
  className?: string;
  getPixel?: PixelGenerator;
}

/**
 * An HTML5 canvas element which draws the provided 2D pixel array
 */
export default function Canvas({ width, height, className, getPixel }: CanvasProps) {
  const canvasEl: React.MutableRefObject<HTMLCanvasElement | null> = useRef(null);

  useEffect(() => {
    if (!canvasEl.current) {
      return;
    }
    if (getPixel) {
      drawCanvas(canvasEl.current, width, height, getPixel);
    } else {
      clearCanvas(canvasEl.current);
    }
  }, [width, height, getPixel]);

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
function drawCanvas(canvas: HTMLCanvasElement, width: number, height: number, getPixel: PixelGenerator) {
  const ctx = canvas.getContext('2d')!;
  const outputImage = ctx.createImageData(width, height);

  const setPixel = ([x, y]: Coordinates, [r, g, b, a = 255]: PixelValue) => {
    const index = (x + y * outputImage.width) * 4;
    outputImage.data[index] = r;
    outputImage.data[index + 1] = g;
    outputImage.data[index + 2] = b;
    outputImage.data[index + 3] = a;
  };

  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      const pixel = getPixel(x, y);
      setPixel([x, y], pixel);
    }
  }

  ctx.putImageData(outputImage, 0, 0);
}

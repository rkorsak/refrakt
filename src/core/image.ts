import { ImageData, PixelValue } from './types';

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

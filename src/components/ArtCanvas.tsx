import React from 'react';
import Canvas from './Canvas';
import { NoiseAxes } from '../core/types';
import { useImage, useArtGenerator } from '../core/hooks';

export interface ArtCanvasProps {
  width: number;
  height: number;
  imageUri: string;
  noiseGenerators: NoiseAxes | null;
  className?: string;
}

export default function ArtCanvas({ width, height, noiseGenerators, imageUri, className }: ArtCanvasProps) {
  const image = useImage(imageUri);
  const artGenerator = useArtGenerator(noiseGenerators, image);

  return <Canvas className={className} width={width} height={height} getPixel={artGenerator} />;
}

import React, { useState, useEffect } from 'react';

import { makeNoiseFields as makeNoiseGenerators, imageSampler } from './core/frakt';
import { useImage } from './core/image';
import presets from './core/presets';
import { NoiseAxes, PixelGenerator } from './core/types';

import Canvas from './components/Canvas';

import './App.css';

const imageUri = '/images/architecture.jpeg';
const width = 1280;
const height = 1024;
const seed = Date.now();
const preset = presets.topoMax;

function App() {
  const [noiseGenerators, setNoiseGenerators] = useState<NoiseAxes>();
  const [artGenerator, setArtGenerator] = useState<{ generate: PixelGenerator }>();

  const image = useImage(imageUri);

  useEffect(() => {
    const generators = makeNoiseGenerators(width, height, preset.settings, seed);
    setNoiseGenerators(generators);
  }, []);

  useEffect(() => {
    if (image && noiseGenerators) {
      const { noiseX, noiseY } = noiseGenerators;
      const generator = imageSampler(noiseX, noiseY, image);
      setArtGenerator({ generate: generator });
    }
  }, [image, noiseGenerators]);

  return (
    <div className="App">
      <h1>refrakt</h1>
      {!!artGenerator && (
        <Canvas className="App__Canvas" width={width} height={height} getPixel={artGenerator.generate} />
      )}
    </div>
  );
}

export default App;

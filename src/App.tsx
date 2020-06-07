import React from 'react';

import { useImage, useNoiseGenerators, useArtGenerator } from './core/hooks';
import presets from './core/presets';
import Canvas from './components/Canvas';

import './App.css';

const imageUri = '/images/architecture.jpeg';
const width = 1280;
const height = 1024;
const seed = Date.now();
const preset = presets[0];

function App() {
  const image = useImage(imageUri);
  const noiseGenerators = useNoiseGenerators(preset.settings, width, height, seed);
  const artGenerator = useArtGenerator(noiseGenerators, image);

  return (
    <div className="App">
      <h1>refrakt</h1>
      {!!artGenerator && <Canvas className="App__Canvas" width={width} height={height} getPixel={artGenerator} />}
    </div>
  );
}

export default App;

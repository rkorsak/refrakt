import React from 'react';

import { useNoiseGenerators } from './core/hooks';
import presets from './core/presets';

import './App.css';
import ArtCanvas from './components/ArtCanvas';

const imageUri = '/images/architecture.jpeg';
const width = 1280;
const height = 1024;
const seed = Date.now();
const preset = presets[0];

function App() {
  const noiseGenerators = useNoiseGenerators(preset.settings, width, height, seed);

  return (
    <div className="App">
      <h1>refrakt</h1>
      <ArtCanvas
        className="App__Canvas"
        width={width}
        height={height}
        imageUri={imageUri}
        noiseGenerators={noiseGenerators}
      />
    </div>
  );
}

export default App;

import React, { useState, useEffect, useMemo } from 'react';

import { makeNoiseFields, imageSampler } from './core/frakt';
import { loadImage } from './core/image';
import presets from './core/presets';
import { ImageData } from './core/types';

import Canvas from './components/Canvas';

import './App.css';

const imageUri = '/images/architecture.jpeg';
const width = 1000;
const height = 1000;
const seed = Date.now();
const preset = presets.topoMax;

function App() {
  const [image, setImage] = useState<ImageData | null>(null);

  useEffect(() => {
    var subscribed = true;
    loadImage(imageUri).then((image) => {
      if (subscribed) {
        setImage(image);
      }
    });
    return () => {
      subscribed = false;
    };
  }, []);

  const noiseAxes = useMemo(() => makeNoiseFields(width, height, preset.settings, seed), []);
  const artGenerator = useMemo(() => {
    if (image && noiseAxes) {
      return imageSampler(noiseAxes.noiseX, noiseAxes.noiseY, image);
    }
  }, [image, noiseAxes]);

  return (
    <div className="App">
      <h1>refrakt</h1>
      {!!artGenerator && <Canvas className="App__Canvas" width={width} height={height} getPixel={artGenerator} />}
    </div>
  );
}

export default App;

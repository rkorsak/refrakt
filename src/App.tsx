import React, { useState, useEffect } from 'react';

import { makeNoiseFields, imageSampler } from './core/frakt';
import { loadImage } from './core/image';
import presets from './core/presets';
import { ImageData, NoiseAxes, PixelGenerator } from './core/types';

import Canvas from './components/Canvas';

import './App.css';

const imageUri = '/images/architecture.jpeg';
const width = 1280;
const height = 1024;
const seed = Date.now();
const preset = presets.topoMax;

function App() {
  const [image, setImage] = useState<ImageData | null>(null);
  const [generators, setGenerators] = useState<{ axes?: NoiseAxes; art?: PixelGenerator }>({});

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

  useEffect(() => {
    const axes = makeNoiseFields(width, height, preset.settings, seed);
    setGenerators((prevGenerators) => ({ ...prevGenerators, axes }));
  }, []);

  useEffect(() => {
    if (image && generators.axes) {
      const axes = generators.axes;
      const art = imageSampler(axes.noiseX, axes.noiseY, image);
      setGenerators((prevGenerators) => ({ ...prevGenerators, art }));
    }
  }, [image, generators.axes]);

  return (
    <div className="App">
      <h1>refrakt</h1>
      {!!generators.art && <Canvas className="App__Canvas" width={width} height={height} getPixel={generators.art} />}
    </div>
  );
}

export default App;

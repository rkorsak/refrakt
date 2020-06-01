import React, { useState, useEffect } from 'react';

import Canvas from './components/Canvas';
import { ImageData } from './core/types';
import { loadImage } from './core/image';

import './App.css';

function App() {
  const [uri, setUri] = useState<string>('/images/architecture.jpeg');
  const [image, setImage] = useState<ImageData | undefined>();

  useEffect(() => {
    // If the effect is cancelled, ensure the side effects are skipped.
    let isActive = true;
    loadImage(uri)
      .then((image) => {
        if (isActive) {
          setImage(image);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      isActive = false;
    };
  }, [uri]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUri('/images/bali.jpeg');
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="App">
      <h1>refrakt</h1>
      {!!image && <Canvas className="App__Canvas" width={image.width} height={image.height} image={image} />}
    </div>
  );
}

export default App;

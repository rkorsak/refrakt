import { imageMultiplierX, imageMultiplierY, topographical, topographicalStep, inverse } from './mutators';
import { NoiseSettings, Settings, SettingsPreset } from './types';

/**
 * @module A collection of preset settings that produce interesting results.
 */

type PartialNoiseSettings = Partial<NoiseSettings>;
type PartialSettings = {
  x?: PartialNoiseSettings;
  y?: PartialNoiseSettings;
};

/**
 * Merges axis-specific with shared noise settings to produce potentially-distinct settings per axis.
 */
export function mergeSettings(commonSettings: PartialNoiseSettings, axisSettings: PartialSettings = {}): Settings {
  const merge = (axis: PartialNoiseSettings = {}) => ({
    noise: { ...commonSettings.noise, ...axis.noise },
    mutators: [...(commonSettings.mutators || []), ...(axis.mutators || [])],
  });

  return {
    x: merge(axisSettings.x || {}),
    y: merge(axisSettings.y || {}),
  };
}

const presets = {
  minerality: {
    name: 'Minerality',
    description:
      'The "classic" look - somewhere between a satellite view of beaches and the cross section of a mineral deposit.',
    settings: mergeSettings({
      noise: {
        frequency: 0.002,
        octaves: 8,
        amplitude: 2,
      },
    }),
  },

  blobs: {
    name: 'Blobs',
    description: 'A trippy combination of smooth curves, hard edges, and noisy-but-smooth distortion',
    settings: mergeSettings(
      {
        noise: {
          frequency: 0.002,
          octaves: 2,
          amplitude: 2,
        },
      },
      {
        x: {
          noise: {
            frequency: 0.004,
          },
          mutators: [topographicalStep],
        },
      }
    ),
  },

  mineralBlobs: {
    name: 'Mineral Blobs',
    description: 'A bit of columns A and B: blobs and crunchy minerals',
    settings: mergeSettings(
      {
        noise: {
          amplitude: 2,
        },
      },
      {
        x: {
          noise: {
            octaves: 2,
            frequency: 0.004,
          },
          mutators: [topographicalStep],
        },
        y: {
          noise: {
            frequency: 0.002,
            octaves: 8,
          },
        },
      }
    ),
  },

  topo: {
    name: 'Topographic',
    description: 'A more overtly stylized topographical map look',
    settings: mergeSettings(
      {
        noise: {
          frequency: 0.002,
          amplitude: 2,
        },
      },
      {
        x: {
          noise: {
            octaves: 2,
          },
          mutators: [topographical],
        },
        y: {
          noise: {
            octaves: 8,
          },
        },
      }
    ),
  },

  topoMax: {
    name: 'TopoMax',
    description: 'Topographical lines on both axes, with a crunchier y',
    settings: mergeSettings(
      {
        noise: {
          frequency: 0.002,
          amplitude: 2,
        },
        mutators: [topographical],
      },
      {
        x: {
          noise: {
            octaves: 2,
          },
        },
        y: {
          noise: {
            octaves: 8,
          },
        },
      }
    ),
  },

  imageDistort: {
    name: 'Image Distortion',
    description:
      'Preserves most of the original image (stretched to fit the new dimensions), but with wavy topographical lines slicing through it.',
    settings: mergeSettings(
      {
        noise: {
          frequency: 0.002,
          amplitude: 1,
        },
        mutators: [topographical, inverse],
      },
      {
        x: {
          noise: {
            octaves: 2,
          },
          mutators: [imageMultiplierX],
        },
        y: {
          noise: {
            octaves: 8,
          },
          mutators: [imageMultiplierY],
        },
      }
    ),
  },
};

export default presets;

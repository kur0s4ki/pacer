import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import InputSection from './components/InputSection';
import InputSummary from './components/InputSummary';
import HyroxRacePace from './components/HyroxRacePace';
import TrainingZones from './components/TrainingZones';
import SpeedRepetitions from './components/SpeedRepetitions';

const RunningPaceCalculator = () => {
  const [distance, setDistance] = useState('');
  const [error, setError] = useState('');
  const [calculations, setCalculations] = useState({
    thresholdPace: null,
    selectedBand: '',
    hyroxPace: null,
    trainingZones: [],
    speedRepetitionPace: null
  });

  // Band configurations with multipliers
  const bandConfigurations = {
    'Band 1 (<2600m)': {
      condition: (d) => d < 2600,
      multipliers: {
        base: 1.25,
        aerobicThreshold: 1.15,
        subThreshold: 1.05,
        threshold: 1.0,
        maxAerobicPower: 0.95,
        speedRepetitions: 0.90
      }
    },
    'Band 2 (2600-3400m)': {
      condition: (d) => d >= 2600 && d <= 3400,
      multipliers: {
        base: 1.20,
        aerobicThreshold: 1.12,
        subThreshold: 1.03,
        threshold: 1.0,
        maxAerobicPower: 0.97,
        speedRepetitions: 0.92
      }
    },
    'Band 3 (>3400m)': {
      condition: (d) => d > 3400,
      multipliers: {
        base: 1.15,
        aerobicThreshold: 1.08,
        subThreshold: 1.02,
        threshold: 1.0,
        maxAerobicPower: 0.98,
        speedRepetitions: 0.94
      }
    }
  };

  const calculateThresholdPace = (distanceValue) => {
    // Exponential formula: 71.4478484 * EXP(-0.00143607775 * distance) + 3.36187527
    return 71.4478484 * Math.exp(-0.00143607775 * distanceValue) + 3.36187527;
  };

  const getBandForDistance = (distanceValue) => {
    for (const [bandName, config] of Object.entries(bandConfigurations)) {
      if (config?.condition(distanceValue)) {
        return { name: bandName, multipliers: config?.multipliers };
      }
    }
    return null;
  };

  const calculatePaces = (distanceValue) => {
    if (!distanceValue || distanceValue === '' || isNaN(distanceValue) || distanceValue <= 0) {
      setError('Please enter a valid distance greater than 0');
      setCalculations({
        thresholdPace: null,
        selectedBand: '',
        hyroxPace: null,
        trainingZones: [],
        speedRepetitionPace: null
      });
      return;
    }

    if (distanceValue < 1000 || distanceValue > 5000) {
      setError('Distance should be between 1000m and 5000m for accurate calculations');
      return;
    }

    setError('');

    const thresholdPace = calculateThresholdPace(parseFloat(distanceValue));
    const band = getBandForDistance(parseFloat(distanceValue));

    if (!band) {
      setError('Unable to determine training band for this distance');
      return;
    }

    const multipliers = band?.multipliers;

    // Calculate training zones
    const trainingZones = [
      {
        name: 'Base/Zone 2',
        pace: thresholdPace * multipliers?.base
      },
      {
        name: 'Aerobic Threshold/VT1',
        pace: thresholdPace * multipliers?.aerobicThreshold
      },
      {
        name: 'Sub-Threshold',
        pace: thresholdPace * multipliers?.subThreshold
      },
      {
        name: 'Threshold/LT2',
        pace: thresholdPace * multipliers?.threshold
      },
      {
        name: 'Max Aerobic Power/VO2max',
        pace: thresholdPace * multipliers?.maxAerobicPower
      },
      {
        name: 'Speed Repetitions',
        pace: thresholdPace * multipliers?.speedRepetitions
      }
    ];

    // Calculate HYROX pace (average of Threshold and Sub-Threshold)
    const thresholdZonePace = thresholdPace * multipliers?.threshold;
    const subThresholdPace = thresholdPace * multipliers?.subThreshold;
    const hyroxPace = (thresholdZonePace + subThresholdPace) / 2;

    // Speed repetition pace
    const speedRepetitionPace = thresholdPace * multipliers?.speedRepetitions;

    setCalculations({
      thresholdPace,
      selectedBand: band?.name,
      hyroxPace,
      trainingZones,
      speedRepetitionPace
    });
  };

  useEffect(() => {
    if (distance && distance !== '') {
      const timeoutId = setTimeout(() => {
        calculatePaces(distance);
      }, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setError('');
      setCalculations({
        thresholdPace: null,
        selectedBand: '',
        hyroxPace: null,
        trainingZones: [],
        speedRepetitionPace: null
      });
    }
  }, [distance]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Running Pace Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate personalized training paces and HYROX race recommendations based on your 12-minute run test results
            </p>
          </div>

          {/* Input Section */}
          <div className="mb-8">
            <InputSection 
              distance={distance}
              setDistance={setDistance}
              error={error}
            />
          </div>

          {/* Results Grid */}
          {calculations?.thresholdPace && (
            <div className="space-y-8">
              {/* Input Summary */}
              <InputSummary 
                distance={distance}
                thresholdPace={calculations?.thresholdPace}
                selectedBand={calculations?.selectedBand}
              />

              {/* HYROX Race Pace */}
              <HyroxRacePace hyroxPace={calculations?.hyroxPace} />

              {/* Training Zones and Speed Repetitions Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <TrainingZones trainingZones={calculations?.trainingZones} />
                <SpeedRepetitions speedRepetitionPace={calculations?.speedRepetitionPace} />
              </div>
            </div>
          )}

          {/* Empty State */}
          {!distance && !error && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-sm">12</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Ready to Calculate</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Enter your 12-minute run test distance above to generate personalized training paces and race recommendations
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RunningPaceCalculator;
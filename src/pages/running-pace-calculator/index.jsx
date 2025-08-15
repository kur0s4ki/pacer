import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import InputSection from './components/InputSection';
import InputSummary from './components/InputSummary';
import HyroxRacePace from './components/HyroxRacePace';
import TrainingZones from './components/TrainingZones';
import SpeedRepetitions from './components/SpeedRepetitions';
import { calculatePaces } from '../../utils/calculator';

const RunningPaceCalculator = () => {
  const [distance, setDistance] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculation = (distanceValue) => {
    if (!distanceValue || distanceValue === '' || isNaN(distanceValue) || distanceValue <= 0) {
      setError('Please enter a valid distance in meters.');
      setResult(null);
      return;
    }

    if (distanceValue < 1000 || distanceValue > 6000) {
      setError('Please enter a valid distance in meters.');
      setResult(null);
      return;
    }

    setError('');

    // Use your exact calculator
    const calculation = calculatePaces(distanceValue);

    if (calculation.error) {
      setError(calculation.error);
      setResult(null);
    } else {
      setResult(calculation);
    }
  };

  useEffect(() => {
    if (distance && distance !== '') {
      const timeoutId = setTimeout(() => {
        handleCalculation(distance);
      }, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setError('');
      setResult(null);
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
          {result && (
            <div className="space-y-8">
              {/* Input Summary */}
              <InputSummary
                distance={distance}
                thresholdPace={result.debug.threshold_min_per_km}
                selectedBand={result.debug.band}
              />

              {/* HYROX Race Pace */}
              <HyroxRacePace hyroxPace={result.hyrox} />

              {/* Training Zones and Speed Repetitions Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <TrainingZones trainingZones={result.zones} />
                <SpeedRepetitions
                  speedRepetitionPace={result.speedReps.pace}
                  intervals={result.speedReps.intervals}
                />
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
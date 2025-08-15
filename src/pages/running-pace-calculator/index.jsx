import React, { useState } from 'react';
import InputSummary from './components/InputSummary';
import HyroxRacePace from './components/HyroxRacePace';
import TrainingZones from './components/TrainingZones';
import SpeedRepetitions from './components/SpeedRepetitions';
import { calculatePaces } from '../../utils/calculator';

const RunningPaceCalculator = () => {
  const [currentStep, setCurrentStep] = useState('intro'); // 'intro', 'input', 'loading', 'results'
  const [distance, setDistance] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleGetStarted = () => {
    setCurrentStep('input');
  };

  const handleCalculate = () => {
    if (!distance || distance === '' || isNaN(distance) || distance <= 0) {
      setError('Please enter a valid distance in meters.');
      return;
    }

    if (distance < 1000 || distance > 6000) {
      setError('Please enter a valid distance in meters.');
      return;
    }

    setError('');
    setCurrentStep('loading');

    // Simulate loading delay
    setTimeout(() => {
      const calculation = calculatePaces(distance);

      if (calculation.error) {
        setError(calculation.error);
        setResult(null);
        setCurrentStep('input');
      } else {
        setResult(calculation);
        setCurrentStep('results');
      }
    }, 1500); // 1.5 second loading delay
  };

  const handleDistanceChange = (e) => {
    setDistance(e.target.value);
    setError('');
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)' }}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">

        {/* Step 1: Introduction Page */}
        {currentStep === 'intro' && (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <div className="bg-card border border-border shadow-athletic-lg p-12 max-w-3xl mx-auto">
              <div className="mb-8">
                <div className="flex items-start space-x-8">
                  <img
                    src="/assets/images/logo.png"
                    alt="Logo"
                    className="w-32 h-32 object-contain flex-shrink-0"
                  />
                  <div className="text-left">
                    <h1 className="text-4xl font-bold text-foreground mb-6">
                      12-Minute Run Pace Calculator
                    </h1>
                    <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                      <p>
                        Welcome to the most accurate pace calculator for endurance athletes.
                        Based on your 12-minute run test results, we'll generate personalized
                        training zones and race pace recommendations.
                      </p>
                      <p>
                        Our calculator uses proven physiological formulas to determine your:
                      </p>
                      <ul className="space-y-2 ml-4">
                        <li>• <strong>HYROX Race Pace</strong> - Optimal competition pacing</li>
                        <li>• <strong>Training Zones</strong> - Base, Threshold, and VO2max paces</li>
                        <li>• <strong>Speed Repetitions</strong> - Interval training targets</li>
                      </ul>
                      <p>
                        Simply enter the maximum distance you covered in 12 minutes,
                        and we'll do the rest. Results are rounded to the nearest second
                        and mirror proven workbook formulas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button
                  onClick={handleGetStarted}
                  className="bg-primary text-primary-foreground px-8 py-4 text-lg font-semibold border border-primary hover:bg-gradient-to-r hover:from-primary hover:to-blue-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300 shadow-athletic-md"
                >
                  Let's Get Started
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Input Section */}
        {currentStep === 'input' && (
          <div className="min-h-screen flex items-center justify-center">
            <div className="bg-card border border-border shadow-athletic-lg p-8 max-w-md mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Enter Your Distance</h2>
                <p className="text-muted-foreground">
                  How far did you run in 12 minutes?
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="distance" className="block text-sm font-medium text-foreground mb-2">
                    Max Distance (m) in 12 Minutes
                  </label>
                  <input
                    id="distance"
                    type="number"
                    min="1000"
                    max="6000"
                    value={distance}
                    onChange={handleDistanceChange}
                    className="w-full px-4 py-3 border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Enter distance (1000-6000)"
                  />
                  {error && (
                    <p className="mt-2 text-sm text-error">{error}</p>
                  )}
                  <p className="mt-2 text-xs text-muted-foreground">
                    Typical range is 1000 to 6000 meters.
                  </p>
                </div>

                <button
                  onClick={handleCalculate}
                  disabled={!distance}
                  className="w-full bg-primary text-primary-foreground px-6 py-3 font-semibold border border-primary hover:bg-gradient-to-r hover:from-primary hover:to-blue-600 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none transition-all duration-300"
                >
                  Calculate
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Loading Section */}
        {currentStep === 'loading' && (
          <div className="min-h-screen flex items-center justify-center">
            <div className="bg-card border border-border shadow-athletic-lg p-12 max-w-md mx-auto text-center">
              <div className="mb-6">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Calculating Your Paces</h3>
                <p className="text-muted-foreground">
                  Analyzing your performance and generating personalized training zones...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Results Section */}
        {currentStep === 'results' && result && (
          <div className="space-y-8 py-8">
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

            {/* Re-calculate Section */}
            <div className="bg-card border border-border shadow-athletic-sm p-6 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-4">Want to Try a Different Distance?</h3>
              <div className="flex items-center justify-center space-x-4">
                <input
                  type="number"
                  min="1000"
                  max="6000"
                  value={distance}
                  onChange={handleDistanceChange}
                  className="px-4 py-2 border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter new distance"
                />
                <button
                  onClick={handleCalculate}
                  className="bg-primary text-primary-foreground px-6 py-2 font-semibold border border-primary hover:bg-gradient-to-r hover:from-primary hover:to-blue-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Recalculate
                </button>
              </div>
              {error && (
                <p className="mt-2 text-sm text-error">{error}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RunningPaceCalculator;
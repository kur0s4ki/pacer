import React, { useState } from 'react';
import InputSummary from './components/InputSummary';
import HyroxRacePace from './components/HyroxRacePace';
import TrainingZones from './components/TrainingZones';
import SpeedRepetitions from './components/SpeedRepetitions';
import { calculatePaces } from '../../utils/calculator';
import { minPerKmToMmSs } from '../../utils/calculator';

const RunningPaceCalculator = () => {
  const [currentStep, setCurrentStep] = useState('input'); // 'input', 'loading', 'results'
  const [distance, setDistance] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);



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
    <div className="min-h-screen" style={{ backgroundColor: '#F3F3F3' }}>
      <div className="container mx-auto px-0 md:px-4 md:py-8 max-w-6xl">

        {/* Input Section */}
        {currentStep === 'input' && (
          <div className="min-h-screen flex items-center justify-center md:py-8">
            <div className="bg-card border-0 md:border md:border-border shadow-none md:shadow-athletic-lg p-4 md:p-10 w-full md:max-w-2xl mx-auto min-h-screen md:min-h-0 flex flex-col justify-center md:block" style={{ borderRadius: '12px' }}>
              {/* Logo at top */}
              <div className="text-center mb-2">
                <img
                  src="/assets/images/logo.png"
                  alt="Logo"
                  className="w-48 h-24 object-contain mx-auto mb-4"
                />
                <p className="text-muted-foreground text-lg">
                  How far can you run in 12 minutes?
                </p>
              </div>

              <div className="space-y-8">
                {/* Input Field with Custom Controls */}
                <div>
                  <div className="relative">
                    <input
                      id="distance"
                      type="number"
                      min="1000"
                      max="6000"
                      value={distance}
                      onChange={handleDistanceChange}
                      className="w-full px-4 py-4 border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      style={{ borderRadius: '8px' }}
                      placeholder="Distance in m (ie: 2500)"
                    />
                  </div>
                  {error && (
                    <p className="mt-2 text-sm text-error">{error}</p>
                  )}
                </div>

                {/* Tips and Information Section */}
                <div className="bg-muted/30 border border-border/50 p-6 space-y-4" style={{ borderRadius: '12px', minWidth: '300px' }}>
                  <h3 className="text-lg font-semibold text-foreground mb-4">12-Minute Run Test Tips</h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Before the Test:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Warm up for 10-15 minutes</li>
                        <li>• Choose a flat, measured course</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-2">During the Test:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Start at a sustainable pace</li>
                        <li>• Maintain steady effort throughout</li>
                        <li>• Push harder in the final 2 minutes</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-2">For Best Results:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Use a GPS watch or track</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCalculate}
                  disabled={!distance}
                  className="w-full bg-primary text-primary-foreground px-6 py-4 text-lg font-semibold border border-primary hover:bg-gradient-to-r hover:from-primary hover:to-blue-600 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none transition-all duration-300"
                  style={{ borderRadius: '8px' }}
                >
                  Calculate My Training Paces
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Loading Section */}
        {currentStep === 'loading' && (
          <div className="min-h-screen flex items-center justify-center">
            <div className="bg-card border-0 md:border md:border-border shadow-none md:shadow-athletic-lg p-6 md:p-8 max-w-md mx-auto text-center min-h-screen md:min-h-0 flex flex-col justify-center md:block" style={{ borderRadius: '12px' }}>
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
          <div className="space-y-4 md:space-y-8 p-4 md:p-0 md:py-8">
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
                speedRepetitionPace={minPerKmToMmSs(result.debug.threshold_min_per_km)}
                intervals={result.speedReps.intervals}
              />
            </div>

            {/* Re-calculate Section */}
            <div className="bg-card border border-border shadow-athletic-sm p-6 text-center" style={{ borderRadius: '12px' }}>
              <h3 className="text-lg font-semibold text-foreground mb-4">Want to Try a Different Distance?</h3>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4">
                <input
                  type="number"
                  min="1000"
                  max="6000"
                  value={distance}
                  onChange={handleDistanceChange}
                  className="px-4 py-2 border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary w-full sm:w-auto"
                  style={{ borderRadius: '8px' }}
                  placeholder="Enter new distance"
                />
                <div className="flex space-x-3 w-full sm:w-auto">
                  <button
                    onClick={handleCalculate}
                    className="flex-1 sm:flex-none bg-primary text-primary-foreground px-6 py-2 font-semibold border border-primary hover:bg-gradient-to-r hover:from-primary hover:to-blue-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    style={{ borderRadius: '8px' }}
                  >
                    Recalculate
                  </button>

                </div>
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
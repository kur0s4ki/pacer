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
      <div className="container mx-auto md:px-4 md:py-8 max-w-6xl">

        {/* Step 1: Introduction Page */}
        {currentStep === 'intro' && (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <div className="bg-card border-0 md:border md:border-border shadow-none md:shadow-athletic-lg p-6 md:p-8 max-w-3xl mx-auto text-center min-h-screen md:min-h-0 flex flex-col justify-center md:block">
              <div className="mb-2">
                {/* Centered Logo at Top */}
                <div className="mb-8">
                  <img
                    src="/assets/images/logo.png"
                    alt="Logo"
                    className="w-4824  object-contain mx-auto"
                  />
                </div>

                {/* Centered Text Content */}
                <div className="text-justify">
                  <h1 className="text-4xl font-bold text-foreground mb-6 text-center">
                    12-Minute Run Pace Calculator
                  </h1>
                  <div className="space-y-4 text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                    <p>
                      Welcome to the most accurate pace calculator for endurance athletes.
                      Based on your 12-minute run test results, we'll generate personalized
                      training zones and race pace recommendations.
                    </p>
                    <p>
                      Our calculator uses proven physiological formulas to determine your:
                    </p>
                    <ul className="space-y-2 text-left mx-auto">
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
              <div className="text-center mt-4">
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
          <div className="min-h-screen flex items-center justify-center md:py-8">
            <div className="bg-card border-0 md:border md:border-border shadow-none md:shadow-athletic-lg p-6 md:p-10 max-w-2xl mx-auto min-h-screen md:min-h-0 flex flex-col justify-center md:block">
              {/* Logo at top */}
              <div className="text-center mb-2">
                <img
                  src="/assets/images/logo.png"
                  alt="Logo"
                  className="w-48 h-24 object-contain mx-auto mb-4"
                />
                <h2 className="text-3xl font-bold text-foreground mb-2">Enter Your Distance</h2>
                <p className="text-muted-foreground text-lg">
                  How far did you run in 12 minutes?
                </p>
              </div>

              <div className="space-y-8">
                {/* Input Field with Custom Controls */}
                <div>
                  <label htmlFor="distance" className="block text-sm font-medium text-foreground mb-3">
                    Max Distance (m) in 12 Minutes
                  </label>
                  <div className="relative">
                    <input
                      id="distance"
                      type="number"
                      min="1000"
                      max="6000"
                      value={distance}
                      onChange={handleDistanceChange}
                      className="w-full px-4 py-4 pr-32 border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="Enter distance (1000-6000)"
                    />
                    {/* Custom Controls */}
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                      <button
                        type="button"
                        onClick={() => {
                          const newValue = Math.max(1000, (parseInt(distance) || 0) - 50);
                          setDistance(newValue.toString());
                          setError('');
                        }}
                        className="w-8 h-8 bg-muted hover:bg-muted/80 border border-border text-foreground font-bold text-sm hover:shadow-md transition-all duration-200 flex items-center justify-center"
                        title="Decrease by 50m"
                      >
                        −
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const newValue = Math.min(6000, (parseInt(distance) || 0) + 50);
                          setDistance(newValue.toString());
                          setError('');
                        }}
                        className="w-8 h-8 bg-muted hover:bg-muted/80 border border-border text-foreground font-bold text-sm hover:shadow-md transition-all duration-200 flex items-center justify-center"
                        title="Increase by 50m"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setDistance('');
                          setError('');
                        }}
                        className="w-8 h-8 bg-error/10 hover:bg-error/20 border border-error/30 text-error font-bold text-xs hover:shadow-md transition-all duration-200 flex items-center justify-center"
                        title="Clear field"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  {error && (
                    <p className="mt-2 text-sm text-error">{error}</p>
                  )}
                  <p className="mt-2 text-xs text-muted-foreground">
                    Typical range is 1000 to 6000 meters. Use the +/- buttons to adjust by 50m increments.
                  </p>
                </div>

                {/* Tips and Information Section */}
                <div className="bg-muted/30 border border-border/50 p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4">12-Minute Run Test Tips</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Before the Test:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Warm up for 10-15 minutes</li>
                        <li>• Choose a flat, measured course</li>
                        <li>• Avoid testing when fatigued</li>
                        <li>• Stay hydrated but don't overdrink</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-2">During the Test:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Start at a sustainable pace</li>
                        <li>• Maintain steady effort throughout</li>
                        <li>• Push harder in the final 2 minutes</li>
                        <li>• Record your exact distance</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-2">What to Expect:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Beginner: 1800-2400m</li>
                        <li>• Intermediate: 2400-3000m</li>
                        <li>• Advanced: 3000-3600m+</li>
                        <li>• Elite: 3600m+</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-2">For Best Results:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Use a GPS watch or track</li>
                        <li>• Test in similar conditions</li>
                        <li>• Retest every 6-8 weeks</li>
                        <li>• Cool down properly after</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCalculate}
                  disabled={!distance}
                  className="w-full bg-primary text-primary-foreground px-6 py-4 text-lg font-semibold border border-primary hover:bg-gradient-to-r hover:from-primary hover:to-blue-600 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none transition-all duration-300"
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
            <div className="bg-card border-0 md:border md:border-border shadow-none md:shadow-athletic-lg p-6 md:p-8 max-w-md mx-auto text-center min-h-screen md:min-h-0 flex flex-col justify-center md:block">
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
                speedRepetitionPace={result.speedReps.pace}
                intervals={result.speedReps.intervals}
              />
            </div>

            {/* Re-calculate Section */}
            <div className="bg-card border border-border shadow-athletic-sm p-6 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-4">Want to Try a Different Distance?</h3>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4">
                <input
                  type="number"
                  min="1000"
                  max="6000"
                  value={distance}
                  onChange={handleDistanceChange}
                  className="px-4 py-2 border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary w-full sm:w-auto"
                  placeholder="Enter new distance"
                />
                <div className="flex space-x-3 w-full sm:w-auto">
                  <button
                    onClick={handleCalculate}
                    className="flex-1 sm:flex-none bg-primary text-primary-foreground px-6 py-2 font-semibold border border-primary hover:bg-gradient-to-r hover:from-primary hover:to-blue-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Recalculate
                  </button>
                  <button
                    onClick={() => {
                      setCurrentStep('intro');
                      setDistance('');
                      setError('');
                      setResult(null);
                    }}
                    className="flex-1 sm:flex-none bg-secondary text-secondary-foreground px-6 py-2 font-semibold border border-secondary hover:bg-gradient-to-r hover:from-secondary hover:to-slate-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Go to Home
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
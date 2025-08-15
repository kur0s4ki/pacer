import React from 'react';
import Icon from '../../../components/AppIcon';

const InputSummary = ({ distance, thresholdPace, selectedBand }) => {
  const formatPace = (paceInMinutes) => {
    if (!paceInMinutes || isNaN(paceInMinutes)) return '--:--';
    const minutes = Math.floor(paceInMinutes);
    const seconds = Math.round((paceInMinutes - minutes) * 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  if (!distance || distance === '') {
    return null;
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-athletic-sm p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
          <Icon name="Calculator" size={20} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Input Summary</h3>
          <p className="text-sm text-muted-foreground">Your test results</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Distance Covered</p>
          <p className="text-2xl font-bold text-foreground pace-display">{distance}m</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Threshold Pace</p>
          <p className="text-2xl font-bold text-primary pace-display">{formatPace(thresholdPace)}/km</p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-muted rounded-md">
        <div className="flex items-center space-x-2">
          <Icon name="Target" size={16} className="text-accent" />
          <p className="text-xs text-muted-foreground">
            Performance Band: <span className="font-medium text-foreground">{selectedBand}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InputSummary;
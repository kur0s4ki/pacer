import React from 'react';
import Icon from '../../../components/AppIcon';

const SpeedRepetitions = ({ speedRepetitionPace }) => {
  const formatPace = (paceInMinutes) => {
    if (!paceInMinutes || isNaN(paceInMinutes)) return '--:--';
    const minutes = Math.floor(paceInMinutes);
    const seconds = Math.round((paceInMinutes - minutes) * 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  const formatTime = (timeInMinutes) => {
    if (!timeInMinutes || isNaN(timeInMinutes)) return '--:--';
    const minutes = Math.floor(timeInMinutes);
    const seconds = Math.round((timeInMinutes - minutes) * 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  const calculateIntervalTime = (distance, pacePerKm) => {
    if (!pacePerKm || isNaN(pacePerKm)) return 0;
    return (distance / 1000) * pacePerKm;
  };

  const intervals = [
    { distance: 200, label: '200m' },
    { distance: 400, label: '400m' },
    { distance: 600, label: '600m' },
    { distance: 800, label: '800m' }
  ];

  if (!speedRepetitionPace) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-athletic-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-error rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={20} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Speed Repetitions</h3>
          <p className="text-sm text-muted-foreground">Interval training targets</p>
        </div>
      </div>
      <div className="mb-6 p-4 bg-gradient-to-r from-error/10 to-error/5 rounded-lg border border-error/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Target Pace</p>
            <p className="text-2xl font-bold text-error pace-display">{formatPace(speedRepetitionPace)}/km</p>
          </div>
          <div className="w-12 h-12 bg-error/20 rounded-lg flex items-center justify-center">
            <Icon name="Target" size={24} className="text-error" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {intervals?.map((interval, index) => {
          const intervalTime = calculateIntervalTime(interval?.distance, speedRepetitionPace);
          return (
            <div key={index} className="bg-muted/50 rounded-lg p-4 text-center border border-border/50">
              <div className="text-lg font-bold text-foreground mb-1">{interval?.label}</div>
              <div className="text-2xl font-bold pace-display text-error mb-1">
                {formatTime(intervalTime)}
              </div>
              <div className="text-xs text-muted-foreground">target time</div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 p-3 bg-muted rounded-md">
        <div className="flex items-start space-x-2">
          <Icon name="Clock" size={16} className="text-warning mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            Perform these intervals with full recovery between repetitions. Start with 4-6 repetitions and build volume gradually.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpeedRepetitions;
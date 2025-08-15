import React from 'react';
import Icon from '../../../components/AppIcon';

const SpeedRepetitions = ({ speedRepetitionPace, intervals }) => {
  if (!speedRepetitionPace || !intervals) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-athletic-sm p-6 flex flex-col h-full">
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
            <p className="text-sm font-medium text-muted-foreground">Pace</p>
            <p className="text-2xl font-bold text-error pace-display">{speedRepetitionPace}</p>
          </div>
          <div className="w-12 h-12 bg-error/20 rounded-lg flex items-center justify-center">
            <Icon name="Target" size={24} className="text-error" />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto flex-grow">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Distance</th>
              <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Duration (mm:ss)</th>
            </tr>
          </thead>
          <tbody>
            {intervals?.map((interval, index) => (
              <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="py-4 px-2">
                  <div className="font-medium text-foreground text-sm">{interval?.distance}</div>
                </td>
                <td className="py-4 px-2 text-right">
                  <span className="text-lg font-bold pace-display text-foreground">
                    {interval?.duration}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
import React from 'react';
import Icon from '../../../components/AppIcon';

const TrainingZones = ({ trainingZones }) => {
  const formatPace = (paceInMinutes) => {
    if (!paceInMinutes || isNaN(paceInMinutes)) return '--:--';
    const minutes = Math.floor(paceInMinutes);
    const seconds = Math.round((paceInMinutes - minutes) * 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  const getIntensityColor = (zone) => {
    const colors = {
      'Base/Zone 2': 'bg-green-100 text-green-800 border-green-200',
      'Aerobic Threshold/VT1': 'bg-blue-100 text-blue-800 border-blue-200',
      'Sub-Threshold': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Threshold/LT2': 'bg-orange-100 text-orange-800 border-orange-200',
      'Max Aerobic Power/VO2max': 'bg-red-100 text-red-800 border-red-200',
      'Speed Repetitions': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors?.[zone] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (!trainingZones || trainingZones?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-athletic-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
          <Icon name="Activity" size={20} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Training Zones</h3>
          <p className="text-sm text-muted-foreground">Personalized pace ranges for training</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Zone</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Intensity</th>
              <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Pace/km</th>
            </tr>
          </thead>
          <tbody>
            {trainingZones?.map((zone, index) => (
              <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="py-4 px-2">
                  <div className="font-medium text-foreground text-sm">{zone?.name}</div>
                </td>
                <td className="py-4 px-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getIntensityColor(zone?.name)}`}>
                    {zone?.name?.split('/')?.[0]}
                  </span>
                </td>
                <td className="py-4 px-2 text-right">
                  <span className="text-lg font-bold pace-display text-foreground">
                    {formatPace(zone?.pace)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 p-3 bg-muted rounded-md">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-accent mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            Use these zones to structure your training sessions. Base/Zone 2 for easy runs, Threshold for tempo work, and Speed Repetitions for interval training.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrainingZones;
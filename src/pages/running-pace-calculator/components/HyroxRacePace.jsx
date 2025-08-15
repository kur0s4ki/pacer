import React from 'react';
import Icon from '../../../components/AppIcon';

const HyroxRacePace = ({ hyroxPace }) => {
  if (!hyroxPace) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-primary to-primary/80 rounded-lg shadow-athletic-lg p-6 text-white">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
          <Icon name="Trophy" size={24} color="white" />
        </div>
        <div>
          <h3 className="text-xl font-bold">HYROX Race Pace</h3>
          <p className="text-white/80 text-sm">Recommended competition pace</p>
        </div>
      </div>

      <div className="text-center py-6">
        <div className="text-5xl font-bold pace-display mb-2">
          {hyroxPace}
        </div>
        <p className="text-white/80 text-lg">per kilometer</p>
      </div>

      <div className="flex items-center justify-center space-x-2 mt-4 p-3 bg-white/10 rounded-md">
        <Icon name="Zap" size={16} color="white" />
        <p className="text-sm text-white/90">
          Average of Threshold and Sub-Threshold paces
        </p>
      </div>
    </div>
  );
};

export default HyroxRacePace;
import React from 'react';
import Icon from '../../../components/AppIcon';

const HyroxRacePace = ({ hyroxPace }) => {
  if (!hyroxPace) {
    return null;
  }

  return (
    <div className="rounded-lg shadow-athletic-lg p-6 text-black" style={{ backgroundColor: '#FFED00' }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-black/20 rounded-lg flex items-center justify-center">
            <Icon name="Trophy" size={24} color="black" />
          </div>
          <div>
            <h3 className="text-xl font-bold">HYROX Race Pace</h3>
            <p className="text-black/80 text-sm">Recommended competition pace for HYROX Single</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-5xl font-bold pace-display">
            {hyroxPace}
          </div>
          <p className="text-black/80 text-lg">per kilometer</p>
        </div>
      </div>


    </div>
  );
};

export default HyroxRacePace;
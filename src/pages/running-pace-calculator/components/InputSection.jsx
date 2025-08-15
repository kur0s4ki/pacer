import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const InputSection = ({ distance, setDistance, error }) => {
  const handleDistanceChange = (e) => {
    const value = e?.target?.value;
    // Allow empty string or valid numbers
    if (value === '' || (!isNaN(value) && parseFloat(value) >= 0)) {
      setDistance(value);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-athletic-sm p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="Timer" size={20} color="white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">12-Minute Run Test</h2>
          <p className="text-sm text-muted-foreground">Enter your maximum distance covered</p>
        </div>
      </div>
      
      <Input
        label="Distance (meters)"
        type="number"
        placeholder="e.g., 2800"
        value={distance}
        onChange={handleDistanceChange}
        error={error}
        description="Maximum distance you can run in 12 minutes"
        min="0"
        step="1"
        className="mb-2"
      />
      
      <div className="flex items-start space-x-2 mt-3 p-3 bg-muted rounded-md">
        <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
        <p className="text-xs text-muted-foreground">
          Run at maximum sustainable effort for 12 minutes and record the total distance covered in meters.
        </p>
      </div>
    </div>
  );
};

export default InputSection;
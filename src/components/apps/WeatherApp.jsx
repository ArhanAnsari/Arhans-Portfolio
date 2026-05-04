import React, { useState } from 'react';
import { Cloud, CloudRain, Wind, Droplets } from 'lucide-react';

/**
 * Weather App - System Weather Application
 */
const WeatherApp = () => {
  const [temperature] = useState(72);

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-900 dark:to-blue-700 flex items-center justify-center">
      <div className="text-center text-white">
        <Cloud size={96} className="mx-auto mb-6" />
        <div className="text-7xl font-bold mb-2">{temperature}°</div>
        <p className="text-2xl mb-8">Partly Cloudy</p>

        {/* Weather Details */}
        <div className="grid grid-cols-3 gap-6 max-w-md mx-auto bg-white/10 backdrop-blur-lg p-6 rounded-2xl">
          <div className="text-center">
            <Wind size={24} className="mx-auto mb-2" />
            <p className="text-sm opacity-75">Wind</p>
            <p className="font-semibold">12 mph</p>
          </div>
          <div className="text-center">
            <Droplets size={24} className="mx-auto mb-2" />
            <p className="text-sm opacity-75">Humidity</p>
            <p className="font-semibold">65%</p>
          </div>
          <div className="text-center">
            <CloudRain size={24} className="mx-auto mb-2" />
            <p className="text-sm opacity-75">Rain</p>
            <p className="font-semibold">10%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;

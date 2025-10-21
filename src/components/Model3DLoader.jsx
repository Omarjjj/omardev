import React from 'react';
import { Html, useProgress } from '@react-three/drei';

const Model3DLoader = () => {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Animated Spinner */}
        <div className="relative w-20 h-20">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-gray-700/30"></div>
          {/* Animated gradient ring */}
          <div className="absolute inset-0 rounded-full border-4 border-t-primary-500 border-r-purple-500 border-b-fuchsia-500 border-l-pink-500 animate-spin"></div>
          {/* Inner glow */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary-500/20 to-purple-500/20 blur-sm"></div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-64">
          {/* Progress bar container */}
          <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-gray-700/30">
            {/* Progress fill with gradient */}
            <div 
              className="h-full bg-gradient-to-r from-primary-500 via-purple-500 to-fuchsia-500 transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
          
          {/* Progress text */}
          <div className="mt-3 text-center">
            <span className="text-sm font-semibold bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
              Loading 3D Model... {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </Html>
  );
};

export default Model3DLoader;


import React from 'react';
import { FiCheck, FiCircle } from 'react-icons/fi';

interface Stage {
  id: number;
  title: string;
  description: string;
}

interface JourneyMapProps {
  stages: Stage[];
  activeStage: number;
  onStageSelect: (id: number) => void;
}

export default function JourneyMap({ stages, activeStage, onStageSelect }: JourneyMapProps) {
  const progressPercentage = (activeStage / (stages.length - 1)) * 100;

  return (
    <div className="relative w-full max-w-3xl mx-auto py-8">
      {/* Background Line */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700 -translate-y-1/2 z-0 rounded-full"></div>
      
      {/* Active Progress Line */}
      <div 
        className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 -translate-y-1/2 z-0 transition-all duration-700 ease-in-out shadow-[0_0_15px_rgba(112,0,255,0.8)] rounded-full"
        style={{ width: `${progressPercentage}%` }}
      ></div>

      {/* Nodes */}
      <div className="relative z-10 flex justify-between items-center">
        {stages.map((stage, index) => {
          const isCompleted = index < activeStage;
          const isActive = index === activeStage;
          
          return (
            <div 
              key={stage.id} 
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => onStageSelect(index)}
            >
              <div 
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                  ${isCompleted ? 'bg-cyan-900 border-2 border-cyan-400 text-cyan-400 shadow-[0_0_10px_rgba(0,212,255,0.4)]' : ''}
                  ${isActive ? 'bg-purple-900 border-2 border-purple-400 text-purple-200 shadow-[0_0_20px_rgba(112,0,255,0.6)] scale-125' : ''}
                  ${!isCompleted && !isActive ? 'bg-gray-800 border-2 border-gray-600 text-gray-500 hover:border-gray-400 group-hover:scale-110' : ''}
                `}
              >
                {isCompleted ? <FiCheck size={20} /> : <span className="font-bold">{index + 1}</span>}
              </div>
              <span className={`mt-4 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-purple-300' : 'text-gray-500 group-hover:text-gray-300'}`}>
                Step {index + 1}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

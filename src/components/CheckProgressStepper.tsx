
import React from 'react';
import { Check, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: number;
  label: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface CheckProgressStepperProps {
  steps: Step[];
  checkId?: string;
}

const CheckProgressStepper: React.FC<CheckProgressStepperProps> = ({ steps, checkId }) => {
  return (
    <div className="w-full mb-8">
      <div className="bg-slate-100 p-4 rounded-md">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-slate-800">
            {steps.find(step => step.status === 'current')?.label || 'Processing'}
          </h2>
          {checkId && (
            <div className="text-sm text-slate-600">
              Your check ID: <span className="font-medium">{checkId}</span>
            </div>
          )}
        </div>
        
        <div className="relative">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className="flex flex-col items-center relative z-10"
              >
                <div 
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center mb-1",
                    step.status === 'completed' ? "bg-teal-600 text-white" : 
                    step.status === 'current' ? "bg-blue-600 text-white border-2 border-blue-200" : 
                    "bg-slate-200 text-slate-400"
                  )}
                >
                  {step.status === 'completed' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>
                <span 
                  className={cn(
                    "text-xs font-medium",
                    step.status === 'completed' ? "text-teal-600" : 
                    step.status === 'current' ? "text-blue-600" : 
                    "text-slate-400"
                  )}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
          
          {/* Progress line */}
          <div className="absolute top-4 left-0 transform -translate-y-1/2 w-full h-[2px] bg-slate-200 z-0">
            {steps.map((step, index) => {
              if (index === steps.length - 1) return null;
              
              const width = `${100 / (steps.length - 1)}%`;
              const completed = step.status === 'completed';
              const nextCompleted = steps[index + 1]?.status === 'completed';
              
              return (
                <div 
                  key={`line-${index}`}
                  className={cn(
                    "absolute h-full",
                    completed || nextCompleted ? "bg-teal-600" : "bg-slate-200"
                  )}
                  style={{
                    left: `${(index * 100) / (steps.length - 1)}%`,
                    width
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckProgressStepper;

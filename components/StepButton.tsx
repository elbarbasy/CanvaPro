import React from 'react';
import { Icons } from '../constants';

interface StepButtonProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  isCompleted: boolean;
  isLoading: boolean;
  timer: number;
  onClick: () => void;
  disabled: boolean;
}

const StepButton: React.FC<StepButtonProps> = ({
  label,
  icon,
  isActive,
  isCompleted,
  isLoading,
  timer,
  onClick,
  disabled
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isCompleted || isLoading}
      className={`
        relative w-full py-5 px-6 rounded-2xl flex items-center justify-between transition-all duration-500
        ${isCompleted 
          ? 'bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 cursor-default shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
          : isActive && !isLoading
            ? 'bg-slate-800/50 border border-slate-700 text-white hover:border-purple-500 hover:bg-slate-800/80 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] active:scale-[0.98]' 
            : isLoading
              ? 'bg-purple-600 border border-purple-500 text-white cursor-wait'
              : 'bg-slate-900/40 border border-slate-800/50 text-slate-600 cursor-not-allowed opacity-60'}
      `}
    >
      <div className="flex items-center gap-4">
        <div className={`p-2.5 rounded-xl transition-colors duration-300 ${isCompleted ? 'bg-emerald-500/20' : isLoading ? 'bg-white/20' : 'bg-slate-800/50'}`}>
          {icon}
        </div>
        <span className="font-bold text-lg tracking-tight">{label}</span>
      </div>

      <div className="flex items-center">
        {isCompleted ? (
          <div className="flex items-center gap-2 scale-110">
            <span className="text-xs font-bold uppercase tracking-widest">Verified</span>
            <div className="p-1 bg-emerald-500 rounded-full text-slate-950">
              <Icons.Check />
            </div>
          </div>
        ) : isLoading ? (
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full border-2 border-white/20 border-t-white animate-spin" />
            <span className="font-mono text-xl font-bold tabular-nums tracking-tighter">{timer}s</span>
          </div>
        ) : (
          !disabled && (
            <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest animate-pulse">
              Start
            </div>
          )
        )}
      </div>
      
      {isLoading && (
        <div 
          className="absolute bottom-0 left-0 h-1 bg-white/40 transition-all duration-1000 ease-linear rounded-full"
          style={{ width: `${(timer / 10) * 100}%` }}
        />
      )}
    </button>
  );
};

export default StepButton;

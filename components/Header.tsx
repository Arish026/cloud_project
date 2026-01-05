
import React from 'react';

interface HeaderProps {
  onViewChange: (view: 'calculator' | 'guide' | 'resources') => void;
  currentView: 'calculator' | 'guide' | 'resources';
  onDonateClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onViewChange, currentView, onDonateClick }) => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <button 
          onClick={() => onViewChange('calculator')}
          className="flex items-center space-x-2 text-left focus:outline-none"
        >
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-900/20">
            <span className="text-white font-bold text-xl font-amiri">M</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white uppercase">MUHASIB</h1>
            <p className="text-[10px] text-emerald-500 font-medium tracking-widest uppercase -mt-1">Purify & Grow</p>
          </div>
        </button>
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => onViewChange('calculator')}
            className={`text-sm font-semibold transition-all ${currentView === 'calculator' ? 'text-emerald-400' : 'text-slate-400 hover:text-emerald-300'}`}
          >
            Calculator
          </button>
          <button 
            onClick={() => onViewChange('guide')}
            className={`text-sm font-semibold transition-all ${currentView === 'guide' ? 'text-emerald-400' : 'text-slate-400 hover:text-emerald-300'}`}
          >
            Nisab Guide
          </button>
          <button 
            onClick={() => onViewChange('resources')}
            className={`text-sm font-semibold transition-all ${currentView === 'resources' ? 'text-emerald-400' : 'text-slate-400 hover:text-emerald-300'}`}
          >
            Resources
          </button>
        </nav>
        <button 
          onClick={onDonateClick}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-emerald-900/40 transition-all transform hover:scale-105 active:scale-95"
        >
          Donate Now
        </button>
      </div>
    </header>
  );
};

export default Header;

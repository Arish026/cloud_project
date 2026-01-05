
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xl font-amiri">M</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800 uppercase">MUHASIB</h1>
            <p className="text-[10px] text-emerald-600 font-medium tracking-widest uppercase -mt-1">Islamic Zakat Calculator</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">How it Works</a>
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Nisab Guide</a>
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Resources</a>
        </nav>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-emerald-200 transition-all">
          Donate Now
        </button>
      </div>
    </header>
  );
};

export default Header;

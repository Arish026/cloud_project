
import React from 'react';
import { ZakatCalculation, IslamicNote } from '../types';

interface ResultDisplayProps {
  calculation: ZakatCalculation | null;
  note: IslamicNote | null;
  loading: boolean;
  currencySymbol: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ calculation, note, loading, currencySymbol }) => {
  if (loading) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl flex flex-col items-center justify-center space-y-4 min-h-[300px] animate-pulse">
        <div className="w-16 h-16 bg-slate-100 rounded-full"></div>
        <div className="h-4 bg-slate-100 w-48 rounded"></div>
        <div className="h-4 bg-slate-100 w-32 rounded"></div>
      </div>
    );
  }

  if (!calculation) return null;

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2">
        <h3 className="text-slate-500 font-medium uppercase tracking-wider text-xs">Result Summary</h3>
        <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold ${calculation.isApplicable ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
          {calculation.isApplicable ? 'Zakat Applicable' : 'Below Nisab'}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-4 border-y border-slate-50">
        <span className="text-slate-400 text-sm mb-1">Total Zakat Amount</span>
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold text-slate-400">{currencySymbol}</span>
          <span className="text-6xl font-black text-emerald-600">
            {calculation.zakatAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <p className="text-xs text-slate-400 font-medium uppercase mb-1">Nisab Used</p>
          <p className="font-bold text-slate-700">{currencySymbol} {calculation.nisab.toLocaleString()}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <p className="text-xs text-slate-400 font-medium uppercase mb-1">Rate Applied</p>
          <p className="font-bold text-slate-700">2.5%</p>
        </div>
      </div>

      {note && (
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 relative overflow-hidden group">
          <div className="absolute top-[-10px] right-[-10px] text-emerald-100 group-hover:text-emerald-200 transition-colors">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <p className="text-emerald-800 font-amiri text-xl italic relative z-10 leading-relaxed mb-3">
            "{note.content}"
          </p>
          {note.reference && (
            <p className="text-emerald-600 text-xs font-bold uppercase tracking-widest relative z-10">— {note.reference}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;

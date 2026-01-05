
import React from 'react';
import { GOLD_NISAB_WEIGHT } from '../constants';

const NisabGuide: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-12">
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="text-5xl font-black text-white tracking-tighter">Nisab <span className="text-emerald-500">Thresholds</span></h2>
        <p className="text-slate-400 text-lg">
          The barrier between voluntary charity and obligatory duty. 
          Understanding the minimum threshold (Nisab) for Zakat.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 p-10 rounded-[3rem] space-y-6 relative overflow-hidden group">
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-emerald-500/5 rounded-full group-hover:scale-110 transition-transform"></div>
          <div className="space-y-2 relative z-10">
            <h3 className="text-2xl font-black text-white">Gold Standard</h3>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Global Default</p>
          </div>
          <div className="py-6 border-y border-slate-800 relative z-10">
            <p className="text-6xl font-black text-emerald-500">{GOLD_NISAB_WEIGHT}g</p>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em] mt-3">24K Purity Weight</p>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed relative z-10">
            The Gold Nisab is set at 20 Mithqals. This is equivalent to approximately 87.48 grams. If your net liquid assets exceed the current market value of this weight, Zakat is due.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-10 rounded-[3rem] space-y-6 relative overflow-hidden group">
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-emerald-500/5 rounded-full group-hover:scale-110 transition-transform"></div>
          <div className="space-y-2 relative z-10">
            <h3 className="text-2xl font-black text-white">Silver Standard</h3>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Sunnah Recommendation</p>
          </div>
          <div className="py-6 border-y border-slate-800 relative z-10">
            <p className="text-6xl font-black text-emerald-500">612.36g</p>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em] mt-3">Pure Silver Weight</p>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed relative z-10">
            The Silver Nisab is set at 200 Dirhams (approx 612.36g). Many choose this lower threshold to provide more for the community, as silver's value is lower than gold's.
          </p>
        </div>
      </div>

      <section className="bg-emerald-600 rounded-[2.5rem] p-12 text-white flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 space-y-6">
          <h4 className="text-3xl font-black leading-none">The 1-Year Rule (Hawl)</h4>
          <p className="text-emerald-100/80 leading-relaxed font-medium">
            Your wealth must stay above the Nisab for an entire Lunar year (354 days). Fluctuations in the middle are okay, as long as the start and end of the year are both above the threshold.
          </p>
          <ul className="space-y-3">
             {['Calculate on the lunar calendar', 'Subtract debts & expenses', 'Include jewelry intended for savings'].map((item, i) => (
               <li key={i} className="flex items-center space-x-3 text-sm font-bold">
                 <svg className="w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                 <span>{item}</span>
               </li>
             ))}
          </ul>
        </div>
        <div className="md:w-1/2 bg-emerald-700/50 p-8 rounded-3xl border border-emerald-400/20 backdrop-blur-sm">
           <p className="font-amiri text-2xl italic leading-relaxed">
             "And establish prayer and give zakah and bow with those who bow [in worship and obedience]."
           </p>
           <p className="text-[10px] font-black tracking-widest mt-6 text-emerald-300">SURAH AL-BAQARAH — 2:43</p>
        </div>
      </section>
    </div>
  );
};

export default NisabGuide;

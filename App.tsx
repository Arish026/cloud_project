
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ResultDisplay from './components/ResultDisplay';
import NisabGuide from './components/NisabGuide';
import Resources from './components/Resources';
import DonateModal from './components/DonateModal';
import { CURRENCIES, ZAKAT_RATE, DEFAULT_NISAB_VALUE, GOLD_NISAB_WEIGHT } from './constants';
import { ZakatCalculation, IslamicNote } from './types';
import { getIslamicNote, getLiveGoldPrice } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<'calculator' | 'guide' | 'resources'>('calculator');
  const [earnings, setEarnings] = useState<string>('');
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [useLiveNisab, setUseLiveNisab] = useState(false);
  const [calculation, setCalculation] = useState<ZakatCalculation | null>(null);
  const [note, setNote] = useState<IslamicNote | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);

  const calculateZakat = useCallback(async () => {
    const val = parseFloat(earnings);
    if (isNaN(val) || val <= 0) return;

    setIsLoading(true);
    
    // Determine Nisab
    let nisab = DEFAULT_NISAB_VALUE;
    if (useLiveNisab) {
      const goldPrice = await getLiveGoldPrice(currency.code);
      nisab = goldPrice * GOLD_NISAB_WEIGHT;
    }

    const isApplicable = val >= nisab;
    const zakatAmount = isApplicable ? val * ZAKAT_RATE : 0;

    const result: ZakatCalculation = {
      earnings: val,
      nisab,
      isApplicable,
      zakatAmount,
      currency: currency.code
    };

    setCalculation(result);
    
    // Get AI Note
    const islamicNote = await getIslamicNote(zakatAmount, isApplicable);
    setNote(islamicNote);
    
    setIsLoading(false);
  }, [earnings, currency, useLiveNisab]);

  const handleReset = () => {
    setEarnings('');
    setCalculation(null);
    setNote(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#121212] text-slate-200">
      <Header currentView={view} onViewChange={setView} onDonateClick={() => setIsDonateOpen(true)} />
      
      <main className="flex-grow py-12 px-4 max-w-5xl mx-auto w-full">
        {view === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column: Input Form */}
            <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-500">
              <div className="space-y-4">
                <h2 className="text-5xl font-black text-white tracking-tighter leading-none">
                  Purify Your <br/>
                  <span className="text-emerald-500">Wealth Today.</span>
                </h2>
                <p className="text-slate-400 leading-relaxed max-w-sm">
                  Professional grade Zakat tools with live gold rates from <span className="text-emerald-500 font-bold">hamariweb.com</span>. 
                </p>
              </div>

              <div className="bg-slate-900/60 backdrop-blur-md p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Currency Selection</label>
                  <div className="grid grid-cols-5 gap-2">
                    {CURRENCIES.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => setCurrency(c)}
                        className={`py-3 rounded-xl text-xs font-black transition-all border-2 ${
                          currency.code === c.code 
                            ? 'bg-emerald-600 border-emerald-600 text-white' 
                            : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'
                        }`}
                      >
                        {c.code}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="earnings" className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                    Annual Assets & Savings
                  </label>
                  <div className="relative group">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 font-bold text-2xl group-focus-within:text-emerald-500 transition-colors">
                      {currency.symbol}
                    </span>
                    <input
                      id="earnings"
                      type="number"
                      value={earnings}
                      onChange={(e) => setEarnings(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-14 pr-6 py-5 rounded-2xl bg-slate-900/80 border-2 border-slate-800 focus:border-emerald-500 focus:bg-slate-900 outline-none text-3xl font-black text-white transition-all placeholder:text-slate-800"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-emerald-950/20 p-5 rounded-2xl border border-emerald-900/30">
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input
                      id="liveNisab"
                      type="checkbox"
                      checked={useLiveNisab}
                      onChange={(e) => setUseLiveNisab(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </div>
                  <label htmlFor="liveNisab" className="text-sm text-slate-300 font-semibold cursor-pointer">
                    Live Gold-based Nisab <span className="text-[10px] text-emerald-500 ml-1">(Fetching hamariweb...)</span>
                  </label>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={calculateZakat}
                    disabled={!earnings || isLoading}
                    className="flex-grow bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white font-black py-5 rounded-2xl shadow-xl shadow-emerald-900/20 transition-all active:scale-95 flex items-center justify-center space-x-3"
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Auditing...
                      </span>
                    ) : (
                      <>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                        <span>Calculate Now</span>
                      </>
                    )}
                  </button>
                  <button 
                    onClick={handleReset}
                    className="px-8 bg-slate-800 hover:bg-slate-700 text-slate-400 font-black rounded-2xl transition-all"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Results Display */}
            <div className="lg:sticky lg:top-24 animate-in fade-in slide-in-from-right-8 duration-500">
              {calculation ? (
                <ResultDisplay 
                  calculation={calculation} 
                  note={note} 
                  loading={isLoading} 
                  currencySymbol={currency.symbol}
                />
              ) : (
                <div className="bg-slate-900/30 border-2 border-dashed border-slate-800 rounded-[2.5rem] p-16 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center text-slate-700">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-slate-400 font-black text-xl">Ready for Audit</h3>
                    <p className="text-slate-600 max-w-xs mx-auto text-sm mt-2 font-medium">Please provide your financial data to generate a detailed Zakat breakdown.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'guide' && <NisabGuide />}
        {view === 'resources' && <Resources />}
      </main>

      <DonateModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />

      <footer className="bg-[#0c0c0c] border-t border-slate-900 py-16">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start space-x-2 text-white">
              <span className="font-amiri text-3xl">Muhasib</span>
              <span className="h-4 w-px bg-slate-800"></span>
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-emerald-500">Charcoal Edition</span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              Real-time gold fetching from market leaders. Purifying wealth for a modern Ummah.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end justify-center space-y-4">
             <div className="flex space-x-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
                <button onClick={() => setView('calculator')} className="hover:text-emerald-500 transition-colors">Audit</button>
                <button onClick={() => setView('guide')} className="hover:text-emerald-500 transition-colors">Nisab</button>
                <button onClick={() => setView('resources')} className="hover:text-emerald-500 transition-colors">Resources</button>
             </div>
             <p className="text-[10px] text-slate-700 font-bold">&copy; {new Date().getFullYear()} MUHASIB ENTERPRISE. AWS CLOUD HOSTED.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

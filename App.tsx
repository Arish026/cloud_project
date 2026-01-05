
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ResultDisplay from './components/ResultDisplay';
import { CURRENCIES, ZAKAT_RATE, DEFAULT_NISAB_VALUE, GOLD_NISAB_WEIGHT } from './constants';
import { ZakatCalculation, IslamicNote } from './types';
import { getIslamicNote, getLiveGoldPrice } from './services/geminiService';

const App: React.FC = () => {
  const [earnings, setEarnings] = useState<string>('');
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [useLiveNisab, setUseLiveNisab] = useState(false);
  const [calculation, setCalculation] = useState<ZakatCalculation | null>(null);
  const [note, setNote] = useState<IslamicNote | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-grow py-12 px-4 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Input Form */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-slate-800 tracking-tight leading-tight">
                Purify Your Wealth <br/>
                <span className="text-emerald-600">With Muhasib</span>
              </h2>
              <p className="text-slate-500 leading-relaxed max-w-md">
                Calculate your Zakat accurately based on Islamic principles. Enter your total annual savings/earnings and we'll check against the Nisab threshold.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Select Currency</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {CURRENCIES.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => setCurrency(c)}
                      className={`py-2 px-1 rounded-lg text-xs font-bold border-2 transition-all ${
                        currency.code === c.code 
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-md' 
                          : 'bg-white border-slate-100 text-slate-500 hover:border-emerald-200'
                      }`}
                    >
                      {c.code}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="earnings" className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Total Annual Wealth / Earnings
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xl group-focus-within:text-emerald-500 transition-colors">
                    {currency.symbol}
                  </span>
                  <input
                    id="earnings"
                    type="number"
                    value={earnings}
                    onChange={(e) => setEarnings(e.target.value)}
                    placeholder="e.g. 500,000"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-emerald-500 focus:bg-white outline-none text-2xl font-bold text-slate-700 transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <input
                  id="liveNisab"
                  type="checkbox"
                  checked={useLiveNisab}
                  onChange={(e) => setUseLiveNisab(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="liveNisab" className="text-sm text-slate-600 font-medium cursor-pointer">
                  Use live gold-based Nisab price (~87.48g)
                </label>
              </div>

              <div className="flex space-x-4 pt-2">
                <button
                  onClick={calculateZakat}
                  disabled={!earnings || isLoading}
                  className="flex-grow bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Calculating...
                    </span>
                  ) : 'Calculate Zakat'}
                </button>
                <button 
                  onClick={handleReset}
                  className="px-6 bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold rounded-xl transition-all"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="bg-emerald-900 text-emerald-50 p-6 rounded-2xl shadow-xl flex items-start space-x-4">
              <div className="bg-emerald-800 p-3 rounded-lg text-emerald-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-emerald-200 mb-1">What is Muhasib?</h4>
                <p className="text-sm text-emerald-100/80 leading-relaxed">
                  "Muhasib" means book-keeper or accountant in Urdu. This tool is designed to provide you with a fast, reliable, and spiritually uplifting way to manage your Zakat obligations.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Results Display */}
          <div className="lg:sticky lg:top-24">
            {calculation ? (
              <ResultDisplay 
                calculation={calculation} 
                note={note} 
                loading={isLoading} 
                currencySymbol={currency.symbol}
              />
            ) : (
              <div className="bg-slate-100/50 border-2 border-dashed border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-300 shadow-sm">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-slate-500 font-bold">Calculation Pending</h3>
                  <p className="text-slate-400 text-sm">Enter your earnings to see your Zakat summary.</p>
                </div>
              </div>
            )}

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-slate-200 rounded-xl">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Zakat Principle</h5>
                <p className="text-sm text-slate-600 font-medium">Standard rate of 2.5% applied on annual cumulative wealth above Nisab.</p>
              </div>
              <div className="p-4 bg-white border border-slate-200 rounded-xl">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Nisab Method</h5>
                <p className="text-sm text-slate-600 font-medium">Gold base: ~87.48g of gold. Silver base: ~612.36g of silver.</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-white">
            <span className="font-amiri text-2xl">Muhasib</span>
            <span className="h-4 w-px bg-slate-700"></span>
            <span className="text-xs uppercase tracking-[0.2em] font-medium">Islamic Finance</span>
          </div>
          <p className="text-sm max-w-md mx-auto">
            Providing accurate financial tools for the Ummah. Always consult with a local scholar for complex financial situations.
          </p>
          <div className="pt-4 flex justify-center space-x-6 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-emerald-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Contact</a>
          </div>
          <p className="text-[10px] pt-4 opacity-50">
            &copy; {new Date().getFullYear()} MUHASIB. All Rights Reserved. Hosted on AWS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;

import React from 'react';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-slate-900 border border-slate-700 w-full max-w-md p-8 rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center text-emerald-500 mx-auto">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </div>
          <h3 className="text-2xl font-black text-white">Give Your Zakat</h3>
          <p className="text-slate-400">Your donation supports global efforts in poverty alleviation, education, and healthcare.</p>
          
          <div className="grid grid-cols-2 gap-4 pt-4">
            <button className="bg-slate-800 border border-slate-700 py-3 rounded-xl font-bold hover:bg-slate-700">One-time</button>
            <button className="bg-emerald-600 py-3 rounded-xl font-bold hover:bg-emerald-500">Monthly</button>
          </div>
          
          <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest pt-4">Trusted by 50+ Charity Partners</p>
        </div>
      </div>
    </div>
  );
};

export default DonateModal;

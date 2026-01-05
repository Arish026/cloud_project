
import React from 'react';

const Resources: React.FC = () => {
  const links = [
    { title: "Zakat Handbook", desc: "A comprehensive guide to complex assets.", url: "#" },
    { title: "Scholar Consultations", desc: "Find a local scholar for specialized advice.", url: "#" },
    { title: "Charity Partners", desc: "Trusted organizations to distribute your Zakat.", url: "#" },
    { title: "Wealth Purification", desc: "Articles on the spiritual aspect of finances.", url: "#" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-12">
      <section className="text-center space-y-4">
        <h2 className="text-4xl font-black text-white">Educational <span className="text-emerald-500">Resources</span></h2>
        <p className="text-slate-400 max-w-2xl mx-auto">Deepen your understanding of Islamic finance and charitable obligations.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {links.map((link, i) => (
          <div key={i} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-emerald-500 transition-all group">
            <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-4 text-emerald-500 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">{link.title}</h4>
            <p className="text-sm text-slate-400 mb-4">{link.desc}</p>
            <a href={link.url} className="text-emerald-500 text-xs font-bold uppercase tracking-widest hover:text-emerald-400">View Resource &rarr;</a>
          </div>
        ))}
      </div>

      <div className="bg-emerald-900/20 border border-emerald-900 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-emerald-200">Weekly Finance Digest</h3>
          <p className="text-emerald-500/80">Get Islamic finance insights delivered to your inbox.</p>
        </div>
        <div className="flex w-full md:w-auto">
          <input type="email" placeholder="email@address.com" className="bg-slate-900 border border-slate-700 px-4 py-3 rounded-l-xl focus:outline-none focus:border-emerald-500 w-full" />
          <button className="bg-emerald-600 px-6 py-3 rounded-r-xl font-bold">Join</button>
        </div>
      </div>
    </div>
  );
};

export default Resources;

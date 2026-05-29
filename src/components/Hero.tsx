import React from 'react';
import { ChevronDown } from 'lucide-react';
import GucssaLogo from './GucssaLogo';

interface HeroProps {
  setCurrentTab: (tab: string) => void;
}

export default function Hero({ setCurrentTab }: HeroProps) {
  const stats = [
    { count: '1,500+', label: '服务常驻学者校友', enLabel: 'Scholars & Alumni' },
    { count: '20+', label: '执委会核心干部成员', enLabel: 'Executive Officers' },
    { count: '10+', label: '品牌节庆就业宣讲会', enLabel: 'Signature Events' },
    { count: '1789', label: '乔治城大学建校历史', enLabel: 'GU Established' },
  ];

  const handleScrollToContent = () => {
    const section = document.getElementById('bento-explore-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen flex flex-col items-center justify-between text-white overflow-hidden bg-[#041E42] mt-[-72px] md:mt-[-96px] pt-[72px] md:pt-[96px]">
      
      {/* Full-bleed high-end background image of Georgetown University */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src="https://lh3.googleusercontent.com/d/1-2HoqkoAqu6GgSGW2f0y4yf6Qga7f6Gy"
          alt="Georgetown Academic Healy Building"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Mockup matching deep Prussian blue gradient overlays */}
        <div className="absolute inset-0 bg-[#041E42]/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041E42] via-[#041E42]/50 to-[#041E42]/25" />
      </div>

      {/* Main hero showcase block pushed to bottom strictly according to user request */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 pb-4 flex flex-col items-center justify-end flex-grow">
        
        {/* Spacer to push content downwards to the bottom */}
        <div className="flex-grow min-h-[40px] sm:min-h-[100px]" />

        {/* Mockup exact text content with serif typography pairing - smaller size, closer to bottom, tighter tracking */}
        <div className="space-y-1 max-w-none mx-auto mb-4 mt-auto">
          <p className="text-[#C5A059] font-serif text-sm sm:text-base font-medium italic tracking-tight lowercase">
            join the
          </p>
          <h2 className="text-[13px] xs:text-[15px] sm:text-[18px] md:text-[20px] lg:text-[22px] tracking-tight font-medium text-white font-serif mx-auto leading-snug whitespace-nowrap">
            Chinese Students and Scholars Association at Georgetown University
          </h2>
        </div>

        {/* Interactive Scroll Helper indicator */}
        <button
          onClick={handleScrollToContent}
          className="flex flex-col items-center justify-center text-slate-400 hover:text-[#C5A059] transition-colors focus:outline-none cursor-pointer group pt-4"
        >
          <span className="text-[9px] font-mono tracking-widest text-slate-400 group-hover:text-[#C5A059] duration-300">
            向下滚动探索 Explore
          </span>
          <ChevronDown className="w-4 h-4 mt-1.5 animate-bounce text-slate-400 group-hover:text-[#C5A059] duration-300" />
        </button>

      </div>

      {/* Association Core Stats Section integrated inside a premium footer bar */}
      <div className="relative z-10 w-full bg-[#041E42]/95 border-t border-white/5 backdrop-blur-md py-4 sm:py-6 px-4 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-xl md:text-2xl font-black text-[#C5A059] tracking-tight">{stat.count}</div>
              <div className="text-slate-200 text-[10px] font-bold font-sans">{stat.label}</div>
              <div className="text-[8px] text-gray-400 font-mono tracking-wide uppercase">{stat.enLabel}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

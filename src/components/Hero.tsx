import React from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

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
    <div className="flex flex-col">
      {/* 1. Cinematic Hero Frame */}
      <div className="relative h-[82vh] min-h-[520px] flex items-center justify-center text-white overflow-hidden bg-[#071426]">
        
        {/* Full-bleed background image with precise vignette & micro-overlay */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src="https://lh3.googleusercontent.com/d/1-2HoqkoAqu6GgSGW2f0y4yf6Qga7f6Gy"
            alt="Georgetown Academic Healy Building"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-102 filter brightness-[0.88]"
          />
          {/* Subtle multi-layer vignette and multiplication overlay (not a flat gray bar) */}
          <div className="absolute inset-0 bg-[#071426]/50 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071426] via-[#071426]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071426]/30 via-transparent to-[#071426]/30" />
        </div>

        {/* Content Block: Ceremony details */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center h-full">
          
          <div className="space-y-4 max-w-4xl">
            {/* Italic gold editorial label */}
            <p className="text-hoya-gold font-serif text-lg sm:text-xl italic tracking-wide">
              join the
            </p>
            
            {/* Dual multilingual headings with strict block alignment */}
            <div className="w-full max-w-[285px] xs:max-w-[340px] sm:max-w-[500px] md:max-w-[620px] lg:max-w-[720px] xl:max-w-[820px] mx-auto pt-2 select-none">
              <h1 
                className="w-full text-white serif-display-zh font-semibold text-[5.5vw] xs:text-[5.2vw] sm:text-[28px] md:text-[34px] lg:text-[40px] xl:text-[46px] leading-normal mb-1"
                style={{ textAlign: 'justify', textAlignLast: 'justify' }}
              >
                乔治城大学中国学生学者联合会
              </h1>
              
              <h2 
                className="w-full text-slate-300 font-serif md:font-medium text-[1.9vw] xs:text-[1.7vw] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] uppercase leading-none tracking-normal"
                style={{ textAlign: 'justify', textAlignLast: 'justify' }}
              >
                Chinese Students and Scholars Association at Georgetown University
              </h2>
            </div>

            <div className="w-12 h-[1px] bg-hoya-gold/50 mx-auto my-6" />

            {/* Restrained elegant CTA row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setCurrentTab('guide')}
                className="px-6 py-3 bg-hoya-gold hover:bg-[#d4ad64] text-[#071426] font-medium text-[13px] tracking-wider uppercase rounded transition-all-custom duration-300 shadow-md flex items-center gap-2 group cursor-pointer"
              >
                <span>阅读新生生存指南</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={handleScrollToContent}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/40 font-medium text-[13px] tracking-wider uppercase rounded transition-all-custom duration-300 cursor-pointer"
              >
                探索大本营服务
              </button>
            </div>
          </div>

          {/* Interactive Scroll Helper Indicator */}
          <button
            onClick={handleScrollToContent}
            className="absolute bottom-6 flex flex-col items-center justify-center text-slate-400 hover:text-hoya-gold transition-colors focus:outline-none cursor-pointer group"
          >
            <span className="text-[9px] font-mono tracking-[0.25em] text-slate-400 group-hover:text-hoya-gold duration-300 uppercase">
              向下滚动 Scroll
            </span>
            <ChevronDown className="w-4 h-4 mt-1.5 animate-bounce text-slate-400 group-hover:text-hoya-gold duration-300" />
          </button>

        </div>
      </div>

      {/* 2. Association Official Stats Row directly below the cinematic hero */}
      <div className="relative z-10 w-full bg-[#071426] border-y border-hoya-gold/20 backdrop-blur-md py-8 px-4 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-1 relative group">
              {/* Vertical divider on desktop */}
              {i > 0 && (
                <span className="hidden md:block absolute left-0 top-[20%] bottom-[20%] w-[1px] bg-hoya-gold/20" />
              )}
              <div className="text-2xl md:text-3xl font-serif text-hoya-gold tracking-tight">{stat.count}</div>
              <div className="text-slate-200 text-xs font-semibold serif-display-zh">{stat.label}</div>
              <div className="text-[9px] text-slate-400 font-mono tracking-widest uppercase">{stat.enLabel}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

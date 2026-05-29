import React, { useState } from 'react';
import { Menu, X, Landmark, Compass, Calendar, MessageSquareCode, Users, HelpCircle, GraduationCap, Mail } from 'lucide-react';
import GucssaLogo from './GucssaLogo';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function Navbar({ currentTab, setCurrentTab }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const allItems = [
    { id: 'home', label: '主页', enLabel: 'Home', icon: Landmark },
    { id: 'guide', label: '新生指南', enLabel: 'Guide', icon: Compass },
    { id: 'events', label: '活动日程', enLabel: 'Events', icon: Calendar },
    { id: 'alumni', label: '校友网络', enLabel: 'Alumni', icon: GraduationCap },
    { id: 'community', label: '生活互助', enLabel: 'Community', icon: Users },
    { id: 'ai', label: '智能助手', enLabel: 'AI Assistant', icon: HelpCircle },
    { id: 'about', label: '关于我们', enLabel: 'About Us', icon: MessageSquareCode },
    { id: 'contact', label: '联系我们', enLabel: 'Contact', icon: Mail },
  ];

  // Symmetrical split-menu for perfect desktop alignment around a centered logo
  const leftItems = allItems.slice(0, 4);  // home, guide, events, alumni
  const rightItems = allItems.slice(4);   // community, ai, about, contact

  const handleTabClick = (itemId: string) => {
    if (itemId === 'contact') {
      document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCurrentTab(itemId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderTabButton = (item: typeof allItems[0], index: number, isRight: boolean) => {
    const isActive = currentTab === item.id;
    return (
      <div 
        key={item.id}
        className="flex items-center h-full whitespace-nowrap"
      >
        <button
          id={`nav-tab-${item.id}`}
          onClick={() => handleTabClick(item.id)}
          className={`relative flex flex-col items-center justify-center px-4 lg:px-6 h-full hover:bg-white/5 transition-all duration-300 group outline-none cursor-pointer whitespace-nowrap`}
        >
          <div className="flex items-center">
            <span className={`text-xs font-semibold tracking-tight transition-colors duration-300 whitespace-nowrap ${isActive ? 'text-[#C5A059]' : 'text-slate-100 group-hover:text-white'}`}>
              {item.label}
            </span>
          </div>
          <span className={`text-[8.5px] font-mono tracking-[0.1em] font-medium mt-0.5 uppercase transition-colors duration-300 whitespace-nowrap ${isActive ? 'text-[#C5A059]/90' : 'text-slate-400 group-hover:text-slate-200'}`}>
            {item.enLabel}
          </span>
          
          {/* Symmetrical luxury gold indicator line on active tabs */}
          {isActive && (
            <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#C5A059] rounded-full shadow-lg shadow-[#C5A059]/40" />
          )}
        </button>
      </div>
    );
  };

  const renderLogo = (sizeClasses: string) => {
    const logoSize = sizeClasses.includes('w-10') ? 40 : 84;
    return (
      <div 
        onClick={() => { setCurrentTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className="flex flex-col items-center justify-center cursor-pointer group select-none px-6"
        id="nav-logo-clicked"
      >
        <GucssaLogo 
          size={logoSize} 
          className="text-white filter drop-shadow hover:scale-[1.03] transition-transform duration-500" 
        />
      </div>
    );
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${
      currentTab === 'home' 
        ? 'bg-transparent text-white' 
        : 'bg-[#041E42] border-b border-[#C5A059]/30 text-white'
    }`}>
      
      {/* Background Gradient extending below the navbar to support the logos and menu items */}
      {currentTab === 'home' && (
        <div 
          className="absolute inset-x-0 top-0 z-[-1] pointer-events-none transition-all duration-500 h-[82px] md:h-[112px]"
          style={{ 
            backgroundImage: 'linear-gradient(to bottom, #041E42 0%, #041E42 82%, rgba(4, 30, 66, 0.5) 92%, transparent 100%)'
          }} 
        />
      )}
      
      {/* Absolute master premium slim luxury gold runner accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop Split-Menu Layout (Logo Center, Tabs on Left and Right) with high-end architecture lines */}
        <div className="hidden md:flex items-center justify-between h-24">
          
          {/* Left Menu Segment */}
          <div className="flex items-center justify-end flex-1 h-full whitespace-nowrap">
            {leftItems.map((item, index) => renderTabButton(item, index, false))}
          </div>

          {/* Centered Logo Segment */}
          <div className="flex-none flex justify-center items-center min-w-[200px] h-full">
            {renderLogo("w-16 h-16")}
          </div>

          {/* Right Menu Segment */}
          <div className="flex items-center justify-start flex-1 h-full whitespace-nowrap">
            {rightItems.map((item, index) => renderTabButton(item, index, true))}
          </div>

        </div>

        {/* Mobile Navbar Layout (Standard, left aligned logo details, right hamburger) */}
        <div className="md:hidden flex items-center justify-between h-18">
          <div className="flex items-center gap-2">
            <GucssaLogo 
              size={44} 
              className="text-white filter drop-shadow" 
            />
            <div className="flex flex-col ml-1">
              <span className="text-xs font-bold text-white tracking-tight uppercase">GU CSSA 乔治城联合会</span>
              <span className="text-[8.5px] font-mono tracking-widest text-[#C5A059]/90 uppercase">Hoya Saxa</span>
            </div>
          </div>

          {/* Mobile hamburger toggle button */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 px-[7px] py-[5px] rounded border border-white/10 text-slate-300 hover:text-white focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Full Expanded Sliding Panel */}
      {mobileMenuOpen && (
        <div id="mobile-menu-panel" className="md:hidden bg-[#041E42] border-t border-white/5 shadow-2xl">
          <div className="px-3 py-4 space-y-1">
            {allItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-tab-${item.id}`}
                  onClick={() => {
                    handleTabClick(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#C5A059]/10 text-[#C5A059] border-l-4 border-[#C5A059]' 
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-100">{item.label}</div>
                      <div className="text-[9px] text-gray-400 font-mono tracking-wider uppercase">
                        {item.enLabel}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

import React, { useState } from 'react';
import { Menu, X, Globe, Mail } from 'lucide-react';
import GucssaLogo from './GucssaLogo';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function Navbar({ currentTab, setCurrentTab }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const allItems = [
    { id: 'home', label: '社群主页', enLabel: 'Home' },
    { id: 'guide', label: '新生指南', enLabel: 'Guide' },
    { id: 'events', label: '活动日程', enLabel: 'Events' },
    { id: 'alumni', label: '校友网络', enLabel: 'Alumni' },
    { id: 'community', label: '生活互助', enLabel: 'Community' },
    { id: 'ai', label: '智能助手', enLabel: 'Concierge' },
    { id: 'about', label: '关于我们', enLabel: 'About Us' },
    { id: 'contact', label: '联系我们', enLabel: 'Contact' },
  ];

  // Symmetrical split around centered logo
  const leftItems = allItems.slice(0, 4);  // Home, Guide, Events, Alumni
  const rightItems = allItems.slice(4);   // Community, Concierge, About, Contact

  const handleTabClick = (itemId: string) => {
    if (itemId === 'contact') {
      document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCurrentTab(itemId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderTabButton = (item: typeof allItems[0]) => {
    const isActive = currentTab === item.id;
    return (
      <button
        key={item.id}
        id={`nav-tab-${item.id}`}
        onClick={() => handleTabClick(item.id)}
        className="relative flex flex-col items-center justify-center px-4 lg:px-6 h-full group focus:outline-none cursor-pointer transition-colors duration-300"
      >
        <span className={`text-[13px] font-medium tracking-tight transition-colors duration-300 ${
          isActive ? 'text-hoya-gold' : 'text-slate-300 group-hover:text-hoya-ivory'
        }`}>
          {item.label}
        </span>
        <span className={`text-[9px] font-mono tracking-[0.24em] uppercase scale-90 mt-0.5 transition-colors duration-300 ${
          isActive ? 'text-hoya-gold/90' : 'text-slate-500 group-hover:text-slate-300'
        }`}>
          {item.enLabel}
        </span>
        
        {/* Understated gold line indicator */}
        <span className={`absolute bottom-0 left-4 right-4 h-[1.5px] bg-hoya-gold transition-transform duration-300 origin-center ${
          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
        }`} />
      </button>
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#071426] border-b border-hoya-gold/15 shadow-sm text-white backdrop-blur-md">
      
      {/* Top micro ribbon */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-hoya-gold/60 to-transparent" />

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop Split Navigation */}
        <div className="hidden md:flex items-center justify-between h-[84px]">
          
          {/* Left Wing */}
          <div className="flex items-center justify-end flex-1 h-full">
            {leftItems.map((item) => renderTabButton(item))}
          </div>

          {/* Centered Identity Anchor */}
          <div 
            onClick={() => { setCurrentTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex-none flex flex-col items-center justify-center cursor-pointer group select-none px-10 relative h-full"
            id="nav-logo-clicked"
          >
            {/* Fine geometric anchors represent institutional structure */}
            <span className="absolute left-0 top-[25%] bottom-[25%] w-[1px] bg-hoya-gold/20" />
            <span className="absolute right-0 top-[25%] bottom-[25%] w-[1px] bg-hoya-gold/20" />
            
            <GucssaLogo 
              size={54} 
              className="text-white hover:scale-[1.03] transition-transform duration-500" 
            />
          </div>

          {/* Right Wing */}
          <div className="flex items-center justify-start flex-1 h-full">
            {rightItems.map((item) => renderTabButton(item))}
          </div>

        </div>

        {/* Mobile Navigation Header */}
        <div className="md:hidden flex items-center justify-between h-[72px]">
          <div 
            onClick={() => { setCurrentTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <GucssaLogo size={44} className="text-white" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white tracking-widest serif-display-zh">GU CSSA 乔治城中国学联</span>
              <span className="text-[8px] font-mono tracking-[0.25em] text-hoya-gold uppercase">HOYA SAXA</span>
            </div>
          </div>

          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded border border-white/10 text-slate-300 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div id="mobile-menu-panel" className="md:hidden bg-[#071426] border-t border-hoya-gold/15 shadow-2xl">
          <div className="px-4 py-6 space-y-2">
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
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-hoya-gold/10 text-hoya-gold border-l-2 border-hoya-gold' 
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="text-sm font-medium serif-display-zh">{item.label}</span>
                  <span className="text-[9px] font-mono tracking-widest text-[#C6A15B] uppercase">
                    {item.enLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

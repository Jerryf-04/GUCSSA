import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SurvivalGuide from './components/SurvivalGuide';
import EventsBoard from './components/EventsBoard';
import CommunityHub from './components/CommunityHub';
import AiAssistant from './components/AiAssistant';
import AboutUs from './components/AboutUs';
import AlumniConnection from './components/AlumniConnection';
import { Compass, Calendar, Users, HelpCircle, ArrowRight, BookOpen, Shield } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');

  return (
    <div className="flex flex-col min-h-screen bg-[#FBF9F6] text-[#071426]">
      
      {/* Navigation Header */}
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main View Area based on Selected Navigation Tab */}
      <main className="flex-grow">
        {currentTab === 'home' && (
          <div className="space-y-20 pb-20">
            
            {/* Hero Main Presentation */}
            <Hero setCurrentTab={setCurrentTab} />

            {/* Quick Entrance Bento Grid */}
            <div id="bento-explore-section" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
              <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#C6A15B] uppercase font-semibold">
                  EXPLORE HOYA SERVICES
                </span>
                <h3 className="text-3xl font-light text-[#071426] tracking-tight serif-display-zh">
                  留美学者互助与核心服务专区
                </h3>
                <div className="w-12 h-[1px] bg-hoya-gold/50 mx-auto my-3" />
                <p className="text-[#667085] text-xs sm:text-[13px] font-normal max-w-lg mx-auto leading-relaxed">
                  点击以下专题进入专属服务版块，开启乔治城大学（GU）的新生求学和融入成长指南。
                </p>
              </div>

              {/* High-End Bento Grid (Stationery Cards) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Board 1 (Guide) */}
                <div 
                  id="bento-guide" 
                  onClick={() => setCurrentTab('guide')}
                  className="bg-white border border-[#08142c]/8 p-8 rounded-lg hover:border-[#C6A15B]/60 hover:shadow-sm transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-5">
                    <div className="w-11 h-11 rounded-full bg-[#071426]/5 text-[#C6A15B] flex items-center justify-center border border-[#08142c]/5 group-hover:bg-[#071426] group-hover:text-hoya-gold transition-colors duration-300">
                      <Compass className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-950 text-sm serif-display-zh">保姆级新生指南</h4>
                      <p className="text-[#667085] text-[12px] leading-relaxed font-normal">
                        抗体体检报告、留学签证、Duo安全认证及 Rosslyn、Glover Park 租房地段权威对比。
                      </p>
                    </div>
                  </div>
                  <div className="text-[#071426] font-semibold text-[11px] font-mono uppercase tracking-wider flex items-center justify-between mt-6 group-hover:text-[#C6A15B] transition-colors pt-3 border-t border-[#08142c]/5">
                    <span>进入阅读 Enter Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Board 2 (Events) */}
                <div 
                  id="bento-events" 
                  onClick={() => setCurrentTab('events')}
                  className="bg-white border border-[#08142c]/8 p-8 rounded-lg hover:border-[#C6A15B]/60 hover:shadow-sm transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-5">
                    <div className="w-11 h-11 rounded-full bg-[#071426]/5 text-[#C6A15B] flex items-center justify-center border border-[#08142c]/5 group-hover:bg-[#071426] group-hover:text-hoya-gold transition-colors duration-300">
                      <Calendar className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-950 text-sm serif-display-zh">校园活动与日程</h4>
                      <p className="text-[#667085] text-[12px] leading-relaxed font-normal">
                        迎新野餐BBQ、学术研讨会、中秋露天晚游园，与大华府名企和华盛顿青年智库论坛。
                      </p>
                    </div>
                  </div>
                  <div className="text-[#071426] font-semibold text-[11px] font-mono uppercase tracking-wider flex items-center justify-between mt-6 group-hover:text-[#C6A15B] transition-colors pt-3 border-t border-[#08142c]/5">
                    <span>预约席位 Browse calendar</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Board 3 (Community) */}
                <div 
                  id="bento-community" 
                  onClick={() => setCurrentTab('community')}
                  className="bg-white border border-[#08142c]/8 p-8 rounded-lg hover:border-[#C6A15B]/60 hover:shadow-sm transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-5">
                    <div className="w-11 h-11 rounded-full bg-[#071426]/5 text-[#C6A15B] flex items-center justify-center border border-[#08142c]/5 group-hover:bg-[#071426] group-hover:text-hoya-gold transition-colors duration-300">
                      <Users className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-950 text-sm serif-display-zh">生活互助交易板</h4>
                      <p className="text-[#667085] text-[12px] leading-relaxed font-normal">
                        面向校内成员的周边合租拼房招募、毕业季宜家家具折价让渡、二手教材共享交流集市。
                      </p>
                    </div>
                  </div>
                  <div className="text-[#071426] font-semibold text-[11px] font-mono uppercase tracking-wider flex items-center justify-between mt-6 group-hover:text-[#C6A15B] transition-colors pt-3 border-t border-[#08142c]/5">
                    <span>发布告示 Post notice</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Board 4 (AI Assistant) */}
                <div 
                  id="bento-ai" 
                  onClick={() => setCurrentTab('ai')}
                  className="bg-white border border-[#08142c]/8 p-8 rounded-lg hover:border-[#C6A15B]/60 hover:shadow-sm transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-5">
                    <div className="w-11 h-11 rounded-full bg-[#071426]/5 text-[#C6A15B] flex items-center justify-center border border-[#08142c]/5 group-hover:bg-[#071426] group-hover:text-hoya-gold transition-colors duration-300">
                      <HelpCircle className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-950 text-sm serif-display-zh">AI 学术智能助手</h4>
                      <p className="text-[#667085] text-[12px] leading-relaxed font-normal">
                        基于常驻专家的深度指引：帮您实时解惑GUTS班车、新生入学核验及落地DC流程。
                      </p>
                    </div>
                  </div>
                  <div className="text-[#071426] font-semibold text-[11px] font-mono uppercase tracking-wider flex items-center justify-between mt-6 group-hover:text-[#C6A15B] transition-colors pt-3 border-t border-[#08142c]/5">
                    <span>开启畅谈 Access Concierge</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </div>
            </div>

            {/* Additional informational news items at Home */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center justify-center gap-1 pb-4 mb-10 text-center">
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#C6A15B] uppercase font-semibold">
                  BULLETIN & OFFICIAL RELEASES
                </span>
                <h3 className="text-2xl font-light text-[#071426] tracking-tight serif-display-zh flex items-center gap-2.5">
                  <BookOpen className="w-4.5 h-4.5 text-[#C6A15B] stroke-[1.5]" />
                  <span>执委会官方快讯发布栏</span>
                </h3>
                <div className="w-12 h-[1px] bg-slate-200 mt-2" />
              </div>

              {/* Official Briefing Card Style */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Official Card 1 */}
                <div className="bg-[#FAF9F6] border border-[#08142c]/6 rounded p-6.5 hover:shadow-xs hover:border-[#C6A15B]/30 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <span className="text-[9px] text-[#C6A15B] font-mono tracking-widest uppercase font-bold bg-[#FAF6EE] border border-[#C6A15B]/15 px-2.5 py-1 rounded">官方迎新 ANNOUNCEMENT</span>
                    <h4 className="font-semibold text-[14px] text-gray-950 mt-1 leading-snug font-serif-zh">2026年新生官方微信大群正式组建！</h4>
                    <p className="text-[#6c727f] text-[12px] leading-relaxed font-normal">
                      本科及研究生联合会新生群、周边租房拼车小分队群已完全开启。为避免商业广告，进群需先关注微信公众号 <strong className="text-[#071426]">GU_CSSA</strong> 并发送录取信截图予小助手认证拉入。
                    </p>
                  </div>
                </div>

                {/* Official Card 2 */}
                <div className="bg-[#FAF9F6] border border-[#08142c]/6 rounded p-6.5 hover:shadow-xs hover:border-[#C6A15B]/30 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <span className="text-[9px] text-[#C6A15B] font-mono tracking-widest uppercase font-bold bg-[#FAF6EE] border border-[#C6A15B]/15 px-2.5 py-1 rounded">接机指导 VOLUNTEERS</span>
                    <h4 className="font-semibold text-[14px] text-gray-950 mt-1 leading-snug font-serif-zh">2026 年度 IAD 机场新生无忧接待指引</h4>
                    <p className="text-[#6c727f] text-[12px] leading-relaxed font-normal">
                      常务部目前正联合华府校友会拟定 8月15日 - 8月22日 杜勒斯国际机场（IAD）华人志愿者迎新登记点。免费接驳车将直达 Rosslyn 及主校区周边公寓。详情后续在此下发。
                    </p>
                  </div>
                </div>

                {/* Official Card 3 */}
                <div className="bg-[#FAF9F6] border border-[#08142c]/6 rounded p-6.5 hover:shadow-xs hover:border-[#C6A15B]/30 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <span className="text-[9px] text-[#C6A15B] font-mono tracking-widest uppercase font-bold bg-[#FAF6EE] border border-[#C6A15B]/15 px-2.5 py-1 rounded">美东网络 REGISTRY</span>
                    <h4 className="font-semibold text-[14px] text-gray-950 mt-1 leading-snug font-serif-zh">Georgetown 乔治城中国杰出校友名录</h4>
                    <p className="text-[#6c727f] text-[12px] leading-relaxed font-normal">
                      为进一步整合大华府及纽约校友网，促进学科内推及行业前沿对话。宣传发展部长期邀请各行业 Hoya 毕业生登记。欢迎将名片与求职方向发送至官方邮箱 <strong className="text-[#071426]">cssa@georgetown.edu</strong>。
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {currentTab === 'guide' && <SurvivalGuide />}
        {currentTab === 'events' && <EventsBoard />}
        {currentTab === 'alumni' && <AlumniConnection />}
        {currentTab === 'community' && <CommunityHub />}
        {currentTab === 'ai' && <AiAssistant />}
        {currentTab === 'about' && <AboutUs />}
      </main>

      {/* Institutional Elite Footer */}
      <footer className="bg-[#071426] text-[#FAF6EE] border-t border-[#C6A15B]/15 pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5 text-xs">
            
            {/* Identity column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[#C6A15B]">
                  <span className="text-[#071426] font-black font-serif text-[13px] tracking-tighter">GU</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-[13px] tracking-wider text-white">Georgetown University CSSA</span>
                  <span className="text-[8px] font-mono tracking-widest text-[#C6A15B] uppercase">乔治城中国学联</span>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed font-light text-[12px] max-w-sm">
                位于华盛顿特区的非营利性青年学者组织。我们致力于建立联结中国籍学生、学者与美东多行业领袖的官方沟通网络。
              </p>
            </div>

            {/* Pages Navigator */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="font-medium tracking-[0.16em] text-slate-300 font-mono text-[10px] uppercase border-l border-[#C6A15B] pl-2">
                俱乐部指南 DIRECTORY
              </h4>
              <div className="grid grid-cols-1 gap-2 text-slate-400 font-light text-[12px]">
                <button onClick={() => setCurrentTab('home')} className="text-left hover:text-white transition-colors duration-200">返回主页 Index</button>
                <button onClick={() => setCurrentTab('guide')} className="text-left hover:text-white transition-colors duration-200">新生指南 Survival Guide</button>
                <button onClick={() => setCurrentTab('events')} className="text-left hover:text-white transition-colors duration-200">活动日程 Cultural Calendar</button>
                <button onClick={() => setCurrentTab('alumni')} className="text-left hover:text-white transition-colors duration-200">校友网络 Hoya Network</button>
                <button onClick={() => setCurrentTab('community')} className="text-left hover:text-white transition-colors duration-200">拼房及学舍 Bulletin Board</button>
                <button onClick={() => setCurrentTab('ai')} className="text-left hover:text-white transition-colors duration-200">行政前台 Executive Desk</button>
                <button onClick={() => { setCurrentTab('about'); window.scrollTo({ top: 0 }); }} className="text-left hover:text-white transition-colors duration-200">关于组织 Leadership</button>
              </div>
            </div>

            {/* Official Credentials */}
            <div className="md:col-span-4 space-y-5 text-[12px]">
              <div className="space-y-3">
                <h4 className="font-medium tracking-[0.16em] text-slate-300 font-mono text-[10px] uppercase border-l border-[#C6A15B] pl-2">
                  数字咨询机制 CONTACT
                </h4>
                <div className="text-slate-400 space-y-2 font-light">
                  <div><span className="font-normal text-slate-300">电子邮箱:</span> cssa@georgetown.edu</div>
                  <div><span className="font-normal text-slate-300">主校校址:</span> 37th & O St NW, Washington, DC 20057</div>
                  <div><span className="font-normal text-slate-300">微信订阅:</span> GU_CSSA (官方微信服务公众号)</div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/5">
                <h4 className="font-medium tracking-[0.16em] text-slate-300 font-mono text-[10px] uppercase border-l border-[#C6A15B] pl-2">
                  驻美使馆联系 EMBASSY INFO
                </h4>
                <div className="text-slate-400 space-y-2 font-light">
                  <div><span className="font-normal text-slate-300">使馆地址:</span> 3505 International Place, N.W. Washington, D.C. 20008 U.S.A.</div>
                  <div><span className="font-normal text-slate-300">使馆电话:</span> +001-202-495-2000 <span className="text-[#C6A15B]/40 px-1">|</span> <span className="font-normal text-slate-300">传真:</span> +001-202-495-2138</div>
                  <div><span className="font-normal text-slate-300">电子邮件:</span> chinaembpress_us@mfa.gov.cn</div>
                </div>
              </div>
            </div>

          </div>

          {/* Copyrights and disclaimer */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 font-mono gap-4">
            <div>
              &copy; {new Date().getFullYear()} Georgetown University CSSA. All Rights Reserved.
            </div>
            <div className="flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded border border-white/5">
              <Shield className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span className="scale-95 leading-normal">
                本会纯属独立自制运营活动机制，保留对页面所有自研指南版权说明与免责条例之最终解释权。
              </span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

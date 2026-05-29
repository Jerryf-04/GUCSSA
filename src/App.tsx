/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SurvivalGuide from './components/SurvivalGuide';
import EventsBoard from './components/EventsBoard';
import CommunityHub from './components/CommunityHub';
import AiAssistant from './components/AiAssistant';
import AboutUs from './components/AboutUs';
import AlumniConnection from './components/AlumniConnection';
import { Compass, Calendar, Users, HelpCircle, ArrowRight, BookOpen, Shield, GraduationCap } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] md:min-w-[1200px] min-w-0">
      
      {/* Navigation Header */}
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main View Area based on Selected Navigation Tab */}
      <main className="flex-grow">
        {currentTab === 'home' && (
          <div className="space-y-16 pb-16">
            
            {/* Hero Main Presentation */}
            <Hero setCurrentTab={setCurrentTab} />

            {/* Quick Entrance Bento Grid */}
            <div id="bento-explore-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
              <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
                <h3 className="text-2xl font-extrabold text-[#041E42] tracking-tight">留英赴美互助核心服务板块</h3>
                <p className="text-gray-500 text-xs sm:text-sm font-normal">
                  点击以下专题进入专属服务专区，探索乔治城新世界的求学成长轨迹
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Block 1 */}
                <div 
                  id="bento-guide" 
                  onClick={() => setCurrentTab('guide')}
                  className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs hover:border-[#C5A059] hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-[#041E42]/5 text-[#C5A059] flex items-center justify-center">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-gray-950 text-sm">保姆级新生指南</h4>
                      <p className="text-gray-500 text-xs leading-relaxed font-normal">
                        抗体体检报告、留学签证、Duo认证及 Rosslyn、Glover Park 租房板块权威对比。
                      </p>
                    </div>
                  </div>
                  <div className="text-[#041E42] font-bold text-xs flex items-center gap-1.5 mt-4 group-hover:text-[#C5A059] transition-colors pt-2 border-t border-slate-50">
                    <span>进入阅读</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Block 2 */}
                <div 
                  id="bento-events" 
                  onClick={() => setCurrentTab('events')}
                  className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs hover:border-[#C5A059] hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-gray-950 text-sm">校园活动与赠票</h4>
                      <p className="text-gray-500 text-xs leading-relaxed font-normal">
                        迎新BBQ、学术讲坛、中秋游园Gala、以及华盛顿地区跨校咨询名企求职峰会。
                      </p>
                    </div>
                  </div>
                  <div className="text-[#041E42] font-bold text-xs flex items-center gap-1.5 mt-4 group-hover:text-[#C5A059] transition-colors pt-2 border-t border-slate-50">
                    <span>预约席位</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Block 3 */}
                <div 
                  id="bento-community" 
                  onClick={() => setCurrentTab('community')}
                  className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs hover:border-[#C5A059] hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-gray-950 text-sm">生活互助与交易</h4>
                      <p className="text-gray-500 text-xs leading-relaxed font-normal">
                        本地学者合租招新室友、毕业季宜家家具折价变现、教材拼车出行互通板。
                      </p>
                    </div>
                  </div>
                  <div className="text-[#041E42] font-bold text-xs flex items-center gap-1.5 mt-4 group-hover:text-[#C5A059] transition-colors pt-2 border-t border-slate-50">
                    <span>发布告示</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Block 4 */}
                <div 
                  id="bento-ai" 
                  onClick={() => setCurrentTab('ai')}
                  className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs hover:border-[#C5A059] hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-gray-950 text-sm">AI 迎新学长助理</h4>
                      <p className="text-gray-500 text-xs leading-relaxed font-normal">
                        智能模型帮您实时计算GUTS班车、推荐华人超市、指导国内飞美安全入境流程。
                      </p>
                    </div>
                  </div>
                  <div className="text-[#041E42] font-bold text-xs flex items-center gap-1.5 mt-4 group-hover:text-[#C5A059] transition-colors pt-2 border-t border-slate-50">
                    <span>开启畅谈</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </div>
            </div>

            {/* Additional informational news items at Home */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center gap-2 border-b border-slate-200 pb-3 mb-6">
                <BookOpen className="w-5 h-5 text-[#C5A059]" />
                <h3 className="text-lg font-bold text-[#041E42]">执委会最新快讯发布栏</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="bg-white border rounded-2xl p-5 hover:shadow-md transition">
                  <span className="text-[10px] text-[#C5A059] font-bold font-mono tracking-widest uppercase">迎新群预约</span>
                  <h4 className="font-bold text-sm text-gray-950 mt-1">2026年新生官方微信大群正式组建！</h4>
                  <p className="text-gray-500 text-xs mt-1.5 leading-relaxed font-normal">
                    本科及研究生秋期联合会新生群、周边租房拼车小分队群已完全开启，为避免非学生广告垃圾号，进群需先关注微信公众号 <strong>GU_CSSA</strong> 并发送录取信截图让小助手单独拉入。
                  </p>
                </div>

                <div className="bg-white border rounded-2xl p-5 hover:shadow-md transition">
                  <span className="text-[10px] text-[#C5A059] font-bold font-mono tracking-widest uppercase">接机互助</span>
                  <h4 className="font-bold text-sm text-gray-950 mt-1">2026 年度 IAD 机场新生接待与班车计划</h4>
                  <p className="text-gray-500 text-xs mt-1.5 leading-relaxed font-normal">
                    常务部正在联合校友会拟定 8月15日 - 8月22日 杜勒斯国际机场(IAD)留学生志愿者免费引航接机指引牌配置，大客车将开往 Rosslyn 公寓圈，详情将持续在微信推送揭晓。
                  </p>
                </div>

                <div className="bg-white border rounded-2xl p-5 hover:shadow-md transition">
                  <span className="text-[10px] text-[#C5A059] font-bold font-mono tracking-widest uppercase">校友名录</span>
                  <h4 className="font-bold text-sm text-gray-950 mt-1">Georgetown 乔治城中国杰出校友名录登记</h4>
                  <p className="text-gray-500 text-xs mt-1.5 leading-relaxed font-normal">
                    为进一步打通美东校友资源，促进校友行业跨校对接。求职宣传部长期邀请各行各业的 Georgetown Hoya 毕业生注册名录。欢迎发送名片及方向至官方邮箱 cssa@georgetown.edu！
                  </p>
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

      {/* Footer Design layout */}
      <footer className="bg-[#041E42] text-white border-t border-[#C5A059]/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-white/10 text-xs">
            
            {/* Div 1 */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-[#C5A059]">
                  <span className="text-[#041E42] font-black text-sm">GU</span>
                </div>
                <span className="font-bold tracking-tight text-white">Georgetown University CSSA</span>
              </div>
              <p className="text-gray-400 leading-relaxed font-normal">
                位于华盛顿特区的官方中国学术与留学生联合会。在这里不仅能发现求学干货，更能寻找一生的挚心朋友。Hoya Saxa!
              </p>
            </div>

            {/* Div 2 */}
            <div className="space-y-2">
              <h4 className="font-bold tracking-widest text-slate-300 font-mono text-[11px] uppercase border-l-2 border-[#C5A059] pl-2">网站板块导航</h4>
              <div className="grid grid-cols-2 gap-2 text-gray-400 font-semibold">
                <button onClick={() => setCurrentTab('home')} className="text-left hover:text-white transition">返回主页 Main</button>
                <button onClick={() => setCurrentTab('guide')} className="text-left hover:text-white transition">行前与生活 Survival</button>
                <button onClick={() => setCurrentTab('events')} className="text-left hover:text-white transition">活动看板 Calendar</button>
                <button onClick={() => setCurrentTab('alumni')} className="text-left hover:text-white transition">华府校友 Alumni</button>
                <button onClick={() => setCurrentTab('community')} className="text-left hover:text-white transition">合租闲置 Board</button>
                <button onClick={() => setCurrentTab('ai')} className="text-left hover:text-white transition">智能对话 Assistant</button>
                <button onClick={() => { setCurrentTab('about'); window.scrollTo({ top: 0 }); }} className="text-left hover:text-white transition">核心骨干 About Us</button>
              </div>
            </div>

            {/* Div 3 */}
            <div className="space-y-3 font-normal">
              <h4 className="font-bold tracking-widest text-slate-300 font-mono text-[11px] uppercase border-l-2 border-[#C5A059] pl-2">官方联系机制</h4>
              <div className="text-gray-400 space-y-1">
                <div><strong>官方邮箱</strong>: cssa@georgetown.edu</div>
                <div><strong>乔治城校址</strong>: 37th and O St NW, Washington, DC 20057</div>
                <div><strong>微信公众号账号</strong>: GU_CSSA</div>
              </div>
            </div>

          </div>

          {/* Copyrights and disclaimer */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 font-mono gap-4">
            <div>
              &copy; {new Date().getFullYear()} Georgetown University CSSA. All Rights Reserved.
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>本服务不隶属于政治立场，最终解释权归乔治城大学中国学术与学生联合会所有。</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

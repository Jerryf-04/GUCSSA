import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, CheckCircle2, QrCode, Ticket, Sparkles } from 'lucide-react';
import { CSSAEvent } from '../types';

export default function EventsBoard() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'academic' | 'social' | 'career' | 'culture'>('all');
  const [events, setEvents] = useState<CSSAEvent[]>([
    {
      id: 'event-embassy',
      title: '中国驻美大使馆「留美青年学子迎新春中秋招待座谈会」暨外交参赞面对面',
      chineseTitle: 'Chinese Embassy Welcome Reception & Diplomatic Roundtable',
      date: '2026-09-25',
      time: '2:30 PM - 5:30 PM EST',
      location: 'Embassy of the People\'s Republic of China (中国驻美大使馆大礼堂)',
      description: '由中国驻美大使馆特别指导举办的留美精英学子座谈会。GU CSSA 联合大华府地区（DMV）学界受邀代表出席。活动包含教育参赞面对面答疑、平安留学指导沙龙、传统民乐汉服展演以及高端招待自助晚宴。参会者可免费获赠使馆中秋定制流心月饼礼盒！',
      chineseDescription: 'A high-level welcome reception by the Chinese Embassy for outstanding scholars and Chinese student representatives. Enjoy roundtable chats, safety panels, and gourmet dining.',
      image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=600&q=80',
      category: 'culture'
    },
    {
      id: 'event-orientation-2026',
      title: '2026年 Georgetown CSSA 暑期中国行「三城官方行前新生会」 (北京·上海·深圳专场)',
      chineseTitle: 'GU CSSA 2026 China Summer New Student Orientation Tour',
      date: '2026-07-18',
      time: '1:30 PM - 5:00 PM (Local Time)',
      location: '北京、上海、深圳地标五星级中心会议厅 (详细选址在新生群单独下发)',
      description: '乔治城大学中国学术与学生联合会官方主办！携手乔大知名在华教授与资深北京/纽约校友，为已被2026级录取的本科、硕士、高年级研究学者和家长提供零距离行前通关讲堂：涵盖第一手抗体体检报告（SHC immunization）、留学生签证（I-20、SEVIS fee）、飞美行李必备通关名册、Rosslyn 核心房源避坑。',
      chineseDescription: 'The official pre-departure orientation in Beijing, Shanghai, and Shenzhen. Gain critical visa, housing, immune and packing guides with direct senior mentoring!',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
      category: 'academic'
    },
    {
      id: 'event-1',
      title: '2026 乔治城中国新生「华盛顿迎新野餐迎新夜」暨草地嘉年华',
      chineseTitle: 'GU CSSA Annual Welcome BBQ Picnic & Games',
      date: '2026-09-06',
      time: '11:00 AM - 3:00 PM EST',
      location: 'Georgetown Waterfront Park (乔治城河畔公园大草坪)',
      description: 'GU CSSA 年度最盛大户外迎新见面活动！品尝美味BBQ美式烧烤与中国传统卤味，结交乔治城各专业新生同学与学姐学长，体验趣味草地飞盘、丢沙包、猜灯谜等互动，更有年度重磅惊喜迎新抽奖（拍立得、苹果便携无线音箱等）等你来解锁！免费对中外学者开放。',
      chineseDescription: 'Meet up with fellow Hoyas! Enjoy a great BBQ lunch, play lawn games, participate in a lucky draw, and network with students across senior cohorts. Complete offline integration!',
      image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=600&q=80',
      category: 'social'
    },
    {
      id: 'event-2',
      title: '学长学姐保姆级「学术选课与就学指导分享会」',
      chineseTitle: 'GU CSSA Course Selection & Academic Bootcamp',
      date: '2026-08-15',
      time: '8:30 PM - 10:00 PM EST (Zoom 线上讲堂)',
      location: 'GU Canvas Portal / Zoom Webinar 线上直播',
      description: '选课在即，如何规避地雷教授？如何通过健康医疗认证与免赔（SHC Waiver）？如何高效安排 Lauinger 24小时图书馆资源？本次学术分享邀请了来自商学院、外交学院、计算机系和公共政策、经济系硕博的直系高年级学长学姐，手把手教你抢课通关秘籍，保住极佳 GPA！',
      chineseDescription: 'Exclusive insights on which courses to choose, how to waive internal health fees, and study tips for dynamic success under Hoya curriculum.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
      category: 'academic'
    },
    {
      id: 'event-3',
      title: '金秋月满 · 乔大「中秋迎新文艺晚会 & Gala 露天游园会」',
      chineseTitle: 'Mid-Autumn Festival Gala & Cultural Carnival',
      date: '2026-10-04',
      time: '6:30 PM - 9:30 PM EST',
      location: 'Gaston Hall (历史主礼堂楼) / Copley Lawn 室外大草坪',
      description: '一年一度乔治城中国传统佳节的旗舰级文化盛典！届时将邀请校内中国艺术团表演、现场古筝独奏、国潮极简乐社、经典街舞表演，配合校内金石茶道坊和手工苏式月饼免费品鉴发放。联合DC其他高校学生共同打造一场宏大浪漫的团圆视听盛宴！',
      chineseDescription: 'Indulge in classic Suzhou mooncakes, traditional folk music ensembles, street dancing and spectacular performances at the historical Gaston Hall.',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
      category: 'culture'
    },
    {
      id: 'event-4',
      title: 'Washington DC 地区留学生「秋季名企内推与咨询求职峰会」',
      chineseTitle: 'Fall Campus Networking and Career Summit',
      date: '2026-10-24',
      time: '1:00 PM - 5:00 PM EST',
      location: 'Lohrfink Auditorium (商学院地标演讲厅)',
      description: '联合知名会计事务所、管理咨询精英、精品科技大厂及华盛顿智库，为中国学者开辟独家内推通道。精选一对一英文简历现场批改（Resume Book）、无领导小组模拟面试沙龙（Mock Interview）、CPT/OPT/H1B专业律师身份讲座。全力克服行业红海，斩获首轮内推！',
      chineseDescription: 'Unlock private internship resources and dynamic career pathways. Polish your resume with senior MD consultants from tier-one firms in the District.',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80',
      category: 'career'
    }
  ]);

  const [registeredIds, setRegisteredIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('gu-cssa-registered-events');
    return saved ? JSON.parse(saved) : [];
  });

  // Ticket Modal Registration state
  const [selectedRegEvent, setSelectedRegEvent] = useState<CSSAEvent | null>(null);
  const [ticketName, setTicketName] = useState('');
  const [ticketNetid, setTicketNetid] = useState('');
  const [ticketMajor, setTicketMajor] = useState('');
  const [activeTicket, setActiveTicket] = useState<{ id: string; ticketCode: string; name: string; netid: string; major: string } | null>(null);

  useEffect(() => {
    localStorage.setItem('gu-cssa-registered-events', JSON.stringify(registeredIds));
  }, [registeredIds]);

  const handleOpenRegistration = (event: CSSAEvent) => {
    const activeRegCode = localStorage.getItem(`gu-cssa-ticket-${event.id}`);
    if (activeRegCode) {
      const ticketDetails = JSON.parse(activeRegCode);
      setActiveTicket({
        id: event.id,
        ticketCode: ticketDetails.code,
        name: ticketDetails.name,
        netid: ticketDetails.netid,
        major: ticketDetails.major
      });
    } else {
      setSelectedRegEvent(event);
      setTicketName('');
      setTicketNetid('');
      setTicketMajor('');
      setActiveTicket(null);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRegEvent) return;
    if (!ticketName.trim() || !ticketNetid.trim()) {
      alert('请填写姓名和乔大 NetID！');
      return;
    }

    const uppercaseNetID = ticketNetid.trim().toLowerCase();
    const generatedCode = `GU-CSSA-${selectedRegEvent.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const ticketInfo = {
      code: generatedCode,
      name: ticketName.trim(),
      netid: uppercaseNetID,
      major: ticketMajor.trim() || '未分类专业'
    };

    localStorage.setItem(`gu-cssa-ticket-${selectedRegEvent.id}`, JSON.stringify(ticketInfo));
    setRegisteredIds(prev => [...prev, selectedRegEvent.id]);
    
    setActiveTicket({
      id: selectedRegEvent.id,
      ticketCode: generatedCode,
      name: ticketInfo.name,
      netid: ticketInfo.netid,
      major: ticketInfo.major
    });
    setSelectedRegEvent(null);
  };

  const handleCancelTicket = (eventId: string) => {
    if (confirm('确定要取消此活动的门票预约吗？')) {
      localStorage.removeItem(`gu-cssa-ticket-${eventId}`);
      setRegisteredIds(prev => prev.filter(id => id !== eventId));
      setActiveTicket(null);
    }
  };

  const categories = [
    { id: 'all', label: '全部日程' },
    { id: 'social', label: '生活社交' },
    { id: 'academic', label: '学术辅导' },
    { id: 'culture', label: '传统文化' },
    { id: 'career', label: '职业内推' },
  ];

  const pastEvents = [
    { title: '2025年秋校行前会暨「筑梦华府 · 扬帆远航」三城行新生巡回沙龙', year: '2025 July', desc: '北京、上海、深圳联动举办。为300余名已被乔大录取的留美青年学子开展深度宣讲起航辅导。', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80' },
    { title: '2025年金秋「中秋文娱联欢夜」暨千人露天游园会', year: '2025 Sep', desc: '在 Gaston Hall 阶梯会馆拉开序幕。现场演奏丝锦汉乐、品苏州纸酥月饼，搭建美妙团聚。', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80' },
    { title: '波士顿-华盛顿常熟常青藤「美东跨校辩论精英联赛」', year: '2024 Oct', desc: '携手耶鲁、普林斯顿在希利大厅主办的高端中文辩论，深度挖掘中华思辨哲学底蕴。', img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=400&q=80' }
  ];

  const filteredEvents = activeCategory === 'all' 
    ? events 
    : events.filter(e => e.category === activeCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      
      {/* Upper banner section */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#C6A15B] uppercase font-semibold">
          GU CSSA CALENDAR & EVENTS
        </span>
        <h2 className="text-3xl font-light text-[#071426] tracking-tight serif-display-zh leading-tight">
          学联年度文化沙龙与学术日程
        </h2>
        <div className="w-12 h-[1px] bg-hoya-gold/50 mx-auto my-3" />
        <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed font-normal max-w-2xl mx-auto">
          这里有学联为您承办的全部美东常青藤官方活动。从使馆中秋晚会、名企专场内推，到户外 Waterfront Waterfront 草坪烧烤、选课指导会，我们旨在为中外学者架构卓越跨国交流平台。
        </p>
      </div>

      {/* Category Toggles and Tickets Status summary */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#08142c]/8 gap-4 mb-10 pb-4">
        <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`event-cat-tab-${cat.id}`}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4.5 py-2.5 text-xs font-medium rounded transition-all duration-200 border cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#071426] text-white border-hoya-gold/40'
                  : 'bg-white hover:bg-slate-50 text-slate-500 border-transparent hover:text-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-[#667085] font-mono uppercase tracking-wide">
          <Ticket className="w-4 h-4 text-[#C6A15B] stroke-[1.5]" />
          <span>你已预订了 <strong className="text-[#071426] font-bold">{registeredIds.length}</strong> 场活动专属入校券</span>
        </div>
      </div>

      {/* Events Listings Grid (Delicate high contrast list) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {filteredEvents.map((event) => {
          const isReg = registeredIds.includes(event.id);
          return (
            <div 
              key={event.id} 
              id={`event-card-${event.id}`}
              className="bg-white border border-[#08142c]/6 rounded overflow-hidden hover:shadow-xs transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-52 bg-slate-100 overflow-hidden">
                  <img
                    src={event.image || 'https://picsum.photos/seed/event/600/300'}
                    alt={event.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500 pointer-events-none filter brightness-95"
                  />
                  <span className={`absolute top-4 right-4 text-[9px] font-mono tracking-widest uppercase px-3 py-1.5 rounded bg-white text-[#071426] border border-[#08142c]/10 shadow-xs font-bold`}>
                    {event.category === 'social' ? '生活社交' :
                     event.category === 'academic' ? '学术研讨' :
                     event.category === 'culture' ? '文化沙龙' :
                     '名企招聘'}
                  </span>
                </div>

                <div className="p-6.5 space-y-4">
                  <div>
                    <h3 className="text-[15px] font-semibold text-slate-900 leading-snug font-serif-zh line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-[10px] text-[#C6A15B] font-mono font-medium tracking-widest uppercase mt-1">
                      {event.chineseTitle}
                    </p>
                  </div>

                  <p className="text-[12px] text-slate-500 leading-relaxed font-normal">
                    {event.description}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-500 font-sans">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#071426]/50 stroke-[1.5]" />
                      <span className="font-semibold text-gray-800">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#071426]/50 stroke-[1.5]" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#071426]/50 stroke-[1.5]" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6.5 pt-0">
                <button
                  id={`event-reg-btn-${event.id}`}
                  onClick={() => handleOpenRegistration(event)}
                  className={`w-full flex items-center justify-center gap-2.5 py-4 rounded text-xs font-mono uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                    isReg
                      ? 'bg-[#FAF9F6] text-emerald-700 border-emerald-200'
                      : 'bg-[#071426] text-white hover:bg-[#122844] shadow-xs'
                  }`}
                >
                  {isReg ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>阅读专属入场通行证 View Pass</span>
                    </>
                  ) : (
                    <>
                      <Ticket className="w-4 h-4 text-[#C6A15B]" />
                      <span>免费预约入席 Register Seat</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Core historical Event gallery flashback */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4.5 h-4.5 text-[#C6A15B] stroke-[1.5]" />
          <div>
            <h3 className="text-xl font-light text-[#071426] serif-display-zh">历代联合会精彩瞬间回顾</h3>
            <p className="text-[8px] text-slate-400 font-mono tracking-widest uppercase">Chronicle Archive Flashback</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastEvents.map((pe, idx) => (
            <div key={idx} className="bg-white border border-[#08142c]/6 rounded overflow-hidden shadow-xs">
              <div className="h-40 bg-slate-100 select-none pointer-events-none relative">
                <img 
                  src={pe.img} 
                  alt={pe.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-[0.93] grayscale-[15%]" 
                />
                <span className="absolute bottom-3 left-3 text-[8px] font-mono leading-none bg-[#071426] text-white rounded-sm px-2 py-1 font-bold">{pe.year}</span>
              </div>
              <div className="p-5 space-y-1.5">
                <h4 className="font-semibold text-slate-900 text-sm font-serif-zh leading-snug line-clamp-1">{pe.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed font-normal line-clamp-2">{pe.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ticket Booking / QR Modal Overlay */}
      {(selectedRegEvent || activeTicket) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071426]/75 backdrop-blur-xs transition-opacity overflow-y-auto">
          <div 
            id="ticket-modal-inner"
            className="bg-white rounded max-w-md w-full p-6 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto my-8"
          >
            
            {/* Booking Form Layout */}
            {selectedRegEvent && !activeTicket && (
              <form onSubmit={handleRegisterSubmit} className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2 text-[#071426]">
                    <Ticket className="w-5 h-5 text-[#C6A15B] stroke-[1.5]" />
                    <h3 className="font-semibold text-[15px] serif-display-zh">活动预约信息存栏</h3>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setSelectedRegEvent(null)}
                    className="p-1 rounded text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] text-[#667085] font-mono font-bold block uppercase tracking-wide">已选定主题 event title</span>
                  <div className="text-xs font-semibold text-[#071426] bg-[#FAF9F6] px-3.5 py-3 rounded border border-slate-200/50 leading-relaxed font-serif-zh">
                    {selectedRegEvent.title}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5 text-xs text-gray-700">
                    <label className="font-semibold text-[#071426] block">中文名或拼音姓名 * (Name)</label>
                    <input
                      type="text"
                      id="ticket-name-input"
                      required
                      value={ticketName}
                      onChange={(e) => setTicketName(e.target.value)}
                      placeholder="例: 张同学 Xiaohua"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded focus:outline-none focus:border-[#071426] text-xs placeholder-slate-400"
                    />
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-700">
                    <label className="font-semibold text-[#071426] block flex items-center justify-between">
                      <span>乔大 Hoya NetID *</span>
                      <span className="text-[9px] text-[#C6A15B] font-semibold lowercase">即GU系统邮箱前缀</span>
                    </label>
                    <input
                      type="text"
                      id="ticket-netid-input"
                      required
                      value={ticketNetid}
                      onChange={(e) => setTicketNetid(e.target.value)}
                      placeholder="例: lz99 (主校NetID)"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded focus:outline-none focus:border-[#071426] lowercase text-xs placeholder-slate-400"
                    />
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-700">
                    <label className="font-semibold text-[#071426] block">在修主学位与方向 (Major/School)</label>
                    <input
                      type="text"
                      id="ticket-major-input"
                      value={ticketMajor}
                      onChange={(e) => setTicketMajor(e.target.value)}
                      placeholder="例: SFS 外交大一 / MSB 硕士"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded focus:outline-none focus:border-[#071426] text-xs placeholder-slate-400"
                    />
                  </div>
                </div>

                <div className="bg-[#FAF9F6] rounded p-4 border border-[#C6A15B]/20 flex gap-2.5 text-xs text-amber-800 font-sans">
                  <span className="mt-px">💡</span>
                  <p className="leading-relaxed">
                    完成登记后，系统将自动在本地设备写入并派发附有专属 NetID 的动态数字通行证，供校内检票处扫描认证。
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRegEvent(null)}
                    className="w-1/3 py-2.5 border border-slate-200 text-slate-500 rounded font-bold text-xs hover:bg-slate-50 transition"
                  >
                    取消 Close
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-2.5 bg-[#071426] text-white rounded font-bold text-xs hover:bg-[#122844] transition-all"
                  >
                    派发通行证 Submit
                  </button>
                </div>
              </form>
            )}

            {/* Simulated Printed Pass State */}
            {activeTicket && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-500/10" />
                    安全登记已入册 Success
                  </span>
                  <button 
                    onClick={() => { setSelectedRegEvent(null); setActiveTicket(null); }}
                    className="p-1 rounded text-slate-400 hover:bg-slate-50 hover:text-slate-750 transition"
                  >
                    ✕
                  </button>
                </div>

                {/* Styled Intaglio High-End Engraved Pass */}
                <div className="bg-gradient-to-br from-[#071426] to-[#122844] rounded p-6 text-white text-center space-y-4 shadow-2xl border-t-4 border-[#C6A15B] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl translate-x-12 -translate-y-12 animate-pulse" />
                  
                  <div className="text-[9px] font-mono tracking-widest text-[#C6A15B] uppercase font-bold">
                    Georgetown Collegiate Pass
                  </div>

                  <div className="py-2.5 border-y border-white/5 text-xs">
                    <div className="font-semibold text-white px-2 leading-relaxed font-serif-zh limit-2-lines">
                      {events.find(e => e.id === activeTicket.id)?.title}
                    </div>
                  </div>

                  {/* Stamp QR Block */}
                  <div className="bg-white p-4 rounded inline-block shadow-lg mx-auto">
                    <QrCode className="w-32 h-32 text-gray-950 stroke-[1]" />
                    <div className="font-mono text-[9px] text-[#071426] font-semibold tracking-wider uppercase mt-2.5 select-all">
                      {activeTicket.ticketCode}
                    </div>
                  </div>

                  {/* Summary lists */}
                  <div className="grid grid-cols-2 gap-4 text-left border-t border-white/5 pt-4 text-xs">
                    <div className="space-y-0.5">
                      <span className="text-slate-400 text-[9px] font-mono uppercase">专属席位人</span>
                      <div className="font-semibold max-w-[120px] truncate">{activeTicket.name}</div>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-slate-400 text-[9px] font-mono uppercase">认证 NetID</span>
                      <div className="font-mono lowercase text-[#C6A15B] font-semibold max-w-[120px] truncate">{activeTicket.netid}</div>
                    </div>
                    <div className="space-y-0.5 col-span-2">
                      <span className="text-slate-400 text-[9px] font-mono uppercase">已挂接专业学院</span>
                      <div className="font-semibold font-serif-zh text-slate-200 truncate">{activeTicket.major || 'GU 学院代表'}</div>
                    </div>
                  </div>

                  <div className="text-[8px] text-slate-400 font-mono text-center">
                    * 凭此终端快照，请提前15分钟往指定会堂扫二维码签到
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleCancelTicket(activeTicket.id)}
                    className="w-1/2 py-2.5 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded text-xs font-bold transition"
                  >
                    取消退订门票 Void Pass
                  </button>
                  <button
                    onClick={() => { setSelectedRegEvent(null); setActiveTicket(null); }}
                    className="w-1/2 py-2.5 bg-[#071426] text-white hover:bg-[#122844] rounded text-xs font-bold transition"
                  >
                    确认返回 Confirm
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

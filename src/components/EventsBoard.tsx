import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, CheckCircle2, QrCode, Ticket, ArrowLeft, Users, Sparkles } from 'lucide-react';
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
    // Check if or already registered, display ticket immediately instead
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
    { id: 'all', label: '全部活动' },
    { id: 'social', label: '生活社交' },
    { id: 'academic', label: '学术辅导' },
    { id: 'culture', label: '传统文化' },
    { id: 'career', label: '职业内推' },
  ];

  const pastEvents = [
    { title: '2025年暑期新生行前交流会暨「筑梦华府 · 扬帆远航」三城巡回见面会', year: '2025 July', desc: '在北京、上海、深圳联动举办。为300多位留美青年学子及家长开展深度保姆级通关宣讲，搭建最早期校园伙伴及求学安全纽带。', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80' },
    { title: '2025年金秋「春晚文娱联欢会」暨千人露天包饺子中秋游园夜', year: '2025 Sep', desc: '在 Gaston Hall 与 Copley 大草坪举行。中国武术古筝展演、汉服游园体验，让每一位中外学者体验温馨非凡的中国传统文化。', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80' },
    { title: '波士顿-华盛顿常春藤「美东跨校辩论精英联赛」', year: '2024 Oct', desc: '联手普林斯顿、宾大、约翰霍普金斯举办的高规格国际赛辩论。', img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=400&q=80' }
  ];

  const filteredEvents = activeCategory === 'all' 
    ? events 
    : events.filter(e => e.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      
      {/* Upper banner section */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] font-mono bg-[#041E42]/5 px-3.5 py-1.5 rounded-full inline-block">
          GU CSSA Calendar & Events
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#041E42] tracking-tight">
          联合会年度学术与精彩文娱日程
        </h2>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
          这里汇集了 GU CSSA 专为同学们策划的全部精彩瞬间。从大型传统春晚、职业内推，到轻松的户外野餐烧烤、线上选课，我们陪伴你走过在乔治城的每一个春夏秋冬！
        </p>
      </div>

      {/* Category Toggles and Tickets Status summary */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 gap-4 mb-8 pb-4">
        <div className="flex gap-1 overflow-x-auto scrollbar-none pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`event-cat-tab-${cat.id}`}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-[#041E42] text-[#C5A059] shadow-md shadow-[#041E42]/10'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
          <Ticket className="w-4 h-4 text-[#C5A059]" />
          <span>你共预约了 <strong className="text-[#041E42]">{registeredIds.length}</strong> 场活动门票</span>
        </div>
      </div>

      {/* Events Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {filteredEvents.map((event) => {
          const isReg = registeredIds.includes(event.id);
          return (
            <div 
              key={event.id} 
              id={`event-card-${event.id}`}
              className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={event.image || 'https://picsum.photos/seed/event/600/300'}
                    alt={event.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 pointer-events-none"
                  />
                  <span className={`absolute top-4 right-4 text-[10px] font-bold tracking-widest uppercase text-white px-3 py-1 rounded-full shadow-md ${
                    event.category === 'social' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' :
                    event.category === 'academic' ? 'bg-gradient-to-r from-blue-500 to-indigo-600' :
                    event.category === 'culture' ? 'bg-gradient-to-r from-amber-500 to-orange-600' :
                    'bg-gradient-to-r from-rose-500 to-pink-600'
                  }`}>
                    {event.category === 'social' ? '社交合群' :
                     event.category === 'academic' ? '学术专题' :
                     event.category === 'culture' ? '文化盛典' :
                     '职业招聘'}
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-snug">
                      {event.title}
                    </h3>
                    <p className="text-[11px] text-[#C5A059] font-semibold font-mono uppercase tracking-wide mt-1">
                      {event.chineseTitle}
                    </p>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed font-normal">
                    {event.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#041E42]/60" />
                      <span className="font-semibold text-gray-800">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#041E42]/60" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#041E42]/60" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  id={`event-reg-btn-${event.id}`}
                  onClick={() => handleOpenRegistration(event)}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                    isReg
                      ? 'bg-slate-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-50'
                      : 'bg-[#041E42] text-white hover:bg-[#0B2545] shadow-md shadow-[#041E42]/10'
                  }`}
                >
                  {isReg ? (
                    <>
                      <CheckCircle2 className="w-4.5 h-4.5" />
                      <span>已注册，点击查看专属数字通行证</span>
                    </>
                  ) : (
                    <>
                      <Ticket className="w-4.5 h-4.5 text-[#C5A059]" />
                      <span>免费预约席位 / 抢线上电子票</span>
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
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#C5A059]" />
          <div>
            <h3 className="text-xl font-bold text-[#041E42]">历届 CSSA 精华活动回顾</h3>
            <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">Flashback Moments</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastEvents.map((pe, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200/50 rounded-2xl overflow-hidden shadow-xs hover:scale-[1.01] transition-transform duration-300">
              <div className="h-36 bg-slate-200 select-none pointer-events-none relative">
                <img 
                  src={pe.img} 
                  alt={pe.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-20" 
                />
                <span className="absolute bottom-2.5 left-2.5 text-[9px] font-mono leading-none bg-black/60 text-white rounded px-2 py-1 font-bold">{pe.year}</span>
              </div>
              <div className="p-4.5 space-y-1">
                <h4 className="font-bold text-gray-800 text-sm leading-snug line-clamp-1">{pe.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed font-normal line-clamp-2">{pe.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ticket Booking / QR Modal Overlay */}
      {(selectedRegEvent || activeTicket) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity overflow-y-auto">
          <div 
            id="ticket-modal-inner"
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto my-8"
          >
            
            {/* If Modal is in Booking Form state */}
            {selectedRegEvent && !activeTicket && (
              <form onSubmit={handleRegisterSubmit} className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2 text-[#041E42]">
                    <Ticket className="w-5 h-5 text-[#C5A059]" />
                    <h3 className="font-extrabold text-base tracking-tight">席位电子预约单</h3>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setSelectedRegEvent(null)}
                    className="p-1 rounded-full text-gray-400 hover:bg-slate-100 hover:text-gray-700 transition"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 font-mono font-bold block uppercase tracking-wide">预约活动</span>
                  <div className="text-sm font-extrabold text-[#041E42] bg-slate-50 px-3.5 py-2.5 rounded-lg border border-slate-100">
                    {selectedRegEvent.title}
                  </div>
                </div>

                <div className="space-y-3.5">
                  <div className="space-y-1.5 text-xs text-gray-700">
                    <label className="font-bold block">姓名 (中文 / 拼音) *</label>
                    <input
                      type="text"
                      id="ticket-name-input"
                      required
                      value={ticketName}
                      onChange={(e) => setTicketName(e.target.value)}
                      placeholder="例如: 张小华 Xiaohua Zhang"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-[#041E42] text-sm"
                    />
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-700">
                    <label className="font-bold block flex items-center justify-between">
                      <span>乔大 NetID *</span>
                      <span className="text-[10px] text-orange-500 font-semibold font-mono lowercase">即GU邮箱前缀</span>
                    </label>
                    <input
                      type="text"
                      id="ticket-netid-input"
                      required
                      value={ticketNetid}
                      onChange={(e) => setTicketNetid(e.target.value)}
                      placeholder="例如: xz345 (邮箱前部)"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-[#041E42] lowercase text-sm"
                    />
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-700">
                    <label className="font-bold block">就读学院与专业 (选填)</label>
                    <input
                      type="text"
                      id="ticket-major-input"
                      value={ticketMajor}
                      onChange={(e) => setTicketMajor(e.target.value)}
                      placeholder="例如: MS McCourt/SFS/商科"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-[#041E42] text-sm"
                    />
                  </div>
                </div>

                <div className="bg-amber-50 rounded-xl p-3.5 border border-amber-200/50 flex gap-2.5 text-xs text-amber-800">
                  <span className="mt-0.5 select-none">💡</span>
                  <p className="leading-relaxed">
                    凭本系统录入凭证将在您登记之后，于设备专属存储下发包含 NetID 的动态 QR Access 代码以做入场扫码验证。
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRegEvent(null)}
                    className="w-1/3 py-3 border border-slate-200 text-gray-600 rounded-xl font-bold text-xs hover:bg-slate-50 transition"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3 bg-[#041E42] text-white rounded-xl font-bold text-xs hover:bg-[#0B2545] shadow-md shadow-[#041E42]/10 transition"
                  >
                    提交并下发门票
                  </button>
                </div>
              </form>
            )}

            {/* If Modal is in Digital Ticket badge display state */}
            {activeTicket && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500/10" />
                    已为您预约成功！
                  </span>
                  <button 
                    onClick={() => { setSelectedRegEvent(null); setActiveTicket(null); }}
                    className="p-1 rounded-full text-gray-400 hover:bg-slate-100 hover:text-gray-700 transition"
                  >
                    ✕
                  </button>
                </div>

                {/* Styled Digital Passport Card Ticket */}
                <div className="bg-gradient-to-br from-[#041E42] via-[#0B2545] to-[#123057] rounded-3xl p-6 text-white text-center space-y-4 shadow-xl border-t-4 border-[#C5A059] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl translate-x-12 -translate-y-12" />
                  
                  <div className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase font-bold">
                    Georgetown CSSA Entry Pass
                  </div>

                  <div className="py-2.5 border-y border-white/10 text-xs">
                    <div className="font-semibold text-white truncate px-2">
                      {events.find(e => e.id === activeTicket.id)?.title}
                    </div>
                  </div>

                  {/* Simulated QR Code containing details */}
                  <div className="bg-white p-4.5 rounded-2xl inline-block shadow-md">
                    <div className="relative">
                      <QrCode className="w-36 h-36 text-gray-900 mx-auto" strokeWidth={1} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center border-2 border-slate-500 shadow-sm">
                          <span className="text-[10px] font-black text-slate-800 tracking-tighter">GU</span>
                        </div>
                      </div>
                    </div>
                    <div className="font-mono text-[9px] text-[#041E42] font-semibold tracking-wide uppercase mt-2 select-all">
                      {activeTicket.ticketCode}
                    </div>
                  </div>

                  {/* Registered Details */}
                  <div className="grid grid-cols-2 gap-4 text-left border-t border-white/10 pt-4.5 text-xs">
                    <div className="space-y-0.5">
                      <span className="text-gray-400 text-[10px] font-mono uppercase">登记姓名</span>
                      <div className="font-bold truncate">{activeTicket.name}</div>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-gray-400 text-[10px] font-mono uppercase">乔大 NetID</span>
                      <div className="font-bold lowercase truncate font-mono">{activeTicket.netid}</div>
                    </div>
                    <div className="space-y-0.5 col-span-2">
                      <span className="text-gray-400 text-[10px] font-mono uppercase">主修专业学院</span>
                      <div className="font-bold truncate text-[#C5A059]">{activeTicket.major || 'GU 学院'}</div>
                    </div>
                  </div>

                  <div className="text-[9px] text-gray-300 font-mono text-center">
                    * 凭此卡可在活动前15分钟入场优先兑换
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleCancelTicket(activeTicket.id)}
                    className="w-1/2 py-2.5 border border-rose-200 text-rose-500 hover:bg-rose-50 rounded-xl text-xs font-bold transition"
                  >
                    退订/取消门票
                  </button>
                  <button
                    onClick={() => { setSelectedRegEvent(null); setActiveTicket(null); }}
                    className="w-1/2 py-2.5 bg-[#041E42] text-white hover:bg-[#0B2545] rounded-xl text-xs font-bold transition"
                  >
                    完成并返回
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

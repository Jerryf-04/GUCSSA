import React, { useState } from 'react';
import { Search, GraduationCap, Briefcase, Globe, Award, Sparkles, Send } from 'lucide-react';
import { AlumProfile } from '../types';

export default function AlumniConnection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSegment, setActiveSegment] = useState<'all' | 'notable' | 'chinese'>('all');
  const [mentorSubmitted, setMentorSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', netid: '', major: '', industry: '', message: '' });

  const alumniList: AlumProfile[] = [
    // Section 1: Georgetown Notable Alums (学界政要/全球巨擘)
    {
      name: '比尔·克林顿',
      englishName: 'Bill Clinton',
      degree: 'B.S. in Foreign Service',
      year: '1968',
      school: 'School of Foreign Service (SFS外交学院)',
      role: '第42任美国总统',
      achievement: '42nd President of the United States. Founded the Clinton Foundation after his presidency, supporting global health, climate initiatives, and economic development.',
      chineseAchievement: '美国第42任总统。在校期间深造于外交学院。卸任后创立克林顿基金会，致力于全球健康合作、气候变化和经济发展。',
      image: 'https://images.unsplash.com/photo-1580129921441-8409401599a0?auto=format&fit=crop&w=300&q=80',
      category: 'notable'
    },
    {
      name: '费利佩六世',
      englishName: 'King Felipe VI of Spain',
      degree: 'Master of Science in Foreign Service (MSFS)',
      year: '1995',
      school: 'School of Foreign Service (SFS外交学院)',
      role: '现任西班牙国王',
      achievement: 'Reigning King of Spain. Attended the Master of Science in Foreign Service program at Georgetown, where he was roommates with his cousin, Crown Prince Pavlos of Greece.',
      chineseAchievement: '现任西班牙国王。在乔治城大学攻读硕士期间主修外事科学事务，与希腊王储帕夫洛斯为当时室友，具有深厚的地缘国际政治阅历。',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300&q=80',
      category: 'notable'
    },
    {
      name: '阿卜杜拉二世',
      englishName: 'King Abdullah II of Jordan',
      degree: 'SFS Fellow (International Affairs)',
      year: '1987',
      school: 'School of Foreign Service (SFS外交学院)',
      role: '现任约旦哈希姆王国国王',
      achievement: 'King of the Hashemite Kingdom of Jordan. Completed his advanced studies in international affairs at the School of Foreign Service, standardizing modern geopolitical stability.',
      chineseAchievement: '现任约旦国王。在乔治城大学外交学院完成高级国际事务学者研究，卸任后在促进中东和平与开放对话中担当核心桥梁角色。',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      category: 'notable'
    },
    {
      name: '布莱德利·库珀',
      englishName: 'Bradley Cooper',
      degree: 'B.A. in English (Honors)',
      year: '1997',
      school: 'Georgetown College of Arts & Sciences (乔治城文理学院)',
      role: '好莱坞奥斯卡金像奖提名导演 / 杰出演员',
      achievement: 'Grammy-winning and Oscar-nominated American actor and filmmaker. Graduated with honors in English from Georgetown, where he was an active member of the Hoyas rowing team.',
      chineseAchievement: '好莱坞知名制片人、奥斯卡提名导演、格莱美奖得主。以优等成绩毕业于乔治城大学英语系，在校期间亦是乔治城大学赛艇队的骨干成员。',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      category: 'notable'
    },
    {
      name: '安东宁·斯卡利亚',
      englishName: 'Antonin Scalia',
      degree: 'B.A. in History (Summa Cum Laude)',
      year: '1957',
      school: 'Georgetown College / Harvard Law School',
      role: '前美国最高法院大法官 (保守派泰斗)',
      achievement: 'Former Associate Justice of the Supreme Court of the United States. Widely considered one of the most influential jurists of the 20th century, cementing originalist philosophy.',
      chineseAchievement: '美国法律史地标性人物，前联邦最高法院大法官。毕业时荣膺乔治城大学最高荣誉毕业生（致辞代表），对20世纪美国宪法原意主义学说贡献极深。',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=300&q=80',
      category: 'notable'
    },
    {
      name: '阿伦·艾弗森',
      englishName: 'Allen Iverson',
      degree: 'Undergraduate Studies (Hall of Fame)',
      year: '1996',
      school: 'Athletics Department (乔治城梦之队)',
      role: 'NBA名人堂传奇巨星',
      achievement: 'Naismith Memorial Basketball Hall of Fame inductee, 11-time NBA All-Star, and former MVP. Played two seasons at Georgetown under legendary coach John Thompson.',
      chineseAchievement: 'NBA名人堂级传奇控卫，4次荣获常规赛得分王、11次全明星及常规赛MVP。在乔治城大学传奇教练约翰·汤普森麾下效力，缔造Hoya英雄史诗。',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
      category: 'notable'
    },

    // Section 2: Georgetown Notable Chinese Alums (华人翘楚/领袖新星)
    {
      name: '宋楚瑜',
      englishName: 'James Soong',
      degree: 'Ph.D. in Political Science',
      year: '1974',
      school: 'Graduate School of Arts and Sciences (文理研究生院)',
      role: '亲民党终身主席 / 前台湾省省长',
      achievement: 'Distinguished statesman and Chairman of the People First Party. Earned his PhD in Political Science from Georgetown, contributing heavily to political reform studies.',
      chineseAchievement: '著名两岸政治家、亲民党创始人兼终身党主席。于1974年荣获乔治城大学政治学博士学位，治学精严，长期致力于推动两岸经贸及文化繁荣合作。',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      category: 'chinese'
    },
    {
      name: '王毅',
      englishName: 'Wang Yi',
      degree: 'Visiting Scholar (SFS Fellowship)',
      year: '1998',
      school: 'School of Foreign Service (SFS外交学院)',
      role: '中国外交部部长 / 中央外办主任',
      achievement: 'Director of the Office of the Central Foreign Affairs Commission and Minister of Foreign Affairs of China. Conducted high-level diplomatic studies at SFS as a fellow in 1997-1998.',
      chineseAchievement: '现任中共中央政治局委员、中央外事工作委员会办公室主任、外交部部长。于1997至1998年作为高级访问学者在乔治城大学外交学院深造，奠定卓越的全球战略沟通视野。',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
      category: 'chinese'
    },
    {
      name: '洪小勇',
      englishName: 'Hong Xiaoyong',
      degree: 'Master of Science in Foreign Service (MSFS)',
      year: '1996',
      school: 'School of Foreign Service (SFS外交学院)',
      role: '资深大使 / 前中国驻新加坡、越南特命全权大使',
      achievement: 'Veteran Chinese senior diplomat. Graduated from Georgetown MSFS in 1996, serving as the Chinese Ambassador to Singapore and Vietnam, bolstering global diplomacy.',
      chineseAchievement: '资深中国高级外交官、前中国驻新加坡、驻越南特命全权大使。1996年从名冠世界的乔大外事硕士项目（MSFS）毕业，长期活跃于亚洲及多边核心地缘政治舞台。',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
      category: 'chinese'
    },
    {
      name: '方以伟',
      englishName: 'James Fang',
      degree: 'B.S. in Foreign Service',
      year: '1983',
      school: 'School of Foreign Service (SFS外交学院)',
      role: '前旧金山湾区捷运系统 (BART) 董事长 / 著名华裔领袖',
      achievement: 'Prominent Chinese-American civic leader. The first and longest-serving Asian-American President of the BART Board in San Francisco, championing modern public infrastructure.',
      chineseAchievement: '旧金山著名侨领。首位、亦是任职时间最长的旧金山湾区轨道交通（BART）董监会主席，生前全力支持中美人民友好艺术事业及海外中国留学生青年赋能。',
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
      category: 'chinese'
    },
    {
      name: '连惠心',
      englishName: 'Arlene Lien',
      degree: 'M.S. in Communication, Culture & Technology',
      year: '1999',
      school: 'Graduate School (CCT传播、文化与技术学院)',
      role: '台湾华语文化教育家 / 两岸传媒企业家',
      achievement: 'Educator and entrepreneur. Earned her master\'s degree from Georgetown in CCT, dedicating decades to pioneering multilingual Montessori pedagogy in the region.',
      chineseAchievement: '知名华人文化企业家、学者。连战长女。深造于乔治城大学CCT（传播、文化与技术）硕士项目，致力于将全球数字化传播与海峡两岸 Montessori 早期教育科学融合。',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      category: 'chinese'
    },
    {
      name: '王辉耀',
      englishName: 'Henry Wang Huiyao',
      degree: 'Visiting Scholar / Adjunct Professor',
      year: '2004',
      school: 'School of Foreign Service (SFS) / McCourt Policy',
      role: '全球化智库 (CCG) 理事长 / 国务院原参事',
      achievement: 'Founder and President of Center for China and Globalization (CCG). Carried out policy research as visiting research senior scholar at Georgetown, reinforcing analytical partnerships.',
      chineseAchievement: '全球化智库（CCG）创始人兼理事长、国务院原参事。曾担任乔治城大学高级访问学者。在中国智库政策研究、国际迁徙及高新技术全球化领域具有世界级权威声誉。',
      image: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&w=300&q=80',
      category: 'chinese'
    }
  ];

  const handleMentorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.netid) return;
    setMentorSubmitted(true);
    setTimeout(() => {
      setMentorSubmitted(false);
      setFormData({ name: '', netid: '', major: '', industry: '', message: '' });
    }, 4000);
  };

  const filteredAlumni = alumniList.filter((alum) => {
    const matchesSearch = 
      alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alum.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alum.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alum.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alum.chineseAchievement.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeSegment === 'all') return matchesSearch;
    return matchesSearch && alum.category === activeSegment;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 space-y-16">
      
      {/* Premium Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#C6A15B] uppercase font-semibold">
          Georgetown Alumni Network & Legacy
        </span>
        <h2 className="text-3xl font-light text-[#071426] tracking-tight serif-display-zh leading-tight">
          乔治城杰出校友与亚太事务智库
        </h2>
        <div className="w-12 h-[1px] bg-hoya-gold/50 mx-auto my-3" />
        <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed max-w-2xl mx-auto font-normal">
          「Hoya once, Hoya always.」
          自1789年建校以来，乔治城大学培养了无数在世界地缘行政、跨国商贸及中国文化领域的行业领袖。学联致力于汇集美东精英力量，在华盛顿特区官方向往来学者、学子提供一对一职业导师（Coffee Chat）及内推契机。
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-[#08142c]/8 pb-6">
        <div className="flex bg-[#FAF9F6] border border-[#08142c]/5 p-1 rounded gap-1 w-full md:w-auto">
          <button
            id="alum-tab-all"
            onClick={() => setActiveSegment('all')}
            className={`flex-1 md:flex-none px-4.5 py-2 text-xs font-medium rounded transition-all duration-300 cursor-pointer ${
              activeSegment === 'all'
                ? 'bg-[#071426] text-[#FAF6EE]'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            全部杰出校友
          </button>
          <button
            id="alum-tab-notable"
            onClick={() => setActiveSegment('notable')}
            className={`flex-1 md:flex-none px-4.5 py-2 text-xs font-medium rounded transition-all duration-300 cursor-pointer ${
              activeSegment === 'notable'
                ? 'bg-[#071426] text-[#FAF6EE]'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            全球政要巨擘
          </button>
          <button
            id="alum-tab-chinese"
            onClick={() => setActiveSegment('chinese')}
            className={`flex-1 md:flex-none px-4.5 py-2 text-xs font-medium rounded transition-all duration-300 cursor-pointer ${
              activeSegment === 'chinese'
                ? 'bg-[#071426] text-[#FAF6EE]'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            大中华区翘楚
          </button>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -convert-y -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            id="alum-search-input"
            placeholder="搜索姓名 / 拼音 / 学院 / 领域..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#08142c]/10 focus:outline-none focus:border-[#C6A15B] rounded text-xs transition duration-200 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Grid of Alumni */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAlumni.map((alum, index) => (
          <div
            key={index}
            id={`alum-card-${alum.englishName.replace(/\s+/g, '-').toLowerCase()}`}
            className="bg-white border border-[#08142c]/6 rounded p-6.5 hover:shadow-xs transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              
              {/* Profile Overview Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[9px] text-[#C6A15B] font-mono tracking-widest uppercase flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    {alum.school.includes('SFS') ? 'SFS 外交学院' : 'GRADUATE LEGACY'}
                  </span>
                  <h3 className="font-semibold text-slate-950 text-[15px] font-serif-zh tracking-tight flex items-baseline gap-1.5 flex-wrap">
                    <span>{alum.name}</span>
                    <span className="text-slate-400 font-mono text-[9px] lowercase font-normal tracking-tight">
                      {alum.englishName}
                    </span>
                  </h3>
                </div>
                <div className="font-mono text-[10px] font-semibold text-[#071426] bg-slate-100 px-2.5 py-1 rounded">
                  '{alum.year}
                </div>
              </div>

              {/* Position/Career Role Badge */}
              <div className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded bg-[#FAF9F6] border border-[#C6A15B]/20 text-[11px] font-medium text-[#C6A15B]">
                <Briefcase className="w-3.5 h-3.5" />
                <span>{alum.role}</span>
              </div>

              {/* School Details */}
              <div className="text-[11px] text-slate-400 font-mono leading-relaxed bg-[#FAF9F6]/40 p-3 border-l-2 border-[#C6A15B]/50 rounded-r">
                <div><strong>Degree:</strong> {alum.degree}</div>
                <div className="mt-1 text-slate-500"><strong>School:</strong> {alum.school}</div>
              </div>

              {/* Detail Paragraphs */}
              <div className="space-y-3.5 text-xs leading-relaxed font-normal text-slate-600">
                <p className="border-t border-slate-100 pt-3.5 italic text-slate-400 text-[11px] leading-relaxed">
                  "{alum.achievement}"
                </p>
                <p className="text-slate-800 font-medium">
                  {alum.chineseAchievement}
                </p>
              </div>
            </div>

            {/* Bottom Card Footer tag */}
            <div className="mt-6 pt-3.5 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1 font-mono uppercase text-[8px] font-bold tracking-widest text-[#C6A15B]">
                <Globe className="w-3 h-3" />
                {alum.category === 'chinese' ? 'CHINA ACCESS HUB' : 'GLOBAL LEGACY'}
              </span>
              <span className="text-slate-400 group-hover:text-[#C6A15B] transition-colors duration-200">
                Hoya Chronicle ↗
              </span>
            </div>
          </div>
        ))}

        {filteredAlumni.length === 0 && (
          <div className="col-span-full text-center py-16 bg-[#FAF9F6]/40 border rounded border-dashed border-slate-200">
            <p className="text-slate-500 text-xs font-mono uppercase tracking-wider">No matching profiles found in CSSA archive.</p>
          </div>
        )}
      </div>

      {/* Premium Connection & Mentorship Panel */}
      <div className="bg-[#071426] text-white rounded border border-[#C6A15B]/25 overflow-hidden shadow-xl mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          <div className="lg:col-span-5 p-8 lg:p-12 space-y-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-[9px] text-[#C6A15B] font-mono uppercase tracking-[0.2em] font-semibold">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                Hoya Professional Alliance
              </div>
              <h3 className="text-2xl font-light text-white tracking-tight leading-snug serif-display-zh">
                常春藤美东校友联谊计划<br />
                & 会员精英导师名录登记
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed font-normal">
                为深层赋能在美中国学者解决求职、科研、大局观认知的核心破局点，学联职业辅导部携手美东核心行业巨擘，共同发起领引人志愿计划。
              </p>
              <ul className="text-slate-300 space-y-3.5 text-xs font-normal">
                <li className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                  <span><strong>一小时校友深度咖啡辅导 (Coffee Chat)</strong>：一对一面对面解构信息差</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                  <span><strong>精选简历入库直投 (Resume Book)</strong>：打通波士顿、特区与纽约合规要地</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                  <span><strong>行业求知前沿工作坊</strong>：模拟商业案例与最高规格智库代表席位预留</span>
                </li>
              </ul>
            </div>
            
            <div className="text-[9px] text-[#8690a6] font-mono tracking-[0.15em] uppercase border-t border-white/5 pt-4 font-semibold">
              GU CSSA Career Services Division
            </div>
          </div>

          <div className="lg:col-span-7 p-8 lg:p-12 bg-white/3">
            <h4 className="font-semibold text-xs text-[#C6A15B] uppercase tracking-[0.15em] font-mono mb-6 text-center lg:text-left">
              领航员计划 - 个人诉求及简历存盘登记
            </h4>
            
            {mentorSubmitted ? (
              <div id="mentor-success-alert" className="bg-[#C6A15B]/10 border border-[#C6A15B]/30 rounded p-6.5 text-center space-y-4 my-8">
                <span className="text-2xl">🏆</span>
                <h5 className="font-semibold text-[#C6A15B] text-sm font-serif-zh">登记信息递交成功</h5>
                <p className="text-slate-300 text-[12px] leading-relaxed font-normal max-w-sm mx-auto">
                  学联职业发展部将在三个工作日内对您的 NetID 邮箱信息予以通关验证，并会在新一轮导师周开启时为您做精准的内推匹配与引介。请注意查收来邮！
                </p>
              </div>
            ) : (
              <form onSubmit={handleMentorSubmit} className="space-y-4 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-xs text-slate-300">
                    <label className="font-semibold block text-slate-200">姓名 (中文 / 英文拼音) *</label>
                    <input
                      type="text"
                      required
                      placeholder="例: 张小华 Xiaohua"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2.5 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#C6A15B] focus:bg-white/10 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-300">
                    <label className="font-semibold block text-slate-200">乔治城 NetID 邮箱前缀 *</label>
                    <input
                      type="text"
                      required
                      placeholder="例: xz123"
                      value={formData.netid}
                      onChange={(e) => setFormData({ ...formData, netid: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2.5 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#C6A15B] lowercase focus:bg-white/10 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-xs text-slate-300">
                    <label className="font-semibold block text-slate-200">所攻读学院与项目</label>
                    <input
                      type="text"
                      placeholder="例: McCourt Public Policy / SFS"
                      value={formData.major}
                      onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2.5 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#C6A15B] focus:bg-white/10 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-300">
                    <label className="font-semibold block text-slate-200">意向辅导方向</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-[#C6A15B] focus:bg-[#071426]"
                    >
                      <option value="" className="text-gray-800">选择您的专业偏向...</option>
                      <option value="diplomacy" className="text-gray-800">外交和公共政策 / 智库研究 (SFS)</option>
                      <option value="finance" className="text-gray-800">投行及商业金融 (McDonough MSB)</option>
                      <option value="tech" className="text-gray-800">量化金融与数据科学 (CS/Math)</option>
                      <option value="law" className="text-gray-800">国际法与跨国争端合规 (GU Law center)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <label className="font-semibold block text-slate-200">简述您的教育背景及当下瓶颈诉求 (150字以内)</label>
                  <textarea
                    rows={3}
                    placeholder="例如：目前在大一攻读比较外交，面临大二选课和实习储备困惑。希望有一小时咖啡辅导，请教在华府公共组织工作的华人师兄简历过关指南..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2.5 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#C6A15B] focus:bg-white/10 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 bg-[#C6A15B] hover:bg-[#d8b86a] text-[#071426] font-semibold rounded text-xs transition duration-200 cursor-pointer shadow-md"
                  >
                    <span>提交信息加入名录</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}

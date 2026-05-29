import React from 'react';
import { Mail, QrCode, Heart, Sparkles, Building2, Terminal, ShieldAlert } from 'lucide-react';

export default function AboutUs() {
  const departments = [
    {
      name: '活动与文体部 (Activity Dept)',
      desc: '负责年度旗舰项目如“金秋中秋晚会”、“春晚联谊大会”的统筹与策划；组织各类草地音乐派对、剧本杀面基以及体育篮球/足球跨校杯比赛。',
      aim: '用创意点亮 Hoya 的业余生活 💡'
    },
    {
      name: '宣传与新媒体部 (Propaganda Dept)',
      desc: '负责 CSSA 官方微信公众号（GU_CSSA）排版推文撰写、各类线下海报/邀请函视觉设计、现场单反摄影摄像以及视频混剪记录。',
      aim: '记录并传递最纯正的学子心声 📸'
    },
    {
      name: '求职与学术部 (Career & Academic)',
      desc: '建立各学科选课保姆级数据库；举办大厂内推、咨询峰会与求职讲座；对接校友圈，打通 CPT、OPT 与留美工签政策科普通道。',
      aim: '护航 Hoyas 学业，斩获首轮 Offer 🎓'
    },
    {
      name: '外联与赞助部 (Public Relations)',
      desc: '负责拓展同美国、中国知名企业的商务洽谈（如公寓、快递、律所赞助）；邀请大国企负责人出席宣讲、对接跨校代表联合组织。',
      aim: '连结华府顶级资源，为学子谋取实惠 🤝'
    },
    {
      name: '常务与后勤部 (Logistics & Treasury)',
      desc: '统筹校内 Gaston Hall 礼堂等场地预定、负责筹集迎新BBQ和日常活动的各种后勤物料配备与运输；维护执委会章程与新干部面试。',
      aim: '做组织最坚实稳当的护航壁垒 🛡️'
    },
    {
      name: '财务管理部 (Finance Dept)',
      desc: '管理 GU CSSA 全年财务收支核算；制定每次预算分配指标；审核部门报销流程并制作透明合规的学术社团决算台账。',
      aim: '精算每一笔账目，保证资金合理流向 💰'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      
      {/* Association description banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        <div className="lg:col-span-8 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] font-mono">About Georgetown CSSA</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#041E42] tracking-tight">
            关于我们：凝聚华府、服务 Hoyas 的温馨大本营
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-normal">
            乔治城大学中国学生学者联合会 (Georgetown University Chinese Students and Scholars Association, GU CSSA) 是由乔治城学子自发组织、经乔治城大学官方机构认证登记、致力于服务全校中国留学生、访问学者及华府教工的志愿者社团。
          </p>
          <p className="text-gray-600 text-sm leading-relaxed font-normal">
            我们致力于促进中美文化交流、强化在校生学术互助、连结美东名企求职网络。执委会于每学期初举行开放招新，只要你热爱社群活动、乐于助人、想锻炼个人商务PR及宣发策划技能，欢迎加入我们的大家庭！
          </p>
        </div>

        {/* WeChat Public Account Portal QR code showcase card */}
        <div className="lg:col-span-4 bg-[#041E42] rounded-3xl p-6.5 text-white border-t-4 border-[#C5A059] shadow-xl text-center space-y-4">
          <h4 className="font-bold text-sm tracking-tight text-[#C5A059]">扫描关注官方微信公众号</h4>
          
          <div className="bg-white p-3.5 rounded-2xl inline-block shadow-md">
            <QrCode className="w-40 h-40 text-gray-900 mx-auto" />
            <div className="font-mono text-[10px] text-[#041E42] font-black tracking-widest uppercase mt-2">
              ID: GU_CSSA
            </div>
          </div>

          <p className="text-[11px] text-gray-300 leading-normal">
            第一时间获取最新迎新群二维码、二手交易拼车帖、以及秋季迎新晚会免费放票指南！
          </p>
        </div>
      </div>

      {/* Departments Grid Sections */}
      <div className="space-y-6 mb-16">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#C5A059]" />
          <div>
            <h3 className="text-xl font-bold text-[#041E42]">执委会核心部门架构</h3>
            <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">Executive Committee Departments</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, i) => (
            <div 
              key={i} 
              id={`about-dept-card-${i}`}
              className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <h4 className="font-bold text-[#041E42] text-sm tracking-tight border-b border-slate-100 pb-2 flex items-center justify-between">
                  <span>{dept.name}</span>
                  <span className="text-[#C5A059]">✦</span>
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed font-normal">
                  {dept.desc}
                </p>
              </div>
              <div className="mt-4 pt-3.5 border-t border-slate-100 text-[11px] text-[#041E42] font-semibold flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500/10" />
                <span>{dept.aim}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom contact block */}
      <div className="bg-slate-50 border border-slate-250/20 rounded-3xl p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4.5 h-4.5 text-[#C5A059] animate-pulse" />
            <h4 className="font-extrabold text-[#041E42] text-base">2026 年秋季执委会招新通知</h4>
          </div>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
            招新面试将在开学迎新野餐周后的隔周展开。各大部门均提供多岗位挑战（推文编辑、晚会导演、活动常务助理）。关注学联公众号 <strong>GU_CSSA</strong> 获取推送招新报名链接，欢迎发送简历自我介绍，我们的邮箱常年为优秀学者敞开！
          </p>
        </div>

        <div className="md:col-span-4 flex justify-end">
          <a
            id="about-email-link"
            href="mailto:cssa@georgetown.edu"
            className="flex items-center gap-2.5 px-6 py-3.5 bg-[#041E42] text-white hover:bg-[#0B2545] font-bold rounded-xl text-xs shadow-lg transition duration-300"
          >
            <Mail className="w-4 h-4 text-[#C5A059]" />
            <span>发送意向至 cssa@georgetown.edu</span>
          </a>
        </div>
      </div>

    </div>
  );
}

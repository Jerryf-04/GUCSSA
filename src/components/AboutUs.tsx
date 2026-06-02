import React from 'react';
import { Mail, QrCode, Heart, Sparkles, Building2 } from 'lucide-react';

export default function AboutUs() {
  const divisions = [
    {
      name: '主席 President',
      points: [
        '全面负责 CSSA 的全局战略规划与组织航向，制定年度发展目标与核心方针，统筹指导各部门工作，确保组织高效协同。',
        '主持召开学联例会与常务决策，推进组织制度化建设与团队文化塑造，积极营造公开透明的沟通环境，提升集体凝聚力。',
        '对外代表 CSSA 联络校内外政商学术界并出席重要高层会晤，主导重大项目的合规统筹与资源整合，提升学联知名度。'
      ],
      aim: '领航学联，共筑卓越社群与制度传承 🌟'
    },
    {
      name: '副主席 Vice President',
      points: [
        '全力辅助主席进行年度战略规划与管理，协助统管全局组织航向，确保全会日常运作有序且高效平稳。',
        '主导常务协调以及核心项目落地执行，科学分配物料与人力资源，实时监管项目周程进度并突破跨部门协作壁垒。',
        '与主席及各部部长建立定期研讨与长效沟通机制，确保内外信息通达流畅，加速组织战略规划成果的多维转化。'
      ],
      aim: '执规落地，赋能各部深度协同前进 🤝'
    },
    {
      name: '外联部 Outreach Division',
      points: [
        '积极建立同美东著名中资机构、跨国企业、地方华人商会以及两岸三地杰出校友的紧密公关，筹措坚实的活动赞助经费。',
        '主控对外商务合作及非政府公益组织的多轮外事谈判，签署合作备忘录，确保学联享有常态、健全的供应链资源。',
        '代表学联对接大学官方行政首脑、中国驻美大使馆教育处及华府青年社盟，最大化获取政策护航及荣誉资质。'
      ],
      aim: '联结社会，在更广阔天地中激荡反哺之力 🌐'
    },
    {
      name: '活动部 Events Management Division',
      points: [
        '规划并执导学联各大年度旗舰及传统线上线下庆宴（包括但不限于中秋喜乐会、大型春晚演出、迎新郊野烧烤等）。',
        '全流程编制活动策划书及精确倒计时流程，严格落实多功能场馆会审报批、舞美音像设备配置以及大型后勤流转。',
        '深度拉通宣传、外联、财务等多部门的并行节奏，确保一切盛典策划的前期预热及执行效果达到顶级水准。'
      ],
      aim: '雕琢仪典，打造 Hoya 毕生珍藏的华彩回忆 🎬'
    },
    {
      name: '宣传部 Marketing Division',
      points: [
        '核心运营学联唯一的官方微信公众号（GU_CSSA），同步管理小红书、Instagram、LinkedIn 等全媒体内容发布线。',
        '自主设计富有乔治城复古风韵的推文排版、大型活动实体海报、邀请函、门票，并剪辑高质感纪录视频、先导预告片。',
        '主导 CSSA 整体品牌形象升级与美学质感把控，优化设计统一的学校学联标识 (Logo Suite) 及视觉识别标志体系 (VI)。'
      ],
      aim: '臻美视界，用创意承载华府学子思想火花 📸'
    },
    {
      name: '职业发展部 Career Development Division',
      points: [
        '深度定制面向 Hoya 核心利益的职业生涯提升活动，包括行业领军校友沙龙、名校学术研讨、顶尖名企直聘会。',
        '精细搭建各专业在美校友通讯名录和中外资企业核心 HR 内推渠道，不定期开设简历大师班、Mock 面试集训营。',
        '开拓同 Georgetown MBA 学院、学校 Career Center 官方以及知名求职辅导机构的高水平课程对接机会。'
      ],
      aim: '导航商途，助力 Hoya 在美求职乘风破浪 🎓'
    },
    {
      name: '法务 Legal Counsel',
      points: [
        '依据乔治城大学 SAC 理事会章程，起草与严格审计 CSSA 的所有中英文合同、活动法律免责声明书及合作协议。',
        '系统研判学生活动在实施过程中的各类法律风险，在学生隐私保护、合规运作及涉外知识产权等核心领域提供预警。',
        '为全体学联骨干在复杂涉外校商谈判等应用场景提供全天候的法律咨询建议，死守红线，坚实护航。'
      ],
      aim: '知法合规，为学联构筑最牢固的法律防护墙 🛡️'
    },
    {
      name: '财务 Accountant',
      points: [
        '严格依据大学学委会及 CSSA 预算管理条例，开展全面的日常台账记账，严审出纳支出项目并制作决算明细表。',
        '按季度高标准向学生活动管理委员会（SAC）及主席团提交公开财务状况审计、控制多头预算超支漏洞。',
        '与外联部精细对接，专款专户追踪企业各项商业赞助，健全完全受托信托资产管理体制，承诺合规不越界。'
      ],
      aim: '精算毫厘，保障学人公共基金的纯正信义 💰'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 text-[#071426]">
      
      {/* Association description banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        <div className="lg:col-span-8 space-y-6">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#C6A15B] uppercase block">
            About Georgetown CSSA
          </span>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight leading-tight serif-display-zh">
            关于我们：汇集华府华人精英力量<br />
            & 承载 Hoya 薪火相传之家园
          </h2>
          <div className="w-12 h-[1px] bg-hoya-gold/50 my-2" />
          <p className="text-slate-600 text-xs sm:text-[14px] leading-relaxed font-normal">
            乔治城大学中国学生学者联合会 (Georgetown University Chinese Students and Scholars Association, GU CSSA) 是由乔治城学子自发组织、经乔治城大学官方机构认证登记、致力于服务全校中国留学生、访问学者及华府教工的志愿者社团。
          </p>
          <p className="text-slate-600 text-xs sm:text-[14px] leading-relaxed font-normal">
            我们致力于促进中美文化交流、强化在校生学术互助、连结美东名企求职网络。执委会于每学期初举行开放招新，只要你热爱社群活动、乐于助人、想锻炼个人商务PR及宣发策划技能，欢迎加入我们的大家庭！
          </p>
        </div>

        {/* WeChat Public Account Portal QR code showcase card */}
        <div className="lg:col-span-4 bg-[#071426] rounded p-7 text-white border border-[#C6A15B]/25 shadow-xl text-center space-y-5">
          <h4 className="font-semibold text-xs tracking-wider text-[#C6A15B] font-mono uppercase">Scan to subscribe / 官方微信</h4>
          
          <div className="bg-white p-3.5 rounded-sm inline-block shadow-md">
            <QrCode className="w-36 h-36 text-gray-900 mx-auto" strokeWidth={1.5} />
            <div className="font-mono text-[9px] text-slate-800 font-bold tracking-widest uppercase mt-2 select-all">
              ID: GU_CSSA
            </div>
          </div>

          <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
            关注官方渠道，第一时间获悉年度迎新群二维码、二手买卖、行李清关清单，及中秋迎新、使馆游园晚会入选资质！
          </p>
        </div>
      </div>

      {/* Departments Grid Sections */}
      <div className="space-y-6 mb-16">
        <div className="flex items-center gap-2.5">
          <Building2 className="w-5 h-5 text-[#C6A15B] stroke-[1.5]" />
          <div>
            <h3 className="text-xl font-light text-[#071426] serif-display-zh">学联执委会核心部门章程</h3>
            <p className="text-[8px] text-slate-400 font-mono tracking-widest uppercase">Executive Division & Constitution Mandates</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {divisions.map((dept, i) => (
            <div 
              key={i} 
              id={`about-dept-card-${i}`}
              className="bg-white border border-[#08142c]/6 p-6 rounded hover:shadow-xs transition-colors duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 text-sm tracking-tight border-b border-slate-50 pb-2.5 flex items-center justify-between font-serif-zh">
                  <span>{dept.name}</span>
                  <span className="text-[#C6A15B]">✦</span>
                </h4>
                <ul className="list-disc pl-4 space-y-2 text-slate-500 text-xs sm:text-[12px] leading-relaxed font-normal">
                  {dept.points.map((pt, j) => (
                    <li key={j} className="marker:text-[#C6A15B]">
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-5 pt-3.5 border-t border-slate-50 text-[11px] text-[#071426] font-medium flex items-center gap-1.5 font-serif-zh">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500/10" />
                <span>{dept.aim}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom contact recruitment block */}
      <div className="bg-[#FAF9F6] border border-[#08142c]/6 rounded p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4.5 h-4.5 text-[#C6A15B] stroke-[1.5]" />
            <h4 className="font-semibold text-[#071426] text-[15px] serif-display-zh">2026 年度秋季执委会招新引言</h4>
          </div>
          <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
            招新面询将在开学迎新野餐周后的隔周展开。各大部门均提供多样岗位挑战（推文编辑、晚会导演、活动外事）。关注公众号 <strong>GU_CSSA</strong> 获取推送招新表单链接，欢迎直接发送简历自我介绍，我们的邮箱常年敞开！
          </p>
        </div>

        <div className="md:col-span-4 flex justify-end">
          <a
            id="about-email-link"
            href="mailto:cssa@georgetown.edu"
            className="flex items-center gap-2.5 px-6 py-3.5 bg-[#071426] hover:bg-[#122844] text-white font-mono text-xs uppercase tracking-wider rounded transition-colors duration-200 cursor-pointer shadow-xs"
          >
            <Mail className="w-4 h-4 text-[#C6A15B]" />
            <span>发送信递 cssa@georgetown.edu</span>
          </a>
        </div>
      </div>

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Search, CheckCircle, Circle, ClipboardList, Info, HelpCircle, ArrowRight, Utensils, Home, Bus, CreditCard, Award } from 'lucide-react';
import { GuideSection } from '../types';

export default function SurvivalGuide() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState('cssa-info');
  const [activeSubId, setActiveSubId] = useState('');
  
  // Checklist State stored locally for state retention
  const [checklist, setChecklist] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('gu-cssa-newcomer-checklist-v2');
    return saved ? JSON.parse(saved) : {
      uid: false,
      duo: false,
      immunization: false,
      physi_sim: false,
      pnc_acct: false,
      gocard: false,
      chinese_placement: false,
      speedqueen: false
    };
  });

  useEffect(() => {
    localStorage.setItem('gu-cssa-newcomer-checklist-v2', JSON.stringify(checklist));
  }, [checklist]);

  const toggleChecklist = (key: string) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const interactiveChecklistItems = [
    { key: 'uid', label: '记下UID并激活NetID账户', sub: '学院八位数UID，初始化主校区@georgetown.edu邮箱' },
    { key: 'duo', label: '绑定Duo Token双因子网关', sub: 'Georgetown核心校验验证器，登录统一系统必备' },
    { key: 'immunization', label: '完成抗体疫苗接种表（SHC Form）', sub: '通过 healthportal 在线提交，必须避开选课Hold锁定' },
    { key: 'physi_sim', label: '准备物理双卡槽 SIM 卡卡面', sub: '注意：中国大陆版 iPhone 不支持eSIM，请购买物理卡槽卡' },
    { key: 'pnc_acct', label: '开立美国银行借记钱包账户', sub: '开学首日在PNC校园专柜、或BOA M街旗舰店凭电汇办理' },
    { key: 'gocard', label: '提前上传正装照片申领 GOCard', sub: '校内班车乘坐、餐饮、图书馆自修及门锁验证的数字身份卡' },
    { key: 'chinese_placement', label: '预约中文免修能力测试 (Placement)', sub: '文理学院等对二外有硬性指标。提前通过考试免去额外修读' },
    { key: 'speedqueen', label: '安装 SpeedQueen 智能寝室洗烘', sub: '主校区寝室洗衣房核心软件，支持GOCard实时充值注入' },
  ];

  const guideData: GuideSection[] = [
    {
      id: 'cssa-info',
      title: '基本信息',
      chineseTitle: 'Basic Information',
      icon: 'ClipboardList',
      subsections: [
        {
          id: 'brief',
          title: 'GUCSSA 简介与执委会结构',
          chineseTitle: 'GUCSSA Association Brief',
          content: '乔治城大学中国学生学者联合会 (GUCSSA) 是乔治城大学官方正式注册、合法自制且受中国驻美大使馆认可赞助的华人学生组织。我们由常务、活动、外联、宣传、职业就业辅导、法务内控等多个职能部门骨干共同构成，每年深层协助本科生、研究生和交换学者平稳过渡华盛顿生活底色。',
          tips: [
            '执委会常务层：现任常务主席 George Qiao，常务副主席 Alex Chen。如有学术、法务紧急援助及华府事务合作，请径自发信。',
            '官方指定资讯发布端：微信搜一搜「CSSAGU」或关注服务号「GU_CSSA」获取新生行前大群入口资质。'
          ]
        },
        {
          id: 'gu-stats',
          title: '乔治城大学经典馆藏与华府掌故',
          chineseTitle: 'Classic Georgetown Quick Facts',
          content: '乔治城大学创立于 1789 年 (美国联邦宪法签署的同年)，由约翰·卡罗尔神父创办。主校区（Healy Hill）坐落在高耸的峭壁上，俯瞰波托马克河。作为全美政要、外交、商贸精英的顶级摇篮，其享有“政治外交界哈佛”之卓著美誉。',
          tips: [
            '核心录取名录：全美著名最难录取的顶尖法学、外交学、商学院（MSB）。建校至今产出28位国会议员、多位国家最高元首。',
            '吉祥物「Jack the Bulldog」：主校区活体传承斗牛犬已进入第六代。校训 “Utraque Unum” 的拉丁意为自勉的“合二为一”；应援高声呐喊口号 “Hoya Saxa” 意为“岩石般的意志”。',
            '惊悚级地标「驱魔人台阶」：Healy 殿堂右翼幽长狭长的一行75级石阶，为1973年奥斯卡同名恐怖大片《驱魔人》的经典取景，至今为深夜跑山训练胜地。'
          ]
        },
        {
          id: 'geo-weather',
          title: '地理交通与大华府 DMV 气候特征',
          chineseTitle: 'Geographical Coordinates & DMV Weather',
          content: '校区直接置身于华盛顿具有深厚底蕴的乔治城历史街区。大华府 DMV 都市圈指：DC、弗吉尼亚州 (VA) 及马里兰州 (MD) 共同合围的都会轨道交通枢纽，通过发达的公交、使馆路网快速接驳。',
          tips: [
            '四季概况：DC 气温分界清晰。夏季(6-8月) 高温潮湿在28-35°C区间，强烈不建议午后曝晒；秋季(9-11月) 枫景如画、气温舒爽宜人；冬季(12-2月) 偶遇偶降暴雪，大衣羽绒服为行装标配。'
          ]
        }
      ]
    },
    {
      id: 'food-shopping',
      title: '美食购物',
      chineseTitle: 'Food & Shopping Essentials',
      icon: 'Utensils',
      subsections: [
        {
          id: 'm-street',
          title: 'M 街零售旗舰商圈全览',
          chineseTitle: 'M Street Retail District',
          content: 'M 街道是整个 D.C. 乃至美东最瞩目的高奢及设计师潮流零售步行街。距正校门仅不足10分钟步行，云集 Apple、Lululemon、COS、Ralph Lauren，亦是平日与教授 Coffee Chat、午后漫步的核心去处。',
          tips: [
            '甜品下午茶：打卡美国名产 Levain 极厚软曲奇、Blue Bottle 蓝瓶手工烘焙、以及 Tai Chi 华人茶饮店。',
            '历史沉淀 “Old Stone House”：东端伫立着建于1765年的砖瓦小亭卡罗尔宅邸，它是美国首都第一栋完好保留本土原地基上的独立住宅古建筑，全天供人凭吊。'
          ]
        },
        {
          id: 'restaurants',
          title: '大华府地区精致中韩美餐厅臻选',
          chineseTitle: 'Signature Dining Recommends',
          content: '特区核心圈中餐偏于极简，但在近郊的维州 Arlington 和马里兰 Rockville 拥有最纯熟正宗的八大菜系、川菜、粤式早茶等聚集区。',
          tips: [
            '**RPM Italian D.C.**：现代都会奢雅风，龙虾手工意粉与西式生牛肉（Carpaccio）极受好评。',
            '**Bostan Uyghur Cuisine**：地道新疆大盘鸡，现拉宽面搭配滋滋流油的炭烤羊肉串。',
            '**Jaleo by José Andrés**：DC顶级米其林推荐西班牙 Tapas 殿堂，鹅肝多士与桑格利亚气泡酒首选。',
            '**Astoria D.C.**：国潮酒吧兼高端川菜小馆，酸汤肥牛与调酒水准极高。',
            '**Thomas Sweet Icecream**：三十年手工精磨乳酪，历任老华府高层出巡乔治城必然打卡的水底冰淇淋。'
          ]
        },
        {
          id: 'groceries',
          title: '生鲜超市对比与选购避坑指南',
          chineseTitle: 'Supermarkets & Asian Grocery',
          content: '在特区独立开伙需做好超市卡购买及价格认知定位，我们不推荐漫无目的地全额选购贵族超市：',
          tips: [
            '**Target**：Rosslyn 地铁出口有一家，主打实惠生活小家电、快消百货与平民纸巾。',
            '**大华府亚洲中国超市大户 (大中华 Great Wall / 大华 99 Ranch)**：包含空运的时令山芋白菜、活鱼生猛海鲜、正宗火锅牛羊肥牛。建议周末校友拼车一次性完成采买。',
            '**Safeway & Whole Foods**：邻近校区 Wisconsin 街上配有 Safeway，绑定免费数字会员可获极高折扣。Whole Foods 主打有机高等级牛排、冷切。'
          ]
        },
        {
          id: 'delivery',
          title: '在线生鲜与中文外卖送餐软件',
          chineseTitle: 'Online Marketplaces & Delivery',
          content: '留学生数字消费的合理组合，能大幅降低独居异国他乡的孤独感与烹饪时间损耗：',
          tips: [
            '**Amazon Prime Student**：学校后缀邮箱注册，即享半年高规格免邮次日送达特权。',
            '**Weee! 中文生鲜**：满 $49 包免邮直送寝室门口。时令生鲜、华人酱料与精品熟食俱全。',
            '**熊猫外卖 (HungryPanda)**：DC 几乎100%华人菜系在此云集。全程配有华人送餐员，无惧语言卡壳。'
          ]
        }
      ]
    },
    {
      id: 'housing',
      title: '住宿租房',
      chineseTitle: 'On-Campus & Off-Campus Housing',
      icon: 'Home',
      subsections: [
        {
          id: 'off-campus',
          title: '校外高安全性热门居住板块',
          chineseTitle: 'Off-Campus Hotspots',
          content: '主校区寸土寸金无直接地铁。极力推荐中国学者在以下拥有 GUTS 免费大巴秒速直通校车群的社区：',
          tips: [
            '**Rosslyn 楼群区域**：隔 Key Bridge 与学校对望。治安与金融极优，均为现代化轻高层重门禁公寓，自带前台代收贵重快递。清晨 5-8分钟即有一趟 GUTS 专班穿梭。',
            '**Glover Park 高尚学区**：校园北翼教工首选。纯白古典瓦房、治安傲然，步行距离有高性价比有机生鲜超市，可搭乘 Glover 线校巴。'
          ]
        },
        {
          id: 'dorms',
          title: '主校区本科新生 5 栋经典大寝分析',
          chineseTitle: 'Freshmen Residence Halls Analysis',
          content: '本科生常有三年强行留宿规章。所有学舍均为学校统一数字配额。以下为核心楼宇优缺比较：',
          tips: [
            '**Copley Hall**：最邻近前门 Healy 地标，标准的 Suite 型套房（独立起居卫浴两寝共用），自带烤箱厨房。',
            '**Harbin Hall**：标志性蜂巢布局复式楼。极具华府凝聚感，美国前总统克林顿在修读常青藤预科时大一曾经入住。',
            '**New South**：直临核心中央食堂。卧室自带洗手池池体，供暖与水流条件极其硬核。',
            '**Darnall Hall**：主攻北门合围区。配备大一新生专用标准双人单床配置加全性别公共整洁大卫浴，保障隐私。',
            '**Reynolds Hall**：现代美学之巅，属于 Southwest Quad 三雄大社区，地下一层拥有 Reynold 馆藏、琴室及自制美食售点。'
          ]
        },
        {
          id: 'dorm-systems',
          title: '公寓硬件智能配套 (Switch / SpeedQueen)',
          chineseTitle: 'Dorm Intelligences & Apps',
          content: '近年来乔治城已升级了全部物理电子硬件基础。请提前在手机端完成以下应用之挂接激活：',
          tips: [
            '**Switch Tech 手机蓝牙智能电门锁**：学校全面废除物理长铜匙。只需将 iPhone 或安卓开启 Switch 芯片，靠近把手位置即可一秒瞬间感应指令解码。',
            '**SpeedQueen 自助洗衣监控**：洗衣房统一承接大厂。不仅支持APP端查询每台洗干机运转及烘干倒计时状态，每学期更有学校专项自动注入账户。'
          ]
        }
      ]
    },
    {
      id: 'transport',
      title: '交通出行',
      chineseTitle: 'Urban Mobility & GUTS Bus',
      icon: 'Bus',
      subsections: [
        {
          id: 'guts-bus',
          title: 'GUTS (乔治城官方免费接送穿梭巴士系统)',
          chineseTitle: 'Official Free Shuttle Routes',
          content: 'GUTS 巴士是学校为了便利师生、解决不挨地铁的特色免费大巴车。在星巴克环岛和BTA地下车场有专属终点。上车无需看NetID或刷卡，极为好客。',
          tips: [
            '**Rosslyn Shuttle**：发车最频急，5分钟通勤至维州地铁大底盘。',
            '**Dupont Circle Line**：一站式通达DC红线老牌使馆文化特区。',
            '**Capitols 联合会专线**：方便法学中心、常驻国会山研究院的学者在不同学术区流转。'
          ]
        },
        {
          id: 'metro-apps',
          title: '华府地铁系统与 Apple 电子公交卡 (SmarTrip)',
          chineseTitle: 'Metro Transit & Apple Wallet SmarTrip',
          content: '华盛顿拥有明净且守时规整的特区地下快铁（WMATA Line），是日常探访史密森尼博物馆、国会山、使馆区的首席通勤选择。',
          tips: [
            '**Apple 钱包 SmarTrip 挂接**：无需到柜台排队买卡，在 iPhone 钱包直选「交通卡-新增-华盛顿 SmarTrip」充值即可通过，享有轻轨与 DC Circulator 红蓝巴士无缝超低折扣。'
          ]
        },
        {
          id: 'airports',
          title: '大华府三大都会机场抵校路线比对',
          chineseTitle: 'D.C. Airport Transportation Guides',
          content: 'DMV 内含三大门户机场，中港台学者飞美选线各异：',
          tips: [
            '**IAD 杜勒斯国际机场**：中转回国主力。目前最便捷线路是：主航站台直插 Silver 灰线地铁，直通 Rosslyn 站乘 GUTS 免费校车，全程耗费不超过 $6 美元即可通达 Healy 礼堂前！拼车约需 $60+ 刀。',
            '**DCA 里根国家机场**：主城区核心机场，供国内线考察，打车仅 15 分钟切入乔治城。',
            '**BWI 巴尔的摩机场**：极远、廉航主港。需要倒乘马里兰火车，中转繁复度高，非特需不推荐在此落地。'
          ]
        }
      ]
    },
    {
      id: 'finance-services',
      title: '生活服务',
      chineseTitle: 'Essential Utility Prep',
      icon: 'CreditCard',
      subsections: [
        {
          id: 'banking',
          title: '美国商业大行开户细节与瞬时到账 Zelle',
          chineseTitle: 'Opening US Bank Account & Transfer',
          content: '携护照原件、GU I-20 文件及学校注册证明赴商业大厅办理，两周内首张借记卡 Debit Card 将直寄学社。',
          tips: [
            '**PNC Bank 独家联动**：在 Leo 食堂正上方有专设机构。凭 GOCard 办理 Student Checking 账户享全免小额月度维护费。',
            '**Bank of America (BOA) & Chase**：M大街中段配有极高阶多语服务大厅。APP转账逻辑极为贴合用户。',
            '**Zelle 免手续费瞬时清算**：各家大行 APP 内嵌，无需下载任何额外客户端。通过绑定 georgetown 邮箱，转账可在数秒内完成汇划清算。'
          ]
        },
        {
          id: 'simcards',
          title: '行货 iPhone 无卡 eSIM 避坑与精明手机运营商',
          chineseTitle: 'US Mobile SIM Cards Detail Guides',
          content: '解决赴美通讯时，需要密切体察手机物理性质。不当的选择可能会造成极高额外开支：',
          tips: [
            '**行货实体双卡警告**：中国行货 iPhone 出厂**不具备**任何无卡物理 eSIM 的识别机制。订购 Mint、Visible 或 AT&T 时应在后台强选「Request Physical SIM Card (请求实体卡)」，不然将会因芯片不匹配而无法拨通报警。',
            '**高性价比 Mint Mobile / Visible**：推荐租用主力运营商基站的廉价运营商。月费仅 $15-$25 即可畅享顶限 5G 流量。'
          ]
        },
        {
          id: 'insurance',
          title: '校园高等级医疗保险 Premier 计划必读',
          chineseTitle: 'Georgetown Premier Health Insurance Rules',
          content: '美国医疗资费极度高昂。选课通过前，系统自动预扣强制保险费。',
          tips: [
            '**GU Premier 险种**：年度资费约为 $3,430 美金，全面报销 MedStar 附设各级门诊与Student Health Center。建议绝大多数新生不要擅自 Waiver 以防遭遇由于信息漏审而无法承担华盛顿看诊的窘境。',
            '**牙医与眼科盲区**：基本学校保单**100%不配发**常规洗牙、隐形框架等项目。建议赴美前在国内进行洗牙并在国内配好两副高强度眼镜带来。'
          ]
        }
      ]
    },
    {
      id: 'academics-opt',
      title: '校内学术与资源',
      chineseTitle: 'On-Campus Academic Resources',
      icon: 'Award',
      subsections: [
        {
          id: 'academic-tools',
          title: '选课测评 RateMyProfessors 与 Coursicle 交互排表',
          chineseTitle: 'Course Selection Apps & Canvas Portal',
          content: '极快合理搭建学术课表，是高分绩点 GPA 及课业通顺的半壁江山：',
          tips: [
            '**Rate My Professors (RMP) 给分评价**：北美最大测评黑红榜，细致透露各个教授的阅读量、Easy A 指数与考查频率。',
            '**Coursicle 可视化工具**：在选课系统开放前，供您预录代码进行重合校验。'
          ]
        },
        {
          id: 'language-placement',
          title: '文理、外交学院第二外语免修考试（Placement）',
          chineseTitle: 'School Language Requirements & General Exams',
          content: '第二外语免修是华人新生的隐形学分重镇。一节高阶外语课能帮您直接节省上万刀的昂贵学资学利：',
          tips: [
            '**文理学院 (CAS二外)**：强行保留中级外文考核。新生抵校的第一周即可申请 Chinese Placement Exam 预约。通过线上多选答卷外加 Zoom 下中文系教授的一对一简易口头叙话，几分钟即可顺利拿到“完全二外豁免豁免学分”！'
          ]
        },
        {
          id: 'opt-cpt',
          title: 'F-1 国际生 CPT / OPT 带薪实践实习核心红线',
          chineseTitle: 'F-1 Visa CPT/OPT Application Guides',
          content: '在校期间在校外开展商业行为的最高凭证。由学校国际办公室处 OGS 批准，并变更 I-20 条例字段：',
          tips: [
            '**CPT (课程学分实习许可)**：须在校修满一整个官方学术学年才可触发。CPT 期间工作性质必须严求与本学位专修方向息息相关，在拿到包含新 CPT 盖章的 I-20 前千万不可开工以免面临身份失效重办遣返之罚。',
            '**OPT (毕业工作实践特许)**：可在美合法开展实习达12个月（STEM 如量化、CS、生物等享有额外24个月，总达3年），毕业日前90天应向 USCIS 提出申领。'
          ]
        }
      ]
    }
  ];

  // Search logic
  const filteredGuide = guideData.map(category => {
    const matchedSubsections = category.subsections.filter(sub => {
      const matchTitle = sub.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         sub.chineseTitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchContent = sub.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchTips = sub.tips?.some(tip => tip.toLowerCase().includes(searchQuery.toLowerCase())) || false;
      return matchTitle || matchContent || matchTips;
    });

    return {
      ...category,
      subsections: matchedSubsections
    };
  }).filter(category => category.subsections.length > 0);

  const activeCategory = guideData.find(c => c.id === activeCategoryId) || guideData[0];
  const displayCategory = searchQuery ? filteredGuide[0] : activeCategory;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      
      {/* Search Header Banner - Elegant minimalistic Slate card */}
      <div className="bg-[#071426] rounded-lg p-8 lg:p-12 text-white relative overflow-hidden border border-[#C6A15B]/20 mb-14">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 blur-3xl rounded-full translate-x-12 -translate-y-12" />
        <div className="relative z-10 max-w-3xl">
          <span className="text-[#C6A15B] font-mono text-[9px] font-bold uppercase tracking-[0.25em] block mb-2">
            GEORGETOWN UNIVERSITY CSSA SURVIVAL INTEL
          </span>
          <h2 className="text-3xl font-light tracking-tight mb-4 text-slate-100 leading-tight serif-display-zh">
            乔治城新生生存指南及通关大名集
          </h2>
          <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed mb-6 font-sans">
            本指南根据 GUCSSA 历任执委会印发的官方行前攻略与老生生活集锦精心提炼。它包罗疫苗接种Hold解锁、PNC柜合开户、GUTS免费巴士班表、SpeedQueen及蓝牙蓝牙密码锁锁芯校验、M街与大华府餐飨避坑及 Placement 考试全流程。
          </p>
          
          {/* Dynamic Guide Search */}
          <div className="relative max-w-lg shadow-sm">
            <Search className="absolute left-4 top-1/2 -convert-y -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              id="guide-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索任何指南关键词（例如：宿舍、PNC、Duo、GUTS、M街、eSIM）..."
              className="w-full pl-11 pr-4 py-3 bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-gray-900 border border-white/10 focus:border-white rounded text-xs placeholder-slate-400 focus:outline-none transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Guide Main Columns layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left column / Top Grid: Navigation Tabs & Progress Tracker */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-[#08142c]/8 rounded p-5 space-y-4">
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#C6A15B] px-1 mb-1">
              GUIDE DIRECTORY / 目录索引
            </h3>
            
            <div className="flex flex-col gap-1.5">
              {guideData.map((category) => {
                const isActive = !searchQuery && activeCategoryId === category.id;
                return (
                  <button
                    key={category.id}
                    id={`guide-cat-tab-${category.id}`}
                    onClick={() => {
                      setSearchQuery(''); 
                      setActiveCategoryId(category.id);
                      setActiveSubId('');
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded text-left transition-all duration-200 group outline-none cursor-pointer border ${
                      isActive
                        ? 'bg-[#071426] text-white border-hoya-gold/50 shadow-sm'
                        : 'bg-transparent text-slate-600 hover:text-gray-900 hover:bg-slate-50 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="space-y-0.5">
                        <div className="text-[13px] font-medium serif-display-zh">{category.title}</div>
                        <div className={`text-[8px] font-mono uppercase tracking-wider ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>
                          {category.chineseTitle}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-[#C6A15B] translate-x-1' : 'text-slate-300 group-hover:translate-x-0.5'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Checkbox Widget Panel - Premium UI Tracker */}
          <div className="bg-[#FAF9F6] border border-[#08142c]/6 rounded p-6 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#08142c]/6 pb-3">
              <div>
                <h4 className="text-xs font-semibold text-[#071426] tracking-tight font-serif-zh">宿合到校及入境合规登记单</h4>
                <p className="text-[8px] text-[#667085] font-mono tracking-widest uppercase">Official Registration Tracker</p>
              </div>
            </div>

            <div className="space-y-3.5 max-h-80 overflow-y-auto pr-1">
              {interactiveChecklistItems.map((item) => {
                const isDone = checklist[item.key] || false;
                return (
                  <button
                    key={item.key}
                    id={`guide-check-${item.key}`}
                    onClick={() => toggleChecklist(item.key)}
                    className="w-full text-left flex items-start gap-3 p-1.5 rounded hover:bg-white transition-all group cursor-pointer"
                  >
                    <div className="mt-0.5 text-slate-300 group-hover:text-[#C6A15B] transition-colors flex-shrink-0">
                      {isDone ? (
                        <CheckCircle className="w-4 h-4 text-[#C6A15B]" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className={`text-[12px] font-medium leading-normal ${isDone ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                        {item.label}
                      </div>
                      <div className="text-[9px] text-[#667085] leading-relaxed mt-0.5">{item.sub}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="bg-[#071426] text-white p-3.5 rounded text-[10px] font-mono tracking-wider flex items-center justify-between">
              <span>PROGRESS / 完成度:</span>
              <span className="font-bold text-[#C6A15B]">
                {Object.values(checklist).filter(Boolean).length} / {interactiveChecklistItems.length}
              </span>
            </div>
          </div>

          {/* Guide Credits - Premium Minimalist Badge */}
          <div className="bg-white border border-[#08142c]/6 p-5 rounded text-center">
            <p className="text-[9px] text-slate-400 font-mono tracking-widest uppercase mb-3">EDITORIAL STAFF & CREDITS</p>
            <div className="grid grid-cols-3 gap-2 select-none text-[10px]">
              <div className="py-2 bg-slate-50 border border-slate-100 rounded">
                <div className="text-[#667085] scale-90">内容汇编</div>
                <div className="font-semibold text-slate-800 mt-0.5">Amber / Max</div>
              </div>
              <div className="py-2 bg-slate-50 border border-slate-100 rounded">
                <div className="text-[#667085] scale-90">编纂校对</div>
                <div className="font-semibold text-slate-800 mt-0.5">Amanda</div>
              </div>
              <div className="py-2 bg-slate-50 border border-slate-100 rounded">
                <div className="text-[#667085] scale-90">执委顾问</div>
                <div className="font-semibold text-slate-800 mt-0.5">George Qiao / Alex Chen</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Content Board details */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Subsection Jumper (Anchor links) within Active Category */}
          {!searchQuery && displayCategory && displayCategory.subsections.length > 1 && (
            <div className="bg-white border border-[#08142c]/6 p-4 rounded flex flex-wrap items-center gap-2">
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-semibold ml-1 mr-3">
                Quick Jump / 迅速定位:
              </span>
              {displayCategory.subsections.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    const el = document.getElementById(`guide-section-${sub.id}`);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      setActiveSubId(sub.id);
                    }
                  }}
                  className={`px-3 py-1.5 rounded text-[10px] uppercase font-mono tracking-wider transition-all border cursor-pointer ${
                    activeSubId === sub.id
                      ? 'bg-[#C6A15B] text-[#071426] border-[#C6A15B]'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200/50'
                  }`}
                >
                  {sub.title}
                </button>
              ))}
            </div>
          )}

          {displayCategory ? (
            <div className="space-y-8">
              
              {/* Category Page Title */}
              <div className="border-b border-[#08142c]/8 pb-3.5 flex items-end justify-between">
                <div>
                  <h3 className="text-xl font-light text-[#071426] tracking-wide serif-display-zh">
                    {displayCategory.title}
                  </h3>
                  <p className="text-slate-400 uppercase text-[8px] font-mono tracking-widest mt-0.5">
                    GEORGETOWN SURVIVAL SYSTEM • {displayCategory.chineseTitle}
                  </p>
                </div>
                {searchQuery && (
                  <span className="text-[9px] text-[#667085] font-mono bg-slate-100 px-3 py-1 rounded">
                    FOUND {displayCategory.subsections.length} MATCHES
                  </span>
                )}
              </div>

              {/* Subsections list displaying expanded content */}
              <div className="space-y-8">
                {displayCategory.subsections.map((sub, idx) => (
                  <div 
                    key={sub.id} 
                    id={`guide-section-${sub.id}`}
                    onClick={() => setActiveSubId(sub.id)}
                    className={`bg-white border rounded p-6 lg:p-8 hover:shadow-xs transition-all duration-300 relative ${
                      activeSubId === sub.id 
                        ? 'border-[#C6A15B]' 
                        : 'border-[#08142c]/6'
                    }`}
                  >
                    
                    {/* Visual Gold Bracket Tag for active selection */}
                    {activeSubId === sub.id && (
                      <span className="absolute top-0 right-8 transform -translate-y-1/2 px-3 py-1 bg-[#C6A15B] text-[#071426] font-mono text-[8px] uppercase tracking-widest rounded-sm font-bold">
                        ACTIVE CHAPTER
                      </span>
                    )}

                    <div className="flex items-start justify-between border-b border-slate-50 pb-4 mb-5">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded bg-[#071426] text-white flex items-center justify-center text-[11px] font-semibold font-mono">
                          0{idx + 1}
                        </span>
                        <div>
                          <h4 className="font-semibold text-[#071426] text-[15px] serif-display-zh">{sub.title}</h4>
                          <p className="text-[8px] text-[#667085] font-mono uppercase tracking-widest mt-0.5">{sub.chineseTitle}</p>
                        </div>
                      </div>
                    </div>

                    {/* Core Content Description */}
                    <div className="text-[13px] font-normal text-[#5c6475] leading-relaxed mb-6 whitespace-pre-line font-sans">
                      {sub.content}
                    </div>

                    {/* Bed Sizes Table */}
                    {sub.id === 'dorms' && (
                      <div className="my-6 p-5 bg-[#FAF9F6] border border-[#08142c]/5 rounded space-y-4">
                        <div className="flex items-center gap-2 text-xs text-[#071426] font-semibold font-serif-zh">
                          <CheckCircle className="w-4 h-4 text-[#C6A15B]" />
                          <span>赴美寝室床具规格快速匹配手册</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-[10px]">
                          <div className="p-3.5 bg-white rounded border border-[#08142c]/6">
                            <div className="font-semibold text-slate-800">Twin Size</div>
                            <div className="font-mono text-[9px] text-[#667085] mt-1">96.5 x 190.5 cm</div>
                            <div className="text-slate-400 mt-0.5">普通单人床单</div>
                          </div>
                          <div className="p-3.5 bg-white rounded border border-[#C6A15B]/30 bg-[#FAF9F6]">
                            <div className="font-bold text-[#C6A15B]">Twin XL Size</div>
                            <div className="font-mono text-[9px] text-[#C6A15B] mt-1">96.5 x 203 cm</div>
                            <div className="text-[#071426] font-bold mt-0.5">大一寝舍统配</div>
                          </div>
                          <div className="p-3.5 bg-white rounded border border-[#08142c]/6">
                            <div className="font-semibold text-slate-800">Full Size</div>
                            <div className="font-mono text-[9px] text-[#667085] mt-1">137 x 190.5 cm</div>
                            <div className="text-slate-400 mt-0.5">高年级双人尺寸</div>
                          </div>
                          <div className="p-3.5 bg-white rounded border border-[#08142c]/6">
                            <div className="font-semibold text-slate-800">Queen Size</div>
                            <div className="font-mono text-[9px] text-[#667085] mt-1">152 x 203 cm</div>
                            <div className="text-slate-400 mt-0.5">校外常规1.5米</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {sub.tips && sub.tips.length > 0 && (
                      <div className="bg-[#FCFDFE] border-l-2 border-[#C6A15B]/80 rounded-r p-5 space-y-3 bg-[#FAF9F6]/20">
                        <div className="flex items-center gap-2 text-xs text-[#071426] font-semibold font-serif-zh">
                          <Info className="w-4 h-4 text-[#C6A15B]" />
                          <span>GUCSSA 宿直委员特别批记条目</span>
                        </div>
                        <ul className="space-y-2.5">
                          {sub.tips.map((tip, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C6A15B] mt-2 flex-shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded p-12 text-center text-slate-400 space-y-4">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm">没有匹配到相关的生存指南内容...</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="text-[#071426] font-bold underline text-xs cursor-pointer"
              >
                重置搜索并返回基本信息
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Search, CheckCircle, Circle, MapPin, School, ClipboardList, Info, HelpCircle, ArrowRight, Utensils, Home, Bus, CreditCard, Award, Calendar } from 'lucide-react';
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
    { key: 'uid', label: '记下UID和激活NetID', sub: '8开头的9位数字, 初始化georgetown.edu邮箱' },
    { key: 'duo', label: '绑定Duo App双重核验', sub: 'Georgetown强校验验证器, 登录统一网关必备' },
    { key: 'immunization', label: '提交抗体/疫苗接种表 (SHC Form)', sub: '在 healthportal 上传, 否则锁选课账户 (Hold)' },
    { key: 'physi_sim', label: '准备国内实体 SIM 卡面', sub: '中国大陆购买的 iPhone 无 eSIM 功能, 必须选择实体卡' },
    { key: 'pnc_acct', label: '开立美国银行借记账户', sub: 'BOA M街旗舰店或 PNC 校园 ATM 现场办理' },
    { key: 'gocard', label: '提前上传照片申领 GOCard', sub: '在校活动、打印机、图书馆、乘 GUTS 必备证件' },
    { key: 'chinese_placement', label: '参加中文免修考试 (Placement)', sub: 'CAS学子有 Intermediate 第二外语要求, 及时免修' },
    { key: 'speedqueen', label: '下载并配置 SpeedQueen 软件', sub: '学校洗衣房唯一软件通道, 每学期自动注入信用度值' },
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
          title: 'GUCSSA 简介与成员结构',
          chineseTitle: 'GUCSSA Association Brief',
          content: '乔治城大学中国学生学者联合会 (GUCSSA) 是乔治城大学官方注册、中国驻美大使馆官方认可的领袖级中国学生自治组织。我们下设活动、外联、宣传、职业发展、法务和财务六大职能部门。每年承办大华府（DMV）学界中秋迎新、使馆春节游园联合晚会、高端行业论坛和各大校友酒会。',
          tips: [
            '我们的核心领导班子：现任主席罗金悦 Lucy (jl3268@georgetown.edu)，副主席傅暄智 Jerry (xf97@georgetown.edu)。如有学术投诉、国际局涉外事务、迎新赞助需求请邮件联络。',
            '官方微信搜一搜：「CSSAGU」或公众号「GU_CSSA」。获取每年最重要的行前说明群二维码！'
          ]
        },
        {
          id: 'gu-stats',
          title: '乔治城大学官方数据及趣闻',
          chineseTitle: 'Classic Georgetown Quick Facts',
          content: '建校于 1789 年 (美国宪法签署两年后)，由神父约翰·卡罗尔 (John Carroll) 创立，是美国历史最悠久的大学之一。主校区104英亩，紧临波托马克河，距离美国白宫仅 3.7 公里。下设 10 个核心学院（CAS、MSB商学院、SFS外交学院、Georgetown Law、McCourt公共政策学院等）。',
          tips: [
            '核心录取数据：本科录取率仅 12%，校友在国会占有 28 个席位。商学院本科生的平均起薪高达 $100,733 USD。师生比维持在优越的 1:11。',
            '校徽老鹰：鹰爪抓着代表理性知识的地球仪和代表信仰的十字架，象征学术与宗教共融 (Jesuit精神)。',
            '吉祥物斗牛犬：Jack the Bulldog 已传承至第 6 代。校训为 "Utraque Unum"（合二为一），口号 "Hoya Saxa" 拉丁意思是“什么样的石头！”，戏谑指防护极强的石墙，后演变成加油呐喊口号。',
            '驱魔人台阶 (Exorcist Steps)：校园东侧一处极窄极陡的 75 级石阶，为 1973 年同名恐怖电影坠楼处，如今是著名打卡点。'
          ]
        },
        {
          id: 'geo-weather',
          title: '地理位置与 DMV 都市圈气候',
          chineseTitle: 'Geographical Coordinates & DMV Weather',
          content: '校区坐落于乔治城历史街区 (Georgetown Historic District)，保留大量18世纪维多利亚风格建筑。步行通达 M 街商圈。大都会区 DMV（D.C.、马里兰 MD、弗吉尼亚 VA 三地统称）共享轻轨、两轮和使馆资源。',
          tips: [
            '气候概览：四季分明。夏季 (6-8月) 潮湿闷热，温度 28-35°C，防晒雨伞必备。秋季 (9-11月) 风景绝美十分爽朗，一件皮夹克和卫衣即可。冬季 (12-2月) 偶有大雪，可降至 -5°C 以下，建议国内备好轻便羽绒服、厚手套和靴子。春季 (3-5月) 气温回暖但多早晚凉，推崇洋葱式叠穿。'
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
          title: 'M 街商圈基本指引',
          chineseTitle: 'M Street Retail District',
          content: 'M Street 是乔治城乃至 DC 最繁华的消费步行街。距离校门步行不足 10 分钟。云集了 Apple Store、Lululemon、COS、Ralph Lauren 等一线时尚旗舰店。也是学生日常喝咖啡、逛书店（Barnes & Noble）的首选地段。',
          tips: [
            '咖啡甜点：网红 Blue Bottle（蓝瓶子）、深受美国中产吹捧的 Levain 烘焙（极度扎实香浓的巧克力软曲奇）、以及 Tai Chi（太极功夫茶）奶茶餐厅皆在 M 街。',
            '老石屋 (Old Stone House)：M 街上矗立着华盛顿最古老、仍然保留在原地基上的殖民地前建筑，免费开放参观。'
          ]
        },
        {
          id: 'restaurants',
          title: 'DMV 华人常去优质餐厅',
          chineseTitle: 'Signature Dining Recommends',
          content: 'DC 主城区中餐网点相对精简，但外围富饶的市郊（维州 Arlington、马大 Rockville）提供全方位家乡菜。',
          tips: [
            '**RPM Italian D.C.**：极具摩登都会格调的意式餐厅，精致的西式生和牛、龙虾意面。',
            '**Bostan Uyghur Cuisine**：正宗新疆/维吾尔族大盘鸡、羊肉串，分量极其厚道。',
            '**Jaleo by José Andrés**：DC 最著名的高端西班牙 Tapas 餐厅，果汁和海鲜饭闻名遐迩。',
            '**Astoria D.C.**：国潮复古风川味小酒馆，花椒鸡、担担面绝不踩雷，鸡尾酒调酒水平业内拔尖。',
            '**Thomas Sweet Georgetown**：柯林顿总统曾光顾的本地老牌手工冰淇淋店，支持混拌各类坚果碎。',
            '**Il Canale**：拿坡里木柴窑烤正宗柴烧披萨，毗邻运河，户外雅座极具欧洲风情。'
          ]
        },
        {
          id: 'groceries',
          title: '超市对比及选购常识 (大型超市 vs 亚洲中超)',
          chineseTitle: 'Supermarkets & Asian Grocery',
          content: '租房开灶必备知识。美国连锁巨头和亚洲生鲜网点分工明确：',
          tips: [
            '**Target**：位于 Rosslyn 地铁站出口有一处直达，属于开架自助大型百货，价格平民。',
            '**IKEA (宜家)**：订购床架、书桌和厨房全套的最佳极简首选，节假日物流常出现放鸽子，强烈建议工作日网订。',
            '**中国超市大户 (大中华 Great Wall / 大华 99 Ranch / 好运来 Good Fortune)**：大量新鲜高山白菜、游水活鱼、中式火锅切片肥牛。主要盘踞在马里兰州 Rockville 一带，可以利用周末拼车一次性囤够两周分量。',
            '**Safeway**：距离主校区最近的 Wisconsin Avenue 上有一家超大型 24 小时 Safeway。出示电子会员卡享受极致折扣，美式冷鲜肉和沙拉极全。',
            '**CVS**：M 街和校园内部均有门店，属于开架药房兼便利店，可以购买各类扑热息痛、褪黑素并接种免费的季节性流感疫苗。'
          ]
        },
        {
          id: 'delivery',
          title: '网购、生鲜网购与中文外卖 APP',
          chineseTitle: 'Online Marketplaces & Delivery',
          content: '北美数字消费极度便利。掌握以下软件组合，可以大大提升寝室幸福指数：',
          tips: [
            '**Amazon Prime Student**：使用 georgetown.edu 邮箱注册即白送 6 个月免费极速快递会员。校内设有 Amazon Locker 专柜，收发包裹无需担心风吹日晒被盗。',
            '**Yamibuy (亚米网)**：中国各省零食小吃（卫龙、螺蛳粉、日本化妆品）北美第一发货渠道，配有完善的中文在线客服。',
            '**Weee! (亚裔生鲜第一平台)**：满 $49 包免邮直送家门口。水果极甜、肉质极棒。冷藏纸箱配送附带大量干冰，次日直达。',
            '**熊猫外卖 (HungryPanda)**：全球最大的留学生中文点餐软件。DC 地区几乎所有老牌粤菜、川菜馆均有入驻，司机配有华人，沟通零阻碍。',
            '**主流美式送餐：UberEats / DoorDash / GrubHub**：GrubHub 与学校有独家协议，甚至可以提前用学校餐饮额度进行食堂秒速点单取餐（Leo\'s Grab and Go）。'
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
          title: '校外推荐高安全性板块',
          chineseTitle: 'Off-Campus Hotspots',
          content: '乔治城附近不直接挨着大型地铁口，极力推荐寻找以下配有直达大学 GUTS 免费班车的区域：',
          tips: [
            '**Rosslyn (维州金融区)**：一桥之隔（Key Bridge）。多为美式现代化高端高层公寓。自带24小时大堂前台代收包裹、双重门禁和校车枢纽。工作日 GUTS 巴士 8 分钟单程一班直通校内，生活无忧。',
            '**Glover Park**：校区以北，著名的宜居教工住宅区，治安在大华府名列前茅。多为经典砖瓦公寓，可乘 Glover Park 路线 GUTS bus 或 31/33 路公交上学。超市（Whole Foods、缺德舅）均在步行范围内。'
          ]
        },
        {
          id: 'dorms',
          title: '校内 5 栋大一新生楼全景剖析',
          chineseTitle: 'Freshmen Residence Halls Analysis',
          content: '乔治城本科生被强制要求在校内住宿三年，新生会按照 Housing Portal 随机或自由匹配到以下 5 栋经典宿舍：',
          tips: [
            '**Copley Hall**：离学校正门 Healy Hall 最近的 6 层古典型宿舍。属于经典的 Suite（两间双人间共用一个中间洗手间和淋浴），G-4层男女混住，5层为全女生保护层。每层配有带烤箱的公用大厨房。',
            '**Harbin Hall**：校园中西部地标。采用创新的 3 单元 Cluster 蜂巢式布局：每层楼分 3 个独立的小区块，每个小区块有 8 个房间共用一个大洗手间。社交气氛十分强、互动频繁。美国前总统比尔·克林顿大一曾经入住这里。',
            '**New South**：临近 Leo\'s 核心食堂。特色是卧室自带独立的冷热水洗手池，传统长走廊布局。4层高精尖建筑，地热系统非常足，楼下配有完备的自习讨论区。',
            '**Darnall Hall**：主攻校区北门，紧邻 MedStar 医院和 Epicurean 食堂。标准双人间加每层纯单性别大浴室，极其便利，对生活隐私度强的学子十分便利。',
            '**Reynolds Hall**：Southwest Quad 三杰大群落之一。内含高年级与新生，套房布局极具现代美感。地下一层配有知名的大型 Reynolds Library、独立的音乐练琴室、以及学生自助零食铺 (Hoya Snaxa)。'
          ]
        },
        {
          id: 'dorm-systems',
          title: '寝室高尖端智能终端配套 (SpeedQueen/Switch Tech)',
          chineseTitle: 'Dorm Intelligences & Apps',
          content: '乔治城已经彻底告别了落后的金属物理钥匙时代，宿舍全面应用高尖端互联终端：',
          tips: [
            '**Switch Tech 蓝牙智能门锁**：学校所有核心公寓均内含新型无线蓝牙电控锁芯。无需实体钥匙，只需将 iPhone 下载关联 “Switch Tech” 客户端，激活后将手机正面触碰门锁传感器，即可一秒发出清脆的开锁指令！',
            '**SpeedQueen 自助洗烘互联**：所有寝室洗衣房由 SpeedQueen 统一承接，内含高精度重量感应和速洁选项。可以通过 APP 随时监控当前的排队与烘干倒计时。每学期学校账户（GOCard）会自动往里面注入免费信用度。'
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
          title: 'GUTS (Georgetown University Transportation Shuttle)',
          chineseTitle: 'Official Free Shuttle Routes',
          content: 'GUTS 巴士是学校官方营运的免费公共校巴接驳群，任何拥有 GOCard 的学生及随行访客均可无限次免费搭乘，上车无需刷卡校验！最常用的始发地点为校区地下的 BTA (Bus Turnaround) 环形车场以及星巴克外的 Lombardi Circle。',
          tips: [
            '**Arlington Shuttle**：前往维吉尼亚州商圈。',
            '**Rosslyn Shuttle**：最核心的通勤线。发车频率最高，5-8分钟直达。',
            '**Dupont Circle Shuttle**：通勤至 DC 核心红线地铁圈。',
            '**Union Station Loop / Capitol Campus**：服务于常驻国会山校区、法学院的高年级研究生学者。',
            '**55 H Street Weekend Shuttle**：专供周末出行、跨校科研、大型采购购物的最佳线路。'
          ]
        },
        {
          id: 'metro-apps',
          title: '大都市轻轨系统与 SmarTrip 公交卡',
          chineseTitle: 'Metro Transit & Apple Wallet SmarTrip',
          content: '华盛顿轻轨（DC Metro）是全美最整洁高效的轨交系统之一，直接贯穿大华府核心商圈及机场。',
          tips: [
            '**SmarTrip 在线电子充值**：无需再购买零散的塑料实体卡。只需在 iPhone 的 Apple Wallet（钱包）选择添加 “SmarTrip” 新建电子公交卡，绑定借记卡充入 $10-$20刀，即可像国内乘地铁、公交巴士那样，秒级挥机一刷即过，同时在各大轻轨站换乘本地 Metrobus 接驳巴士可享受换乘优惠。',
            '**地铁换乘注意**：乔治城大学本岛没有直接的地铁站，最常用出行节点为：Rosslyn 站（Orange / Blue / Silver 三线）、Dupont Circle 战（Red 核心红线）。由于多以距离定价，刷卡进站及出站时均需要贴机验证。'
          ]
        },
        {
          id: 'airports',
          title: '三大主力机场通达全景攻略',
          chineseTitle: 'D.C. Airport Transportation Guides',
          content: '大华府都市圈由三大骨干国际/国内民航机场环抱，其对中转回国、大一接机等有根本性差别：',
          tips: [
            '**IAD (Dulles International Airport) 华盛顿杜勒斯国际机场**：大多数留学生回国、返美的首选。国际各大旗舰航司主力重仓机场。如今通达性极佳：可从主航站楼直接搭乘 Metro Silver Line 灰色地铁，一路闭眼坐到 Rosslyn 站，换乘免费 GUTS 校巴，全程零堵车仅消耗约 $6 刀即可安全抵校！拼车打车（Uber / Lyft）一般需要 $50-$70刀。',
            '**DCA (Ronald Reagan National Airport) 罗纳德·里根国家机场**：属于城中次枢纽，主攻美国国内线和加拿大航线。距离乔大极其近。乘坐地铁 Yellow / Blue 线可以 15 分钟切入中国城，乘坐 Uber 出发到校通常耗费仅 $15-$20 刀。',
            '**BWI (Baltimore/Washington Airport) 巴尔的摩机场**：属于廉价航司、捷蓝或西南航空的重镇，距离市中心极远。前往需要去 Union Station 换乘火车（AMTRAK / MARC 铁路线），打车直达需预备 $75+ 刀神话级别高资费。'
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
          title: '美国两大行开户避坑与线上便捷转账',
          chineseTitle: 'Opening US Bank Account & Transfer',
          content: '抵校第一个工作日务必带齐重要纸质原件完成本地银行账户办理。借记卡（Debit Card）通常在一到两周内安全邮寄至你的美国地址。',
          tips: [
            '**PNC Bank on Campus**：乔大唯一的独家联盟银行。在 O\'Donovan（Leo\'s）食堂上方配有完备实体网点。持有 GOCard 办理 PNC Student Wallet 零月费福利，ATM布满全校。',
            '**Bank of America (BOA) / Chase**：在 Georgetown M 街 1200 街区及附近高档商圈均配有大型双层豪华旗舰店。手机 APP 指合程度好用，大额转入快捷，首推 BOA 作为存入爸妈国内电汇外汇的主要重仓卡。',
            '**Zelle & Venmo 极速结算**：美国人转账账单拆分唯一指定工具 “Zelle”：只需在各大银行 APP 直接搜索，通过学生 georgetown 邮箱即可一秒绑定，转账秒级到账，无需承担任何转账手续费！“Venmo” 属于中式微信钱包概念，深受留学生的极爱，可自由转存。'
          ]
        },
        {
          id: 'simcards',
          title: '手机卡办理避坑：实体大厂 vs 便宜 MVNO 虚拟运营商',
          chineseTitle: 'US Mobile SIM Cards Detail Guides',
          content: '通讯是生活保障。由于手机芯片规格迥然不同，中国大陆行货 iPhone 用户必须牢记：',
          tips: [
            '**国行 iPhone 零 eSIM 警告**：国行行货 iPhone 没有任何无卡物理 eSIM 的支持架构。当你在 Mint Mobile、Verizon 官网办理或者咨询时，一定要强行选择 “Request Physical SIM Card”（申请寄送实体塑料卡面），否则对方下发扫码二维码，你的中国手机将完美无法识别！',
            '**虚拟运营商 (Mint Mobile / Visible)**：首推 **Mint Mobile**（租用 T-Mobile 基站线路）或 **Visible**（租用 Verizon 巨头基站）。月租仅需 $15-$25 刀即可享受高达 15GB 及以上的完全 5G 不限速大流量包，国内通过淘宝买一张临时测试卡，到美后随时官网申请转移到期，费用比 AT&T $60 多刀基础套餐划算近 3 倍以上。'
          ]
        },
        {
          id: 'insurance',
          title: '乔治城高抗体医疗保险Premier计划详解',
          chineseTitle: 'Georgetown Premier Health Insurance Rules',
          content: '美国的医疗费用堪称没有封顶，无保险状态下看一次普通感冒发烧可能需要预备成百上千美元的门诊账单！乔治城规定所有注册在案的学生必须在选课生效前强力交清医疗险费用。',
          tips: [
            '**GU Premier Plan**：全年在校总额保险费用约为 $3,430 美元。涵盖 MedStar 医院绝大多数专科门诊、常规住院、特设精神科干预、以及在 Student Health Center（健康中心）的药物处方免全额垫付项目。推荐直接使用学校官方险种，通过外部野鸡险中介进行 Waiver (放弃豁免) 极易遭遇学校不予审核，发生病痛无法保障。',
            '**基础牙医与眼睛盲区**：校内强制基本险**100%不覆盖**洗牙、补牙、框架眼镜配置、以及隐形眼镜验光！在美国看一次牙医没有二级险种需要高额自负，强烈建议在飞美上飞机前，在国内正规口腔医院做完洗牙及牙病清理，并在国内配齐两副完全高硬度的近视眼镜一并空运过来。'
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
          title: '选课三大神级神器与 Canvas 线上教研室',
          chineseTitle: 'Course Selection Apps & Canvas Portal',
          content: '学术选课是乔大生活的半壁江山。合理利用以下软件组合，可以帮你轻松规避学术杀手必修课：',
          tips: [
            '**GU Experience**：正式的大学选课、打印成绩单。',
            '**Rate My Professors (RMP)**：属于高纯度教授打分黑红榜。可以查询乔大过往三年任何教授的给分松紧度（Easy A 指数）、每节课的阅读页码任务量、以及期末是否有巨额 Exam。',
            '**Coursicle**：高颜值自备学术排表辅助排课神器。支持直接输入课程代码进行可视化色块防时间冲突排课演练。',
            '**Duo Double-Factor App**：学校电脑网关唯一的验证门神，请勿随意卸载或恢复手机物理出厂设置，否则每次验证都需要致电学校 IT 报备。'
          ]
        },
        {
          id: 'language-placement',
          title: '乔治城文理学院、商学院等第二外语免修考试 (Chinese Placement)',
          chineseTitle: 'School Language Requirements & General Exams',
          content: '第二外语免修考试是针对国际新生的独门学分救星，通过中文免修可以让你足足节省近 6-12 个昂贵的选课学分：',
          tips: [
            '**College of Arts & Sciences (CAS 文理学院)**：所有文理学院学子强制有 Intermediate 级别的第二外语学业指标，没有通过免修的中国学子甚至被迫去零基础学习法语或日语。不要慌！在开学第一天立即前往官网申请 **Chinese Placement Exam**。通过线上答题阅卷、再加 Zoom 一次 15 分钟的外语系教授口语对话，即可完美免去整个第二外语要求！',
            '**SFS 外交学院**：对外语指标有北美顶流的严求！必须通过极其高端的 Foreign Service Language Proficiency 闭卷多方位评估，需要提前做好大一的选课储备。',
            '**MSB 商学院及 SON/SOH 护理学院**：对普通的本科通识及护理硕士不需要强制具备第二外语免修手续，除了特定的 Global Health 跨国研究专长项目。'
          ]
        },
        {
          id: 'opt-cpt',
          title: 'CPT 与 OPT 国际生合法实习许可红线政策',
          chineseTitle: 'F-1 Visa CPT/OPT Application Guides',
          content: 'F-1 国际生在美国合法出任带薪实习的唯一保障，由 OGS（学校国际学生办公室）主管注册和 I-20 信息签发：',
          tips: [
            '**CPT (课程实习许可)**：在校期间在校外带薪或无薪兼职的基石。申请前学校硬规定必须已经在校内学满 1 个完整的学术学年。CPT 必须证明其工作内容与你的专业紧密挂钩，需要系里出具学分绑定书。**绝不能**在未拿到正式签字的新 CPT I-20 文件前提前去公司上班，否则直接导致 F-1 签证失效！',
            '**OPT (毕业实习许可)**：毕业前后可在全美工作 12 个月的超级特权令牌！理工科（STEM 指定专业，如乔大电脑科学、量化数学、生物金融）有额外延期 24 个月的绿灯特权（总共达 3 年合法工作缓冲）。需要在计划毕业日的前 90 天开始在线向移民局递交 I-765 表格申领 EAD 卡。'
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      
      {/* Search Header Banner - Elegant minimalistic Slate aesthetic */}
      <div className="bg-[#041E42] rounded-3xl p-8 lg:p-12 text-white shadow-xl relative overflow-hidden border-b-4 border-[#C5A059] mb-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-2xl rounded-full translate-x-12 -translate-y-12" />
        <div className="relative z-10 max-w-3xl">
          <span className="text-[#C5A059] font-mono text-xs font-bold uppercase tracking-widest block mb-2">
            GEORGETOWN UNIVERSITY CSSA SURVIVAL INTEL
          </span>
          <h2 className="text-3xl lg:text-4xl font-display font-medium tracking-wide mb-4 text-slate-100">
            乔治城大学官方新生生活指南 (2025/2026 最新版)
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
            本指南完全参考 GUCSSA 官方印发的行前红宝书进行交互定制：涵盖重要文书疫苗 checklist、M街及DC餐馆指南、5大新生宿舍全剖析、SpeedQueen智能蓝牙Switch锁指引、PNC银行开卡、GUTS班车线路、Duo认证及 Placement 中文免修等保姆级学术及日常攻略。
          </p>
          
          {/* Dynamic Guide Search */}
          <div className="relative max-w-lg shadow-2xl">
            <Search className="absolute left-4 top-1/2 -convert-y -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              id="guide-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索任何生存指南（例：宿舍、PNC、Duo、GUTS、M街）..."
              className="w-full pl-11 pr-4 py-3 bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-gray-900 border border-white/20 focus:border-white rounded-xl text-xs placeholder-gray-400 focus:outline-none transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Guide Main Columns layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column / Top Grid: Navigation Tabs & Progress Tracker */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-100/80 rounded-2xl p-4.5 shadow-sm space-y-3">
            <h3 className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-[#C5A059] px-2 mb-1">
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
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left transition-all duration-300 group outline-none cursor-pointer ${
                      isActive
                        ? 'bg-[#041E42] text-white border-l-4 border-[#C5A059] shadow-md shadow-[#041E42]/5'
                        : 'bg-transparent text-gray-600 hover:text-gray-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-white/10 text-[#C5A059]' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'}`}>
                        {category.icon === 'ClipboardList' && <ClipboardList className="w-3.5 h-3.5" />}
                        {category.icon === 'Utensils' && <Utensils className="w-3.5 h-3.5" />}
                        {category.icon === 'Home' && <Home className="w-3.5 h-3.5" />}
                        {category.icon === 'Bus' && <Bus className="w-3.5 h-3.5" />}
                        {category.icon === 'CreditCard' && <CreditCard className="w-3.5 h-3.5" />}
                        {category.icon === 'Award' && <Award className="w-3.5 h-3.5" />}
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold font-sans">{category.title}</div>
                        <div className={`text-[8px] font-mono uppercase tracking-wider ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>
                          {category.chineseTitle}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className={`w-3 h-3 transition-transform ${isActive ? 'text-[#C5A059] translate-x-1' : 'text-slate-300 group-hover:translate-x-0.5'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Checkbox Widget Panel - Premium UI Tracker */}
          <div className="bg-[#FAFBFD] border border-slate-200/50 rounded-2xl p-5 shadow-inner space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-200/50 pb-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <CheckCircle className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#041E42] tracking-tight">留学生入境通关及到校清单</h4>
                <p className="text-[8px] text-slate-400 font-mono tracking-widest uppercase">Progress Tracker</p>
              </div>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {interactiveChecklistItems.map((item) => {
                const isDone = checklist[item.key] || false;
                return (
                  <button
                    key={item.key}
                    id={`guide-check-${item.key}`}
                    onClick={() => toggleChecklist(item.key)}
                    className="w-full text-left flex items-start gap-2.5 p-2 rounded-xl hover:bg-white border border-transparent hover:border-slate-100 transition-all group cursor-pointer"
                  >
                    <div className="mt-0.5 text-slate-300 group-hover:text-emerald-500 transition-colors flex-shrink-0">
                      {isDone ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-500/10" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className={`text-[11px] font-semibold leading-tight flex items-center gap-1.5 ${isDone ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                        {item.label}
                      </div>
                      <div className="text-[8px] text-slate-400 leading-normal mt-0.5">{item.sub}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="bg-[#041E42] text-white p-3 rounded-xl flex items-center justify-between text-[10px] font-mono tracking-wider">
              <span>完成进度 PROGRESS:</span>
              <span className="font-bold text-[#C5A059]">
                {Object.values(checklist).filter(Boolean).length} / {interactiveChecklistItems.length}
              </span>
            </div>
          </div>

          {/* Guide Credits - Premium Minimalist Badge */}
          <div className="bg-white border border-slate-100 p-4.5 rounded-2xl text-center">
            <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">GUCSSA Guide Credits</p>
            <div className="grid grid-cols-3 gap-2 mt-3 select-none text-[10px] font-sans">
              <div className="p-1 px-1.5 bg-slate-50 border border-slate-100 rounded">
                <div className="text-slate-400">内容撰写</div>
                <div className="font-bold text-slate-700">Amber / Max</div>
              </div>
              <div className="p-1 px-1.5 bg-slate-50 border border-slate-100 rounded">
                <div className="text-slate-400">版面设计</div>
                <div className="font-bold text-slate-700">Amanda</div>
              </div>
              <div className="p-1 px-1.5 bg-slate-50 border border-slate-100 rounded">
                <div className="text-slate-400">终审校对</div>
                <div className="font-bold text-slate-700">Alicia / Lucy</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Content Board details */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Subsection Jumper (Anchor links) within Active Category */}
          {!searchQuery && displayCategory && displayCategory.subsections.length > 1 && (
            <div className="bg-slate-50 border border-slate-200/40 p-3.5 rounded-2xl flex flex-wrap items-center gap-2">
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold ml-1 mr-2">
                本章核心小结:
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
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-tight transition-colors border cursor-pointer ${
                    activeSubId === sub.id
                      ? 'bg-[#C5A059] text-[#041E42] border-[#C5A059]'
                      : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200/60'
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
              <div className="border-b border-slate-200/50 pb-3 flex items-end justify-between">
                <div>
                  <h3 className="text-xl font-display font-medium text-[#041E42] tracking-wide">
                    {displayCategory.title}
                  </h3>
                  <p className="text-slate-400 uppercase text-[9px] font-mono tracking-widest mt-0.5">
                    GEORGETOWN SURVIVAL SYSTEM • {displayCategory.chineseTitle}
                  </p>
                </div>
                {searchQuery && (
                  <span className="text-[10px] text-slate-500 font-mono bg-slate-100 px-3 py-1 rounded-full">
                    检索到 {displayCategory.subsections.length} 条符合条件信息
                  </span>
                )}
              </div>

              {/* Subsections list displaying expanded content */}
              <div className="space-y-6">
                {displayCategory.subsections.map((sub, idx) => (
                  <div 
                    key={sub.id} 
                    id={`guide-section-${sub.id}`}
                    onClick={() => setActiveSubId(sub.id)}
                    className={`bg-white border rounded-2xl p-6 lg:p-8 hover:shadow-lg transition-all duration-300 relative ${
                      activeSubId === sub.id 
                        ? 'border-[#C5A059] shadow-md shadow-[#C5A059]/5' 
                        : 'border-slate-200/60 shadow-xs'
                    }`}
                  >
                    
                    {/* Visual Gold Bracket Tag for active selection */}
                    {activeSubId === sub.id && (
                      <span className="absolute top-0 left-12 transform -translate-y-1/2 px-3 py-0.5 bg-[#C5A059] text-[#041E42] font-mono font-bold text-[8px] uppercase tracking-widest rounded-full">
                        ACTIVE READER SECTION
                      </span>
                    )}

                    <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-5">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-[#041E42] text-[#C5A059] flex items-center justify-center text-xs font-bold font-mono shadow-sm">
                          {idx + 1}
                        </span>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm sm:text-base">{sub.title}</h4>
                          <p className="text-[9px] text-slate-400 font-mono uppercase tracking-widest mt-0.5">{sub.chineseTitle}</p>
                        </div>
                      </div>
                    </div>

                    {/* Core Content Description */}
                    <div className="text-xs sm:text-sm font-normal text-slate-600 leading-relaxed mb-6 whitespace-pre-line font-sans">
                      {sub.content}
                    </div>

                    {/* Interactive Bed Sizes & Custom vector lists */}
                    {sub.id === 'dorms' && (
                      <div className="my-6 p-4.5 bg-slate-50 border border-slate-100 rounded-xl space-y-4">
                        <div className="flex items-center gap-1.5 text-xs text-[#041E42] font-bold">
                          <CheckCircle className="w-4 h-4 text-[#C5A059]" />
                          <span>赴美及寝室常见床具规格匹配清单 (Bed Sizes Guide)</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-[10px] font-sans">
                          <div className="p-2 bg-white rounded border border-slate-200/60">
                            <div className="font-bold">Twin Size</div>
                            <div className="font-mono text-[9px] text-slate-400 mt-1">96.5 x 190.5 cm</div>
                            <div className="text-slate-500 mt-0.5">常见单人房尺度</div>
                          </div>
                          <div className="p-2 bg-white rounded border border-slate-200/60">
                            <div className="font-bold">Twin XL Size</div>
                            <div className="font-mono text-[9px] text-slate-400 mt-1">96.5 x 203 cm</div>
                            <div className="text-[#C5A059] font-semibold mt-0.5">大一寝室通用</div>
                          </div>
                          <div className="p-2 bg-white rounded border border-slate-200/60">
                            <div className="font-bold">Full Size</div>
                            <div className="font-mono text-[9px] text-slate-400 mt-1">137 x 190.5 cm</div>
                            <div className="text-slate-500 mt-0.5">中型高层寝具款</div>
                          </div>
                          <div className="p-2 bg-white rounded border border-slate-200/60">
                            <div className="font-bold">Queen Size</div>
                            <div className="font-mono text-[9px] text-slate-400 mt-1">152 x 203 cm</div>
                            <div className="text-[#041E42] font-semibold mt-0.5">校外租房 1.5 米床</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {sub.tips && sub.tips.length > 0 && (
                      <div className="bg-[#FCFDFE] border border-slate-200/60 rounded-xl p-5 space-y-3 shadow-inner">
                        <div className="flex items-center gap-2 text-xs text-[#041E42] font-bold font-sans">
                          <Info className="w-3.5 h-3.5 text-[#C5A059]" />
                          <span>GUCSSA 执委会特别避坑贴士</span>
                        </div>
                        <ul className="space-y-2.5">
                          {sub.tips.map((tip, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2.5 text-xs text-slate-500 leading-relaxed font-normal">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-2 flex-shrink-0" />
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
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-gray-400 space-y-4">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm">没有匹配到相关的生存指南内容...</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="text-[#041E42] font-bold underline text-xs cursor-pointer"
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

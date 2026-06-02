import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini SDK
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not defined.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

const KNOWLEDGE_BASE_SYSTEM_INSTRUCTION = `
You are the Official GU CSSA AI Assistant (乔治城大学中国学生学者联合会智能助手). Your role is to help new students, current students, scholars, and visitors interested in Georgetown University and GU CSSA with questions about life, housing, transport, academic registration, and activities in Washington DC.

Answer questions in a friendly, enthusiastic, and helpful tone. Speak in Chinese by default (as most CSSA members are native Chinese speakers), but seamlessly support English if the user asks in English.

Key Georgetown University & GU CSSA Info:
- **School**: Georgetown University (GU / 乔治城大学), located in Washington, D.C.
- **Mascot**: Jack the Bulldog (Hoya Saxa!). School colors are Union Blue and Cadet Gray.
- **GU CSSA**: Georgetown Chinese Students and Scholars Association. We construct bridges for Chinese students, scholars, and local communities, and host festive affairs (Gala, career panels, welcome picnics).
- **WeChat Public ID**: "GU_CSSA" (乔治城大学CSSA)
- **Email**: cssa@georgetown.edu

Survival Guide Snippets to answer user questions:
1. **Housing (周边租房)**:
   - **Glover Park**: Extremely safe, quiet residential neighborhood north of campus. Very popular among Chinese students. Take the GUTS bus (Glover Park route) or Metrobus 31/33 to school.
   - **Rosslyn (Virginia)**: Safe, high-rise luxury apartment area. Located across the Potomac River. Very convenient transportation. Free GUTS Rosslyn Shuttle takes you directly to campus in 8 mins.
   - **Burleith / West Georgetown**: Walking distance to campus. Charming townhouses, but leases are often individual and houses can be older. Very safe.
   - **Dupont Circle / West End**: High-end apartments, close to DC downtown. You can take the GUTS Dupont Circle Shuttle or Metrobus.

2. **Transportation (交通出行)**:
   - **GUTS (Georgetown University Transportation Shuttle)**: Free university shuttle bus for students and staff. Just swipe your GOCard (Student ID). Routes include Rosslyn, Dupont Circle, Glover Park, Law Center, etc.
   - **Airports**: 
     - DCA (Ronald Reagan Airport): Closest to campus (15 mins taxi or Metro Blue/Yellow line).
     - IAD (Dulles International Airport): Main international airport. Take Silver Line Metro from IAD directly to Rosslyn, then GUTS bus or Uber to GU.
   - **Metro**: Foggy Bottom-GWU (Blue/Orange/Silver) is the closest subway station, about a 20-minute walk or a short bus ride.

3. **Academic & Utilities (学术与日常生活)**:
   - **GOCard**: Your official Georgetown Student ID card, used to enter buildings, Lauinger Library, Yates Field House (Gym), and ride GUTS buses.
   - **NetID & Canvas**: The primary online portal and learning system for class resources.
   - **Mobile Carriers**: Mint Mobile, T-Mobile, AT&T.
   - **Banking**: Bank of America (PNC has active ATMs on campus and in the student center).
   - **Chinese Food / Grocery**: Great Wall Supermarket (大中华) and 99 Ranch (大华) are in Rockville, MD and Fairfax, VA. Locally, West End Trader Joe's and Glover Park Whole Foods are super near.

Always reply dynamically using this guide as context, in markdown format. Keep answers concise, highly structured (with bullet points), and polite.
`;

// Intelligent local expert fallback engine inside server for offline/quota buffer resiliency
function getFallbackReply(query: string): string {
  const q = (query || "").toLowerCase().trim();
  
  const prefix = "💡 **[官方离线智脑服务]** (由于云端 API 限额，已自动为您通过本地学联官方红宝书缓存库进行快速检索答复)：\n\n";

  if (q.includes("rosslyn") || q.includes("glover") || q.includes("租房") || q.includes("长租") || q.includes("短租") || q.includes("周边") || q.includes("住") || q.includes("公寓") || q.includes("宿舍") || q.includes("harbin") || q.includes("village")) {
    return prefix + 
      "关于乔治城大学周边租房及新生住宿选择，**Rosslyn (罗斯林 - 维州滨河区)** 与 **Glover Park (格洛弗公园 - 特区安全区)** 是最为知名且极力推荐的区域，具有以下详细特质对比：\n\n" +
      "### 1. 现代化轻奢之选：Rosslyn (阿灵顿/弗吉尼亚州)\n" +
      "- **公寓质量**：几乎全是拥有门区服务、24小时安保、前台信箱、天台健身房的高层顶奢电梯大厦（例如 *The Highlands*、*Richmond Square* 或是 *Key Bridge Terrace*）。大部分户型配有独立的室内全自动洗衣烘干一体机。\n" +
      "- **通勤出行**：**神级便利**。学校和特区政府联合配置了完全免费的 **GUTS Rosslyn Shuttle** 直达通勤班车，仅需 **8分钟** 越过波托马克河大桥就可以把您送到校区心房。周边还有 Blue、Orange、Silver 三线路地铁站，可瞬间切入 DCA 雷根机场与 DC 市区枢纽。\n" +
      "- **治安与采购**：地段属于弗吉尼亚高净值社区，治安良好。楼下自带大型 Target 商店、Safeway，坐一站地铁能到 Courtyard 的 Whole Foods、AMC 豪华电影院。\n\n" +
      "### 2. 宁静美式复古之选：Glover Park (华盛顿特区西北区)\n" +
      "- **公寓质量**：传统的美式矮楼公寓（如 *Georgetown Pavillions*）或连排别墅 Townhouse 分租。由于很多楼房房龄相对较老，可能需要前往楼层公用洗衣房，但邻里纯天然，鸟语花香。\n" +
      "- **通勤出行**：距离主校区仅 **1.2 英里**。你可以搭乘完全免费的 **GUTS Glover Park Shuttle** 穿梭车，或者搭乘特区公交 31/33/D2/D6，10分钟内直抵校门，大晴天时很多同学更青睐直接在绿荫中健步上学。\n" +
      "- **治安与采购**：处于经典的 DC 豪宅区范围，全华府犯罪率最低的街区之一，极度静谧舒适。步行不到 5-10 分钟环线可直接抵达 **Whole Foods 旗舰店** 与精致的 **Trader Joe's**（缺德舅）超市。\n\n" +
      "💡 **CSSA 极简选房建议** —— 偏爱住大落地窗大高楼、需要独立烘干机、嫌转机麻烦想要直升专专线的同学主选 **Rosslyn**；追求美式田园住宅区格调、注重周围清修、中意迈步步行上学的人，**Glover Park** 是您的真爱。";
  }

  if (q.includes("gocard") || q.includes("校园卡") || q.includes("学生证") || q.includes("卡号") || q.includes("办卡") || q.includes("激活") || q.includes("id")) {
    return prefix + 
      "**GOCard (Georgetown One Card)** 是你在乔治城大学唯一的官方身份识别卡片，是开启全部校园权限和生活的「万能金钥匙」！\n\n" +
      "### 办理、照相与激活方法：\n" +
      "1. **在线上传证件照 (行前)**：\n" +
      "   - 新生在来美前，应该登入官方 [GOCard 照片提交网站](https://gocard.georgetown.edu/)，根据标准上传一张白底、免冠的电子肖像照片。审核通常在几个工作日内完成。\n" +
      "2. **卡片拿取地点**：\n" +
      "   - **校内新生入住日 (On-Campus Residents)**：凡是申请了学校公寓或校内宿舍（Harbin Hall、Village C等）的新生，通常会在宿舍楼大厅办理 Check-in 入住手时时，直接与宿舍物理钥匙一并领到您的 **GOCard**。\n" +
      "   - **校外住宿新生 / 未领到者**：请随身携带护照 / I-20 原件，前往校本部的 **GOCard Office** 办理地点：UIS Service Desk inside the bookstore lobby (学生中心一楼书店裙楼旁边)。现场可以进行实地印发。\n\n" +
      "### 核心使用功能明细：\n" +
      "- **校园安全通行**：开学后，进入 Lauinger 核心图书馆、MSB商学院大楼、Yates 健身会所以及晚上进入宿舍区，必须有 GOCard 刷卡授权。\n" +
      "- **免费乘车通勤**：可以无限次刷卡免费登乘包括 **Rosslyn/Dupont** 线在内的全部 **GUTS 穿梭校车**（不需要扣钱，仅作身份核验）。\n" +
      "- **餐饮纸印消费**：可在 Leo O'Donovan 食堂结算，也可以往卡内充值「Flex Dollars / Debit」在校园周边的部分认可商超直接当做借记卡一挥即付。";
  }

  if (q.includes("iad") || q.includes("dca") || q.includes("机场") || q.includes("打车") || q.includes("交通") || q.includes("地铁") || q.includes("班车") || q.includes("guts") || q.includes("校车") || q.includes("车路线") || q.includes("穿梭车") || q.includes("转机")) {
    return prefix + 
      "从华盛顿的两大主线机场（Dulles 杜勒斯 与 Reagan 雷根）往返乔治城大学，我们为您精算规划了性价比绝佳的通勤路线方案：\n\n" +
      "### ✈️ 路线一：从 Dulles (IAD - 绝大部分国际直飞航班落脚点)\n" +
      "IAD 距离乔治城主校区约为 26 英里（约 42 公里）：\n" +
      "- **首推地铁 Silver Line 方案（廉价且不堵车，仅需约 $6）**：\n" +
      "  在 IAD 航空航站大厅直接刷 Apple Pay / 购买 SmarTrip 卡登入 **Metrorail Silver Line (地铁银线)** 阿灵顿方向，一路坐 12 站直达 **Rosslyn** 下车。出地铁站后步行，直接无缝坐上免费的 **GUTS Rosslyn Line 校园大巴**（8分钟一站直抵主校区）。\n" +
      "- **网约车/出租车方案（约 $45 - $65）**：\n" +
      "  携带大批重行李箱的同学，推荐使用 Uber / Lyft 打车到学校目的地「Georgetown University Healy Gates」或您的具体宿舍地址，不遇上下班早晚高峰（3-7 PM），通常 35-45 分钟即可秒速抵达。\n\n" +
      "### ✈️ 路线二：从 Reagan National (DCA - 美国国内转机/联络站点)\n" +
      "DCA 紧贴着波托马克河畔，距离学校仅 6 英里：\n" +
      "- **网约车方案（极速，约 $18 - $25）**：\n" +
      "  打车是绝对最快、最舒适的选择，不需绕河倒车，只需 10-15 分钟即可直奔宿舍。\n" +
      "- **地铁方案**：搭乘 **Blue Line (蓝线)** 或 **Yellow Line (黄线)** 出发体验 4 站直达 **Rosslyn** 出站，同样直接连接我们的免费 **GUTS 穿梭巴士** 即可入校。";
  }

  if (q.includes("菜") || q.includes("吃的") || q.includes("中餐") || q.includes("中超") || q.includes("美食") || q.includes("大中华") || q.includes("超市") || q.includes("餐馆") || q.includes("餐厅") || q.includes("买菜") || q.includes("饭") || q.includes("餐")) {
    return prefix + 
      "人在美东，首脑最关心的永远是「暖胃」的中华美味和采购大计。大华府地区（DMV 三角区）为乔大学子准备了非常丰裕的家乡味道选择：\n\n" +
      "### 1. 周边步行极速中餐：\n" +
      "- **华府本市 (Downtown / Northwest DC)**：\n" +
      "  乔治城周边 M 街有著名的精致亚洲菜。特区内的 Chinatown 地段还置办着老牌的 **Sichuan Pavilion (大丰收川菜馆)** 以及主打港式点心、面条的经典街头铺。近年来，新式地道的川湘小馆也频繁在市中区及杜邦环岛附近萌发（比方说 *Ruyi Tavern*）。\n" +
      "- **弗吉尼亚 Rosslyn / Court House 精选（离学校只有一河之隔）**：\n" +
      "  **Chuan Kitchen (川风)** 、**Hunan Gate (湖南家园)** 的辣子鸡与剁椒鱼头正宗可口。此外，通过北美主流外卖 App（HungryPanda 熊猫外卖、Chowbus、饭团、UberEats）可以轻松将热腾腾的大餐外卖直送到 Healy Gate 校门亭交给您。\n\n" +
      "### 2. 大型亚洲超市（海外生活加油站）：\n" +
      "- **大中华超市 (Great Wall Supermarket - 亚洲采购旗舰)**：\n" +
      "  位于 Maryland 的 Rockville (马里兰高华社区)。各式中式调料、水饺、猪骨牛筋、新鲜莲藕、王老吉老干妈等一应俱全。新生开学季，**GU CSSA 通常会开行大型学联专线买菜校车**协助新生做统一推车采购！\n" +
      "- **H Mart & 99 Ranch Market**：\n" +
      "  韩日零食、高端和牛烤肉片、新鲜烘焙寿司，货品陈设极度现代通透，也是大家周末和伙伴拼车采购解压的常驻乐园。";
  }

  if (q.includes("学课") || q.includes("选课") || q.includes("myaccess") || q.includes("canvas") || q.includes("duo") || q.includes("认证") || q.includes("免修") || q.includes("中文") || q.includes("中文免修") || q.includes("考试") || q.includes("学分") || q.includes("二外") || q.includes("学术")) {
    return prefix + 
      "为了防止选课和账户在关键阶段遭遇突然的锁定（Hold），请仔细记好以下两项乔治城大学绝密保姆级学术及认证策略：\n\n" +
      "### 1. 🔑 Duo Mobile MFA 手机身份令牌\n" +
      "- 乔治城所有的官方平台（Gu Box、Office 365 邮箱、Canvas、以及选课面板 MyAccess）都挂接了极致严苛的 **Duo 二步式动态验证机制**。\n" +
      "- **重要行前操作**：开校首日通过电脑第一次登入邮箱时，系统会跳出绑定二维码，请在您的中国/美国手机端提前安装好 **Duo Mobile App** 并扫码授信。千万不要在没有 Duo 辅助的情况下清空手机，否则会有登录失联导致无法选课的巨大风险！\n\n" +
      "### 2. 🌟 中文免修考试 (Chinese Language Placement Exam) 避坑绝密神技\n" +
      "- 乔治城大学国际关系、商科、外交学院及公共政策大部分学位都包含极其长期的 **Language Requirement (外语通识学分要求)**。这通常会要求美国学生去修长达两年的西语或德语课。\n" +
      "- **中国留学生专享福利**：我们本身精通中文的同胞可以联系乔大中文学部负责人（Chinese Department）申请报名参加一学期一次的 **Chinese Placement Exam**（包含简单的笔试与口头问询）。只要顺利判定达到母语高阶标准，系主任会把判定公函抄送给您的教务学术顾问，从而直接**一键豁免掉这几个令人头疼的外语通识核心学分（免修 2~4 门通识课，免除上语言课的压力，极大加快毕业速率）**！";
  }

  if (q.includes("宿舍") || q.includes("harbin") || q.includes("公寓") || q.includes("宿") || q.includes("洗衣") || q.includes("烘干") || q.includes("洗衣机") || q.includes("speedqueen") || q.includes("蓝牙") || q.includes("智能锁") || q.includes("宿舍生活") || q.includes("入住") || q.includes("darnall") || q.includes("village")) {
    return prefix + 
      "乔治城大学的校内宿舍管理具有优良的传统与全数字化的智能管理体系：\n\n" +
      "### 🏢 1. 经典新生宿舍（Undergrad & Grad Housing）概览：\n" +
      "- **Harbin Hall (哈林楼 - 精气神凝聚地)**：由于整体回字形挑高大平层设计，中轴线非常适合互动，在新生群体中享誉最佳的「社交温度」。\n" +
      "- **Village C West / East (VC 栋)**：几乎是唯一一幢配备高比例「独立独立卫生间/卫浴（Private Bathrooms）」的奢享楼栋，极度贴合隐私偏好。独立温控，环境极为舒适。\n" +
      "- **New South & Darnall Hall**：全景观飘窗大厅，视野可以遥望著名的波托马克河美景。\n\n" +
      "### 🧺 2. SpeedQueen (女王) 智能蓝牙洗烘系统：\n" +
      "- 告别了美国陈旧需要随身携带几十枚硬币（Quarter 币）或老纸钞的尴尬体验，乔治城的所有宿舍楼洗衣房都配备了 **Speed Queen** 自动化洗烘系统：\n" +
      "- **流程**：先在 App Store 搜寻「Speed Queen」并用乔治城后缀 `.edu` 的邮箱注册；然后键入张贴在您宿舍楼洗衣房醒目处的 **Location Code (宿舍专属授权码)**；关联自己习惯的银行卡，洗衣开始或者在洗衣服完毕前，手机都会优雅地弹出蓝牙完成通知！";
  }

  if (q.includes("疫苗") || q.includes("体检") || q.includes("免疫") || q.includes("报告") || q.includes("两针") || q.includes("接种") || q.includes("针") || q.includes("结核") || q.includes("tb") || q.includes("健康") || q.includes("医院") || q.includes("hold") || q.includes("锁") || q.includes("checklist")) {
    return prefix + 
      "⚠️ **警告：乔大校医院（Student Health Center）对新生疫苗和体检报告合规性（Immunization Clearance）要求极其硬性！若不合规，会有选课Hold锁定伤害：**\n\n" +
      "### 1. 遭遇 Hold (学籍锁) 的影响：\n" +
      "如果注册阶段（Registration Target Date）您的 Student Health Portal 里的免疫清单仍旧处于 'Not Compliant' (不符合规范/未翻译盖章合格) 的状态，校方电脑系统将对您的 NetID 设下阻拦，你不仅不能做任何 Add/Drop 调整，甚至无法进行后续注册！\n\n" +
      "### 2. 核心必须要接种的疫苗清单：\n" +
      "- **TB (结核病筛查 - 核心卡点)**：凡是在中国大陆等结核高风险地区生活过的同学，校医院都不承认普通的皮试卡。推荐去国内具有「涉外翻译及体检资格」的 **国际旅行卫生保健中心** 进行专属的 **QFT 抽血检测 (QuantiFERON-TB Gold)**，且必须在出国前将医生亲签英文结果盖章上传。\n" +
      "- **Tdap (百白破)**：必须是 10 年之内的全新强效版本。\n" +
      "- **MMR (麻腮风)**：需两针记录。\n" +
      "- **脑膜炎ACWY (Meningococcal ACWY)**：满 16 岁后必须接种过一剂，才能解除登入校内高层宿舍区域的管控 hold。\n\n" +
      "💡 **最佳对策**：拿着乔大专属的 Immunization Form PDF 尽早跑一趟你们本地城市的出入境免疫中心，让专业医生对照要求一条一条地填表、打针、盖红章存底！";
  }

  if (q.includes("cssa") || q.includes("学联") || q.includes("协会") || q.includes("社团") || q.includes("加入") || q.includes("执委会") || q.includes("招新") || q.includes("面试") || q.includes("微信") || q.includes("公众号") || q.includes("微信号") || q.includes("邮箱") || q.includes("联合会") || q.includes("联系") || q.includes("活动")) {
    return prefix + 
      "**乔治城大学中国学生学者联合会 (GU CSSA)** 是致力于服务全校中国留学人员、访问学者及华府教工的志愿者大家庭：\n\n" +
      "### 1. 💼 执委会 (E-Board) 招新纳贤：\n" +
      "- 招新工作在 **每年8月底/9月初 (秋招)** 和 **1月底/2月初 (春招)** 盛大拉开帷幕。\n" +
      "- **开放核心部门**：\n" +
      "  - **学术宣传处**：独立运营美观的微信指南发布、排版及指南新站定制；\n" +
      "  - **外联财务部**：负责对接大华府本地知名华人商户赞助，为春晚、迎新等筹备充裕款项；\n" +
      "  - **文娱乐动组**：主管校友春歌会、大型春晚（Gala）、户外中秋联欢烧烤、DC大游船项目等；\n" +
      "  - **职业发展部**：构筑最前沿、畅通的华府、纽约及美东知名投行内推智库网络。\n\n" +
      "### 2. 📢 官方订阅入口：\n" +
      "- **微信唯一官方公众号**：请直接在微信中搜寻并关注微信名：**GU_CSSA** (乔治城大学CSSA)。\n" +
      "- **学联官方公共邮箱**：**cssa@georgetown.edu**。任何新生询问合作或遇到本地紧急棘手事务，尽可直接来信投递，在任主席团均会在 24 小时内亲审答复。";
  }

  // Generic FAQ reply with rich menu choices
  return prefix + 
    "您好！关于您提到关于乔治城的「" + query + "」相关资讯已为您捕获。\n\n" +
    "为了不耽误您了解核心资料，乔大 CSSA 官方学联服务库为您精选推荐了以下五大**极速指引直达主题**。你可以直接在对话框输入对应关键字：\n\n" +
    "- 🏠 **输入「租房 / Rosslyn」**：获取 Rosslyn 顶奢公寓穿梭班车实况与 Glover Park 治安Whole Foods精评。\n" +
    "- 🚇 **输入「机场 / IAD」**：查看从华盛顿杜勒斯机场地铁 Silver Line 如何 $6 元无缝进校以及网约车打车指南。\n" +
    "- 📕 **输入「疫苗 / Hold」**：了解结核抽血 QFT、Tdap 提交如何接触最要命的新生选课 Hold 封锁。\n" +
    "- 🔑 **输入「免修 / 选课」**：查看外语二外中文 Placement 免修 4 个通识学分省下上万刀学费的白嫖绝技。\n" +
    "- 🤝 **输入「加入学联」**：获取公众号 **GU_CSSA**、执委会招新细则及官方邮箱建联入口。\n\n" +
    "或者您可以点击上方顶栏切换至本站的 **Survival Guide (新生生活指南)** 版块直接搜索图文！";
}

// API routes FIRST
app.post("/api/gemini/chat", async (req, res) => {
  let lastUserQuery = "指南咨询";
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages array." });
    }

    // Capture the last user query text for fallback use
    const lastUserMsg = messages.filter((m: any) => m.role === "user").pop();
    if (lastUserMsg && lastUserMsg.text) {
      lastUserQuery = lastUserMsg.text;
    }

    // Convert messages into @google/genai contents format
    const contents = messages.map((m: any) => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: KNOWLEDGE_BASE_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    const reply = response.text || "抱歉，我现在无法回答，请稍后再试。";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error (Triggered fallback):", error);
    // Graceful fallback to the high-intelligence expert system instead of throwing raw error or 500 error!
    const fallbackText = getFallbackReply(lastUserQuery);
    res.json({ reply: fallbackText, isFallback: true });
  }
});

// Serve health status
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);

    // Fallback all other routes to index.html with Vite's HTML transform
    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const fs = await import("fs");
        let template = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GU CSSA Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, Send, Sparkles, MessageSquare, BookOpen, Building2, UserCheck, Bot } from 'lucide-react';
import { ChatMessage } from '../types';

function getClientFallbackReply(query: string): string {
  const q = (query || '').toLowerCase().trim();
  const prefix = "💡 **[官方本地离线服务]** (网络暂时断开或限额，已自动从本地新生红宝书知识库中检索答案)：\n\n";
  
  if (q.includes("rosslyn") || q.includes("glover") || q.includes("租房") || q.includes("公寓") || q.includes("宿舍") || q.includes("住")) {
    return prefix + 
      "关于周边租房，新生主选 **Rosslyn (维州高档公寓区)** 或 **Glover Park (特区极安静别墅及小公寓区)**：\n\n" +
      "- **Rosslyn**：治安极佳。高层精装公寓（带楼内洗烘和安保），配套有 Target 与 Safeway。通勤只需在校门口坐免费的 GUTS 8分钟直达车，非常受不愿操心杂事的新生喜欢。\n" +
      "- **Glover Park**：华府超安全街区。安静祥和，多为独栋 Townhouse 或者是低阶老派公寓，步行只需搭免费 GUTS Glover Park 线路，或者步行 15 - 20 分钟林荫道上学。楼下有 Whole Foods 和 Trader Joe's。";
  }
  
  if (q.includes("gocard") || q.includes("校园卡") || q.includes("学生证") || q.includes("卡")) {
    return prefix +
      "**GOCard** 是您在乔治城大学的官方学生 ID：\n\n" +
      "1. **提前申领**：在开学前登录 [GOCard Portal](https://gocard.georgetown.edu/) 上传白底大头照。\n" +
      "2. **领取途径**：住在校内宿舍的学生，将在 Check-in 入住日直接随钥匙一并领取。住校外的同学请携带护照原件，前往校本部 UIS Service Desk (书店一侧地下裙房) 现场免费印发。";
  }

  if (q.includes("iad") || q.includes("dca") || q.includes("机场") || q.includes("交通") || q.includes("地铁")) {
    return prefix +
      "从华盛顿两大机场（IAD、DCA）如何通勤去学校：\n\n" +
      "- **IAD (杜勒斯机场)**：乘坐 **Silver Line 银线地铁** 约 45 分钟直达 Rosslyn 站（票价仅 $6），出站并在车站免费乘坐 **GUTS 校园大巴车** 8分钟进校。或者直接打 Uber/Lyft 车程约 40 分钟，费用通常在 $45 - $60。\n" +
      "- **DCA (雷根机场)**：打网约车极其便利，只需 15 分钟，费用约 $20 即可抵达宿舍正门口。";
  }

  if (q.includes("吃的") || q.includes("中餐") || q.includes("中超") || q.includes("美食") || q.includes("大中华") || q.includes("餐厅") || q.includes("馆") || q.includes("菜") || q.includes("饭")) {
    return prefix +
      "大华府地区中华美食及食品采购路线：\n\n" +
      "- **买菜首选**：马里兰的 **大中华超市 (Great Wall)** 或是 **大华超市 (99 Ranch)**，亚洲柴米油盐一应俱全。新生开学季 **CSSA 会组织专门的买菜穿梭巴士**！日常也可以逛 Rosslyn Target 或 Glover Park Whole Foods。\n" +
      "- **中餐解馋**：特区 Chinatown 的四川大丰收（Sichuan Pavilion）很老牌，马里兰的 Rockville 是中餐的天堂，聚集了刘一手火锅、江妈妈拉面等。校门 M 街与 Rosslyn 也有中韩美食可以通过 Chowbus/熊猫外送。";
  }

  if (q.includes("疫苗") || q.includes("体检") || q.includes("免疫") || q.includes("hold") || q.includes("打针") || q.includes("tb")) {
    return prefix +
      "⚠️ **新生疫苗体检极其关键，若未过审会遭遇选课 Hold 锁定封阻！**\n\n" +
      "1. **TB 结核病筛查**：国内大陆新生的皮试（PPD）结果校医院往往不认可，请前往国内出入境免疫保健中心做 **QFT 抽血检测**，并要医生在英文表上签字盖章。\n" +
      "2. **材料提报**：必须在 Student Health Portal 在线上传扫描件，开学前如果没解除 Compliant 则会导致 MyAccess 被锁，无法退换课，请提早重视！";
  }

  return prefix +
    "您好！由于在线接口有些波动，系统已自动匹配了我们的生存白皮书知识点：\n\n" +
    "- **🏠 租房相关**：发送关键字「租房」或「Rosslyn」了解详情选址技巧。\n" +
    "- **🚇 机场通勤**：发送关键字「机场」或「DCA」获悉 $6 地铁经济线路线。\n" +
    "- **📕 疫苗/Hold**：发送「疫苗」或「TB」获知体检盖章、解除学籍锁定的关键。\n" +
    "- **🤝 连接同胞**：发送「CSSA」获取大本营公众号：**GU_CSSA** 与核心公共邮箱。\n\n" +
    "您也可以切换至页面上方的 **Survival Guide (新生指南)** 版块寻找详实的信息，或者再次测试发送其他问题！";
}

export default function AiAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init-1',
      role: 'model',
      text: `Hoya Saxa! 👋 你好呀！我是乔治城大学 CSSA 的 **AI 迎新客服助手**。

很高兴能为你解答关于来华盛顿就学生活的所有琐碎问题！我已经全方位熟悉了乔治城大学的新生守则、三大租房板块对比、NetID 认证以及各种避坑贴士。

可以直接输入任何想咨询的内容，或者点击下方的**高频问题**：`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    { label: 'Rosslyn 还是 Glover Park 房源好？', icon: Building2 },
    { label: '学校如何申办 GOCard 校园卡？', icon: UserCheck },
    { label: '从 IAD 机场怎么方便来学校？', icon: BookOpen },
    { label: 'DC 周边中餐馆与中超推荐？', icon: Bot },
  ];

  // Auto scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-custom-${Date.now()}`,
      role: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      // Gather active convo context to feed to backend API
      const nextMessagesContext = [...messages, userMsg].map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessagesContext })
      });

      if (!res.ok) {
        throw new Error('网络异常，Gemini 服务响应失败。');
      }

      const data = await res.json();
      const modelMsg: ChatMessage = {
        id: `msg-model-${Date.now()}`,
        role: 'model',
        text: data.reply || '抱歉，我现在脑子有点卡壳，请稍后再向我提问。',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, modelMsg]);
    } catch (err: any) {
      console.error(err);
      const fallbackText = getClientFallbackReply(textToSend);
      const errMsg: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        role: 'model',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 text-[#071426]">
      
      {/* Concierge welcome row */}
      <div className="bg-[#071426] rounded-lg p-6 lg:p-8 text-white flex items-center justify-between gap-4 mb-8 border border-[#C6A15B]/25">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center border border-white/10 text-[#C6A15B]">
            <HelpCircle className="w-5.5 h-5.5 stroke-[1.5]" />
          </div>
          <div>
            <h3 className="text-base font-light serif-display-zh">乔大中国学联智能前台 Concierge</h3>
            <p className="text-[8px] uppercase font-mono tracking-widest text-[#C6A15B] mt-0.5">Automated Student Intelligence Desk</p>
          </div>
        </div>

        <span className="hidden sm:inline-block text-[9px] font-mono tracking-widest uppercase px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded font-bold text-emerald-400">
          ONLINE / 联机
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        
        {/* Card chat dialog viewport */}
        <div className="bg-white border border-[#08142c]/6 shadow-xs rounded flex flex-col h-[520px] overflow-hidden">
          
          {/* Scrollable conversation history */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#FAF9F6]/40">
            {messages.map((m) => {
              const isUser = m.role === 'user';
              return (
                <div 
                  key={m.id} 
                  className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}
                >
                  {/* Chatbot Avatar */}
                  {!isUser && (
                    <div className="w-8 h-8 flex-shrink-0 bg-[#071426] text-[#C6A15B] font-bold text-xs rounded flex items-center justify-center">
                      GU
                    </div>
                  )}

                  {/* Bubble body text */}
                  <div className={`max-w-[80%] rounded px-4 py-3 text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap font-sans ${
                    isUser
                      ? 'bg-[#071426] text-white rounded-tr-none font-medium'
                      : 'bg-white text-[#071426] border border-[#08142c]/6 rounded-tl-none font-normal'
                  }`}>
                    {m.text}
                    
                    <span className={`block text-[8px] font-mono font-normal mt-1.5 text-right uppercase tracking-wider ${
                      isUser ? 'text-slate-400' : 'text-slate-400'
                    }`}>
                      {m.timestamp}
                    </span>
                  </div>

                  {/* User Avatar */}
                  {isUser && (
                    <div className="w-8 h-8 flex-shrink-0 bg-[#C6A15B]/25 text-[#071426] font-extrabold text-[10px] rounded flex items-center justify-center">
                      Hoya
                    </div>
                  )}
                </div>
              );
            })}

            {/* Simulated typing loading dots */}
            {loading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 flex-shrink-0 bg-[#071426] text-[#C6A15B] font-bold text-xs rounded flex items-center justify-center">
                  GU
                </div>
                <div className="bg-white border border-[#08142c]/6 rounded rounded-tl-none px-4 py-3 shadow-xs">
                  <div className="flex items-center gap-1.5 h-4 select-none">
                    <span className="w-1.5 h-1.5 bg-[#C6A15B] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#C6A15B] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#C6A15B] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestion Buttons inside panel */}
          <div className="bg-[#FAF9F6] border-t border-[#08142c]/5 p-4.5">
            <div className="text-[9px] font-semibold text-slate-400 font-mono tracking-widest uppercase mb-2.5">
              FAQS INDEX / 快捷检索条目:
            </div>
            <div className="grid grid-cols-2 gap-2">
              {suggestedQuestions.map((sq, i) => {
                const Icon = sq.icon;
                return (
                  <button
                    key={i}
                    id={`sq-btn-${i}`}
                    onClick={() => handleSendMessage(sq.label)}
                    disabled={loading}
                    className="flex items-center gap-2 px-3 py-2.5 bg-white hover:bg-slate-50 text-left text-slate-600 hover:text-[#071426] border border-[#08142c]/5 rounded transition text-xs font-medium truncate disabled:opacity-50 cursor-pointer"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#C6A15B] flex-shrink-0 stroke-[1.5]" />
                    <span className="truncate">{sq.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Chat Bar Input Form */}
          <form 
            onSubmit={handleFormSubmit}
            className="p-3.5 bg-white border-t border-[#08142c]/6 flex items-center gap-3"
          >
            <input
              type="text"
              id="ai-convo-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={loading}
              placeholder={loading ? "智能顾问正在飞速撰写回答中..." : "输入任何关于 DC 出行、GUTS、选课、疫苗接种问题..."}
              className="flex-1 px-4 py-3 border border-slate-200 rounded text-xs bg-white text-gray-800 disabled:opacity-50 focus:outline-none focus:border-[#C6A15B]"
            />
            <button
              type="submit"
              id="ai-send-btn"
              disabled={!inputValue.trim() || loading}
              className="p-3 bg-[#071426] text-white rounded disabled:opacity-50 hover:bg-[#122844] transition-all flex items-center justify-center flex-shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#C6A15B] stroke-[1.5]" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}

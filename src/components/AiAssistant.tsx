import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, Send, Sparkles, MessageSquare, BookOpen, Building2, UserCheck, Bot } from 'lucide-react';
import { ChatMessage } from '../types';

export default function AiAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init-1',
      role: 'model',
      text: `Hoya Saxa! 👋 你好呀！我是乔治城大学 CSSA (乔大中国学联) 的 **AI 迎新助手**。

很高兴能为你解答关于来华盛顿就学生活的所有琐碎问题！我已经全方位熟悉了乔治城大学的新生守则、三大租房板块对比、NetID 认证以及各种避坑贴士。

你可以直接输入你想咨询的内容，或者点击下方的**常见高频问题**：`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    { label: 'Rosslyn 还是 Glover Park 好？', icon: Building2 },
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
      const errMsg: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        role: 'model',
        text: '❌ 哎呀，网络出了点小状况（可能 API 密钥尚未配置或请求被拦截）。您可以先浏览我们的 **Survival Guide (新生指南)** 版块寻找对应资讯。',
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      
      {/* Dynamic chat title container banner */}
      <div className="bg-gradient-to-r from-[#041E42] via-[#0B2545] to-[#1a4175] rounded-3xl p-6.5 text-white shadow-lg border-b-4 border-[#C5A059] flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
            <HelpCircle className="w-7 h-7 text-[#C5A059]" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold tracking-tight">乔大中国学联 1V1 智能顾问</h3>
            <p className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059] font-bold">Powered by Gemini 3.5 AI</p>
          </div>
        </div>

        <span className="hidden sm:inline-block text-xs font-semibold px-3 py-1 bg-white/10 rounded-full font-mono text-emerald-300">
          ● Online / 实时应答
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        
        {/* Card chat dialog viewport */}
        <div className="bg-white border border-slate-200 shadow-xl rounded-3xl flex flex-col h-[550px] overflow-hidden">
          
          {/* Scrollable conversation history */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-slate-50/50">
            {messages.map((m) => {
              const isUser = m.role === 'user';
              return (
                <div 
                  key={m.id} 
                  className={`flex items-start gap-4 ${isUser ? 'justify-end' : ''}`}
                >
                  {/* Chatbot Avatar */}
                  {!isUser && (
                    <div className="w-9 h-9 flex-shrink-0 bg-[#041E42] text-[#C5A059] font-extrabold text-sm rounded-xl flex items-center justify-center border border-[#C5A059]/30">
                      GU
                    </div>
                  )}

                  {/* Bubble body text */}
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-xs whitespace-pre-wrap ${
                    isUser
                      ? 'bg-[#041E42] text-white rounded-tr-none font-medium'
                      : 'bg-white text-gray-800 border border-slate-200/60 rounded-tl-none font-normal'
                  }`}>
                    {m.text}
                    
                    <span className={`block text-[9px] font-mono font-normal mt-1.5 text-right uppercase tracking-wider ${
                      isUser ? 'text-white/60' : 'text-gray-400'
                    }`}>
                      {m.timestamp}
                    </span>
                  </div>

                  {/* User Avatar */}
                  {isUser && (
                    <div className="w-9 h-9 flex-shrink-0 bg-[#C5A059]/25 text-[#041E42] font-black text-xs rounded-xl flex items-center justify-center border border-slate-200">
                      ME
                    </div>
                  )}
                </div>
              );
            })}

            {/* Simulated typing loading dots */}
            {loading && (
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 flex-shrink-0 bg-[#041E42] text-[#C5A059] font-extrabold text-sm rounded-xl flex items-center justify-center border">
                  GU
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-xs">
                  <div className="flex items-center gap-1.5 h-4 select-none">
                    <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestion Buttons inside panel */}
          <div className="bg-white border-t border-slate-200/80 p-4">
            <div className="text-[10px] font-bold text-gray-400 font-mono tracking-wider uppercase mb-2">
              不知道问什么？点击快速探讨：
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
                    className="flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-[#041E42]/5 text-left text-gray-600 hover:text-gray-900 border border-slate-200 rounded-xl transition text-xs font-semibold truncate disabled:opacity-50"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />
                    <span className="truncate">{sq.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Chat Bar Input Form */}
          <form 
            onSubmit={handleFormSubmit}
            className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-3.5"
          >
            <input
              type="text"
              id="ai-convo-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={loading}
              placeholder={loading ? "智能顾问正在飞速撰写回答中..." : "向 AI 迎新专家提问任何 DC 出行、GUTS、选课、疫苗接种问题..."}
              className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-[#041E42] text-xs bg-white text-gray-800 disabled:opacity-50 shadow-inner"
            />
            <button
              type="submit"
              id="ai-send-btn"
              disabled={!inputValue.trim() || loading}
              className="p-3 bg-[#041E42] text-white rounded-xl disabled:opacity-50 hover:bg-[#0B2545] shadow-md transition-all flex items-center justify-center flex-shrink-0"
            >
              <Send className="w-4 h-4 text-[#C5A059]" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}

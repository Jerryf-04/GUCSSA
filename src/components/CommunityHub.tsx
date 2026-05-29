import React, { useState, useEffect } from 'react';
import { Search, PlusCircle, MessageSquare, Phone, BadgeDollarSign, MapPin, Sparkles, Filter, Trash2 } from 'lucide-react';
import { Post } from '../types';

export default function CommunityHub() {
  const [activeTab, setActiveTab] = useState<'all' | 'housing' | 'marketplace'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);

  // Form states for posting an item:
  const [postTitle, setPostTitle] = useState('');
  const [postAuthor, setPostAuthor] = useState('');
  const [postCategory, setPostCategory] = useState<'housing' | 'marketplace'>('housing');
  const [postContent, setPostContent] = useState('');
  const [postContact, setPostContact] = useState('');
  const [postPrice, setPostPrice] = useState('');
  const [postLocation, setPostLocation] = useState('');

  // Initial Seed Data if local storage is blank
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('gu-cssa-community-posts');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        id: 'post-1',
        title: 'Rosslyn 豪华公寓 CV 1B1B 客厅招短租 / 可长租 (超赞河景/秒接GUTS班车)',
        author: '张同学 (MS SFS)',
        date: '2026-05-27',
        category: 'housing',
        content: '由于暑期及秋季学期需要往返马里兰实习，急招客厅或室友拼房。Rosslyn 顶级公寓 CV，隔断完备，独立洗烘、采光巨好、带有24h前台。步行5分钟即可到达 Key Bridge，桥下直接搭乘 GU 免费 GUTS Shuttles，5-8分钟直达主校区，极度推荐外交系和商科新生！价格可商议。',
        contact: '微信: zhang_georgetown_2026',
        location: 'Rosslyn, VA'
      },
      {
        id: 'post-2',
        title: '低价出九成新 IKEA 学习升降电脑椅、静音台灯及高功率蒸汽熨斗',
        author: '王同学 (Public Policy)',
        date: '2026-05-26',
        category: 'marketplace',
        content: '回国前便宜处理家具！椅子在宜家官网 $89 购入，现 $30 搬走；LED台灯多光段可调 几乎全新 $10 出；手持式蒸汽挂烫机非常适合商学院同学熨正装，只需 $5！仅限 Glover Park 地区自提（可协助送到校门口），先到先得。',
        contact: 'Email: qw789@georgetown.edu',
        price: '$35 刀 (可单出)'
      },
      {
        id: 'post-3',
        title: 'Glover Park Glover House 联排 Townhouse 二楼副卧拼房招新 (求安静少煮饭女室友)',
        author: '林同学 (McCourt)',
        date: '2026-05-25',
        category: 'housing',
        content: 'Glover Park 极其安全的住宅。离学校 Glover Park GUTS 班车路线走路仅需3分钟。目前一楼副卧居住一位 McCourt 硕士二年级女生，安静作息规律。现招二楼阳光大副卧拼房室友，限女生，不带宠物不带外人留宿，房租每月 $1100 包水暖气，即拉即住。',
        contact: '微信: lin_hoyas_99',
        location: 'Glover Park, DC'
      },
      {
        id: 'post-4',
        title: '出手几乎全新 2024 款中版 4/4 码练习中胡/二胡 (含松香、备用琴弦)',
        author: '刘学者 (GU Bio)',
        date: '2026-05-23',
        category: 'marketplace',
        content: '出国进修带过来的中式经典二胡，由于平时科研项目紧张基本没时间练习，九九新没任何划伤。由于要搬家去别州，特价转手给同样喜爱古风器乐的中国童鞋，原价 $150 刀购得，现在仅需 $50 折价转让！可约校内 Healy 大厅后面看琴面交。',
        contact: '电话: (240) 233-xxxx',
        price: '$50'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('gu-cssa-community-posts', JSON.stringify(posts));
  }, [posts]);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postAuthor.trim() || !postContent.trim() || !postContact.trim()) {
      alert('请将必要信息（标题、作者、正文、联系方式）填写完整！');
      return;
    }

    const newPost: Post = {
      id: `post-custom-${Date.now()}`,
      title: postTitle.trim(),
      author: postAuthor.trim(),
      date: new Date().toISOString().split('T')[0],
      category: postCategory,
      content: postContent.trim(),
      contact: postContact.trim(),
      price: postCategory === 'marketplace' ? (postPrice.trim() || '价格面议') : undefined,
      location: postCategory === 'housing' ? (postLocation.trim() || 'DC 周边') : undefined,
    };

    setPosts(prev => [newPost, ...prev]);
    setShowPostModal(false);

    // Reset Form Fields
    setPostTitle('');
    setPostAuthor('');
    setPostContent('');
    setPostContact('');
    setPostPrice('');
    setPostLocation('');
  };

  const handleDeletePost = (id: string) => {
    if (confirm('确定要删除这条拼房/闲置交易贴吗？')) {
      setPosts(prev => prev.filter(p => p.id !== id));
    }
  };

  const filteredPosts = posts.filter((post) => {
    // Tab categorization filter
    const matchesTab = activeTab === 'all' || post.category === activeTab;
    
    // Search query filter
    const lowerQuery = searchQuery.toLowerCase();
    const matchesSearch = 
      post.title.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery) ||
      post.author.toLowerCase().includes(lowerQuery) ||
      (post.location && post.location.toLowerCase().includes(lowerQuery)) ||
      (post.price && post.price.toLowerCase().includes(lowerQuery));

    return matchesTab && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      
      {/* Intro section text */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-200 pb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] font-mono">
            GU CSSA Neighborhood Help Board
          </span>
          <h2 className="text-3xl font-black text-[#041E42] tracking-tight mt-1">
            乔大生活圈：周边拼房、长短租与闲置交易板
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-3xl leading-relaxed">
            欢迎来到乔治城学者专属拼房与交易市集。无论你是在 Rosslyn、Glover Park 寻觅投契的女室友、在毕业季折价变卖二手家具，还是求租临时客厅，你都可以在本广场自主发帖！(本板数据存储于您当前的本地浏览器中)
          </p>
        </div>

        <button
          id="community-new-post-btn"
          onClick={() => setShowPostModal(true)}
          className="flex-shrink-0 flex items-center justify-center gap-2 px-6 py-3.5 bg-[#041E42] hover:bg-[#0B2545] text-white font-bold rounded-xl text-xs shadow-lg shadow-[#041E42]/10 hover:shadow-xl transition-all duration-300"
        >
          <PlusCircle className="w-4.5 h-4.5 text-[#C5A059]" />
          <span>自主发帖 / 闲置求房单</span>
        </button>
      </div>

      {/* Control panel and filters split */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        
        {/* Left Toggles */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1.5 md:pb-0">
          <button
            id="community-tab-all"
            onClick={() => setActiveTab('all')}
            className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
              activeTab === 'all'
                ? 'bg-[#041E42] text-[#C5A059] shadow-sm'
                : 'text-gray-500 hover:text-gray-900 hover:bg-slate-100'
            }`}
          >
            🔍 全部告示 ({posts.length})
          </button>
          <button
            id="community-tab-housing"
            onClick={() => setActiveTab('housing')}
            className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
              activeTab === 'housing'
                ? 'bg-blue-50 text-blue-700 border border-blue-100'
                : 'text-gray-500 hover:text-gray-900 hover:bg-slate-100'
            }`}
          >
            🏠 周边租房拼房 ({posts.filter(p => p.category === 'housing').length})
          </button>
          <button
            id="community-tab-marketplace"
            onClick={() => setActiveTab('marketplace')}
            className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
              activeTab === 'marketplace'
                ? 'bg-amber-50 text-amber-700 border border-amber-100'
                : 'text-gray-500 hover:text-gray-900 hover:bg-slate-100'
            }`}
          >
            📦 闲置 flea-market ({posts.filter(p => p.category === 'marketplace').length})
          </button>
        </div>

        {/* Right Search Input Box */}
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3.5 top-1/2 -convert-y -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
          <input
            type="text"
            id="community-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索物品名、房源地段、发帖人、微信号..."
            className="w-full pl-10 pr-4 py-2 bg-white text-gray-800 border border-slate-200 focus:border-[#041E42] focus:outline-none rounded-xl text-xs shadow-inner"
          />
        </div>

      </div>

      {/* Grid containing listings cards */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => {
            const isCustom = post.id.startsWith('post-custom-');
            return (
              <div 
                key={post.id} 
                id={`community-post-${post.id}`}
                className="bg-white border border-slate-200/75 rounded-2xl p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  
                  {/* Card head metadata */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold tracking-wider font-mono px-2.5 py-1 rounded-full uppercase ${
                        post.category === 'housing' 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'bg-amber-50 text-amber-600'
                      }`}>
                        {post.category === 'housing' ? '🏢 合租拼房' : '🏷️ Flea Market'}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">{post.date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Author stamp */}
                      <span className="text-[11px] text-slate-500 font-medium">By: {post.author}</span>
                      
                      {/* Allow deleting custom posts */}
                      {isCustom && (
                        <button
                          id={`delete-post-btn-${post.id}`}
                          onClick={() => handleDeletePost(post.id)}
                          className="p-1 rounded bg-slate-100 text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition"
                          title="删除我的帖子"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Body Text */}
                  <div className="space-y-1.5">
                    <h4 className="font-extrabold text-gray-900 text-sm leading-snug line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-gray-600 text-xs leading-relaxed font-normal whitespace-pre-wrap">
                      {post.content}
                    </p>
                  </div>

                </div>

                {/* Footer contact details */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  
                  {/* Pricing/Location indicators */}
                  {post.category === 'housing' && post.location && (
                    <div className="flex items-center gap-1.5 text-gray-700 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200/50">
                      <MapPin className="w-4 h-4 text-sky-500" />
                      <span className="font-bold">{post.location}</span>
                    </div>
                  )}

                  {post.category === 'marketplace' && post.price && (
                    <div className="flex items-center gap-1.5 text-amber-800 bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-200/40">
                      <BadgeDollarSign className="w-4 h-4 text-emerald-500" />
                      <span className="font-bold">{post.price}</span>
                    </div>
                  )}

                  {/* Reply Action detail */}
                  <div className="flex items-center gap-2 bg-[#041E42]/5 text-[#041E42] px-3 py-1.5 rounded-xl border border-[#041E42]/5">
                    <MessageSquare className="w-4 h-4 text-[#C5A059]" />
                    <span className="font-semibold select-all text-[11px]">{post.contact}</span>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center space-y-4 max-w-xl mx-auto">
          <Sparkles className="w-12 h-12 text-[#C5A059] mx-auto opacity-70" />
          <h3 className="text-lg font-bold text-gray-900">未找到任何拼房或商品交易通知</h3>
          <p className="text-gray-500 text-xs">
            换个关键词试试，或者点击右上角「自主发帖」成为本类别第一份合租与闲置告示！
          </p>
          <button
            onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
            className="text-xs font-bold text-[#041E42] underline"
          >
            重置分类
          </button>
        </div>
      )}

      {/* Creation Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity overflow-y-auto">
          <div 
            id="community-post-modal"
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto my-8"
          >
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-5">
              <h3 className="font-extrabold text-[#041E42] text-base">发布互助帖子 (拼房 / 闲置互通)</h3>
              <button 
                onClick={() => setShowPostModal(false)}
                className="p-1 rounded-full text-gray-400 hover:bg-slate-100 hover:text-gray-700 transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 text-xs text-gray-700">
                  <label className="font-bold block">发布类别 *</label>
                  <select
                    id="post-category"
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-[#041E42] text-sm bg-white"
                  >
                    <option value="housing">🏢 周边合租拼房房源</option>
                    <option value="marketplace">🏷️ Flea Market 闲置杂货出让</option>
                  </select>
                </div>

                <div className="space-y-1.5 text-xs text-gray-700">
                  <label className="font-bold block">你的称呼/身份 *</label>
                  <input
                    type="text"
                    id="post-author"
                    required
                    value={postAuthor}
                    onChange={(e) => setPostAuthor(e.target.value)}
                    placeholder="例如: 蒋同学 (商学商科)"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-[#041E42] text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-gray-700">
                <label className="font-bold block">帖子标题 * (简要阐述物品名或合租意图)</label>
                <input
                  type="text"
                  id="post-title"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="例如: Rosslyn 豪华公寓 CV 主卧低价降租招安静小姐姐"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-[#041E42] text-sm"
                />
              </div>

              {postCategory === 'housing' ? (
                <div className="space-y-1.5 text-xs text-gray-700">
                  <label className="font-bold block">房源大致区域 (如 Rosslyn, Glover Park, Burleith)</label>
                  <input
                    type="text"
                    id="post-location"
                    value={postLocation}
                    onChange={(e) => setPostLocation(e.target.value)}
                    placeholder="例如: Glover Park, DC"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-[#041E42] text-sm"
                  />
                </div>
              ) : (
                <div className="space-y-1.5 text-xs text-gray-700">
                  <label className="font-bold block">拟定价格 / 币种 (如 $35 刀, $5面议等)</label>
                  <input
                    type="text"
                    id="post-price"
                    value={postPrice}
                    onChange={(e) => setPostPrice(e.target.value)}
                    placeholder="例如: $45 / 面议"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-[#041E42] text-sm"
                  />
                </div>
              )}

              <div className="space-y-1.5 text-xs text-gray-700">
                <label className="font-bold block">详细内容描述 * (详细补充房间情况、家具磨损度、自提方式)</label>
                <textarea
                  id="post-content"
                  required
                  rows={4}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="描述中多写写周边班车频率、杂费自理、家具是赠是卖等更易速成交易..."
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-[#041E42] text-sm resize-none"
                />
              </div>

              <div className="space-y-1.5 text-xs text-gray-700">
                <label className="font-bold block">联系方式 * (微信 / 手机 / 邮箱 任意即可)</label>
                <input
                  type="text"
                  id="post-contact"
                  required
                  value={postContact}
                  onChange={(e) => setPostContact(e.target.value)}
                  placeholder="例如: 微信: hoyas_stu 或 Email: abc@georgetown.edu"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-[#041E42] text-sm"
                />
              </div>

              <div className="bg-blue-50 text-[10px] text-blue-700 leading-normal p-3 rounded-xl border border-blue-200/50">
                ⚠️ 发帖须知：请勿发布非法中介、高利房贷、枪支以及任何欺诈性广告。GU CSSA 仅提供纯净的同学交流平台，拼房交易时切勿提前给无第三方安全机构支付巨额定金。
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="w-1/3 py-3 border border-slate-200 text-gray-600 rounded-xl font-bold text-xs hover:bg-slate-50 transition"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 bg-[#041E42] text-white rounded-xl font-bold text-xs hover:bg-[#0B2545] shadow-md shadow-[#041E42]/10 transition"
                >
                  确认发布
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

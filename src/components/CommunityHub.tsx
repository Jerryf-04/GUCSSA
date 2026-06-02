import React, { useState, useEffect } from 'react';
import { Search, PlusCircle, MessageSquare, MapPin, Sparkles, Trash2, BadgeDollarSign } from 'lucide-react';
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 text-[#071426]">
      
      {/* Intro section text */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#08142c]/8 pb-8">
        <div className="max-w-3xl">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#C6A15B] uppercase block mb-1">
            GU CSSA Neighborhood Help Board
          </span>
          <h2 className="text-3xl font-light tracking-tight mt-1 leading-tight serif-display-zh">
            拼合住宿、学舍求房与 flea market 交易市集
          </h2>
          <p className="text-slate-500 text-xs sm:text-[13px] mt-2 leading-relaxed">
            欢迎查阅大华府学者自治布告栏。本版旨在促进各学院学者自主互助：求拼房、转赠宜家床垫及教材、或者寻找安全的 Glover Park 室友。所有发帖数据仅独立私密存储于您的当前本地浏览器中。
          </p>
        </div>

        <button
          id="community-new-post-btn"
          onClick={() => setShowPostModal(true)}
          className="flex-shrink-0 flex items-center justify-center gap-2 px-5 py-3.5 bg-[#071426] hover:bg-[#122844] text-white font-mono text-xs uppercase tracking-wider rounded transition-all duration-200 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-[#C6A15B]" />
          <span>自主发帖 Post Notice</span>
        </button>
      </div>

      {/* Control panel and filters split */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-3.5 border-b border-[#08142c]/5">
        
        {/* Left Toggles */}
        <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1.5 md:pb-0">
          <button
            id="community-tab-all"
            onClick={() => setActiveTab('all')}
            className={`px-4.5 py-2.5 text-xs font-medium rounded transition-all duration-200 border cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#071426] text-white border-hoya-gold/40 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 border-transparent'
            }`}
          >
            全部告示 Notice ({posts.length})
          </button>
          <button
            id="community-tab-housing"
            onClick={() => setActiveTab('housing')}
            className={`px-4.5 py-2.5 text-xs font-medium rounded transition-all duration-200 border cursor-pointer ${
              activeTab === 'housing'
                ? 'bg-[#071426] text-white border-hoya-gold/40 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 border-transparent'
            }`}
          >
            本山及周边拼房 ({posts.filter(p => p.category === 'housing').length})
          </button>
          <button
            id="community-tab-marketplace"
            onClick={() => setActiveTab('marketplace')}
            className={`px-4.5 py-2.5 text-xs font-medium rounded transition-all duration-200 border cursor-pointer ${
              activeTab === 'marketplace'
                ? 'bg-[#071426] text-white border-hoya-gold/40 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 border-transparent'
            }`}
          >
            闲置二手 ({posts.filter(p => p.category === 'marketplace').length})
          </button>
        </div>

        {/* Right Search Input Box */}
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3.5 top-1/2 -convert-y -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            id="community-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索地段、闲置物品、发帖人、联系方式..."
            className="w-full pl-9 pr-4 py-2.5 bg-white text-[#071426] border border-[#08142c]/10 focus:border-[#C6A15B] focus:outline-none rounded text-xs transition duration-200 placeholder-slate-400"
          />
        </div>

      </div>

      {/* Grid containing listings cards */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => {
            const isCustom = post.id.startsWith('post-custom-');
            return (
              <div 
                key={post.id} 
                id={`community-post-${post.id}`}
                className="bg-white border border-[#08142c]/6 rounded p-6.5 hover:shadow-xs transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  
                  {/* Card head metadata */}
                  <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-[8px] font-bold tracking-widest font-mono px-2 py-0.5 rounded uppercase border ${
                        post.category === 'housing' 
                          ? 'bg-[#071426]/5 text-[#071426] border-[#071426]/10' 
                          : 'bg-[#C6A15B]/5 text-[#C6A15B] border-[#C6A15B]/25'
                      }`}>
                        {post.category === 'housing' ? '🏢 HOUSING / 拼房' : '🏷️ MARKETPLACE / 闲置'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{post.date}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <span className="scale-90 bg-slate-50 px-2 py-0.5 rounded font-medium text-slate-500">By {post.author}</span>
                      
                      {/* Allow deleting custom posts */}
                      {isCustom && (
                        <button
                          id={`delete-post-btn-${post.id}`}
                          onClick={() => handleDeletePost(post.id)}
                          className="p-1 rounded text-red-500 hover:bg-rose-50 hover:text-red-700 transition"
                          title="删除我的帖子"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Body Text */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-[#071426] text-[14.5px] leading-snug line-clamp-2 font-serif-zh">
                      {post.title}
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal whitespace-pre-wrap">
                      {post.content}
                    </p>
                  </div>

                </div>

                {/* Footer contact details */}
                <div className="mt-6 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  
                  {/* Pricing/Location indicators */}
                  {post.category === 'housing' && post.location && (
                    <div className="flex items-center gap-1 text-slate-600 font-mono text-[11px] bg-slate-50 px-2.5 py-1 rounded">
                      <MapPin className="w-3.5 h-3.5 text-[#C6A15B] stroke-[1.5]" />
                      <span className="font-semibold">{post.location}</span>
                    </div>
                  )}

                  {post.category === 'marketplace' && post.price && (
                    <div className="flex items-center gap-1 text-[#C6A15B] font-mono text-[11px] bg-[#FAF9F6] px-2.5 py-1 rounded border border-[#C6A15B]/20">
                      <BadgeDollarSign className="w-3.5 h-3.5 text-[#C6A15B] stroke-[1.5]" />
                      <span className="font-bold">{post.price}</span>
                    </div>
                  )}

                  {/* Reply Action detail */}
                  <div className="flex items-center gap-2 bg-[#071426]/5 px-3 py-1.5 rounded text-[11px] font-mono text-[#071426]">
                    <MessageSquare className="w-3.5 h-3.5 text-[#C6A15B] stroke-[1.5]" />
                    <span className="font-bold select-all">{post.contact}</span>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-[#08142c]/6 rounded p-16 text-center space-y-4 max-w-xl mx-auto">
          <Sparkles className="w-10 h-10 text-[#C6A15B] mx-auto animate-pulse" />
          <h3 className="text-lg font-light serif-display-zh">未检索到关联学舍或闲置通报</h3>
          <p className="text-slate-400 text-xs">
            尝试更换检索词汇，或者自主发起新帖。数据将立即保存在您本地。
          </p>
          <button
            onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
            className="text-xs font-bold text-[#071426] underline cursor-pointer"
          >
            重置分类
          </button>
        </div>
      )}

      {/* Creation Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071426]/75 backdrop-blur-xs transition-opacity overflow-y-auto">
          <div 
            id="community-post-modal"
            className="bg-white rounded max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto my-8"
          >
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-5">
              <h3 className="font-semibold text-[#071426] text-[15px] serif-display-zh">发起周边交易及合租告示</h3>
              <button 
                onClick={() => setShowPostModal(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-700 transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 font-sans text-xs text-slate-700">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold block text-[#071426]">通告类别 *</label>
                  <select
                    id="post-category"
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded text-xs bg-white focus:outline-none focus:border-[#C6A15B]"
                  >
                    <option value="housing">🏢 周边合租拼房房源</option>
                    <option value="marketplace">🏷️ Flea Market 闲置物让</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold block text-[#071426]">你的称呼与NetID *</label>
                  <input
                    type="text"
                    id="post-author"
                    required
                    value={postAuthor}
                    onChange={(e) => setPostAuthor(e.target.value)}
                    placeholder="例: 林同学 (Bio硕士)"
                    className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold block text-[#071426]">告示标题 *</label>
                <input
                  type="text"
                  id="post-title"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="例: Rosslyn 1B1B 带全套家具寻少煮饭女舍友"
                  className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              {postCategory === 'housing' ? (
                <div className="space-y-1.5">
                  <label className="font-semibold block text-[#071426]">大致地区 (如 Rosslyn, Glover Park)</label>
                  <input
                    type="text"
                    id="post-location"
                    value={postLocation}
                    onChange={(e) => setPostLocation(e.target.value)}
                    placeholder="例如: Rosslyn, VA"
                    className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="font-semibold block text-[#071426]">拟定出让价格 (USD或面议)</label>
                  <input
                    type="text"
                    id="post-price"
                    value={postPrice}
                    onChange={(e) => setPostPrice(e.target.value)}
                    placeholder="例如: $40"
                    className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="font-semibold block text-[#071426]">通告正文细节描述 *</label>
                <textarea
                  id="post-content"
                  required
                  rows={4}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="详细列举房屋配置、采光、舍友期望要求、或出让物品折旧度与自提地点..."
                  className="w-full px-3 py-2 border border-slate-300 rounded text-xs resize-none focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold block text-[#071426]">联系方式 * (微信 / 邮箱 / 电话)</label>
                <input
                  type="text"
                  id="post-contact"
                  required
                  value={postContact}
                  onChange={(e) => setPostContact(e.target.value)}
                  placeholder="例: wechat: abc_hoya 或 mail: abc@georgetown.edu"
                  className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div className="bg-[#FAF9F6] text-[10px] text-amber-800 leading-relaxed p-3.5 rounded border border-[#C6A15B]/25">
                📢 学联提醒：本版面为自主互助信息交换版。在签定正式公寓长租/次期租约或面交高值数码设备前，切勿草率向非官方账户进行任何形式的大额转账抵押。
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="w-1/3 py-2.5 border border-slate-200 text-slate-500 rounded font-bold text-xs hover:bg-slate-50 transition"
                >
                  取消 Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 bg-[#071426] text-white rounded font-bold text-xs hover:bg-[#122844] transition-all"
                >
                  发布告示 Publish
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

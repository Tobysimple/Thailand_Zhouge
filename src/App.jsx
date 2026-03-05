import React, { useState, useRef } from 'react';
import { 
  Plane, 
  MapPin, 
  Clock, 
  Users, 
  Calendar, 
  Camera, 
  Utensils, 
  Waves,
  Hotel,
  LogOut,
  LayoutGrid,
  GanttChartSquare,
  Coffee,
  ShoppingBag,
  MoveHorizontal,
  Check,
  Filter,
  ChevronRight,
  Sparkles,
  Edit3,
  X,
  Save
} from 'lucide-react';

const App = () => {
  // 8位成员数据：分配专属颜色系统
  const initialMembers = [
    { id: 1, name: "洲哥", arrival: "2026-04-18T15:00", departure: "2026-04-22T15:00", color: "#6366f1", bg: "bg-indigo-500", text: "text-indigo-600", light: "bg-indigo-50", border: "border-indigo-100" },
    { id: 2, name: "然哥", arrival: "2026-04-18T02:00", departure: "2026-04-22T18:00", color: "#10b981", bg: "bg-emerald-500", text: "text-emerald-600", light: "bg-emerald-50", border: "border-emerald-100" },
    { id: 3, name: "霖哥", arrival: "2026-04-18T02:00", departure: "2026-04-22T18:00", color: "#f43f5e", bg: "bg-rose-500", text: "text-rose-600", light: "bg-rose-50", border: "border-rose-100" },
    { id: 4, name: "阿露", arrival: "2026-04-18T02:00", departure: "2026-04-22T18:00", color: "#f59e0b", bg: "bg-amber-500", text: "text-amber-600", light: "bg-amber-50", border: "border-amber-100" },
    { id: 5, name: "波哥", arrival: "2026-04-17T10:00", departure: "2026-04-22T20:00", color: "#8b5cf6", bg: "bg-violet-500", text: "text-violet-600", light: "bg-violet-50", border: "border-violet-100" },
    { id: 6, name: "阿雁", arrival: "2026-04-17T14:00", departure: "2026-04-22T19:00", color: "#0ea5e9", bg: "bg-sky-500", text: "text-sky-600", light: "bg-sky-50", border: "border-sky-100" },
    { id: 7, name: "虾米", arrival: "2026-04-17T18:00", departure: "2026-04-22T17:00", color: "#84cc16", bg: "bg-lime-500", text: "text-lime-600", light: "bg-lime-50", border: "border-lime-100" },
    { id: 8, name: "妍", arrival: "2026-04-17T22:00", departure: "2026-04-22T16:00", color: "#ec4899", bg: "bg-pink-500", text: "text-pink-600", light: "bg-pink-50", border: "border-pink-100" },
  ];

  // 初始行程数据
  const initialSchedule = [
    { day: "D1", date: "2026-04-17", items: [
      { type: 'transport', title: '分批接机', desc: '专车送达休息', loc: 'BKK机场' },
      { type: 'food', title: '建兴酒家', desc: '招牌咖喱蟹', loc: 'Siam Square' },
      { type: 'culture', title: '暹罗商圈', desc: '潮流中心自由行', loc: 'Central World' },
      { type: 'food', title: '湄南河晚宴', desc: 'Iconsiam景观', loc: 'Iconsiam' },
      { type: 'hotel', title: '阿玛瑞酒店', desc: 'Amari Bangkok', loc: '市中心' }
    ]},
    { day: "D2", date: "2026-04-18", items: [
      { type: 'culture', title: '大皇宫', desc: '泰王室文化精粹', loc: 'Grand Palace' },
      { type: 'food', title: '宫廷泰餐', desc: 'Blue Elephant', loc: 'Sathorn' },
      { type: 'culture', title: '全员集结', desc: '洲哥到达，全员集结', loc: '酒店大堂' },
      { type: 'food', title: 'Jodd夜市', desc: '火山排骨/海鲜', loc: 'Rama IX' },
      { type: 'hotel', title: '阿玛瑞酒店', desc: '续住休息', loc: 'Hotel' }
    ]},
    { day: "D3", date: "2026-04-19", items: [
      { type: 'transport', title: '跨城包车', desc: '前往芭提雅', loc: 'Highway' },
      { type: 'food', title: '避风港海鲜', desc: '绝美海边餐厅', loc: 'Beach side' },
      { type: 'culture', title: '真理圣殿', desc: '全木结构奇迹', loc: 'Pattaya' },
      { type: 'food', title: '芭提雅步行街', desc: '霓虹与狂欢', loc: 'Walking St.' },
      { type: 'hotel', title: '希尔顿酒店', desc: 'Hilton Pattaya', loc: '海滨' }
    ]},
    { day: "D4", date: "2026-04-20", items: [
      { type: 'nature', title: '格兰岛', desc: '浮潜/拖曳伞', loc: 'Koh Larn' },
      { type: 'food', title: '海岛BBQ', desc: '沙滩阳光午餐', loc: 'Beach' },
      { type: 'culture', title: '酒店泳池', desc: '希尔顿午后日落', loc: 'Hotel' },
      { type: 'food', title: '蒂芬妮秀', desc: '视听艺术盛宴', loc: 'Tiffany' },
      { type: 'hotel', title: '希尔顿酒店', desc: '续住休息', loc: 'Hotel' }
    ]},
    { day: "D5", date: "2026-04-21", items: [
      { type: 'nature', title: '东芭乐园', desc: '热带园林景观', loc: 'Nong Nooch' },
      { type: 'food', title: '水上市场', desc: '四方文化体验', loc: 'Floating Mkt' },
      { type: 'culture', title: '悬崖夕阳', desc: 'Sky Gallery摄影', loc: 'Sky Gallery' },
      { type: 'food', title: '告别晚宴', desc: '最后狂欢派对', loc: 'Beach Bar' },
      { type: 'hotel', title: '希尔顿酒店', desc: '末晚休息', loc: 'Hotel' }
    ]},
    { day: "D6", date: "2026-04-22", items: [
      { type: 'shopping', title: '王权免税店', desc: '最后伴手礼采购', loc: 'King Power' },
      { type: 'food', title: '泰式自助', desc: 'Ramayana午餐', loc: 'King Power' },
      { type: 'transport', title: '送机返程', desc: '根据航班出发', loc: 'BKK机场' },
      { type: 'food', title: '机场简餐', desc: '回忆时刻', loc: 'Airport' },
      { type: 'hotel', title: '回到家乡', desc: '行程圆满结束', loc: 'Home' }
    ]}
  ];

  const [activeMemberId, setActiveMemberId] = useState(1);
  const [viewMode, setViewMode] = useState('global'); 
  const [visibleMemberIds, setVisibleMemberIds] = useState(initialMembers.map(m => m.id));
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [fullSchedule, setFullSchedule] = useState(initialSchedule);
  const [editModal, setEditModal] = useState(null); // { dayIdx, itemIdx, data }

  const timeSlots = [
    { label: "上午/接机", icon: <Plane size={14}/> },
    { label: "午餐时刻", icon: <Utensils size={14}/> },
    { label: "下午/景点", icon: <Camera size={14}/> },
    { label: "晚餐/夜店", icon: <Coffee size={14}/> },
    { label: "酒店/休息", icon: <Hotel size={14}/> },
  ];

  const handleViewChange = (mode) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setViewMode(mode);
      setIsTransitioning(false);
    }, 250);
  };

  const handleMemberChange = (id) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveMemberId(id);
      setIsTransitioning(false);
    }, 200);
  };

  const checkStatus = (member, dayIndex, slotIndex) => {
    const arrival = new Date(member.arrival);
    const departure = new Date(member.departure);
    const baseHour = [9, 12, 15, 19, 22];
    const checkTime = new Date(`2026-04-${17 + dayIndex}T${baseHour[slotIndex]}:00:00`);
    if (checkTime < arrival) return 'not_arrived';
    if (checkTime > departure) return 'departed';
    return 'present';
  };

  const toggleMemberVisibility = (id) => {
    setVisibleMemberIds(prev => 
      prev.includes(id) ? prev.filter(mid => mid !== id) : [...prev, id]
    );
  };

  const saveEdit = () => {
    const newSchedule = [...fullSchedule];
    newSchedule[editModal.dayIdx].items[editModal.itemIdx] = editModal.data;
    setFullSchedule(newSchedule);
    setEditModal(null);
  };

  const currentMember = initialMembers.find(m => m.id === activeMemberId);
  const filteredMembers = initialMembers.filter(m => visibleMemberIds.includes(m.id));

  // 强制黑体字体家族
  const fontStyle = {
    fontFamily: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Heiti SC", sans-serif'
  };

  return (
    <div style={fontStyle} className="min-h-screen bg-[#f8fafc] text-slate-900 pb-12 selection:bg-indigo-100">
      
      {/* 编辑弹窗 */}
      {editModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl border border-white/20 scale-100 animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black flex items-center gap-2">
                <Edit3 size={20} className="text-indigo-600" /> 修改行程
              </h3>
              <button onClick={() => setEditModal(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            <div className="space-y-5">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block ml-1">项目名称</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  value={editModal.data.title}
                  onChange={(e) => setEditModal({...editModal, data: {...editModal.data, title: e.target.value}})}
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block ml-1">详细描述</label>
                <textarea 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none h-24"
                  value={editModal.data.desc}
                  onChange={(e) => setEditModal({...editModal, data: {...editModal.data, desc: e.target.value}})}
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block ml-1">地点定位</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  value={editModal.data.loc}
                  onChange={(e) => setEditModal({...editModal, data: {...editModal.data, loc: e.target.value}})}
                />
              </div>
              <button 
                onClick={saveEdit}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all active:scale-95"
              >
                <Save size={18} /> 保存更改
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 顶部高端导航 */}
      <nav className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-200/60 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-slate-900 p-2 rounded-xl text-white shadow-lg shadow-slate-200 rotate-3">
              <Sparkles size={18} />
            </div>
            <div>
              <h1 className="text-base font-black tracking-tighter leading-none">TAI HAPPINESS</h1>
              <p className="text-[10px] font-bold text-slate-400 mt-1 tracking-widest uppercase">2026 行程看板</p>
            </div>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/50">
            <button 
              onClick={() => handleViewChange('individual')} 
              className={`px-5 py-1.5 rounded-lg text-[11px] font-black transition-all duration-300 flex items-center gap-2 ${viewMode === 'individual' ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <LayoutGrid size={14} /> 个人视图
            </button>
            <button 
              onClick={() => handleViewChange('global')} 
              className={`px-5 py-1.5 rounded-lg text-[11px] font-black transition-all duration-300 flex items-center gap-2 ${viewMode === 'global' ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <GanttChartSquare size={14} /> 全员看板
            </button>
          </div>
        </div>
      </nav>

      <main className={`max-w-7xl mx-auto px-4 mt-8 transition-all duration-300 transform ${isTransitioning ? 'opacity-0 translate-y-4 scale-[0.98]' : 'opacity-100 translate-y-0 scale-100'}`}>
        
        {viewMode === 'individual' ? (
          <div className="max-w-lg mx-auto space-y-6">
            {/* 个人身份卡片 */}
            <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-200 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl ${currentMember.bg} text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-${currentMember.bg.split('-')[1]}-200`}>
                    {currentMember.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-black text-slate-900 tracking-tight">{currentMember.name}</h2>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${currentMember.light} ${currentMember.text}`}>
                        {currentMember.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold mt-1 flex items-center gap-1">
                      <Clock size={10} /> 4月17日 - 4月22日
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {initialMembers.map(m => (
                  <button 
                    key={m.id} 
                    onClick={() => handleMemberChange(m.id)} 
                    className={`h-10 rounded-xl transition-all duration-300 flex flex-col items-center justify-center border-2 ${activeMemberId === m.id ? `border-${m.bg.split('-')[1]}-500 bg-white scale-105 shadow-md` : 'border-transparent bg-slate-50 opacity-60'}`}
                  >
                    <span className={`text-xs font-black ${activeMemberId === m.id ? m.text : 'text-slate-400'}`}>{m.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 个人紧凑行程流 */}
            <div className="space-y-8">
              {fullSchedule.map((day, dIdx) => (
                <div key={dIdx} className="relative">
                  <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-slate-900 leading-none">{day.day}</span>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">April {day.date.split('-')[2]}</span>
                    </div>
                    <div className="h-px bg-slate-200 grow" />
                  </div>
                  <div className="space-y-3">
                    {day.items.map((item, iIdx) => {
                      const status = checkStatus(currentMember, dIdx, iIdx);
                      const isPresent = status === 'present';
                      return (
                        <div key={iIdx} className={`p-4 rounded-[1.8rem] border transition-all duration-300 ${!isPresent ? 'bg-slate-50 border-transparent opacity-30 grayscale scale-[0.97] origin-left' : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'}`}>
                          <div className="flex items-center gap-4">
                            <div className={`w-11 h-11 rounded-2xl shrink-0 flex items-center justify-center shadow-sm ${
                              !isPresent ? 'bg-slate-200 text-slate-400' : 
                              item.type === 'food' ? 'bg-orange-500 text-white' : 
                              item.type === 'hotel' ? 'bg-blue-500 text-white' : 'bg-slate-800 text-white'
                            }`}>
                              {item.type === 'food' ? <Utensils size={20}/> : item.type === 'hotel' ? <Hotel size={20}/> : <Camera size={20}/>}
                            </div>
                            <div className="grow">
                              <div className="flex justify-between items-center">
                                <h4 className="text-sm font-black text-slate-900">{item.title}</h4>
                                <div className="flex items-center gap-1">
                                  {isPresent && (
                                    <button 
                                      onClick={() => setEditModal({ dayIdx: dIdx, itemIdx: iIdx, data: {...item} })}
                                      className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-all"
                                    >
                                      <Edit3 size={12} />
                                    </button>
                                  )}
                                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{timeSlots[iIdx].label.split('/')[0]}</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between mt-1">
                                <p className="text-[11px] text-slate-500 font-medium leading-relaxed truncate max-w-[150px]">{item.desc}</p>
                                <div className="flex items-center gap-1 text-[9px] font-black text-slate-400 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">
                                  <MapPin size={8} /> {item.loc}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* 高集成度全员看板 */
          <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-200/60">
            {/* 顶部控制面板 */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col gap-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">全员协同时间轴</h3>
                  <p className="text-[11px] text-slate-400 font-bold mt-1 uppercase tracking-widest flex items-center gap-2">
                    <MoveHorizontal size={14}/> 左右滑动查看 8 人交叉行程覆盖
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200/60 shadow-sm">
                  <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-500">
                    <div className="w-2.5 h-2.5 bg-slate-800 rounded-sm" /> 行程
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-500">
                    <div className="w-2.5 h-2.5 bg-slate-100 border border-slate-200 rounded-sm" /> 缺席
                  </div>
                </div>
              </div>

              {/* 成员彩色开关 */}
              <div className="flex flex-wrap gap-1.5">
                {initialMembers.map(m => (
                  <button
                    key={m.id}
                    onClick={() => toggleMemberVisibility(m.id)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all duration-300 border flex items-center gap-2 ${
                      visibleMemberIds.includes(m.id) 
                      ? `${m.bg} text-white border-transparent shadow-lg shadow-${m.bg.split('-')[1]}-100 scale-105` 
                      : 'bg-white text-slate-300 border-slate-100'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-md flex items-center justify-center ${visibleMemberIds.includes(m.id) ? 'bg-white/20' : 'bg-slate-50'}`}>
                      {visibleMemberIds.includes(m.id) && <Check size={10} strokeWidth={4} />}
                    </div>
                    {m.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto no-scrollbar scroll-smooth">
              <div className="inline-flex min-w-full">
                {/* 固定成员列 */}
                <div className="sticky left-0 z-30 bg-white border-r border-slate-200 shadow-[4px_0_10px_rgba(0,0,0,0.02)]">
                  <div className="h-12 border-b border-slate-100 bg-slate-50/50 flex items-center justify-center min-w-[100px]">
                    <span className="text-[9px] font-black text-slate-300 tracking-widest uppercase">Member</span>
                  </div>
                  {filteredMembers.map(m => (
                    <div key={m.id} className="h-28 flex flex-col items-center justify-center border-b border-slate-50 px-4 bg-white transition-colors">
                      <div className={`w-10 h-10 rounded-xl ${m.bg} text-white flex items-center justify-center text-[11px] font-black mb-1.5 shadow-md shadow-${m.bg.split('-')[1]}-100`}>
                        {m.name.charAt(0)}
                      </div>
                      <span className="text-[11px] font-black text-slate-800">{m.name}</span>
                    </div>
                  ))}
                </div>

                {/* 内容滑动区域 */}
                <div className="flex">
                  {fullSchedule.map((day, dIdx) => (
                    <div key={dIdx} className={`flex border-r-2 border-slate-200/40 ${dIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                      {timeSlots.map((slot, sIdx) => (
                        <div key={sIdx} className="min-w-[150px] md:min-w-[190px]">
                          {/* 时间时段表头 */}
                          <div className="h-12 border-b border-slate-100 p-2.5 flex flex-col justify-center">
                            <div className="flex items-center justify-between">
                              <span className="text-[8px] font-black text-indigo-500 uppercase tracking-tighter">Day {dIdx + 1}</span>
                              <span className="text-[8px] font-bold text-slate-400">{day.date.split('-')[2]}日</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-black text-slate-800 mt-0.5">
                              <span className="opacity-40">{slot.icon}</span>
                              {slot.label.split('/')[0]}
                            </div>
                          </div>

                          {/* 协同单元格 */}
                          {filteredMembers.map(member => {
                            const status = checkStatus(member, dIdx, sIdx);
                            const activity = day.items[sIdx];
                            const isPresent = status === 'present';
                            return (
                              <div key={member.id} className="h-28 border-b border-slate-50 p-2 group">
                                {isPresent ? (
                                  <div className={`h-full rounded-2xl p-2.5 flex flex-col justify-between transition-all duration-300 group-hover:scale-[1.04] shadow-sm relative overflow-hidden group-hover:shadow-md ${member.bg}`}>
                                    <div className="absolute -right-2 -bottom-2 opacity-10 text-white rotate-12">
                                       {activity.type === 'food' ? <Utensils size={40}/> : activity.type === 'hotel' ? <Hotel size={40}/> : <Camera size={40}/>}
                                    </div>
                                    <div className="relative z-10 overflow-hidden">
                                      <h5 className="text-[10px] font-black text-white leading-tight truncate mb-1 border-b border-white/20 pb-1">{activity.title}</h5>
                                      <p className="text-[9px] text-white/80 leading-[1.2] line-clamp-2 font-medium">{activity.desc}</p>
                                    </div>
                                    <div className="relative z-10 flex items-center gap-1 text-[8px] font-black text-white/70 mt-auto bg-black/10 w-fit px-1.5 py-0.5 rounded-md">
                                      <MapPin size={8} /> {activity.loc}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="h-full rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center text-center opacity-40 grayscale">
                                    <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">{status === 'not_arrived' ? '未到' : '已离'}</span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;

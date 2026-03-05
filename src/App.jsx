import React, { useState, useRef, useEffect } from 'react';
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
  ChevronRight
} from 'lucide-react';

const App = () => {
  const initialMembers = [
    { id: 1, name: "洲哥", arrival: "2026-04-18T15:00", departure: "2026-04-22T15:00", status: "18号午后到" },
    { id: 2, name: "然哥", arrival: "2026-04-18T02:00", departure: "2026-04-22T18:00", status: "18号凌晨到" },
    { id: 3, name: "霖哥", arrival: "2026-04-18T02:00", departure: "2026-04-22T18:00", status: "18号凌晨到" },
    { id: 4, name: "阿露", arrival: "2026-04-18T02:00", departure: "2026-04-22T18:00", status: "18号凌晨到" },
    { id: 5, name: "波哥", arrival: "2026-04-17T10:00", departure: "2026-04-22T20:00", status: "首批到达" },
    { id: 6, name: "阿雁", arrival: "2026-04-17T14:00", departure: "2026-04-22T19:00", status: "首批到达" },
    { id: 7, name: "虾米", arrival: "2026-04-17T18:00", departure: "2026-04-22T17:00", status: "首批到达" },
    { id: 8, name: "妍", arrival: "2026-04-17T22:00", departure: "2026-04-22T16:00", status: "首批到达" },
  ];

  const [activeMemberId, setActiveMemberId] = useState(1);
  const [viewMode, setViewMode] = useState('global'); 
  const [visibleMemberIds, setVisibleMemberIds] = useState(initialMembers.map(m => m.id));
  const [isTransitioning, setIsTransitioning] = useState(false);

  const timeSlots = [
    { label: "上午/接机", icon: <Plane size={12}/> },
    { label: "午餐时刻", icon: <Utensils size={12}/> },
    { label: "下午/景点", icon: <Camera size={12}/> },
    { label: "晚餐/夜店", icon: <Coffee size={12}/> },
    { label: "酒店", icon: <Hotel size={12}/> },
  ];

  const schedule = [
    { day: "D1", date: "2026-04-17", items: [
      { type: 'transport', title: '分批接机', desc: '专车送机', loc: 'BKK机场' },
      { type: 'food', title: '建兴酒家', desc: '咖喱蟹', loc: 'Siam Square' },
      { type: 'culture', title: '市中心逛街', desc: '自由活动', loc: 'Central World' },
      { type: 'food', title: '湄南河晚宴', desc: '景观餐厅', loc: 'Iconsiam' },
      { type: 'hotel', title: '曼谷阿玛瑞', desc: 'Amari Bangkok', loc: '市中心' }
    ]},
    { day: "D2", date: "2026-04-18", items: [
      { type: 'culture', title: '大皇宫', desc: '必打卡', loc: 'Grand Palace' },
      { type: 'food', title: '宫廷泰餐', desc: 'Blue Elephant', loc: 'Sathorn' },
      { type: 'culture', title: '洲哥集结', desc: '全员到齐', loc: '酒店大堂' },
      { type: 'food', title: 'Jodd夜市', desc: '网红美食', loc: 'Rama IX' },
      { type: 'hotel', title: '曼谷阿玛瑞', desc: '续住', loc: 'Hotel' }
    ]},
    { day: "D3", date: "2026-04-19", items: [
      { type: 'transport', title: '跨城包车', desc: '往芭提雅', loc: 'Highway' },
      { type: 'food', title: '海边餐厅', desc: '海鲜大餐', loc: 'Beach side' },
      { type: 'culture', title: '真理圣殿', desc: '木雕建筑', loc: 'Pattaya' },
      { type: 'food', title: '步行街', desc: 'Walking St.', loc: 'Pattaya' },
      { type: 'hotel', title: '芭提雅希尔顿', desc: 'Hilton Pattaya', loc: '海滨' }
    ]},
    { day: "D4", date: "2026-04-20", items: [
      { type: 'nature', title: '格兰岛', desc: '浮潜游玩', loc: 'Koh Larn' },
      { type: 'food', title: '海岛午餐', desc: 'BBQ', loc: 'Beach' },
      { type: 'culture', title: '希尔顿泳池', desc: '日落午后', loc: 'Hotel' },
      { type: 'food', title: '蒂芬妮秀', desc: '顶级表演', loc: 'Tiffany' },
      { type: 'hotel', title: '芭提雅希尔顿', desc: '续住', loc: 'Hotel' }
    ]},
    { day: "D5", date: "2026-04-21", items: [
      { type: 'nature', title: '东芭乐园', desc: '热带园林', loc: 'Nong Nooch' },
      { type: 'food', title: '水上市场', desc: '小吃集合', loc: 'Floating Mkt' },
      { type: 'culture', title: '悬崖夕阳', desc: '绝美出片', loc: 'Sky Gallery' },
      { type: 'food', title: '告别派对', desc: '最后一晚', loc: 'Beach Bar' },
      { type: 'hotel', title: '芭提雅希尔顿', desc: '末晚', loc: 'Hotel' }
    ]},
    { day: "D6", date: "2026-04-22", items: [
      { type: 'shopping', title: '免税店', desc: '最后扫货', loc: 'King Power' },
      { type: 'food', title: '泰式自助', desc: 'Ramayana', loc: 'King Power' },
      { type: 'transport', title: '送机返航', desc: '根据航班', loc: 'BKK机场' },
      { type: 'food', title: '机场便餐', desc: '准备出发', loc: 'Airport' },
      { type: 'hotel', title: '温馨的家', desc: '行程圆满', loc: 'Home' }
    ]}
  ];

  // 模拟切换动画的函数
  const handleViewChange = (mode) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setViewMode(mode);
      setIsTransitioning(false);
    }, 300);
  };

  const handleMemberChange = (id) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveMemberId(id);
      setIsTransitioning(false);
    }, 250);
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

  const filteredMembers = initialMembers.filter(m => visibleMemberIds.includes(m.id));

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-10">
      <nav className="bg-white sticky top-0 z-50 border-b border-slate-200 px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 p-1 rounded-lg text-white">
              <Waves size={16} />
            </div>
            <h1 className="text-sm font-black tracking-tighter">THAI TRIP 2026</h1>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => handleViewChange('individual')} 
              className={`px-4 py-1.5 rounded-md text-[11px] font-black transition-all duration-300 ${viewMode === 'individual' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              个人视图
            </button>
            <button 
              onClick={() => handleViewChange('global')} 
              className={`px-4 py-1.5 rounded-md text-[11px] font-black transition-all duration-300 ${viewMode === 'global' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              全员看板
            </button>
          </div>
        </div>
      </nav>

      <main className={`max-w-7xl mx-auto px-3 mt-6 transition-all duration-300 transform ${isTransitioning ? 'opacity-0 translate-y-2 scale-[0.99]' : 'opacity-100 translate-y-0 scale-100'}`}>
        {viewMode === 'individual' ? (
          <div className="max-w-xl mx-auto space-y-4">
            {/* 紧凑型个人选择器 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xl font-black">
                  {initialMembers.find(m => m.id === activeMemberId).name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-sm font-black text-slate-900">{initialMembers.find(m => m.id === activeMemberId).name}</h2>
                  <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">{initialMembers.find(m => m.id === activeMemberId).status}</p>
                </div>
              </div>
              <div className="flex gap-1 overflow-x-auto no-scrollbar">
                {initialMembers.map(m => (
                  <button 
                    key={m.id} 
                    onClick={() => handleMemberChange(m.id)} 
                    className={`w-8 h-8 rounded-lg shrink-0 font-bold text-[10px] border transition-all ${activeMemberId === m.id ? 'bg-slate-900 text-white border-slate-900 scale-105' : 'bg-slate-50 text-slate-400 border-slate-200'}`}
                  >
                    {m.name.charAt(0)}
                  </button>
                ))}
              </div>
            </div>

            {/* 紧凑型行程列表 */}
            {schedule.map((day, dIdx) => (
              <div key={dIdx} className="space-y-2">
                <div className="flex items-center gap-3 px-2">
                  <span className="text-xl font-black text-slate-300">{day.day}</span>
                  <div className="h-px bg-slate-200 grow" />
                  <span className="text-[10px] font-bold text-slate-400">{day.date}</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {day.items.map((item, iIdx) => {
                    const status = checkStatus(initialMembers.find(m => m.id === activeMemberId), dIdx, iIdx);
                    const isActive = status === 'present';
                    return (
                      <div key={iIdx} className={`p-3 rounded-xl border transition-all duration-300 ${!isActive ? 'bg-slate-100 border-transparent opacity-30' : 'bg-white border-slate-200 shadow-sm'}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${
                            !isActive ? 'bg-slate-200 text-slate-400' : 
                            item.type === 'food' ? 'bg-orange-600 text-white' : 
                            item.type === 'hotel' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
                          }`}>
                            {item.type === 'food' ? <Utensils size={14}/> : item.type === 'hotel' ? <Hotel size={14}/> : <Camera size={14}/>}
                          </div>
                          <div className="grow overflow-hidden">
                            <div className="flex justify-between items-center">
                              <h4 className="text-[11px] font-bold text-slate-900 truncate">{item.title}</h4>
                              <span className="text-[9px] font-bold text-slate-400 shrink-0">{timeSlots[iIdx].label}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <p className="text-[10px] text-slate-500 truncate">{item.desc}</p>
                              <span className="text-[9px] text-slate-300">|</span>
                              <div className="flex items-center gap-0.5 text-[9px] text-slate-400 font-bold whitespace-nowrap">
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
        ) : (
          /* 高集成度全员看板 */
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-200">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-2 py-1 bg-slate-200 rounded-md text-slate-600 font-black text-[9px] uppercase tracking-tighter">
                  <Filter size={10} /> 筛选:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {initialMembers.map(m => (
                    <button
                      key={m.id}
                      onClick={() => toggleMemberVisibility(m.id)}
                      className={`px-3 py-1 rounded-md text-[10px] font-black transition-all border ${
                        visibleMemberIds.includes(m.id) 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                        : 'bg-white text-slate-300 border-slate-100'
                      }`}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400">
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald-600 rounded-sm" /> 参加</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-slate-100 border border-slate-200 rounded-sm" /> 缺席</div>
                <div className="flex items-center gap-1 text-slate-500"><MoveHorizontal size={14}/> 滑动</div>
              </div>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <div className="inline-flex min-w-full">
                {/* 固定列 - 缩小宽度 */}
                <div className="sticky left-0 z-30 bg-white border-r border-slate-200 shadow-[2px_0_5px_rgba(0,0,0,0.03)]">
                  <div className="h-10 border-b border-slate-100 bg-slate-50 flex items-center justify-center min-w-[80px]">
                    <span className="text-[9px] font-black text-slate-300 tracking-tighter uppercase">Member</span>
                  </div>
                  {filteredMembers.map(m => (
                    <div key={m.id} className="h-24 flex flex-col items-center justify-center border-b border-slate-50 p-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-[10px] font-black mb-1">
                        {m.name.charAt(0)}
                      </div>
                      <span className="text-[10px] font-bold text-slate-900">{m.name}</span>
                    </div>
                  ))}
                </div>

                {/* 内容列 - 缩小宽度和高度 */}
                <div className="flex">
                  {schedule.map((day, dIdx) => (
                    <div key={dIdx} className={`flex border-r border-slate-100 ${dIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                      {timeSlots.map((slot, sIdx) => (
                        <div key={sIdx} className="min-w-[130px] md:min-w-[160px]">
                          <div className="h-10 border-b border-slate-100 p-2 flex flex-col justify-center">
                            <div className="text-[8px] font-black text-indigo-500 uppercase leading-none mb-0.5">
                              {day.day} · {day.date.split('-')[2]}日
                            </div>
                            <div className="flex items-center gap-1 text-[9px] font-black text-slate-800">
                              {slot.icon} {slot.label}
                            </div>
                          </div>

                          {filteredMembers.map(member => {
                            const status = checkStatus(member, dIdx, sIdx);
                            const activity = day.items[sIdx];
                            const isPresent = status === 'present';
                            return (
                              <div key={member.id} className="h-24 border-b border-slate-50 p-1.5 group">
                                {isPresent ? (
                                  <div className={`h-full rounded-lg p-2 flex flex-col justify-between transition-transform duration-300 group-hover:scale-[1.03] shadow-sm ${
                                    activity.type === 'food' ? 'bg-orange-600 text-white' :
                                    activity.type === 'hotel' ? 'bg-blue-600 text-white' :
                                    'bg-emerald-600 text-white'
                                  }`}>
                                    <div>
                                      <h5 className="text-[10px] font-black leading-tight truncate border-b border-white/20 pb-1 mb-1">{activity.title}</h5>
                                      <p className="text-[9px] opacity-90 leading-[1.1] line-clamp-2">{activity.desc}</p>
                                    </div>
                                    <div className="text-[8px] font-black opacity-80 flex items-center gap-0.5 mt-auto">
                                      <MapPin size={8} /> {activity.loc}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="h-full rounded-lg border border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center text-center opacity-40">
                                    <div className="text-slate-300"><ChevronRight size={14} className="rotate-45" /></div>
                                    <span className="text-[8px] font-black text-slate-300 uppercase mt-1">缺席</span>
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

import React, { useState, useRef } from 'react';
import { 
  Plane, 
  MapPin, 
  Clock, 
  Users, 
  Info, 
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
  ArrowRightLeft,
  ChevronRight,
  MoveHorizontal
} from 'lucide-react';

const App = () => {
  // 8位成员精准数据
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
  const [viewMode, setViewMode] = useState('global'); // 默认显示全员看板以展示新功能
  
  const scrollContainerRef = useRef(null);

  // 时间轴时段定义
  const timeSlots = [
    { label: "上午/接机", icon: <Plane size={14}/> },
    { label: "午餐时刻", icon: <Utensils size={14}/> },
    { label: "下午/景点", icon: <Camera size={14}/> },
    { label: "晚餐/夜生活", icon: <Coffee size={14}/> },
    { label: "入住酒店", icon: <Hotel size={14}/> },
  ];

  // 行程数据
  const schedule = [
    { day: "D1", date: "2026-04-17", items: [
      { type: 'transport', title: '分批接机', desc: '专车送往酒店', loc: 'BKK机场' },
      { type: 'food', title: '建兴酒家', desc: '招牌咖喱蟹', loc: 'Siam Square' },
      { type: 'culture', title: '市中心逛街', desc: '自由活动', loc: 'Central World' },
      { type: 'food', title: '湄南河晚宴', desc: 'Iconsiam观景', loc: 'Iconsiam' },
      { type: 'hotel', title: '曼谷阿玛瑞', desc: 'Amari Bangkok', loc: '市中心' }
    ]},
    { day: "D2", date: "2026-04-18", items: [
      { type: 'culture', title: '大皇宫参访', desc: '经典必打卡', loc: 'Grand Palace' },
      { type: 'food', title: '宫廷泰餐', desc: 'Blue Elephant', loc: 'Sathorn' },
      { type: 'culture', title: '洲哥集结', desc: '全员最后集结', loc: '酒店大堂' },
      { type: 'food', title: 'Jodd夜市', desc: '网红美食扫荡', loc: 'Rama IX' },
      { type: 'hotel', title: '曼谷阿玛瑞', desc: '续住', loc: 'Hotel' }
    ]},
    { day: "D3", date: "2026-04-19", items: [
      { type: 'transport', title: '包车跨城', desc: '往芭提雅', loc: 'Highway' },
      { type: 'food', title: '海边餐厅', desc: '避风港海鲜', loc: 'Beach side' },
      { type: 'culture', title: '真理圣殿', desc: '震撼木雕', loc: 'Pattaya' },
      { type: 'food', title: '步行街探秘', desc: 'Walking St.', loc: 'Pattaya' },
      { type: 'hotel', title: '芭提雅希尔顿', desc: 'Hilton Pattaya', loc: '海滨' }
    ]},
    { day: "D4", date: "2026-04-20", items: [
      { type: 'nature', title: '格兰岛海岛游', desc: '浮潜/滑翔伞', loc: 'Koh Larn' },
      { type: 'food', title: '海岛BBQ', desc: '沙滩午餐', loc: 'Beach' },
      { type: 'culture', title: '放松/泳池', desc: '希尔顿午后', loc: 'Hotel' },
      { type: 'food', title: '蒂芬妮表演', desc: '豪华晚餐秀', loc: 'Tiffany' },
      { type: 'hotel', title: '芭提雅希尔顿', desc: '续住', loc: 'Hotel' }
    ]},
    { day: "D5", date: "2026-04-21", items: [
      { type: 'nature', title: '东芭乐园', desc: '热带园林', loc: 'Nong Nooch' },
      { type: 'food', title: '水上市场', desc: '特色小吃', loc: 'Floating Mkt' },
      { type: 'culture', title: '悬崖夕阳', desc: '拍照圣地', loc: 'Sky Gallery' },
      { type: 'food', title: '离别派对', desc: '告别晚餐', loc: 'Beach Bar' },
      { type: 'hotel', title: '芭提雅希尔顿', desc: '最后一晚', loc: 'Hotel' }
    ]},
    { day: "D6", date: "2026-04-22", items: [
      { type: 'shopping', title: '免税店采购', desc: '最后扫货', loc: 'King Power' },
      { type: 'food', title: '免税店午餐', desc: 'Ramayana', loc: 'King Power' },
      { type: 'transport', title: '送机返航', desc: '按航司出发', loc: 'BKK机场' },
      { type: 'food', title: '机餐/机场简餐', desc: '准备回家', loc: 'Airport' },
      { type: 'hotel', title: '温馨的家', desc: '行程结束', loc: 'Home' }
    ]}
  ];

  // 状态检查
  const checkStatus = (member, dayIndex, slotIndex) => {
    const arrival = new Date(member.arrival);
    const departure = new Date(member.departure);
    
    // 简化的时间映射逻辑
    const baseHour = [9, 12, 15, 19, 22];
    const checkTime = new Date(`2026-04-${17 + dayIndex}T${baseHour[slotIndex]}:00:00`);
    
    if (checkTime < arrival) return 'not_arrived';
    if (checkTime > departure) return 'departed';
    return 'present';
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 pb-10">
      {/* 顶部导航 */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-teal-600 p-1.5 rounded-lg text-white">
              <Waves size={18} />
            </div>
            <h1 className="text-sm font-black tracking-tight">2026 THAI-LOG</h1>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button onClick={() => setViewMode('individual')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'individual' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500'}`}>个人</button>
            <button onClick={() => setViewMode('global')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'global' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500'}`}>全员看板</button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 mt-6">
        {viewMode === 'individual' ? (
          /* 个人详情页 - 优化后的卡片流 */
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="bg-white rounded-3xl p-6 shadow-sm flex items-center justify-between border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-teal-600 text-white flex items-center justify-center text-2xl font-black">
                  {initialMembers.find(m => m.id === activeMemberId).name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-800">{initialMembers.find(m => m.id === activeMemberId).name}</h2>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{initialMembers.find(m => m.id === activeMemberId).status}</p>
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-[150px]">
                {initialMembers.map(m => (
                  <button key={m.id} onClick={() => setActiveMemberId(m.id)} className={`w-8 h-8 rounded-full shrink-0 font-bold text-[10px] border-2 transition-all ${activeMemberId === m.id ? 'bg-teal-600 text-white border-teal-200' : 'bg-slate-100 text-slate-400 border-transparent'}`}>
                    {m.name.charAt(0)}
                  </button>
                ))}
              </div>
            </div>

            {schedule.map((day, dIdx) => (
              <div key={dIdx} className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl font-black text-slate-200">{day.day}</span>
                  <div className="h-px bg-slate-200 grow" />
                  <span className="text-xs font-bold text-slate-400">{day.date}</span>
                </div>
                <div className="space-y-4">
                  {day.items.map((item, iIdx) => {
                    const status = checkStatus(initialMembers.find(m => m.id === activeMemberId), dIdx, iIdx);
                    return (
                      <div key={iIdx} className={`p-4 rounded-2xl border transition-all ${status !== 'present' ? 'bg-slate-50 border-transparent opacity-40' : 'bg-white border-slate-100 shadow-sm'}`}>
                        <div className="flex items-start gap-4">
                          <div className={`p-2 rounded-xl shrink-0 ${status !== 'present' ? 'bg-slate-200 text-slate-400' : item.type === 'food' ? 'bg-orange-50 text-orange-500' : item.type === 'hotel' ? 'bg-blue-50 text-blue-500' : 'bg-teal-50 text-teal-600'}`}>
                            {item.type === 'food' ? <Utensils size={20}/> : item.type === 'hotel' ? <Hotel size={20}/> : <Camera size={20}/>}
                          </div>
                          <div className="grow">
                            <div className="flex justify-between items-center mb-1">
                              <h4 className="text-sm font-black">{item.title}</h4>
                              <span className="text-[10px] font-bold text-slate-300">{timeSlots[iIdx].label}</span>
                            </div>
                            <p className="text-xs text-slate-500">{item.desc}</p>
                            <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400 font-bold italic">
                              <MapPin size={10} /> {item.loc}
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
          /* 全员看板 - 高密度泳道图 */
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4 bg-slate-50/50">
              <div>
                <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                  <GanttChartSquare className="text-teal-600" /> 全员同步时间轴
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-1">左右滑动查看完整 6 天行程详情</p>
              </div>
              <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                  <div className="w-3 h-3 bg-teal-500 rounded-sm shadow-sm shadow-teal-100" /> 参加
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                  <div className="w-3 h-3 bg-slate-100 border border-slate-200 rounded-sm" /> 缺席
                </div>
                <div className="flex items-center gap-1.5 text-teal-600 text-[10px] font-black animate-pulse">
                  <MoveHorizontal size={14}/> 左右滑动
                </div>
              </div>
            </div>

            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto no-scrollbar select-none"
            >
              <div className="inline-flex min-w-full">
                {/* 左侧固定列：成员姓名 */}
                <div className="sticky left-0 z-30 bg-white border-r border-slate-100 shadow-[4px_0_8px_rgba(0,0,0,0.02)]">
                  <div className="h-20 flex items-center justify-center border-b border-slate-100 bg-slate-50 p-4 min-w-[100px]">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Members</span>
                  </div>
                  {initialMembers.map(m => (
                    <div key={m.id} className="h-32 flex flex-col items-center justify-center border-b border-slate-50 p-4 transition-colors hover:bg-slate-50">
                      <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-black mb-2">
                        {m.name.charAt(0)}
                      </div>
                      <span className="text-xs font-black text-slate-700">{m.name}</span>
                    </div>
                  ))}
                </div>

                {/* 右侧：滑动时间轴内容 */}
                <div className="flex">
                  {schedule.map((day, dIdx) => (
                    <div key={dIdx} className={`flex border-r border-slate-100 ${dIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                      {/* 每一天的时间时段 */}
                      {timeSlots.map((slot, sIdx) => (
                        <div key={sIdx} className="min-w-[160px] md:min-w-[200px]">
                          {/* 时间轴表头 */}
                          <div className="h-20 border-b border-slate-100 p-3 flex flex-col justify-center">
                            <div className="flex items-center gap-1 text-[9px] font-black text-teal-600 mb-1 uppercase tracking-tighter">
                              {day.day} • {day.date.split('-')[2]}日
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
                              <span className="opacity-50">{slot.icon}</span>
                              {slot.label}
                            </div>
                          </div>

                          {/* 成员对应的活动单元格 */}
                          {initialMembers.map(member => {
                            const status = checkStatus(member, dIdx, sIdx);
                            const activity = day.items[sIdx];
                            
                            return (
                              <div key={member.id} className="h-32 border-b border-slate-50 p-2 group transition-all">
                                {status === 'present' ? (
                                  <div className={`h-full rounded-xl p-3 flex flex-col justify-between transition-all group-hover:scale-[1.02] shadow-sm ${
                                    activity.type === 'food' ? 'bg-orange-50/50 border border-orange-100 text-orange-900' :
                                    activity.type === 'hotel' ? 'bg-blue-50/50 border border-blue-100 text-blue-900' :
                                    'bg-teal-50/50 border border-teal-100 text-teal-900'
                                  }`}>
                                    <div>
                                      <h5 className="text-[11px] font-black leading-tight mb-1">{activity.title}</h5>
                                      <p className="text-[9px] opacity-70 leading-tight line-clamp-2">{activity.desc}</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-[9px] font-bold opacity-60">
                                      <MapPin size={8}/> {activity.loc}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="h-full rounded-xl border border-dashed border-slate-200 bg-slate-100/30 flex flex-col items-center justify-center text-center p-2">
                                    {status === 'not_arrived' ? (
                                      <>
                                        <Plane size={14} className="text-slate-300 mb-1" />
                                        <span className="text-[9px] font-black text-slate-300">尚未到达</span>
                                      </>
                                    ) : (
                                      <>
                                        <LogOut size={14} className="text-slate-300 mb-1" />
                                        <span className="text-[9px] font-black text-slate-300 uppercase">已返程</span>
                                      </>
                                    )}
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

      {/* 底部浮动信息 */}
      <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-50">
        <div className="bg-slate-900/95 backdrop-blur shadow-2xl rounded-2xl p-4 border border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Total Status</p>
              <p className="text-xs font-bold">全员集结: 18号 15:00 (洲哥到店)</p>
            </div>
          </div>
          <div className="flex -space-x-1.5">
            {initialMembers.slice(0, 4).map(m => (
              <div key={m.id} className="w-7 h-7 rounded-full border-2 border-slate-900 bg-teal-600 flex items-center justify-center text-[10px] font-black">
                {m.name.charAt(0)}
              </div>
            ))}
            <div className="w-7 h-7 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px] font-black text-slate-300">
              +4
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

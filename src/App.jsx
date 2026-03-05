import React, { useState, useRef, useMemo } from 'react';
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
  Sparkles,
  Edit3,
  X,
  Save,
  Plus,
  Trash2,
  Navigation,
  ArrowRight
} from 'lucide-react';

const App = () => {
  // 8位成员数据：增加详细航班信息字段
  const [members, setMembers] = useState([
    { id: 1, name: "洲哥", arrival: "2026-04-18T15:00", departure: "2026-04-22T15:00", arrFlight: "CA979", depFlight: "CA980", color: "#6366f1", bg: "bg-indigo-500", text: "text-indigo-600", light: "bg-indigo-50" },
    { id: 2, name: "然哥", arrival: "2026-04-18T02:00", departure: "2026-04-22T18:00", arrFlight: "ZH9003", depFlight: "ZH9004", color: "#10b981", bg: "bg-emerald-500", text: "text-emerald-600", light: "bg-emerald-50" },
    { id: 3, name: "霖哥", arrival: "2026-04-18T02:00", departure: "2026-04-22T18:00", arrFlight: "ZH9003", depFlight: "ZH9004", color: "#f43f5e", bg: "bg-rose-500", text: "text-rose-600", light: "bg-rose-50" },
    { id: 4, name: "阿露", arrival: "2026-04-18T02:00", departure: "2026-04-22T18:00", arrFlight: "ZH9003", depFlight: "ZH9004", color: "#f59e0b", bg: "bg-amber-500", text: "text-amber-600", light: "bg-amber-50" },
    { id: 5, name: "波哥", arrival: "2026-04-17T10:00", departure: "2026-04-22T20:00", arrFlight: "TG615", depFlight: "TG616", color: "#8b5cf6", bg: "bg-violet-500", text: "text-violet-600", light: "bg-violet-50" },
    { id: 6, name: "阿雁", arrival: "2026-04-17T14:00", departure: "2026-04-22T19:00", arrFlight: "MU547", depFlight: "MU548", color: "#0ea5e9", bg: "bg-sky-500", text: "text-sky-600", light: "bg-sky-50" },
    { id: 7, name: "虾米", arrival: "2026-04-17T18:00", departure: "2026-04-22T17:00", arrFlight: "CZ3081", depFlight: "CZ3082", color: "#84cc16", bg: "bg-lime-500", text: "text-lime-600", light: "bg-lime-50" },
    { id: 8, name: "妍", arrival: "2026-04-17T22:00", departure: "2026-04-22T16:00", arrFlight: "FM855", depFlight: "FM856", color: "#ec4899", bg: "bg-pink-500", text: "text-pink-600", light: "bg-pink-50" },
  ]);

  // 初始行程数据：增加 time 字段
  const [itinerary, setItinerary] = useState([
    { day: "D1", date: "2026-04-17", items: [
      { id: '1-1', time: '10:30', type: 'transport', title: '全天接机', desc: '专车素万那普机场接机', loc: 'BKK机场' },
      { id: '1-2', time: '13:00', type: 'food', title: '建兴酒家', desc: '首批抵达团员咖喱蟹大餐', loc: 'Siam Square' },
      { id: '1-3', time: '19:30', type: 'food', title: '湄南河迎新晚宴', desc: 'Iconsiam 景观露台', loc: 'Iconsiam' },
      { id: '1-4', time: '22:00', type: 'hotel', title: '入住阿玛瑞', desc: 'Amari Bangkok 办理入住', loc: '曼谷市中心' }
    ]},
    { day: "D2", date: "2026-04-18", items: [
      { id: '2-1', time: '09:30', type: 'culture', title: '大皇宫巡礼', desc: '泰王室文化深度游', loc: 'Grand Palace' },
      { id: '2-2', time: '12:00', type: 'food', title: '蓝象宫廷菜', desc: '米其林推荐泰餐', loc: 'Sathorn' },
      { id: '2-3', time: '15:30', type: 'transport', title: '洲哥集结', desc: '洲哥到店，全员集结完毕', loc: '酒店大堂' },
      { id: '2-4', time: '18:30', type: 'food', title: 'Jodd Fairs 夜市', desc: '火山排骨与网红小吃', loc: 'Rama IX' }
    ]},
    { day: "D3", date: "2026-04-19", items: [
      { id: '3-1', time: '10:00', type: 'transport', title: '包车出发', desc: '前往芭提雅，中途停靠休息站', loc: 'Highway' },
      { id: '3-2', time: '13:00', type: 'food', title: '避风港海鲜', desc: 'Pattaya 海边第一顿', loc: '海滨大道' },
      { id: '3-3', time: '15:30', type: 'culture', title: '真理圣殿', desc: '全木结构雕刻艺术', loc: 'Pattaya' },
      { id: '3-4', time: '20:00', type: 'food', title: '芭提雅红灯区', desc: '步行街夜生活初体验', loc: 'Walking St.' }
    ]},
    { day: "D4", date: "2026-04-20", items: [
      { id: '4-1', time: '09:00', type: 'nature', title: '格兰岛出海', desc: '快艇浮潜、水上项目', loc: 'Koh Larn' },
      { id: '4-2', time: '13:00', type: 'food', title: '沙滩 BBQ', desc: '蓝海阳光下午餐', loc: 'Beach side' },
      { id: '4-3', time: '19:30', type: 'food', title: '蒂芬妮晚餐秀', desc: '豪华人妖歌舞表演', loc: 'Tiffany' }
    ]},
    { day: "D5", date: "2026-04-21", items: [
      { id: '5-1', time: '10:30', type: 'nature', title: '东芭乐园', desc: '大象表演与热带景观', loc: 'Nong Nooch' },
      { id: '5-2', time: '13:00', type: 'food', title: '水上市场', desc: '四方水上小吃体验', loc: 'Floating Mkt' },
      { id: '5-3', time: '18:00', type: 'food', title: '告别晚宴', desc: '悬崖餐厅 Sky Gallery 聚餐', loc: 'Sky Gallery' }
    ]},
    { day: "D6", date: "2026-04-22", items: [
      { id: '6-1', time: '09:30', type: 'shopping', title: '免税店采购', desc: '王权免税店最后扫货', loc: 'King Power' },
      { id: '6-2', time: '12:00', type: 'food', title: '泰式自助', desc: '免税店拉玛亚那餐厅', loc: '免税店' },
      { id: '6-3', time: '14:30', type: 'transport', title: '送机开始', desc: '洲哥先行，后续成员依次送机', loc: 'Airport' }
    ]}
  ]);

  const [activeMemberId, setActiveMemberId] = useState(1);
  const [viewMode, setViewMode] = useState('individual'); 
  const [visibleMemberIds, setVisibleMemberIds] = useState(members.map(m => m.id));
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [modal, setModal] = useState(null); // { mode, dayIdx, itemIdx, data }
  const [memberModal, setMemberModal] = useState(null); // { memberId, data }

  // 计算排序后的行程
  const sortedItinerary = useMemo(() => {
    return itinerary.map(day => ({
      ...day,
      items: [...day.items].sort((a, b) => a.time.localeCompare(b.time))
    }));
  }, [itinerary]);

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

  const checkStatus = (member, dayDate, itemTime) => {
    const arrival = new Date(member.arrival);
    const departure = new Date(member.departure);
    const checkTime = new Date(`${dayDate}T${itemTime}:00`);
    if (checkTime < arrival) return 'not_arrived';
    if (checkTime > departure) return 'departed';
    return 'present';
  };

  const saveItem = () => {
    const newItinerary = [...sortedItinerary];
    if (modal.mode === 'add') {
      newItinerary[modal.dayIdx].items.push({ id: Math.random().toString(36), ...modal.data });
    } else {
      newItinerary[modal.dayIdx].items[modal.itemIdx] = modal.data;
    }
    setItinerary(newItinerary);
    setModal(null);
  };

  const saveMember = () => {
    const newMembers = members.map(m => m.id === memberModal.memberId ? { ...m, ...memberModal.data } : m);
    setMembers(newMembers);
    setMemberModal(null);
  };

  const currentMember = members.find(m => m.id === activeMemberId);

  const fontStyle = {
    fontFamily: '"PingFang SC", "Microsoft YaHei", "Heiti SC", sans-serif'
  };

  return (
    <div style={fontStyle} className="min-h-screen bg-[#fcfdfe] text-slate-900 pb-12 selection:bg-indigo-100">
      
      {/* 行程编辑弹窗 */}
      {modal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl scale-100 animate-in zoom-in-95 duration-300 border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black flex items-center gap-2">
                {modal.mode === 'add' ? <Plus size={20} className="text-emerald-600" /> : <Edit3 size={20} className="text-indigo-600" />}
                {modal.mode === 'add' ? '新增行程项' : '编辑行程'}
              </h3>
              <button onClick={() => setModal(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20} className="text-slate-300" /></button>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 mb-1 ml-1">具体时间</label>
                  <input type="time" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold" value={modal.data.time} onChange={(e)=>setModal({...modal, data: {...modal.data, time: e.target.value}})} />
                </div>
                <div className="flex-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 mb-1 ml-1">类型</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold" value={modal.data.type} onChange={(e)=>setModal({...modal, data: {...modal.data, type: e.target.value}})}>
                    <option value="food">餐饮</option><option value="culture">景点</option><option value="transport">交通</option><option value="hotel">酒店</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 mb-1 ml-1">标题</label>
                <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold" value={modal.data.title} onChange={(e)=>setModal({...modal, data: {...modal.data, title: e.target.value}})} />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 mb-1 ml-1">地点描述</label>
                <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold" value={modal.data.loc} onChange={(e)=>setModal({...modal, data: {...modal.data, loc: e.target.value}})} />
              </div>
              <button onClick={saveItem} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-all mt-4">保存行程</button>
            </div>
          </div>
        </div>
      )}

      {/* 航班编辑弹窗 */}
      {memberModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl border border-slate-100">
            <h3 className="text-xl font-black mb-6 flex items-center gap-2"><Plane size={20} className="text-indigo-600" /> 编辑航班信息</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 mb-1 ml-1">去程航班</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold uppercase" value={memberModal.data.arrFlight} onChange={(e)=>setMemberModal({...memberModal, data: {...memberModal.data, arrFlight: e.target.value}})} />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 mb-1 ml-1">返程航班</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold uppercase" value={memberModal.data.depFlight} onChange={(e)=>setMemberModal({...memberModal, data: {...memberModal.data, depFlight: e.target.value}})} />
                </div>
              </div>
              <button onClick={saveMember} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-all mt-4">完成并更新</button>
              <button onClick={()=>setMemberModal(null)} className="w-full py-3 text-slate-400 font-bold text-xs">取消修改</button>
            </div>
          </div>
        </div>
      )}

      {/* 顶部导航 */}
      <nav className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-slate-900 p-2 rounded-xl text-white shadow-lg rotate-3">
              <Sparkles size={18} />
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight leading-none">TAI HAPPINESS</h1>
              <p className="text-[10px] font-bold text-slate-400 mt-1 tracking-widest uppercase">2026 行程管理</p>
            </div>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl shadow-inner">
            <button onClick={() => handleViewChange('individual')} className={`px-5 py-1.5 rounded-lg text-[11px] font-black transition-all ${viewMode === 'individual' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>个人看板</button>
            <button onClick={() => handleViewChange('global')} className={`px-5 py-1.5 rounded-lg text-[11px] font-black transition-all ${viewMode === 'global' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>全员看板</button>
          </div>
        </div>
      </nav>

      <main className={`max-w-7xl mx-auto px-4 mt-8 transition-all duration-300 transform ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        
        {viewMode === 'individual' ? (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* 增强型个人中心 */}
            <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100">
              <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className={`w-16 h-16 rounded-[1.5rem] ${currentMember.bg} text-white flex items-center justify-center text-3xl font-black shadow-2xl shadow-${currentMember.bg.split('-')[1]}-100`}>
                    {currentMember.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{currentMember.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${currentMember.light} ${currentMember.text}`}>2026.04.17-22</span>
                    </div>
                  </div>
                </div>
                {/* 航班快捷看板 */}
                <div className="bg-slate-50 rounded-2xl p-4 flex-1 max-w-sm flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-black text-slate-400">去程航班</span>
                      <span className="text-sm font-black text-slate-800">{currentMember.arrFlight}</span>
                    </div>
                    <ArrowRight size={14} className="text-slate-300" />
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-black text-slate-400">返程航班</span>
                      <span className="text-sm font-black text-slate-800">{currentMember.depFlight}</span>
                    </div>
                  </div>
                  <button onClick={()=>setMemberModal({memberId: currentMember.id, data: {...currentMember}})} className="p-2 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-indigo-600 shadow-sm border border-transparent hover:border-slate-100">
                    <Edit3 size={16} />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mt-8">
                {members.map(m => (
                  <button key={m.id} onClick={() => handleMemberChange(m.id)} className={`h-11 rounded-2xl transition-all border-2 flex flex-col items-center justify-center ${activeMemberId === m.id ? `border-${m.bg.split('-')[1]}-500 bg-white shadow-lg` : 'border-transparent bg-slate-50 opacity-40 hover:opacity-100'}`}>
                    <span className={`text-[11px] font-black ${activeMemberId === m.id ? m.text : 'text-slate-400'}`}>{m.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 详细行程列表 */}
            <div className="space-y-10 mt-10">
              {sortedItinerary.map((day, dIdx) => (
                <div key={dIdx} className="relative">
                  <div className="flex items-center gap-4 mb-6 sticky top-20 z-10 bg-[#fcfdfe]/80 backdrop-blur-md py-2">
                    <span className="text-3xl font-black text-slate-900">{day.day}</span>
                    <div className="h-0.5 bg-slate-100 grow" />
                    <button onClick={()=>setModal({mode:'add', dayIdx:dIdx, data:{time:'12:00', type:'food', title:'', desc:'', loc:''}})} className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-2xl text-[10px] font-black flex items-center gap-1.5 hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                      <Plus size={14} /> 新增时段
                    </button>
                  </div>
                  <div className="space-y-4">
                    {day.items.map((item, iIdx) => {
                      const status = checkStatus(currentMember, day.date, item.time);
                      const isPresent = status === 'present';
                      return (
                        <div key={item.id} className={`group p-5 rounded-[2.2rem] border-2 transition-all duration-300 relative ${!isPresent ? 'bg-slate-50 border-transparent opacity-30 grayscale' : 'bg-white border-slate-100 shadow-sm hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50/50'}`}>
                          <div className="flex items-start gap-5">
                            <div className="flex flex-col items-center gap-2">
                              <div className={`w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center shadow-lg ${
                                !isPresent ? 'bg-slate-200 text-slate-400' : 
                                item.type === 'food' ? 'bg-orange-500 text-white' : 
                                item.type === 'hotel' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-white'
                              }`}>
                                {item.type === 'food' ? <Utensils size={24}/> : item.type === 'hotel' ? <Hotel size={24}/> : <Camera size={24}/>}
                              </div>
                              <span className={`text-[11px] font-black tracking-tight ${isPresent ? 'text-slate-400' : 'text-slate-300'}`}>{item.time}</span>
                            </div>
                            <div className="grow">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className={`text-base font-black tracking-tight ${isPresent ? 'text-slate-900' : 'text-slate-500'}`}>{item.title}</h4>
                                  <p className={`text-[11px] mt-1 font-medium leading-relaxed ${isPresent ? 'text-slate-500' : 'text-slate-400'}`}>{item.desc}</p>
                                </div>
                                {isPresent && (
                                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                    <button onClick={()=>setModal({mode:'edit', dayIdx:dIdx, itemIdx:iIdx, data:{...item}})} className="p-2 hover:bg-indigo-50 rounded-xl text-indigo-400 transition-colors"><Edit3 size={14}/></button>
                                    <button onClick={()=>{const n = [...sortedItinerary]; n[dIdx].items.splice(iIdx,1); setItinerary(n);}} className="p-2 hover:bg-rose-50 rounded-xl text-rose-400 transition-colors"><Trash2 size={14}/></button>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-3 mt-4">
                                <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                                  <MapPin size={10} /> {item.loc}
                                </div>
                                {!isPresent && <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">{status === 'not_arrived' ? '还没到' : '已回家'}</span>}
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
          /* 高效全员同步看板 */
          <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100/60">
            <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">全员协同同步看板</h3>
                  <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest flex items-center gap-2">
                    <MoveHorizontal size={16}/> 左右滑动以查看 8 人完整交叉行程
                  </p>
                </div>
                <div className="flex bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm gap-4">
                  {['在位','缺席'].map((label,i)=>(
                    <div key={label} className="flex items-center gap-2 text-[10px] font-black text-slate-500">
                      <div className={`w-3 h-3 rounded-sm ${i===0?'bg-slate-900':'bg-slate-100 border border-slate-200'}`} /> {label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {members.map(m => (
                  <button key={m.id} onClick={() => toggleMemberVisibility(m.id)} className={`px-4 py-2 rounded-2xl text-[11px] font-black transition-all flex items-center gap-2 ${visibleMemberIds.includes(m.id) ? `${m.bg} text-white shadow-lg scale-105` : 'bg-white text-slate-300 border-slate-100'}`}>
                    <Check size={12} className={visibleMemberIds.includes(m.id) ? 'opacity-100' : 'opacity-0'} /> {m.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto no-scrollbar scroll-smooth">
              <div className="inline-flex min-w-full">
                {/* 固定人员列 */}
                <div className="sticky left-0 z-30 bg-white border-r border-slate-100">
                  <div className="h-16 border-b border-slate-100 bg-slate-50 flex items-center justify-center min-w-[120px]">
                    <span className="text-[10px] font-black text-slate-300 tracking-widest uppercase">Member</span>
                  </div>
                  {members.filter(m => visibleMemberIds.includes(m.id)).map(m => (
                    <div key={m.id} className="h-32 flex flex-col items-center justify-center border-b border-slate-50 px-6 bg-white">
                      <div className={`w-12 h-12 rounded-2xl ${m.bg} text-white flex items-center justify-center text-sm font-black mb-2 shadow-lg shadow-${m.bg.split('-')[1]}-100`}>
                        {m.name.charAt(0)}
                      </div>
                      <span className="text-xs font-black text-slate-800">{m.name}</span>
                    </div>
                  ))}
                </div>

                {/* 内容滑动区 */}
                <div className="flex">
                  {sortedItinerary.map((day, dIdx) => (
                    <div key={dIdx} className={`flex border-r-2 border-slate-200/30 ${dIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/20'}`}>
                      {day.items.map((item, iIdx) => (
                        <div key={item.id} className="min-w-[160px] md:min-w-[200px]">
                          <div className="h-16 border-b border-slate-100 p-4 flex flex-col justify-center">
                            <div className="flex justify-between items-center text-[9px] font-black text-indigo-500 uppercase tracking-tighter">
                              <span>Day {dIdx + 1}</span>
                              <span className="opacity-40">{item.time}</span>
                            </div>
                            <div className="text-[11px] font-black text-slate-900 mt-0.5 truncate">{item.title}</div>
                          </div>
                          {members.filter(m => visibleMemberIds.includes(m.id)).map(member => {
                            const status = checkStatus(member, day.date, item.time);
                            const isPresent = status === 'present';
                            return (
                              <div key={member.id} className="h-32 border-b border-slate-50 p-2.5">
                                {isPresent ? (
                                  <div className={`h-full rounded-[1.4rem] p-3 flex flex-col justify-between transition-all ${member.bg} shadow-md`}>
                                    <div>
                                      <h5 className="text-[10px] font-black text-white truncate border-b border-white/20 pb-1.5 mb-2">{item.title}</h5>
                                      <p className="text-[9px] text-white/70 leading-tight line-clamp-2">{item.desc}</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-[8px] font-black text-white/60 bg-black/10 w-fit px-1.5 py-0.5 rounded-md">
                                      <MapPin size={8} /> {item.loc}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="h-full rounded-[1.4rem] border-2 border-dashed border-slate-100 bg-slate-50/40 flex flex-col items-center justify-center text-center opacity-30 grayscale">
                                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{status === 'not_arrived' ? '未到' : '已离'}</span>
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

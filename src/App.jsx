import React, { useState } from 'react';
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
  ShoppingBag
} from 'lucide-react';

const App = () => {
  // 8位成员数据更新：洲哥、然哥、霖哥、波哥、阿露、阿雁、虾米、妍
  const initialMembers = [
    { id: 1, name: "洲哥", arrival: "2026-04-18T15:00", departure: "2026-04-22T15:00", flight: "待定", status: "晚到早走" },
    { id: 2, name: "然哥", arrival: "2026-04-18T02:00", departure: "2026-04-22T18:00", flight: "待定", status: "18号凌晨到" },
    { id: 3, name: "霖哥", arrival: "2026-04-18T02:00", departure: "2026-04-22T18:00", flight: "待定", status: "18号凌晨到" },
    { id: 4, name: "阿露", arrival: "2026-04-18T02:00", departure: "2026-04-22T18:00", flight: "待定", status: "18号凌晨到" },
    { id: 5, name: "波哥", arrival: "2026-04-17T10:00", departure: "2026-04-22T20:00", flight: "TG615", status: "首批到达" },
    { id: 6, name: "阿雁", arrival: "2026-04-17T14:00", departure: "2026-04-22T19:00", flight: "MU547", status: "首批到达" },
    { id: 7, name: "虾米", arrival: "2026-04-17T18:00", departure: "2026-04-22T17:00", flight: "CZ3081", status: "首批到达" },
    { id: 8, name: "妍", arrival: "2026-04-17T22:00", departure: "2026-04-22T16:00", flight: "FM855", status: "首批到达" },
  ];

  const [activeMemberId, setActiveMemberId] = useState(1);
  const [viewMode, setViewMode] = useState('individual'); 
  
  const activeMember = initialMembers.find(m => m.id === activeMemberId);

  // 详尽行程数据，包含午晚餐与酒店
  const schedule = [
    { day: "D1", date: "2026-04-17", title: "曼谷 · 开启度假模式", activities: [
      { time: "10:00-22:00", title: "全天分批接机", location: "BKK机场", type: "transport", desc: "专车接机送往酒店。" },
      { time: "12:30", title: "首批午餐：建兴酒家", location: "Siam Square", type: "food", desc: "招牌咖喱蟹，开启味蕾。" },
      { time: "15:00", title: "入住：曼谷阿玛瑞酒店", location: "Amari Bangkok", type: "hotel", desc: "位于市中心，方便购物与休息。" },
      { time: "19:00", title: "晚餐：Iconsiam 露台餐厅", location: "湄南河畔", type: "food", desc: "欣赏河景与喷泉表演。" }
    ]},
    { day: "D2", date: "2026-04-18", title: "曼谷 · 文化与烟火", activities: [
      { time: "09:00", title: "大皇宫 & 玉佛寺", location: "Grand Palace", type: "culture", desc: "必打卡的经典建筑群。" },
      { time: "12:00", title: "午餐：Blue Elephant", location: "Sathorn", type: "food", desc: "精致泰式宫廷料理。" },
      { time: "15:00", title: "迎新：洲哥到达接应", location: "酒店大堂", type: "transport", desc: "洲哥下午3点抵店，全员集结完毕！" },
      { time: "18:00", title: "晚餐：Jodd Fairs 夜市", location: "Rama IX", type: "food", desc: "自由扫荡网红美食（火山排骨等）。" },
      { time: "22:00", title: "续住：曼谷阿玛瑞酒店", location: "Hotel", type: "hotel", desc: "早点休息，明天跨城。" }
    ]},
    { day: "D3", date: "2026-04-19", title: "曼谷 → 芭提雅", activities: [
      { time: "10:00", title: "包车南下芭提雅", location: "Bangkok", type: "transport", desc: "车程约2小时。" },
      { time: "12:30", title: "午餐：避风港海鲜", location: "Pattaya Road", type: "food", desc: "面朝大海，品尝现捞海味。" },
      { time: "14:00", title: "入住：芭提雅希尔顿酒店", location: "Hilton Pattaya", type: "hotel", desc: "无边泳池正对海滩。" },
      { time: "15:00", title: "真理圣殿", location: "Sanctuary of Truth", type: "culture", desc: "壮阔的全木雕建筑。" },
      { time: "19:00", title: "晚餐：Walking Street 漫步", location: "步行街", type: "food", desc: "体验芭提雅疯狂夜生活。" }
    ]},
    { day: "D4", date: "2026-04-20", title: "出海格兰岛 · 蓝海日光", activities: [
      { time: "09:00-16:00", title: "格兰岛海岛游", location: "Koh Larn", type: "nature", desc: "包含浮潜、滑翔伞等项目。" },
      { time: "13:00", title: "午餐：海岛简餐/烧烤", location: "Beach Side", type: "food", desc: "在白色沙滩上用餐。" },
      { time: "19:30", title: "晚餐 & 蒂芬妮秀", location: "Tiffany's", type: "entertainment", desc: "观看顶级歌舞表演。" },
      { time: "22:00", title: "续住：芭提雅希尔顿酒店", location: "Hotel", type: "hotel", desc: "享受酒店海景。" }
    ]},
    { day: "D5", date: "2026-04-21", title: "自然奇观 · 离别之夜", activities: [
      { time: "10:00", title: "东芭乐园", location: "Nong Nooch", type: "nature", desc: "植物园与文化表演。" },
      { time: "12:30", title: "午餐：四方水上市场", location: "Floating Market", type: "food", desc: "水上穿梭品尝特色小吃。" },
      { time: "19:00", title: "离别派对晚餐：Sky Gallery", location: "悬崖餐厅", type: "food", desc: "绝美日落晚餐，告别派对。" },
      { time: "22:00", title: "末晚入住：芭提雅酒店", location: "Hotel", type: "hotel", desc: "整理行李，准备返程。" }
    ]},
    { day: "D6", date: "2026-04-22", title: "满载而归 · 送机", activities: [
      { time: "09:00", title: "王权免税店", location: "King Power", type: "shopping", desc: "最后的扫货时间。" },
      { time: "12:00", title: "午餐：拉玛亚那自助餐", location: "免税店内", type: "food", desc: "便捷丰盛的最后一顿。" },
      { time: "14:00", title: "洲哥先行送机", location: "Airport", type: "transport", desc: "洲哥航班较早，需先行出发。" },
      { time: "16:00-20:00", title: "全员分批送机", location: "BKK机场", type: "transport", desc: "平安返家，行程结束。" }
    ]}
  ];

  // 成员状态判定：是否在特定活动时间段内
  const getMemberStatus = (date, timeRange, arrival, departure) => {
    const arrive = new Date(arrival);
    const depart = new Date(departure);
    const startTimeStr = timeRange.includes(':') ? timeRange.split('-')[0] : "09:00";
    const actStart = new Date(`${date}T${startTimeStr.length === 5 ? startTimeStr : '09:00'}`);
    
    if (actStart < arrive) return 'not_arrived';
    if (actStart > depart) return 'departed';
    return 'present';
  };

  const getDayPresence = (dateStr, arrival, departure) => {
    const day = new Date(dateStr); day.setHours(12,0,0,0);
    const arrive = new Date(arrival); arrive.setHours(0,0,0,0);
    const depart = new Date(departure); depart.setHours(23,59,59,999);
    return day >= arrive && day <= depart;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* 顶部 Hero */}
      <div className="relative h-48 md:h-60 bg-gradient-to-r from-teal-600 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 h-full flex flex-col justify-center text-white">
          <h1 className="text-3xl md:text-5xl font-black mb-2 tracking-tight flex items-center gap-3">
            2026 THAI ADVENTURE <Waves className="animate-pulse" />
          </h1>
          <p className="text-teal-100 font-medium text-sm md:text-base">曼谷 - 芭提雅 · 8人私享狂欢行程表</p>
        </div>
      </div>

      {/* 模式导航 */}
      <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl p-3 md:p-5">
          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-6">
            <button 
              onClick={() => setViewMode('individual')}
              className={`flex-1 py-3 rounded-xl text-xs md:text-sm font-black transition-all ${viewMode === 'individual' ? 'bg-white text-teal-600 shadow-md' : 'text-slate-500'}`}
            >
              <div className="flex items-center justify-center gap-2"><LayoutGrid size={16}/> 个人行程</div>
            </button>
            <button 
              onClick={() => setViewMode('global')}
              className={`flex-1 py-3 rounded-xl text-xs md:text-sm font-black transition-all ${viewMode === 'global' ? 'bg-white text-teal-600 shadow-md' : 'text-slate-500'}`}
            >
              <div className="flex items-center justify-center gap-2"><GanttChartSquare size={16}/> 全员看板</div>
            </button>
          </div>

          {viewMode === 'individual' && (
            <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar snap-x">
              {initialMembers.map(m => (
                <button
                  key={m.id}
                  onClick={() => setActiveMemberId(m.id)}
                  className={`flex flex-col items-center p-3 min-w-[80px] rounded-2xl transition-all snap-start ${
                    activeMemberId === m.id ? 'bg-teal-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400 border border-slate-100'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${activeMemberId === m.id ? 'bg-white text-teal-600' : 'bg-slate-200 text-slate-500'}`}>
                    {m.name.charAt(0)}
                  </div>
                  <span className="text-[11px] font-black">{m.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 内容区 */}
      <main className="max-w-5xl mx-auto px-4 mt-8">
        {viewMode === 'individual' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左：状态 */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-4">Member Card</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-bold text-slate-800">{activeMember.name}</span>
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-600 rounded text-[10px] font-bold">{activeMember.status}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl text-[11px] space-y-2">
                    <div className="flex justify-between"><span className="text-slate-400">抵达：</span><span className="font-bold">{activeMember.arrival.replace('T', ' ')}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">返程：</span><span className="font-bold">{activeMember.departure.replace('T', ' ')}</span></div>
                  </div>
                </div>
              </div>
              <div className="bg-teal-50 rounded-3xl p-6 border border-teal-100">
                <Info size={20} className="text-teal-600 mb-3"/>
                <h4 className="text-sm font-bold text-teal-900 mb-2">必备核查</h4>
                <p className="text-[11px] text-teal-700 leading-relaxed">请确认护照有效期6个月以上。洲哥、然哥、霖哥及阿露需关注接机群实时位置。</p>
              </div>
            </div>

            {/* 右：时间轴 */}
            <div className="lg:col-span-2 space-y-12">
              {schedule.map((dayPlan, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-2xl font-black text-teal-600/20">{dayPlan.day}</div>
                    <h2 className="text-xl font-black text-slate-800">{dayPlan.title}</h2>
                  </div>
                  <div className="ml-4 border-l-2 border-slate-100 pl-8 space-y-6">
                    {dayPlan.activities.map((act, actIdx) => {
                      const status = getMemberStatus(dayPlan.date, act.time, activeMember.arrival, activeMember.departure);
                      return (
                        <div key={actIdx} className={`relative group transition-all ${status !== 'present' ? 'opacity-30' : ''}`}>
                          <div className={`absolute -left-[41px] top-1.5 w-4 h-4 rounded-full border-4 border-white ${
                            status === 'present' ? 'bg-teal-500 shadow-sm' : 'bg-slate-300'
                          }`} />
                          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-[10px] font-black bg-slate-100 px-2 py-0.5 rounded-full text-slate-500">{act.time}</span>
                              {status === 'not_arrived' && <span className="text-[10px] font-bold text-red-400">未到达</span>}
                              {status === 'departed' && <span className="text-[10px] font-bold text-orange-400">已返程</span>}
                            </div>
                            <div className="flex gap-4">
                              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                                {act.type === 'food' ? <Utensils size={18} className="text-orange-500"/> : 
                                 act.type === 'hotel' ? <Hotel size={18} className="text-blue-500"/> :
                                 act.type === 'transport' ? <Plane size={18} className="text-teal-500"/> : <Camera size={18} className="text-slate-400"/>}
                              </div>
                              <div>
                                <h4 className="text-sm font-black text-slate-800">{act.title}</h4>
                                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{act.desc}</p>
                                <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                  <MapPin size={10}/> {act.location}
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
          /* 全员看板 (横向轴) */
          <div className="bg-white rounded-3xl shadow-xl p-6 overflow-hidden">
            <div className="mb-8 border-b border-slate-50 pb-6">
              <h3 className="text-xl font-black text-slate-800">全员在位统览</h3>
              <p className="text-xs text-slate-400 mt-2">横轴展示每位成员在泰国的逗留时长</p>
            </div>
            
            <div className="overflow-x-auto no-scrollbar pb-6">
              <div className="min-w-[800px]">
                {/* 轴头 */}
                <div className="grid grid-cols-12 mb-6">
                  <div className="col-span-2 text-xs font-black text-slate-300">MEMBER</div>
                  <div className="col-span-10 grid grid-cols-6 text-center gap-4">
                    {schedule.map(d => (
                      <div key={d.day} className="text-[10px] font-black text-slate-400">{d.day}<br/>{d.date.slice(8)}日</div>
                    ))}
                  </div>
                </div>
                {/* 数据行 */}
                <div className="space-y-4">
                  {initialMembers.map(m => (
                    <div key={m.id} className="grid grid-cols-12 items-center">
                      <div className="col-span-2 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-teal-600">
                          {m.name.charAt(0)}
                        </div>
                        <span className="text-xs font-bold">{m.name}</span>
                      </div>
                      <div className="col-span-10 grid grid-cols-6 gap-4 h-8 items-center">
                        {schedule.map(day => {
                          const active = getDayPresence(day.date, m.arrival, m.departure);
                          return (
                            <div 
                              key={day.day} 
                              className={`h-4 rounded-full transition-all duration-700 ${active ? 'bg-gradient-to-r from-teal-400 to-teal-500 shadow-lg shadow-teal-100' : 'bg-slate-100'}`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-slate-50 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-teal-600"><Users size={20}/></div>
                <div>
                  <h5 className="text-sm font-bold">集结黄金期</h5>
                  <p className="text-[11px] text-slate-500 mt-1">4月19日 - 21日，所有人全天在线。这是拍摄全家福和大型聚餐的最佳时段。</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-orange-600"><LogOut size={20}/></div>
                <div>
                  <h5 className="text-sm font-bold">返程错峰</h5>
                  <p className="text-[11px] text-slate-500 mt-1">洲哥 22日 下午 3点率先出发。其余成员分流返程，请注意查收行李。</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 底部浮动 */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 z-50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black tracking-widest uppercase">Pattaya 2026</span>
        </div>
        <div className="w-px h-4 bg-slate-700" />
        <span className="text-[10px] opacity-70">领队已优化 8 人专属时间轴</span>
      </div>
    </div>
  );
};

export default App;

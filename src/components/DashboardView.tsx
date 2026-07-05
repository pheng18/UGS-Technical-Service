import React from "react";
import { Repair, Project } from "../types";
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from "recharts";
import { 
  Wrench, 
  Construction, 
  AlertTriangle, 
  Smile, 
  Calendar, 
  Download, 
  CheckCircle, 
  Compass, 
  MapPin,
  Activity,
  Plus
} from "lucide-react";

interface DashboardViewProps {
  repairs: Repair[];
  projects: Project[];
  onViewAllRepairs: () => void;
  onViewProject: (proj: Project) => void;
}

export default function DashboardView({
  repairs,
  projects,
  onViewAllRepairs,
  onViewProject
}: DashboardViewProps) {
  // Compute basic stats
  const totalRepairs = repairs.length;
  const activeRepairs = repairs.filter(r => r.status === "ກຳລັງສ້ອມແປງ").length;
  const completedRepairs = repairs.filter(r => r.status === "ສຳເລັດແລ້ວ").length;
  const pendingRepairs = repairs.filter(r => r.status === "ລໍຖ້າກວດເຊັກ").length;

  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === "ກຳລັງສຳຫຼວດ").length;

  // Monthly stats based on mock data
  const chartData = [
    { name: "ມັງກອນ", "ການສ້ອມແປງ": 12, "ການສຳຫຼວດ": 8 },
    { name: "ກຸມພາ", "ການສ້ອມແປງ": 18, "การສຳຫຼວດ": 11 },
    { name: "ມີນາ", "ການສ້ອມແປງ": 15, "ການສຳຫຼວດ": 9 },
    { name: "ເມສາ", "ການສ້ອມແປງ": 24, "ການສຳຫຼວດ": 14 },
    { name: "ພຶດສະພາ", "ການສ້ອມແປງ": totalRepairs * 5, "ການສຳຫຼວດ": totalProjects * 3 },
    { name: "ມິຖຸນา", "ການສ້ອມແປງ": 28, "ການສຳຫຼວດ": 13 },
  ];

  const recentActivities = [
    {
      id: "act-1",
      title: "ເຄື່ອງວັດແທກ Total Station ກຳລັງສ້ອມແປງ",
      time: "2 ນາທີກ່ອນ",
      author: "ສົມສັກ ເພັດດາວົງ",
      tag: "ກຳລັງສ້ອມແປງ",
      tagType: "warning"
    },
    {
      id: "act-2",
      title: "ໂຄງການສຳຫຼວດທາງຫຼວງເລກ 13 ສຳເລັດ",
      time: "1 ຊົ່ວໂມງກ່ອນ",
      author: "ທີມສຳຫຼວດ A",
      tag: "ສຳເລັດ",
      tagType: "success"
    },
    {
      id: "act-3",
      title: "ລູກຄ້າໃໝ່: ບໍລິສັດ ກໍ່ສ້າງຂົວທາງ ຈຳກັດ",
      time: "3 ຊົ່ວໂມງກ່ອນ",
      author: "ລະບົບອັດຕະໂນມັດ",
      tag: "ລົງທະບຽນ",
      tagType: "info"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-on-surface tracking-tight font-sans">
            ສະຫຼຸບພາບລວມວຽກງານ
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            ຍິນດີຕ້ອນຮັບກັບຄືນ, ນີ້ແມ່ນສະຖານະການບໍລິການປະຈຳວັນຂອງບໍລິສັດ ຢູນິກເທັກ ຈຳກັດ.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-border-subtle text-gray-600 rounded-lg flex items-center gap-2 hover:bg-surface-gray transition-colors text-xs font-bold font-sans">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>ເດືອນນີ້</span>
          </button>
          <button className="px-4 py-2 bg-primary hover:bg-primary-container text-white rounded-lg shadow-sm transition-all text-xs font-bold flex items-center gap-2 active:scale-95">
            <Download className="w-4 h-4" />
            <span>ດາວໂຫຼດລາຍງານ</span>
          </button>
        </div>
      </div>

      {/* Bento Grid KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 border border-border-subtle rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-primary rounded-lg">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="text-success-green font-bold text-xs flex items-center">+12%</span>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              ການສ້ອມແປງທັງໝົດ
            </p>
            <h3 className="text-3xl font-bold text-on-surface mt-1 font-mono">
              {totalRepairs + 1280}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 border border-border-subtle rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-info-blue rounded-lg">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-warning-amber font-bold text-xs flex items-center">
              {activeProjects} ວຽກດ່ວນ
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              ໂຄງການສຳຫຼວດທີ່ດຳເນີນຢູ່
            </p>
            <h3 className="text-3xl font-bold text-on-surface mt-1 font-mono">
              {activeProjects + 38}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 border border-border-subtle rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-amber-50 text-warning-amber rounded-lg">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-info-blue font-bold text-xs flex items-center">
              ໃໝ່ {pendingRepairs} ລາຍການ
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              ລໍຖ້າການກວດເຊັກ
            </p>
            <h3 className="text-3xl font-bold text-on-surface mt-1 font-mono">
              {pendingRepairs + 15}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 border border-border-subtle rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-50 text-success-green rounded-lg">
              <Smile className="w-5 h-5" />
            </div>
            <span className="text-success-green font-bold text-xs flex items-center">98.5%</span>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              ຄວາມເພິ່ງພໍໃຈລູກຄ້າ
            </p>
            <h3 className="text-3xl font-bold text-on-surface mt-1 font-mono">
              4.9 / 5
            </h3>
          </div>
        </div>
      </div>

      {/* Main Analysis Chart & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Monthly Volume Chart Card */}
        <div className="lg:col-span-2 bg-white border border-border-subtle rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border-subtle flex justify-between items-center bg-surface-gray/30">
            <h3 className="text-md font-bold text-on-surface font-sans">
              ປະລິມານການບໍລິການລາຍເດືອນ
            </h3>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1.5 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
                <span>ການສ້ອມແປງ</span>
              </span>
              <span className="flex items-center gap-1.5 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-info-blue inline-block"></span>
                <span>ການສຳຫຼວດ</span>
              </span>
            </div>
          </div>
          <div className="p-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#636262" }} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#636262" }} axisLine={false} />
                <Tooltip />
                <Bar dataKey="ການສ້ອມແປງ" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={30} />
                <Bar dataKey="ການສຳຫຼວດ" fill="#0288D1" radius={[4, 4, 0, 0]} maxBarSize={30} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white border border-border-subtle rounded-xl overflow-hidden shadow-sm flex flex-col">
          <div className="p-6 border-b border-border-subtle bg-surface-gray/30">
            <h3 className="text-md font-bold text-on-surface font-sans">
              ການເຄື່ອນໄຫວຫຼ້າສຸດ
            </h3>
          </div>
          <div className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[320px]">
            {recentActivities.map((act, index) => (
              <div key={act.id} className="flex gap-4 relative">
                {index < recentActivities.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-0 w-px bg-border-subtle"></div>
                )}
                <div className={`z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                  act.tagType === "warning" ? "bg-amber-50 text-warning-amber" :
                  act.tagType === "success" ? "bg-green-50 text-success-green" : "bg-blue-50 text-info-blue"
                }`}>
                  <Activity className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-on-surface">{act.title}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    ໂດຍ: {act.author} • {act.time}
                  </p>
                  <span className={`mt-2 inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                    act.tagType === "warning" ? "bg-amber-100 text-warning-amber" :
                    act.tagType === "success" ? "bg-green-100 text-success-green" : "bg-blue-100 text-info-blue"
                  }`}>
                    {act.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Repairs Table & Dam Map Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Repairs Preview */}
        <div className="lg:col-span-2 bg-white border border-border-subtle rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border-subtle flex justify-between items-center bg-surface-gray/30">
            <h3 className="text-md font-bold text-on-surface font-sans">
              ອຸປະກອນທີ່ກຳລັງສ້ອມແປງ
            </h3>
            <button
              onClick={onViewAllRepairs}
              className="text-primary hover:underline text-xs font-bold"
            >
              ເບິ່ງທັງໝົດ
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-gray/50 border-b border-border-subtle text-xs text-gray-500 font-sans">
                <tr>
                  <th className="p-4 font-bold">ອຸປະກອນ (Model)</th>
                  <th className="p-4 font-bold">ໝາຍເລກເຄື່ອງ</th>
                  <th className="p-4 font-bold">ສະຖານະ</th>
                  <th className="p-4 font-bold">ວັນທີຮັບ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle text-sm">
                {repairs.slice(0, 3).map((rep) => (
                  <tr key={rep.id} className="hover:bg-slate-50 cursor-pointer transition-colors" onClick={onViewAllRepairs}>
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-50 text-primary rounded-lg flex items-center justify-center shrink-0">
                        <Wrench className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">{rep.model}</p>
                        <p className="text-[10px] text-gray-500 truncate max-w-xs">{rep.title}</p>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-xs font-bold text-gray-600">{rep.serialNo}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                        rep.status === "ສຳເລັດແລ້ວ" ? "bg-green-100 text-success-green" :
                        rep.status === "ກຳລັງສ້ອມແປງ" ? "bg-amber-100 text-warning-amber" : "bg-gray-100 text-gray-500"
                      }`}>
                        {rep.status}
                      </span>
                    </td>
                    <td className="p-4 text-xs font-mono text-gray-500">{rep.receivedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ngum 3 Dam Survey Highlight Card */}
        <div className="bg-white border border-border-subtle rounded-xl overflow-hidden shadow-sm relative group flex flex-col justify-end min-h-[300px]">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ 
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC56I4SdNCH45vGTnM86A5dYH6KNthq4gvfku5MlTh9Pv-giQRB7K4-0esPdvykVhmhd6TqC8gUpoUapDmBjAoc-aPNohWbAwSg8YNB17v2PZfI-NFAf24EMqhMnTg_crnHOw6kv0J_YDLjkMN9WfQwPK_qhM0B7lARXhvPdCW-b2fLP4Wx1VPB5QLArZUDg1qe-bBBB_NSbdDaZK4kiLEax9zErSxCY4fEMtoHiFvNeuPeAQ9ymWBGWA')` 
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          <div className="absolute top-4 right-4 bg-primary text-white p-2 rounded-full shadow-lg z-10 cursor-pointer hover:scale-110 transition-transform">
            <Plus className="w-5 h-5" />
          </div>
          <div className="relative p-6 text-white z-10">
            <div className="flex items-center gap-1.5 mb-1.5">
              <MapPin className="w-4 h-4 text-primary-container" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary-fixed">
                ໂຄງການພວມປະຕິບັດ
              </span>
            </div>
            <h3 className="text-lg font-bold mb-1 leading-snug">
              ສຳຫຼວດພື້ນທີ່ເຂື່ອນໄຟຟ້າ ນ້ຳງື່ມ 3
            </h3>
            <p className="text-xs opacity-90 mb-4 font-sans">
              ຄວາມຄືບໜ້າ: 75% | ທີມງານ: ວິສະວະກອນ 5 ທ່ານ
            </p>
            <button 
              onClick={() => {
                const prj = projects.find(p => p.id === "PRJ-001");
                if (prj) onViewProject(prj);
              }}
              className="px-5 py-2 bg-white text-primary rounded font-bold text-xs hover:bg-slate-100 hover:text-primary transition-all active:scale-95 cursor-pointer"
            >
              ເບິ່ງລາຍລະອຽດ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

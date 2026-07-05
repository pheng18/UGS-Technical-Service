import React from "react";
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  Construction, 
  Wrench, 
  Radio, 
  FileText,
  LogOut,
  PlusCircle,
  TrendingUp
} from "lucide-react";

export type ViewType = "dashboard" | "repairs" | "projects" | "cors" | "quotations";

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onLogout: () => void;
  onNewQuotation?: () => void;
  onNewRepair?: () => void;
}

export default function Sidebar({
  currentView,
  onViewChange,
  onLogout,
  onNewQuotation,
  onNewRepair
}: SidebarProps) {
  return (
    <aside className="w-64 fixed left-0 top-0 bottom-0 bg-[#0F172A] text-slate-300 flex flex-col p-4 border-r border-slate-800 z-50">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-3 mb-8 px-2 mt-2 border-b border-slate-800 pb-5">
        <div className="w-9 h-9 bg-primary flex items-center justify-center rounded overflow-hidden shadow-md">
          <span className="font-sans font-bold text-lg text-white">U</span>
        </div>
        <div>
          <h1 className="text-lg font-bold text-white leading-tight font-sans tracking-tight">Uniqtek</h1>
          <p className="text-[10px] text-slate-400 font-sans uppercase">UGS-Service Tracker</p>
        </div>
      </div>

      <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">ການຈັດການ</div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-1.5 flex-1">
        <button
          onClick={() => onViewChange("dashboard")}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-sans transition-all ${
            currentView === "dashboard"
              ? "bg-primary text-white font-bold border-r-4 border-blue-400 shadow-md"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>ໜ້າຫຼັກ</span>
        </button>

        <button
          onClick={() => onViewChange("repairs")}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-sans transition-all ${
            currentView === "repairs"
              ? "bg-primary text-white font-bold border-r-4 border-blue-400 shadow-md"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>ການສ້ອມແປງ & ອຸປະກອນ</span>
        </button>

        <button
          onClick={() => onViewChange("projects")}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-sans transition-all ${
            currentView === "projects"
              ? "bg-primary text-white font-bold border-r-4 border-blue-400 shadow-md"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <Construction className="w-4 h-4" />
          <span>ໂຄງການສຳຫຼວດ</span>
        </button>

        <button
          onClick={() => onViewChange("cors")}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-sans transition-all ${
            currentView === "cors"
              ? "bg-primary text-white font-bold border-r-4 border-blue-400 shadow-md"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>ຕິດຕາມສະຖານີ CORS</span>
        </button>

        <button
          onClick={() => onViewChange("quotations")}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-sans transition-all ${
            currentView === "quotations"
              ? "bg-primary text-white font-bold border-r-4 border-blue-400 shadow-md"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>ໃບສະເໜີລາຄາ</span>
        </button>
      </nav>

      {/* Bottom Actions & Status Footer */}
      <div className="mt-auto pt-4 border-t border-slate-800 flex flex-col gap-3">
        {currentView === "quotations" ? (
          <button
            onClick={onNewQuotation}
            className="w-full bg-primary hover:bg-primary-container text-white py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>ສ້າງໃບສະເໜີລາຄາໃໝ່</span>
          </button>
        ) : (
          <button
            onClick={onNewRepair}
            className="w-full bg-primary hover:bg-primary-container text-white py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>ຈອງການບໍລິການໃໝ່</span>
          </button>
        )}

        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>ອອກຈາກລະບົບ</span>
        </button>

        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 mt-1">
          <div className="text-[9px] text-slate-500 mb-1 font-mono">Project: UGS-Service Tracker</div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[11px] text-slate-400 font-sans">Firebase Connected</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

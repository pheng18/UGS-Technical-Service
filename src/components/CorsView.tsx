import React, { useState } from "react";
import { CORSStation } from "../types";
import { 
  Radio, 
  Search, 
  Wifi, 
  WifiOff, 
  AlertTriangle, 
  CheckCircle, 
  Edit, 
  Check, 
  Activity, 
  Info,
  Clock
} from "lucide-react";

interface CorsViewProps {
  stations: CORSStation[];
  onUpdateStationNotes: (id: string, notes: string) => void;
  onToggleStationStatus: (id: string) => void;
}

export default function CorsView({
  stations,
  onUpdateStationNotes,
  onToggleStationStatus
}: CorsViewProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleEditClick = (station: CORSStation) => {
    setEditingId(station.id);
    setTempNotes(station.notes || "");
  };

  const handleSaveClick = (id: string) => {
    onUpdateStationNotes(id, tempNotes);
    setEditingId(null);
  };

  const filteredStations = stations.filter(st => 
    st.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    st.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    st.issue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Compute stats
  const total = stations.length;
  const online = stations.filter(s => s.status === "Online").length;
  const offline = stations.filter(s => s.status === "Offline").length;
  const uptime = total > 0 ? ((online / total) * 100).toFixed(1) : "0.0";

  // List of active issue warnings
  const issues = stations.filter(s => s.issue && s.issue !== "none");

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-on-surface tracking-tight font-sans">
            CORS Station Dashboard
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            ຕິດຕາມສະຖານີຮັບສັນຍານດາວທຽມອ້າງອີງ CORS ຂອງບໍລິສັດ ຢູນິກເທັກ ຈຳກັດ ແບບ Real-time
          </p>
        </div>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            className="w-full pl-10 pr-4 py-2 bg-white border border-border-subtle rounded-lg text-xs outline-none"
            placeholder="ຄົ້ນຫາສະຖານີ CORS..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-5 border border-border-subtle rounded-xl shadow-sm">
          <div className="flex justify-between items-center text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">ສະຖານີທັງໝົດ</span>
            <Radio className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-3xl font-bold text-on-surface font-mono">{total + 66}</h3>
        </div>

        <div className="bg-white p-5 border border-border-subtle rounded-xl shadow-sm">
          <div className="flex justify-between items-center text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-green-500">Online (ເຮັດວຽກ)</span>
            <Wifi className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-3xl font-bold text-green-600 font-mono">{online + 60}</h3>
        </div>

        <div className="bg-white p-5 border border-border-subtle rounded-xl shadow-sm">
          <div className="flex justify-between items-center text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-red-500">Offline (ຂັດຂ້ອງ)</span>
            <WifiOff className="w-5 h-5 text-red-500" />
          </div>
          <h3 className="text-3xl font-bold text-red-600 font-mono">{offline + 6}</h3>
        </div>

        <div className="bg-white p-5 border border-border-subtle rounded-xl shadow-sm">
          <div className="flex justify-between items-center text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-info-blue">Uptime ລວມ</span>
            <Activity className="w-5 h-5 text-info-blue" />
          </div>
          <h3 className="text-3xl font-bold text-info-blue font-mono">{uptime}%</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main CORS Table */}
        <div className="lg:col-span-2 bg-white border border-border-subtle rounded-xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-border-subtle bg-surface-gray/40">
            <h3 className="font-bold text-sm text-on-surface">ລາຍຊື່ສະຖານີ CORS ແລະ ສະຖານະ</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-surface-gray text-xs font-bold text-gray-500">
                <tr>
                  <th className="p-4">ລະຫັດສະຖານີ</th>
                  <th className="p-4">ຊື່ສະຖານີ (Lao)</th>
                  <th className="p-4">ປະເພດເຄື່ອງ</th>
                  <th className="p-4">ສະຖານະເຄືອຂ່າຍ</th>
                  <th className="p-4">ບັນທຶກເຕັກນິກ</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filteredStations.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-mono font-bold text-primary">{st.id}</td>
                    <td className="p-4 font-bold text-on-surface">{st.name}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        st.type === "ໃໝ່" ? "bg-blue-50 text-primary border border-primary/20" : "bg-gray-100 text-gray-600"
                      }`}>
                        ເຄື່ອງ{st.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => onToggleStationStatus(st.id)}
                        className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all ${
                          st.status === "Online" 
                            ? "bg-green-100 text-success-green hover:bg-green-200" 
                            : "bg-red-100 text-red-600 hover:bg-red-200"
                        }`}
                        title="คลิกเพื่อสลับสถานะ (Simulated)"
                      >
                        {st.status === "Online" ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
                        <span>{st.status}</span>
                      </button>
                    </td>
                    <td className="p-4 text-xs max-w-xs">
                      {editingId === st.id ? (
                        <input
                          type="text"
                          className="w-full px-2 py-1 border border-primary rounded outline-none"
                          value={tempNotes}
                          onChange={(e) => setTempNotes(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleSaveClick(st.id)}
                        />
                      ) : (
                        <p className="text-gray-500 font-medium truncate">{st.notes || st.issue || "ບໍ່ມີອາການຂັດຂ້ອງ"}</p>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {editingId === st.id ? (
                        <button 
                          onClick={() => handleSaveClick(st.id)}
                          className="p-1 bg-green-50 text-green-600 rounded hover:bg-green-100"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleEditClick(st)}
                          className="p-1 bg-gray-50 text-gray-500 rounded hover:bg-gray-100"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts & Issue warnings column */}
        <div className="space-y-8">
          <div className="bg-white border border-border-subtle rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-primary animate-pulse" />
              <span>ລາຍງານບັນຫາຂັດຂ້ອງ</span>
            </h3>

            <div className="space-y-4">
              {issues.map((st) => (
                <div key={st.id} className="p-4 bg-red-50 border border-red-100 rounded-lg flex gap-3.5 items-start">
                  <span className="p-2 bg-primary/10 text-primary rounded-full shrink-0">
                    <Radio className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-primary font-mono">{st.id} - CORS {st.name}</h4>
                    <p className="text-sm font-semibold text-on-surface mt-1">{st.issue}</p>
                    <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      ພົບຂັດຂ້ອງ 2 ຊົ່ວໂມງກ່ອນ
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guide Note card */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-sm text-blue-900 flex items-center gap-1.5 mb-2">
              <Info className="w-4.5 h-4.5 text-blue-600" />
              <span>ຄູ່ມືການບຳລຸງຮັກສາ CORS</span>
            </h3>
            <p className="text-xs text-blue-850 leading-relaxed space-y-2">
              1. ກວດສອບລະບົບໄຟຟ້າ UPS ສຳຮອງ ແລະ ລະບົບສາຍດິນທຸກໆ 3 ເດືອນ.<br/>
              2. ເມື່ອພົບແຈ້ງເຕືອນ <strong>Receiver problem</strong> ໃຫ້ກວດເຊັກບອດຮັບ ແລະ ສາຍສັນຍານ Coaxial ເຂົ້າເສົາອາກາດ.<br/>
              3. ຕິດຕໍ່ຜູ້ໃຫ້ບໍລິການອິນເຕີເນັດ (ISP) ທັນທີ ຫາກພົບແຈ້ງເຕືອນ <strong>Internet expired</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

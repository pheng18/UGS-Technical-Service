import React, { useState } from "react";
import { Project, TeamMember } from "../types";
import { 
  Construction, 
  MapPin, 
  Plus, 
  Compass, 
  CheckCircle, 
  Users, 
  Phone, 
  Map, 
  Navigation,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface ProjectsViewProps {
  projects: Project[];
  selectedProject: Project | null;
  onSelectProject: (proj: Project | null) => void;
  onAddProject: (proj: Omit<Project, "id">) => void;
}

export default function ProjectsView({
  projects,
  selectedProject,
  onSelectProject,
  onAddProject
}: ProjectsViewProps) {
  const [isAddingProject, setIsAddingProject] = useState(false);
  
  // New project states
  const [newTitle, setNewTitle] = useState("");
  const [newClient, setNewClient] = useState("");
  const [newProgress, setNewProgress] = useState(10);
  const [newStatus, setNewStatus] = useState<Project["status"]>("ກຳລັງສຳຫຼວດ");
  const [newLocation, setNewLocation] = useState("");
  const [newLat, setNewLat] = useState(18.2);
  const [newLng, setNewLng] = useState(102.5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newClient || !newLocation) return;

    onAddProject({
      title: newTitle,
      client: newClient,
      progress: Number(newProgress),
      status: newStatus,
      location: newLocation,
      coordinates: { lat: Number(newLat), lng: Number(newLng) },
      team: [
        {
          name: "ທ່ານ ອານຸສອນ ສີຫາວົງ",
          role: "ຫົວໜ້າທີມສຳຫຼວດ",
          avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxluIFtCMv0qOHTGknVD5eeDh2WBmmpDtorjHxpUCIQgiuQrFwiEfRyzNA9mOifU3Wig3mzMjZkW5J6lgjVyHtPR5OuJRKjr-MtonPJ6yXg6UTe4m-Lpap2_6q8Zf8KSPUfdX6KatghzImZItZR36EGiOtqxNFDNtQPpePeqxOAz32A0pU5Z6SOlTSjs9oGjFFZCScaHxYL_upa9DRGFXUmEaRaXzaq8tuRkQW_KpbxYJyuYL_i-U-5w",
          active: true,
          phone: "020 5556 1234"
        }
      ]
    });

    // Reset fields
    setNewTitle("");
    setNewClient("");
    setNewProgress(10);
    setNewStatus("ກຳລັງສຳຫຼວດ");
    setNewLocation("");
    setNewLat(18.2);
    setNewLng(102.5);
    setIsAddingProject(false);
  };

  // Set default selection if none
  const currentProj = selectedProject || projects[0] || null;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-on-surface tracking-tight font-sans">
            ໂຄງການສຳຫຼວດ ແລະ ວັດແທກ
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            ຕິດຕາມຄວາມຄືບໜ້າ, ແຜນທີ່ພາກສະໜາມ ແລະ ທີມງານວິສະວະກອນສຳຫຼວດ Uniqtek
          </p>
        </div>
        <button
          onClick={() => setIsAddingProject(true)}
          className="px-4 py-2.5 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-lg flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>ເພີ່ມໂຄງການໃໝ່</span>
        </button>
      </div>

      {/* Add Project Modal */}
      {isAddingProject && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white border border-border-subtle rounded-xl shadow-2xl w-full max-w-xl overflow-hidden animate-scale-up">
            <div className="p-6 border-b border-border-subtle flex justify-between items-center bg-surface-gray">
              <h3 className="font-bold text-lg text-primary font-sans">ເພີ່ມໂຄງການສຳຫຼວດໃໝ່</h3>
              <button onClick={() => setIsAddingProject(false)} className="text-gray-500 hover:text-black">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ຊື່ໂຄງການ (Project Title) *</label>
                <input
                  type="text"
                  required
                  placeholder="ຕົວຢ່າງ: ສຳຫຼວດພີ້ນທີ່ສ້າງຂົວຂ້າມນ້ຳຂອງ"
                  className="w-full px-3 py-2 border border-border-subtle rounded-lg text-sm bg-white"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ລູກຄ້າ / ພາກສ່ວນ *</label>
                  <input
                    type="text"
                    required
                    placeholder="ຕົວຢ່າງ: ກົມຂົນສົ່ງ"
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg text-sm bg-white"
                    value={newClient}
                    onChange={(e) => setNewClient(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ສະຖານະ</label>
                  <select
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg text-sm bg-white"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as Project["status"])}
                  >
                    <option value="ກຳລັງສຳຫຼວດ">ກຳລັງສຳຫຼວດ</option>
                    <option value="ລໍຖ້າການວິເຄາະ">ລໍຖ້າການວິເຄາະ</option>
                    <option value="ສຳເລັດແລ້ວ">ສຳເລັດແລ້ວ</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ສະຖານທີ່ຕັ້ງ *</label>
                  <input
                    type="text"
                    required
                    placeholder="ຕົວຢ່າງ: ແຂວງຫຼວງພະບາງ"
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg text-sm bg-white"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ຄວາມຄືບໜ້າ (Progress %)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg text-sm bg-white"
                    value={newProgress}
                    onChange={(e) => setNewProgress(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ພິກັດ Latitude</label>
                  <input
                    type="number"
                    step="any"
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg text-sm bg-white"
                    value={newLat}
                    onChange={(e) => setNewLat(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ພິກັດ Longitude</label>
                  <input
                    type="number"
                    step="any"
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg text-sm bg-white"
                    value={newLng}
                    onChange={(e) => setNewLng(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border-subtle">
                <button
                  type="button"
                  onClick={() => setIsAddingProject(false)}
                  className="px-4 py-2 border border-border-subtle text-gray-500 text-xs font-bold rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  ຍົກເລີກ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-lg cursor-pointer shadow-sm"
                >
                  ຢືນຢັນການສ້າງ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Grid: Projects List + Interactive Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Project Cards (Bento) Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <div 
                key={proj.id}
                onClick={() => onSelectProject(proj)}
                className={`p-6 bg-white border rounded-xl shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between ${
                  currentProj?.id === proj.id ? "border-primary ring-1 ring-primary/20" : "border-border-subtle"
                }`}
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      proj.status === "ສຳເລັດແລ້ວ" ? "bg-green-100 text-success-green" :
                      proj.status === "ກຳລັງສຳຫຼວດ" ? "bg-amber-100 text-warning-amber" : "bg-blue-100 text-info-blue"
                    }`}>
                      {proj.status}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-gray-400">{proj.id}</span>
                  </div>
                  <h3 className="font-bold text-sm text-on-surface line-clamp-2 leading-snug">{proj.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{proj.client}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-border-subtle/50 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                    <span className="truncate">{proj.location}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px] font-bold">
                      <span className="text-gray-500">ຄວາມຄືບໜ້າ</span>
                      <span className="text-primary font-mono">{proj.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${proj.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Team Avatars */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex -space-x-2 overflow-hidden">
                      {proj.team.map((member, i) => (
                        <img 
                          key={i}
                          className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-white object-cover"
                          src={member.avatar} 
                          alt={member.name}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {proj.team.length} ວິສະວະກອນ
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Project Details / Map View & Field Contacts */}
        <div className="space-y-8">
          
          {/* Active Map Panel */}
          {currentProj && (
            <div className="bg-white border border-border-subtle rounded-xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-border-subtle flex justify-between items-center bg-surface-gray/50">
                <h3 className="font-bold text-xs uppercase tracking-wider text-on-surface flex items-center gap-1.5">
                  <Map className="w-4 h-4 text-primary" />
                  <span>ແຜນທີ່ຕຳແໜ່ງໂຄງການ</span>
                </h3>
                <span className="text-[10px] font-mono text-gray-500">
                  {currentProj.coordinates.lat.toFixed(2)}, {currentProj.coordinates.lng.toFixed(2)}
                </span>
              </div>
              <div className="h-52 bg-surface-gray relative overflow-hidden flex items-center justify-center">
                {/* Simulated interactive Map background */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC56I4SdNCH45vGTnM86A5dYH6KNthq4gvfku5MlTh9Pv-giQRB7K4-0esPdvykVhmhd6TqC8gUpoUapDmBjAoc-aPNohWbAwSg8YNB17v2PZfI-NFAf24EMqhMnTg_crnHOw6kv0J_YDLjkMN9WfQwPK_qhM0B7lARXhvPdCW-b2fLP4Wx1VPB5QLArZUDg1qe-bBBB_NSbdDaZK4kiLEax9zErSxCY4fEMtoHiFvNeuPeAQ9ymWBGWA')` 
                  }}
                ></div>
                <div className="absolute inset-0 bg-black/10"></div>
                
                {/* Pulsing map pin marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                    <Navigation className="w-4 h-4 rotate-45" />
                  </div>
                  <div className="bg-white/95 px-2 py-1 rounded text-[10px] font-bold text-on-surface shadow-md mt-1 border border-border-subtle">
                    {currentProj.id}
                  </div>
                </div>
              </div>
              <div className="p-4 bg-blue-50/10 text-xs">
                <p className="font-bold text-on-surface flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  {currentProj.location}
                </p>
                <p className="text-gray-500 mt-1">
                  ສະຖານີ CORS ທີ່ໃກ້ທີ່ສຸດ: <strong>ANUV (ອານຸວົງ)</strong> ຫ່າງອອກໄປ 12.4 ກິໂລແມັດ.
                </p>
              </div>
            </div>
          )}

          {/* Active Field Engineers Contact details */}
          {currentProj && (
            <div className="bg-white border border-border-subtle rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Users className="w-4.5 h-4.5 text-primary" />
                <span>ທີມງານໃນພາກສະໜາມ</span>
              </h3>
              <div className="space-y-4">
                {currentProj.team.map((member, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-surface-gray/50 rounded-lg border border-border-subtle/60">
                    <div className="flex items-center gap-3">
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="w-10 h-10 rounded-full object-cover border border-border-subtle"
                      />
                      <div>
                        <p className="text-xs font-bold text-on-surface">{member.name}</p>
                        <p className="text-[10px] text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    {member.active ? (
                      <a 
                        href={`tel:${member.phone.replace(/\s+/g, '')}`}
                        className="p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors"
                        title="Call Field Engineer"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="text-[9px] bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded font-bold uppercase">
                        Offline
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Repair, InternalNote } from "../types";
import { 
  Wrench, 
  Search, 
  Plus, 
  ChevronRight, 
  Calendar, 
  HelpCircle, 
  FileText, 
  CheckCircle2, 
  Clock, 
  MessageSquare,
  User,
  ArrowLeft,
  Settings
} from "lucide-react";

interface RepairsViewProps {
  repairs: Repair[];
  selectedRepair: Repair | null;
  onSelectRepair: (rep: Repair | null) => void;
  notes: InternalNote[];
  onAddNote: (repairId: string, text: string) => void;
  onAddRepair: (repair: Omit<Repair, "id">) => void;
  searchTerm: string;
}

export default function RepairsView({
  repairs,
  selectedRepair,
  onSelectRepair,
  notes,
  onAddNote,
  onAddRepair,
  searchTerm
}: RepairsViewProps) {
  const [newNoteText, setNewNoteText] = useState("");
  const [isAddingRepair, setIsAddingRepair] = useState(false);

  // New repair form state
  const [newModel, setNewModel] = useState("");
  const [newSerial, setNewSerial] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newClient, setNewClient] = useState("");
  const [newProblem, setNewProblem] = useState("");
  const [newCause, setNewCause] = useState("");
  const [newSolution, setNewSolution] = useState("");
  const [newTech, setNewTech] = useState("");

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedRepair) return;
    onAddNote(selectedRepair.id, newNoteText);
    setNewNoteText("");
  };

  const handleRepairSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModel || !newSerial || !newClient) return;

    onAddRepair({
      model: newModel,
      serialNo: "SN: " + newSerial,
      title: newTitle || `${newModel} - Diagnostic Check`,
      client: newClient,
      receivedDate: new Date().toISOString().split("T")[0],
      status: "ລໍຖ້າກວດເຊັກ",
      problem: newProblem || "ກວດເຊັກສະພາບທົ່ວໄປ ແລະ Calibration",
      cause: newCause || "ລໍຖ້າການວິນິດໄສລະອຽດ",
      solution: newSolution || "ລໍຖ້າການວາງແຜນແກ້ໄຂ",
      assignedTech: newTech || "ວັນໄຊ ມະນີວົງ",
      timeline: [
        {
          id: "t-init-1",
          date: new Date().toLocaleDateString("en-GB") + " - 09:00",
          title: "ຮັບເຄື່ອງ ແລະ ລົງທະບຽນ",
          desc: "ອຸປະກອນຖືກຮັບເຂົ້າສາງ ແລະ ລົງທະບຽນສໍາເລັດ.",
          done: true,
          status: "done"
        },
        {
          id: "t-init-2",
          date: "ລໍຖ້າການດຳເນີນງານ",
          title: "ວິນິດໄສອາການ",
          desc: "ຊ່າງເຕັກນິກກຳລັງກຽມກວດສອບ.",
          done: false,
          status: "active"
        }
      ]
    });

    // Reset form
    setNewModel("");
    setNewSerial("");
    setNewTitle("");
    setNewClient("");
    setNewProblem("");
    setNewCause("");
    setNewSolution("");
    setNewTech("");
    setIsAddingRepair(false);
  };

  const filteredRepairs = repairs.filter(rep => 
    rep.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rep.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rep.serialNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rep.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats for bento header
  const totalCount = repairs.length;
  const inRepairCount = repairs.filter(r => r.status === "ກຳລັງສ້ອມແປງ").length;
  const completedCount = repairs.filter(r => r.status === "ສຳເລັດແລ້ວ").length;
  const surveyingCount = repairs.filter(r => r.status === "ກຳລັງສຳຫຼວດ").length;

  // Selected repair comments
  const repairComments = notes.filter(n => n.repairId === selectedRepair?.id);

  if (selectedRepair) {
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Detail view header with Back Button */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onSelectRepair(null)}
            className="p-2 bg-white hover:bg-surface-gray border border-border-subtle rounded-lg text-gray-600 transition-colors cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-on-surface font-sans">{selectedRepair.model}</h2>
              <span className="text-xs font-mono font-bold text-gray-500 bg-surface-gray px-2 py-0.5 rounded border border-border-subtle">
                {selectedRepair.id}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">ລາຍລະອຽດການສ້ອມແປງອຸປະກອນເຕັກນິກ</p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Base Overview Card */}
            <div className="bg-white border border-border-subtle rounded-xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-border-subtle flex justify-between items-center bg-surface-gray/10">
                <div>
                  <h3 className="font-bold text-on-surface">{selectedRepair.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{selectedRepair.serialNo} • {selectedRepair.client}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  selectedRepair.status === "ສຳເລັດແລ້ວ" ? "bg-green-100 text-success-green" :
                  selectedRepair.status === "ກຳລັງສ້ອມແປງ" ? "bg-amber-100 text-warning-amber" : "bg-gray-100 text-gray-600"
                }`}>
                  {selectedRepair.status}
                </span>
              </div>

              {/* Dynamic Image with hotlink or default fallback */}
              <div className="p-6 border-b border-border-subtle grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-1 rounded-lg overflow-hidden border border-border-subtle bg-background aspect-square flex items-center justify-center relative">
                  <img
                    alt="Equipment"
                    className="w-full h-full object-cover"
                    src={selectedRepair.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuDi0c-ce5jwlB_O-mn1LD9g0jnuuGicVAmtP4lSJxCUg42vouPjWKalYKDRtAfFM4Ai382HauZQ1nUUSFBnUWe45uY55GmSDkduxvFPK7Ek-Q_jLfVBfshvkUTwSVLimq20-s4UvuClYGiKbgPKEY0RYHW3r-MlizSYi7ab2vqHO4-ks6NN2TQFbv-9ZDw1GHBjpcVfej4PbFfwW7Nxz3HbB3RfGda1j7U77B8oxC6m3XADNufO54qgqw"}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">ອາການຜິດປົກກະຕິ</h4>
                    <p className="text-sm font-bold text-on-surface mt-1">{selectedRepair.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">ສາເຫດທີ່ພົບ</h4>
                    <p className="text-sm text-gray-600 mt-1">{selectedRepair.cause}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">ແຜນການແກ້ໄຂ</h4>
                    <p className="text-sm text-gray-600 mt-1">{selectedRepair.solution}</p>
                  </div>
                </div>
              </div>

              {/* Previous Repair history */}
              <div className="p-6">
                <h4 className="font-bold text-sm text-on-surface mb-3">ປະຫວັດການສ້ອມແປງທີ່ຜ່ານມາ</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-surface-gray border-b border-border-subtle text-gray-500 font-bold">
                      <tr>
                        <th className="p-3">ເລກທີ REP</th>
                        <th className="p-3">ວັນທີສ້ອມແປງ</th>
                        <th className="p-3">ອາການຜິດປົກກະຕິ</th>
                        <th className="p-3">ຊ່າງເຕັກນິກ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle text-gray-600">
                      <tr>
                        <td className="p-3 font-mono font-bold text-primary">REP-2023-11004</td>
                        <td className="p-3 font-mono">14/11/2023</td>
                        <td className="p-3">ທຳຄວາມສະອາດ Lens ແລະ ປັບຈູນ Alignment ປະຈຳປີ</td>
                        <td className="p-3">ສົມພອນ ເພັດດາລາ</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-primary">REP-2022-09411</td>
                        <td className="p-3 font-mono">08/09/2022</td>
                        <td className="p-3">ປ່ຽນປຸ່ມກົດ Touch screen ທີ່ຕອບສະໜອງຊ້າ</td>
                        <td className="p-3">ວັນໄຊ ມະນີວົງ</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Internal Notes Feed (Saved in Firebase) */}
            <div className="bg-white border border-border-subtle rounded-xl overflow-hidden shadow-sm p-6">
              <h3 className="font-bold text-md text-on-surface font-sans mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <span>ບັນທຶກພາຍໃນ (Internal Notes)</span>
              </h3>

              <form onSubmit={handleNoteSubmit} className="flex gap-3 mb-6">
                <input
                  type="text"
                  placeholder="ຂຽນບັນທຶກ ຫຼື ຄວາມຄິດເຫັນ..."
                  className="flex-1 px-4 py-2 bg-surface-gray border border-border-subtle rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none"
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
                >
                  ເພີ່ມບັນທຶກ
                </button>
              </form>

              <div className="space-y-4 max-h-80 overflow-y-auto">
                {repairComments.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-4">ບໍ່ມີບັນທຶກພາຍໃນເທື່ອ. ຂຽນບັນທຶກທຳອິດດ້ານເທິງ!</p>
                ) : (
                  repairComments.map((note) => (
                    <div key={note.id} className="bg-surface-gray/50 p-4 rounded-lg border border-border-subtle">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" />
                          {note.author}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">{note.date}</span>
                      </div>
                      <p className="text-sm text-gray-700">{note.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Steps Timeline Sidebar */}
          <div className="space-y-8">
            {/* Step status block */}
            <div className="bg-white border border-border-subtle rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider mb-4 flex items-center gap-2">
                <Clock className="w-4.5 h-4.5 text-primary" />
                <span>ຂັ້ນຕອນການດຳເນີນງານ</span>
              </h3>
              <div className="relative pl-6 border-l-2 border-border-subtle space-y-6">
                {selectedRepair.timeline.map((item, idx) => (
                  <div key={item.id} className="relative">
                    {/* Circle marker */}
                    <span className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                      item.done 
                        ? "border-green-500 bg-green-500" 
                        : item.status === "active" 
                        ? "border-amber-500" 
                        : "border-gray-300"
                    }`}>
                      {item.done && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                      {item.status === "active" && <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping"></span>}
                    </span>
                    <div>
                      <h4 className={`text-xs font-bold leading-none ${item.done ? "text-green-600" : item.status === "active" ? "text-amber-600" : "text-gray-400"}`}>
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-mono mt-1">{item.date}</p>
                      <p className="text-xs text-gray-600 mt-1 opacity-90">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Help & Technical support banner */}
            <div className="bg-gradient-to-br from-primary to-primary-container text-white rounded-xl p-6 shadow-md relative overflow-hidden">
              <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              <HelpCircle className="w-8 h-8 text-white/80 mb-3" />
              <h4 className="font-bold text-md mb-1.5">ທ່ານຕ້ອງການຄວາມຊ່ວຍເຫຼືອດ້ານເຕັກນິກບໍ່?</h4>
              <p className="text-xs text-white/85 leading-relaxed mb-4">
                ທີມງານວິສະວະກອນ Uniqtek ພ້ອມໃຫ້ຄຳປຶກສາ ແລະ ແກ້ໄຂບັນຫາອຸປະກອນວັດແທກຂອງທ່ານທຸກເວລາ.
              </p>
              <a href="tel:021555123" className="inline-block bg-white text-primary text-xs font-bold px-4 py-2 rounded shadow hover:bg-blue-50 transition-colors">
                ຕິດຕໍ່ທີມເຕັກນິກ
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-on-surface tracking-tight font-sans">
            ຕິດຕາມສະຖານະອຸປະກອນ
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            ເບິ່ງ ແລະ ຈັດການອຸປະກອນທີ່ຢູ່ໃນຂະບວນການສ້ອມແປງ ແລະ ປັບຈູນ Calibration
          </p>
        </div>
        <button
          onClick={() => setIsAddingRepair(true)}
          className="px-4 py-2.5 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-lg flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>ລົງທະບຽນອຸປະກອນສ້ອມແປງໃໝ່</span>
        </button>
      </div>

      {/* Bento Stats Headers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white p-5 border border-border-subtle rounded-xl hover:shadow-sm transition-shadow">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">ທັງໝົດ</p>
          <h3 className="text-2xl font-bold text-on-surface mt-1 font-mono">{totalCount}</h3>
        </div>
        <div className="bg-white p-5 border border-border-subtle rounded-xl hover:shadow-sm transition-shadow">
          <p className="text-xs font-bold text-amber-500 uppercase tracking-wider">ກຳລັງສ້ອມແປງ</p>
          <h3 className="text-2xl font-bold text-amber-500 mt-1 font-mono">{inRepairCount}</h3>
        </div>
        <div className="bg-white p-5 border border-border-subtle rounded-xl hover:shadow-sm transition-shadow">
          <p className="text-xs font-bold text-green-500 uppercase tracking-wider">ສຳເລັດແລ້ວ</p>
          <h3 className="text-2xl font-bold text-green-500 mt-1 font-mono">{completedCount}</h3>
        </div>
        <div className="bg-white p-5 border border-border-subtle rounded-xl hover:shadow-sm transition-shadow">
          <p className="text-xs font-bold text-blue-500 uppercase tracking-wider">ກຳລັງສຳຫຼວດ</p>
          <h3 className="text-2xl font-bold text-blue-500 mt-1 font-mono">{surveyingCount}</h3>
        </div>
      </div>

      {/* New Repair Registration Modal Popup */}
      {isAddingRepair && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white border border-border-subtle rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-scale-up">
            <div className="p-6 border-b border-border-subtle flex justify-between items-center bg-surface-gray">
              <h3 className="font-bold text-lg text-primary font-sans">ລົງທະບຽນອຸປະກອນສ້ອມແປງໃໝ່</h3>
              <button onClick={() => setIsAddingRepair(false)} className="text-gray-500 hover:text-black">✕</button>
            </div>
            <form onSubmit={handleRepairSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ລຸ້ນອຸປະກອນ (Model) *</label>
                  <input
                    type="text"
                    required
                    placeholder="ຕົວຢ່າງ: Leica TS16 P"
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg text-sm bg-white"
                    value={newModel}
                    onChange={(e) => setNewModel(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ໝາຍເລກເຄື່ອງ (Serial No) *</label>
                  <input
                    type="text"
                    required
                    placeholder="ຕົວຢ່າງ: 894521"
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg text-sm bg-white"
                    value={newSerial}
                    onChange={(e) => setNewSerial(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ຫົວຂໍ້ການບໍລິການ (Title) *</label>
                <input
                  type="text"
                  required
                  placeholder="ຕົວຢ່າງ: Leica TS16 - ຄວາມຜິດພາດຂອງລະບົບ EDM"
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
                    placeholder="ຕົວຢ່າງ: ກົມແຜນທີ່ ແລະ ພູມສາດ"
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg text-sm bg-white"
                    value={newClient}
                    onChange={(e) => setNewClient(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ຊ່າງເຕັກນິກທີ່ຮັບຜິດຊອບ</label>
                  <input
                    type="text"
                    placeholder="ຕົວຢ່າງ: ສົມພອນ ເພັດດາລາ"
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg text-sm bg-white"
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ອາການຜິດປົກກະຕິເບື້ອງຕົ້ນ</label>
                <textarea
                  placeholder="ກະລຸນາລະບຸອາການຜິດປົກກະຕິ..."
                  className="w-full px-3 py-2 border border-border-subtle rounded-lg text-sm bg-white h-20"
                  value={newProblem}
                  onChange={(e) => setNewProblem(e.target.value)}
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ສາເຫດທີ່ພົບ (ຖ້າມີ)</label>
                  <input
                    type="text"
                    placeholder="ຕົວຢ່າງ: Optical sensor ມີຂີ້ຝຸ່ນ"
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg text-sm bg-white"
                    value={newCause}
                    onChange={(e) => setNewCause(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ແຜນການແກ້ໄຂ / ແກ້ໄຂແລ້ວ</label>
                  <input
                    type="text"
                    placeholder="ຕົວຢ່າງ: ທຳຄວາມສະອາດຊຸດເລນ ແລະ ປັບຈູນ"
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg text-sm bg-white"
                    value={newSolution}
                    onChange={(e) => setNewSolution(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border-subtle">
                <button
                  type="button"
                  onClick={() => setIsAddingRepair(false)}
                  className="px-4 py-2 border border-border-subtle text-gray-500 text-xs font-bold rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  ຍົກເລີກ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-lg cursor-pointer shadow-sm"
                >
                  ຢືນຢັນການລົງທະບຽນ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Content List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Table column */}
        <div className="lg:col-span-2 bg-white border border-border-subtle rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-gray/70 border-b border-border-subtle text-xs text-gray-500 font-sans">
                <tr>
                  <th className="p-4 font-bold">ອຸປະກອນ</th>
                  <th className="p-4 font-bold">ລູກຄ້າ / ພາກສ່ວນ</th>
                  <th className="p-4 font-bold">ສະຖານະ</th>
                  <th className="p-4 font-bold">ວັນທີຮັບເຄື່ອງ</th>
                  <th className="p-4 font-bold"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle text-sm">
                {filteredRepairs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-400">
                      ບໍ່ພົບຂໍ້ມູນອຸປະກອນທີ່ຄົ້ນຫາ
                    </td>
                  </tr>
                ) : (
                  filteredRepairs.map((rep) => (
                    <tr
                      key={rep.id}
                      onClick={() => onSelectRepair(rep)}
                      className="hover:bg-slate-50 cursor-pointer transition-all border-l-2 border-l-transparent hover:border-l-primary"
                    >
                      <td className="p-4">
                        <div>
                          <p className="font-bold text-on-surface leading-tight">{rep.model}</p>
                          <p className="text-[10px] text-gray-500 font-mono mt-0.5">{rep.serialNo}</p>
                        </div>
                      </td>
                      <td className="p-4 font-sans text-xs text-gray-600 font-semibold">{rep.client}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          rep.status === "ສຳເລັດແລ້ວ" ? "bg-green-100 text-success-green" :
                          rep.status === "ກຳລັງສ້ອມແປງ" ? "bg-amber-100 text-warning-amber" : 
                          rep.status === "ກຳລັງສຳຫຼວດ" ? "bg-blue-100 text-info-blue" : "bg-gray-100 text-gray-500"
                        }`}>
                          {rep.status}
                        </span>
                      </td>
                      <td className="p-4 text-xs font-mono text-gray-500">{rep.receivedDate}</td>
                      <td className="p-4">
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calendar & Help Column */}
        <div className="space-y-8">
          {/* Calendar Widget */}
          <div className="bg-white border border-border-subtle rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider mb-4 flex items-center gap-2">
              <Calendar className="w-4.5 h-4.5 text-primary" />
              <span>ປະຕິທິນການສົ່ງມອບ (Delivery Calendar)</span>
            </h3>
            {/* Simple static/dynamic calendar representing July 2026 */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                <span>ກໍລະກົດ 2026</span>
                <span className="text-primary font-mono font-bold">2 ວຽກວັນນີ້</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-gray-400 border-b border-border-subtle pb-1">
                <span>ອາ</span><span>ຈ</span><span>ອ</span><span>ພ</span><span>ພຫ</span><span>ສ</span><span>ສ</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-mono">
                {/* Pad days of previous month (June ends on Tue, so Jul starts Wed) */}
                <span className="text-gray-300 py-1">28</span>
                <span className="text-gray-300 py-1">29</span>
                <span className="text-gray-300 py-1">30</span>
                {/* July 1 to July 7 */}
                <span className="py-1 hover:bg-gray-100 rounded cursor-pointer">1</span>
                <span className="py-1 hover:bg-gray-100 rounded cursor-pointer">2</span>
                <span className="py-1 hover:bg-gray-100 rounded cursor-pointer">3</span>
                <span className="py-1 hover:bg-gray-100 rounded cursor-pointer">4</span>
                {/* July 5 - today */}
                <span className="py-1 bg-primary text-white font-bold rounded cursor-pointer relative">
                  5
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>
                </span>
                <span className="py-1 hover:bg-gray-100 rounded cursor-pointer">6</span>
                <span className="py-1 hover:bg-gray-100 rounded cursor-pointer">7</span>
                <span className="py-1 hover:bg-gray-100 rounded cursor-pointer">8</span>
                <span className="py-1 hover:bg-gray-100 rounded cursor-pointer">9</span>
                <span className="py-1 hover:bg-amber-100 rounded cursor-pointer relative">
                  10
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full"></span>
                </span>
                <span className="py-1 hover:bg-gray-100 rounded cursor-pointer">11</span>
                <span className="py-1 hover:bg-gray-100 rounded cursor-pointer">12</span>
                <span className="py-1 hover:bg-gray-100 rounded cursor-pointer">13</span>
                <span className="py-1 hover:bg-gray-100 rounded cursor-pointer">14</span>
                <span className="py-1 hover:bg-green-100 rounded cursor-pointer relative">
                  15
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>
                </span>
                <span className="py-1 hover:bg-gray-100 rounded cursor-pointer">16</span>
                <span className="py-1 hover:bg-gray-100 rounded cursor-pointer">17</span>
                <span className="py-1 hover:bg-gray-100 rounded cursor-pointer">18</span>
                <span className="text-gray-400 py-1">...</span>
              </div>
              <div className="pt-2 border-t border-dashed border-border-subtle text-[11px] space-y-2">
                <div className="flex justify-between items-center bg-amber-50 p-2 rounded border border-amber-100">
                  <span className="font-bold text-amber-800">10/07 - ວັດແທກດາວທຽມ</span>
                  <span className="text-[9px] bg-amber-500 text-white px-1.5 py-0.5 rounded uppercase font-bold">RTK check</span>
                </div>
                <div className="flex justify-between items-center bg-green-50 p-2 rounded border border-green-100">
                  <span className="font-bold text-green-800">15/07 - ສົ່ງມອບເຄື່ອງ Leica LS15</span>
                  <span className="text-[9px] bg-green-500 text-white px-1.5 py-0.5 rounded uppercase font-bold">Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quotations shortcut */}
          <div className="bg-white border border-border-subtle rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider mb-2 flex items-center gap-2">
              <FileText className="w-4.5 h-4.5 text-primary" />
              <span>ໃບສະເໜີລາຄາຄົງຄ້າງ</span>
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              ກວດສອບສະຖານະໃບສະເໜີລາຄາທີ່ລໍຖ້າການອະນຸມັດຈາກລູກຄ້າ.
            </p>
            <div className="p-3 bg-surface-gray rounded-lg border border-border-subtle flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-on-surface">Ref: QT-2023-11004</p>
                <p className="text-[10px] text-gray-400">Lao-China Railway Co., Ltd</p>
              </div>
              <span className="text-[11px] font-bold text-primary">11,663,000 LAK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

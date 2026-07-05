import React, { useState } from "react";
import { Quotation, QuotationItem } from "../types";
import { 
  FileText, 
  Plus, 
  Trash2, 
  ChevronRight, 
  Calendar, 
  DollarSign, 
  Percent, 
  Printer, 
  Download,
  CheckCircle2,
  Undo
} from "lucide-react";

interface QuotationsViewProps {
  quotations: Quotation[];
  selectedQuotation: Quotation | null;
  onSelectQuotation: (quote: Quotation | null) => void;
  onAddQuotation: (quote: Omit<Quotation, "id">) => void;
}

export default function QuotationsView({
  quotations,
  selectedQuotation,
  onSelectQuotation,
  onAddQuotation
}: QuotationsViewProps) {
  const [isCreating, setIsCreating] = useState(false);
  
  // Quotation form states
  const [customerName, setCustomerName] = useState("");
  const [refNo, setRefNo] = useState("");
  const [validity, setValidity] = useState("30 ວັນ");
  const [terms, setTerms] = useState("ລາຄານີ້ລວມຄ່າຂົນສົ່ງພາຍໃນນະຄອນຫຼວງວຽງຈັນ. ສໍາລັບຕ່າງແຂວງຈະມີຄ່າໃຊ້ຈ່າຍເພີ່ມເຕີມຕາມໄລຍະທາງຕົວຈິງ.");
  
  // Line items state
  const [items, setItems] = useState<Omit<QuotationItem, "id">[]>([
    { description: "Repair Service for Total Station (Leica TS16)", details: "Full calibration, lens cleaning, and firmware update.", qty: 1, unitPrice: 2500000 }
  ]);

  const [newItemDesc, setNewItemDesc] = useState("");
  const [newItemDetails, setNewItemDetails] = useState("");
  const [newItemQty, setNewItemQty] = useState(1);
  const [newItemPrice, setNewItemPrice] = useState(0);

  const handleAddItem = () => {
    if (!newItemDesc) return;
    setItems([
      ...items,
      {
        description: newItemDesc,
        details: newItemDetails,
        qty: Number(newItemQty),
        unitPrice: Number(newItemPrice)
      }
    ]);
    setNewItemDesc("");
    setNewItemDetails("");
    setNewItemQty(1);
    setNewItemPrice(0);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Compute values
  const subtotal = items.reduce((sum, item) => sum + (item.qty * item.unitPrice), 0);
  const vat = Math.round(subtotal * 0.07); // 7% VAT in Laos
  const total = subtotal + vat;

  const handleSubmitQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || items.length === 0) return;

    onAddQuotation({
      refNo: refNo || `QT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      date: new Date().toISOString().split("T")[0],
      validity,
      items: items.map((item, index) => ({ ...item, id: `item-${index}-${Date.now()}` })),
      terms,
      subtotal,
      vat,
      total
    });

    // Reset fields
    setCustomerName("");
    setRefNo("");
    setItems([{ description: "Repair Service for Total Station (Leica TS16)", details: "Full calibration, lens cleaning, and firmware update.", qty: 1, unitPrice: 2500000 }]);
    setIsCreating(false);
  };

  if (selectedQuotation) {
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Detail view header with back buttons */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onSelectQuotation(null)}
              className="p-2 bg-white hover:bg-surface-gray border border-border-subtle rounded-lg text-gray-600 transition-colors"
            >
              <Undo className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-on-surface font-sans">ລາຍລະອຽດໃບສະເໜີລາຄາ</h2>
              <p className="text-xs text-gray-500 mt-1">ເລກອ້າງອີງ: <strong className="font-mono">{selectedQuotation.refNo}</strong></p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => window.print()}
              className="px-4 py-2 bg-white border border-border-subtle hover:bg-surface-gray text-gray-600 text-xs font-bold rounded-lg flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>ພິມເອກະສານ</span>
            </button>
            <button className="px-4 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-lg flex items-center gap-2 cursor-pointer">
              <Download className="w-4 h-4" />
              <span>ດາວໂຫຼດ PDF</span>
            </button>
          </div>
        </div>

        {/* Printable/Elegant Invoice Receipt Sheet */}
        <div className="bg-white border border-border-subtle rounded-xl p-8 max-w-4xl mx-auto shadow-md space-y-8 print:p-0 print:border-none print:shadow-none">
          {/* Header invoice details */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-sans font-bold text-primary">Uniqtek Co., Ltd</h1>
              <p className="text-xs text-gray-500 mt-1">ບໍລິສັດ ຢູນິກເທັກ ຈຳກັດ (Uniqtek Co., Ltd)</p>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                ບ້ານໂພນທັນ, ເມືອງສີສັດຕະນາກ, ນະຄອນຫຼວງວຽງຈັນ<br/>
                ໂທ: 021 555123 • ອີເມວ: service@uniqtek.la
              </p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold text-on-surface font-sans uppercase tracking-wider">ໃບສະເໜີລາຄາ</h2>
              <p className="text-xs font-mono font-bold text-primary mt-1">{selectedQuotation.refNo}</p>
              <div className="text-xs text-gray-500 mt-3 space-y-1">
                <p>ວັນທີສະເໜີ: <strong>{selectedQuotation.date}</strong></p>
                <p>ກຳນົດຍືນລາຄາ: <strong>{selectedQuotation.validity}</strong></p>
              </div>
            </div>
          </div>

          <div className="h-[1px] bg-border-subtle"></div>

          {/* Customer info */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-bold text-gray-400 uppercase tracking-wider">ລູກຄ້າ / ພາກສ່ວນ</p>
              <p className="text-sm font-bold text-on-surface mt-1">{selectedQuotation.customerName}</p>
              <p className="text-gray-500 mt-1">ບໍລິສັດຄູ່ຮ່ວມງານເຕັກນິກ Uniqtek</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-400 uppercase tracking-wider">ເງື່ອນໄຂການຊຳລະ</p>
              <p className="text-sm font-bold text-on-surface mt-1">ມັດຈຳ 50%, ຊຳລະສ່ວນທີ່ເຫຼືອຫຼັງສົ່ງມອບ</p>
            </div>
          </div>

          {/* Table Items */}
          <div className="overflow-hidden border border-border-subtle rounded-lg">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-surface-gray font-bold text-gray-600">
                <tr>
                  <th className="p-3 w-12 text-center">ລຳດັບ</th>
                  <th className="p-3">ລາຍການບໍລິການ / ອຸປະກອນ</th>
                  <th className="p-3 text-center w-16">ຈຳນວນ</th>
                  <th className="p-3 text-right w-36">ລາຄາຕໍ່ໜ່ວຍ (LAK)</th>
                  <th className="p-3 text-right w-36">ລາຄາລວມ (LAK)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle text-gray-700">
                {selectedQuotation.items.map((item, idx) => (
                  <tr key={item.id}>
                    <td className="p-3 text-center font-mono font-bold text-gray-400">{idx + 1}</td>
                    <td className="p-3">
                      <p className="font-bold text-on-surface">{item.description}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{item.details}</p>
                    </td>
                    <td className="p-3 text-center font-mono">{item.qty}</td>
                    <td className="p-3 text-right font-mono">{item.unitPrice.toLocaleString()}</td>
                    <td className="p-3 text-right font-mono font-bold">{(item.qty * item.unitPrice).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Price Calculations and Signatures */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
            {/* Terms and Notes */}
            <div className="space-y-3">
              <p className="font-bold text-gray-400 uppercase tracking-wider">ເງື່ອນໄຂ ແລະ ຂໍ້ຕົກລົງ</p>
              <p className="text-gray-500 leading-relaxed bg-surface-gray/50 p-4 rounded-lg border border-border-subtle">
                {selectedQuotation.terms}
              </p>
            </div>

            {/* Total Calculations */}
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-border-subtle">
                <span className="text-gray-500 font-bold">ລວມຍອດ (Subtotal)</span>
                <span className="font-mono font-bold">{selectedQuotation.subtotal.toLocaleString()} LAK</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border-subtle">
                <span className="text-gray-500 font-bold">ອາກອນມູນຄ່າເພີ່ມ VAT (7%)</span>
                <span className="font-mono font-bold">{selectedQuotation.vat.toLocaleString()} LAK</span>
              </div>
              <div className="flex justify-between items-center py-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <span className="text-primary font-bold text-sm">ຍອດລວມທັງໝົດ (Grand Total)</span>
                <span className="font-mono font-bold text-lg text-primary">{selectedQuotation.total.toLocaleString()} LAK</span>
              </div>
            </div>
          </div>

          {/* Signatures Row */}
          <div className="grid grid-cols-2 gap-8 text-center text-xs pt-12">
            <div>
              <div className="mx-auto w-36 border-b border-border-subtle h-12"></div>
              <p className="font-bold text-gray-700 mt-2">ຜູ້ສະເໜີລາຄາ (Uniqtek Representative)</p>
              <p className="text-gray-400 mt-1">ຊ່າງເຕັກນິກ ແລະ ວິສະວະກອນ Calibration</p>
            </div>
            <div>
              <div className="mx-auto w-36 border-b border-border-subtle h-12"></div>
              <p className="font-bold text-gray-700 mt-2">ຜູ້ອະນຸມັດ / ລູກຄ້າ (Client Authorization)</p>
              <p className="text-gray-400 mt-1">ວັນທີ: ________________________</p>
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
            ຈັດການໃບສະເໜີລາຄາ (Quotations)
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            ສ້າງ, ຄຸ້ມຄອງ ແລະ ພິມໃບສະເໜີລາຄາສໍາລັບການບໍລິການສ້ອມແປງ ແລະ ບຳລຸງຮັກສາອຸປະກອນ
          </p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2.5 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-lg flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>ສ້າງໃບສະເໜີລາຄາໃໝ່</span>
        </button>
      </div>

      {/* Quotation creation screen / Form */}
      {isCreating ? (
        <div className="bg-white border border-border-subtle rounded-xl p-6 shadow-md space-y-6 animate-scale-up">
          <div className="border-b border-border-subtle pb-4 flex justify-between items-center">
            <h3 className="font-bold text-lg text-primary font-sans">ສ້າງໃບສະເໜີລາຄາໃໝ່</h3>
            <button 
              onClick={() => setIsCreating(false)}
              className="text-gray-500 text-xs font-bold hover:underline"
            >
              ຍົກເລີກ
            </button>
          </div>

          <form onSubmit={handleSubmitQuotation} className="space-y-6">
            {/* Meta info fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">ຊື່ລູກຄ້າ / ບໍລິສັດຄູ່ຮ່ວມງານ *</label>
                <input
                  type="text"
                  required
                  placeholder="ຕົວຢ່າງ: Lao-China Railway Co., Ltd"
                  className="w-full px-3 py-2 border border-border-subtle rounded-lg text-sm bg-white"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">ເລກອ້າງອີງໃບສະເໜີລາຄາ (Ref No)</label>
                <input
                  type="text"
                  placeholder="ຕົວຢ່າງ: QT-2023-11004"
                  className="w-full px-3 py-2 border border-border-subtle rounded-lg text-sm bg-white font-mono"
                  value={refNo}
                  onChange={(e) => setRefNo(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">ກຳນົດຍືນລາຄາ</label>
                <input
                  type="text"
                  placeholder="ຕົວຢ່າງ: 30 ວັນ"
                  className="w-full px-3 py-2 border border-border-subtle rounded-lg text-sm bg-white"
                  value={validity}
                  onChange={(e) => setValidity(e.target.value)}
                />
              </div>
            </div>

            {/* Add Line item controls */}
            <div className="p-4 bg-surface-gray rounded-lg border border-border-subtle space-y-3">
              <h4 className="font-bold text-xs text-on-surface uppercase tracking-wider">ເພີ່ມລາຍການບໍລິການ / ອຸປະກອນ</h4>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                <div className="md:col-span-4">
                  <label className="block text-[10px] text-gray-500 font-bold mb-1">ຊື່ລາຍການ</label>
                  <input
                    type="text"
                    placeholder="ຕົວຢ່າງ: Repair Service for Total Station (Leica TS16)"
                    className="w-full px-2.5 py-1.5 border border-border-subtle bg-white rounded text-xs"
                    value={newItemDesc}
                    onChange={(e) => setNewItemDesc(e.target.value)}
                  />
                </div>
                <div className="md:col-span-4">
                  <label className="block text-[10px] text-gray-500 font-bold mb-1">ລາຍລະອຽດເພີ່ມເຕີມ</label>
                  <input
                    type="text"
                    placeholder="ຕົວຢ່າງ: ປ່ຽນ Optical board ພາຍໃນ"
                    className="w-full px-2.5 py-1.5 border border-border-subtle bg-white rounded text-xs"
                    value={newItemDetails}
                    onChange={(e) => setNewItemDetails(e.target.value)}
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-[10px] text-gray-500 font-bold mb-1">ຈຳນວນ</label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-2.5 py-1.5 border border-border-subtle bg-white rounded text-xs text-center"
                    value={newItemQty}
                    onChange={(e) => setNewItemQty(Number(e.target.value))}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] text-gray-500 font-bold mb-1">ລາຄາຕໍ່ໜ່ວຍ (LAK)</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-2.5 py-1.5 border border-border-subtle bg-white rounded text-xs"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(Number(e.target.value))}
                  />
                </div>
                <div className="md:col-span-1">
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="w-full py-1.5 bg-primary text-white text-xs font-bold rounded cursor-pointer hover:bg-primary-container"
                  >
                    ເພີ່ມ
                  </button>
                </div>
              </div>
            </div>

            {/* List of currently added items */}
            <div className="overflow-x-auto border border-border-subtle rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-surface-gray font-bold text-gray-500">
                  <tr>
                    <th className="p-3">ລາຍການບໍລິການ</th>
                    <th className="p-3 text-center w-16">ຈຳນວນ</th>
                    <th className="p-3 text-right w-32">ລາຄາຕໍ່ໜ່ວຍ (LAK)</th>
                    <th className="p-3 text-right w-32">ລາຄາລວມ (LAK)</th>
                    <th className="p-3 text-center w-12"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle text-gray-600">
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-gray-400">ຍັງບໍ່ມີລາຍການບໍລິການເທື່ອ</td>
                    </tr>
                  ) : (
                    items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="p-3">
                          <p className="font-bold text-on-surface">{item.description}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{item.details}</p>
                        </td>
                        <td className="p-3 text-center font-mono">{item.qty}</td>
                        <td className="p-3 text-right font-mono">{item.unitPrice.toLocaleString()}</td>
                        <td className="p-3 text-right font-mono font-bold">{(item.qty * item.unitPrice).toLocaleString()}</td>
                        <td className="p-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(idx)}
                            className="p-1 text-primary hover:bg-slate-100 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pricing Summary Block */}
            <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-lg max-w-md ml-auto space-y-2 text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-500 font-bold">ລວມຍອດ (Subtotal)</span>
                <span className="font-mono font-bold">{subtotal.toLocaleString()} LAK</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-500 font-bold">ອາກອນ VAT (7%)</span>
                <span className="font-mono font-bold">{vat.toLocaleString()} LAK</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border-subtle">
                <span className="text-primary font-bold text-sm">ຍອດລວມທັງໝົດ</span>
                <span className="font-mono font-bold text-lg text-primary">{total.toLocaleString()} LAK</span>
              </div>
            </div>

            {/* Terms input */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">ເງື່ອນໄຂການບໍລິການ ແລະ ຂໍ້ຕົກລົງ</label>
              <textarea
                className="w-full px-3 py-2 border border-border-subtle rounded-lg text-sm bg-white h-20"
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-border-subtle">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 border border-border-subtle text-gray-500 text-xs font-bold rounded-lg cursor-pointer hover:bg-gray-50"
              >
                ຍົກເລີກ
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-lg cursor-pointer shadow-sm flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>ຢືນຢັນການອອກໃບສະເໜີລາຄາ</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Quotation list */
        <div className="bg-white border border-border-subtle rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-surface-gray text-xs font-bold text-gray-500">
              <tr>
                <th className="p-4">ເລກອ້າງອີງ (Ref No)</th>
                <th className="p-4">ລູກຄ້າ / ພາກສ່ວນ</th>
                <th className="p-4">ວັນທີອອກເອກະສານ</th>
                <th className="p-4">ກຳນົດຍືນລາຄາ</th>
                <th className="p-4 text-right">ມູນຄ່າລວມ (LAK)</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {quotations.map((quote) => (
                <tr 
                  key={quote.id} 
                  onClick={() => onSelectQuotation(quote)}
                  className="hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <td className="p-4 font-mono font-bold text-primary">{quote.refNo}</td>
                  <td className="p-4 font-bold text-on-surface">{quote.customerName}</td>
                  <td className="p-4 text-xs text-gray-500 font-mono">{quote.date}</td>
                  <td className="p-4 text-xs font-semibold">{quote.validity}</td>
                  <td className="p-4 text-right font-mono font-bold text-primary">{quote.total.toLocaleString()} LAK</td>
                  <td className="p-4">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

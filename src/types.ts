export interface Repair {
  id: string;
  serialNo: string;
  model: string;
  title: string;
  client: string;
  receivedDate: string;
  status: 'ກຳລັງສ້ອມແປງ' | 'ສຳເລັດແລ້ວ' | 'ລໍຖ້າກວດເຊັກ' | 'ກຳລັງສຳຫຼວດ';
  problem: string;
  cause: string;
  solution: string;
  assignedTech: string;
  timeline: TimelineItem[];
  imageUrl?: string;
}

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  desc: string;
  done: boolean;
  status: 'done' | 'active' | 'upcoming';
}

export interface InternalNote {
  id: string;
  repairId: string;
  author: string;
  date: string;
  text: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  progress: number;
  status: 'ກຳລັງສຳຫຼວດ' | 'ລໍຖ້າການວິເຄາະ' | 'ສຳເລັດແລ້ວ';
  location: string;
  team: TeamMember[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  active: boolean;
  phone: string;
}

export interface CORSStation {
  id: string; // e.g. ANUV, ASFT
  name: string; // e.g. ອານຸວົງ
  type: 'ເກົ່າ' | 'ໃໝ່';
  status: 'Online' | 'Offline';
  issue: string;
  notes?: string;
}

export interface Quotation {
  id: string;
  refNo: string;
  customerName: string;
  date: string;
  validity: string;
  items: QuotationItem[];
  terms: string;
  subtotal: number;
  vat: number;
  total: number;
}

export interface QuotationItem {
  id: string;
  description: string;
  details: string;
  qty: number;
  unitPrice: number;
}

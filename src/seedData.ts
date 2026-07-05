import { Repair, Project, CORSStation, Quotation, InternalNote } from "./types";

export const initialRepairs: Repair[] = [
  {
    id: "REP-2024-0089",
    serialNo: "SN: 894521",
    model: "Leica TS16 P 1\"",
    title: "Total Station Leica TS16 - ຄວາມຜິດພາດຂອງລະບົບ EDM",
    client: "ກົມແຜນທີ່ ແລະ ພູມສາດ",
    receivedDate: "2024-05-12",
    status: "ກຳລັງສ້ອມແປງ",
    problem: "ລະບົບ EDM ບໍ່ສາມາດວັດແທກໄລຍະທາງໄດ້ໃນໂໝດ Prism, ພົບຄວາມຜິດພາດ Code E102.",
    cause: "Optical sensor ພາຍໃນມີຂີ້ຝຸ່ນ ແລະ ການປັບຈູນເລເຊີເຄື່ອນຍ້າຍຈາກຕຳແໜ່ງມາດຕະຖານ.",
    solution: "ທຳຄວາມສະອາດຊຸດເລນ, ປັບຈູນ Optical Alignment ໃໝ່ ແລະ ທົດສອບ Calibration ຕາມມາດຕະຖານ ISO.",
    assignedTech: "ສົມພອນ ເພັດດາລາ",
    timeline: [
      {
        id: "t1",
        date: "12/05/2024 - 09:30",
        title: "ຮັບເຄື່ອງ ແລະ ລົງທະບຽນ",
        desc: "ອຸປະກອນຖືກຮັບເຂົ້າສາງ ແລະ ກວດສອບເບື້ອງຕົ້ນ.",
        done: true,
        status: "done"
      },
      {
        id: "t2",
        date: "13/05/2024 - 14:20",
        title: "ວິນິດໄສອາການ",
        desc: "ຊ່າງເຕັກນິກກວດພົບສາເຫດຂອງ Code E102.",
        done: true,
        status: "done"
      },
      {
        id: "t3",
        date: "14/05/2024 - 10:00",
        title: "ກຳລັງສ້ອມແປງ ແລະ ປັບຈູນ",
        desc: "ກຳລັງລໍຖ້າການປັບຈູນ Optical alignment ດ້ວຍເຄື່ອງມືພິເສດ.",
        done: false,
        status: "active"
      },
      {
        id: "t4",
        date: "15/05/2024 - 16:00",
        title: "ທົດສອບ Calibration",
        desc: "ທົດສອບຄວາມຖືກຕ້ອງກ່ອນສົ່ງມອບ.",
        done: false,
        status: "upcoming"
      }
    ]
  },
  {
    id: "REP-2024-0091",
    serialNo: "SN: 624190",
    model: "Trimble R12i GNSS",
    title: "GNSS Receiver Trimble R12i - ບໍ່ຮັບສັນຍານດາວທຽມ RTK",
    client: "ບໍລິສັດ ກໍ່ສ້າງຂົວທາງ ຈຳກັດ",
    receivedDate: "2024-05-10",
    status: "ສຳເລັດແລ້ວ",
    problem: "ບໍ່ສາມາດເຊື່ອມຕໍ່ສັນຍານ RTK ໄດ້ ແລະ ການຮັບດາວທຽມຕໍ່າຜິດປົກກະຕິ.",
    cause: "ບອດຮັບສັນຍານ GPS ພາຍໃນມີຮອຍເສຍຫາຍຈາກຄວາມຊື້ນ.",
    solution: "ປ່ຽນບອດຮັບສັນຍານ GPS ໃໝ່, ທຳຄວາມສະອາດພອດ ແລະ ອັບເດດ Firmware ຫຼ້າສຸດ.",
    assignedTech: "ສົມພອນ ເພັດດາລາ",
    timeline: [
      {
        id: "t21",
        date: "10/05/2024 - 08:30",
        title: "ຮັບເຄື່ອງ ແລະ ລົງທະບຽນ",
        desc: "ອຸປະກອນຖືກຮັບເຂົ້າສາງ ແລະ ກວດສອບເບື້ອງຕົ້ນ.",
        done: true,
        status: "done"
      },
      {
        id: "t22",
        date: "11/05/2024 - 11:15",
        title: "ວິນິດໄສອາການ",
        desc: "ກວດພົບບອດຮັບສັນຍານເສຍຫາຍ.",
        done: true,
        status: "done"
      },
      {
        id: "t23",
        date: "12/05/2024 - 13:00",
        title: "ປ່ຽນອະໄຫຼ່ ແລະ ສ້ອມແປງ",
        desc: "ປ່ຽນບອດຮັບສັນຍານໃໝ່ ແລະ ທົດສອບພາຍໃນ.",
        done: true,
        status: "done"
      },
      {
        id: "t24",
        date: "13/05/2024 - 15:30",
        title: "ທົດສອບ Calibration & ສົ່ງມອບ",
        desc: "ທົດສອບ RTK ຜ່ານ ແລະ ກຽມສົ່ງມອບຄືນລູກຄ້າ.",
        done: true,
        status: "done"
      }
    ]
  },
  {
    id: "REP-2024-0095",
    serialNo: "SN: 431055",
    model: "Leica LS15",
    title: "Digital Level Leica LS15 - ຈໍສຳຜັດບໍ່ຕອບສະໜອງ",
    client: "ລັດວິສາຫະກິດ ໄຟຟ້າລາວ",
    receivedDate: "2024-05-15",
    status: "ລໍຖ້າກວດເຊັກ",
    problem: "ໜ້າຈໍສະແດງຜົນມີເສັ້ນສີດຳ ແລະ ລະບົບສຳຜັດໃຊ້ງານບໍ່ໄດ້ບາງຈຸດ.",
    cause: "ຈໍ LCD ເສຍຫາຍຈາກການກະແທກໃນພາກສະໜາມ.",
    solution: "ປ່ຽນຊຸດໜ້າຈໍ LCD ໃໝ່ ແລະ ທົດສອບຄວາມຖືກຕ້ອງຂອງລະບົບວັດແທກ.",
    assignedTech: "ວັນໄຊ ມະນີວົງ",
    timeline: [
      {
        id: "t31",
        date: "15/05/2024 - 10:30",
        title: "ຮັບເຄື່ອງ ແລະ ລົງທະບຽນ",
        desc: "ອຸປະກອນຖືກຮັບເຂົ້າສາງ ແລະ ກວດສອບເບື້ອງຕົ້ນ.",
        done: true,
        status: "done"
      },
      {
        id: "t32",
        date: "16/05/2024 - 09:00",
        title: "ວິນິດໄສ ແລະ ວາງແຜນ",
        desc: "ກຳລັງກວດສອບຄວາມເສຍຫາຍຂອງລະບົບພາຍໃນອື່ນໆ.",
        done: false,
        status: "active"
      }
    ]
  }
];

export const initialProjects: Project[] = [
  {
    id: "PRJ-001",
    title: "ສຳຫຼວດພື້ນທີ່ສ້າງທາງດ່ວນ ນະຄອນຫຼວງ-ວັງວຽງ",
    client: "ກົມຂົນສົ່ງ ແລະ ທາງຫຼວງ",
    progress: 75,
    status: "ກຳລັງສຳຫຼວດ",
    location: "ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ",
    coordinates: { lat: 18.2, lng: 102.5 },
    team: [
      {
        name: "ທ່ານ ອານຸສອນ ສີຫາວົງ",
        role: "ຫົວໜ້າທີມສຳຫຼວດ",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxluIFtCMv0qOHTGknVD5eeDh2WBmmpDtorjHxpUCIQgiuQrFwiEfRyzNA9mOifU3Wig3mzMjZkW5J6lgjVyHtPR5OuJRKjr-MtonPJ6yXg6UTe4m-Lpap2_6q8Zf8KSPUfdX6KatghzImZItZR36EGiOtqxNFDNtQPpePeqxOAz32A0pU5Z6SOlTSjs9oGjFFZCScaHxYL_upa9DRGFXUmEaRaXzaq8tuRkQW_KpbxYJyuYL_i-U-5w",
        active: true,
        phone: "020 5556 1234"
      },
      {
        name: "ນາງ ມະນີວັນ ເພັດດາລາ",
        role: "ວິສະວະກອນແຜນທີ່",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPIo3NcgUTCyQYePlhVa0M9DifE1IkixIZYId-fIA2fhT4jjcpnW6h9Z3pyzvo6kTZqebRKLPpRGSfwaxZMW5xnjGaWxlFhmuu3lyiUs0ms1L0w2PmeupRy0JjDNfsUSZOn68KWn8gX-_ZQFrdixDUz0s5mrYOEhFXDGpQpxqurSEVJErqkZD_dcay1ImZbdrKbawXigB3fhLwf76bYXrAsNgGdPk1qtC44PVPGVSdk507j8xT10jQiQ",
        active: true,
        phone: "020 9998 7654"
      }
    ]
  },
  {
    id: "PRJ-002",
    title: "ວັດແທກລະດັບນ້ຳເຂື່ອນໄຟຟ້າ ນ້ຳງື່ມ 1",
    client: "ລັດວິສາຫະກິດໄຟຟ້າລາວ",
    progress: 40,
    status: "ລໍຖ້າການວິເຄາະ",
    location: "ແຂວງວຽງຈັນ, ສປປ ລາວ",
    coordinates: { lat: 18.5, lng: 102.6 },
    team: [
      {
        name: "ທ່ານ ສົມສັກ ເພັດດາວົງ",
        role: "ນັກວິເຄາະຂໍ້ມູນວັດແທກ",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPVWOjlulFfoXaO35fib94h-C_pgq_28taTeJ-pxe8P8H5TUxJ3bbhkqJ8IBFiUMJeed55F8-VCXnip4MjfLQDwZdaZseg21MfrvADiTdcFHggreGIEtMeRoI_mMpcmh05ljlSveB16f_UgRdFIZdUR28wIa7J2NaiqpQIZC7HN5vBI4p8iWsY6UPaTqMK3ztyAKZLSCxoITG068CJt_C4o54LZIJajSIqbBdEkSLheBjqzcDGJKlHqQ",
        active: false,
        phone: "020 2233 4455"
      }
    ]
  },
  {
    id: "PRJ-003",
    title: "ສຳຫຼວດຂອບເຂດທີ່ດິນ ອຸດສາຫະກຳສະເພາະ",
    client: "ກຸ່ມບໍລິສັດ ພັດທະນາເສດຖະກິດ",
    progress: 100,
    status: "ສຳເລັດແລ້ວ",
    location: "ແຂວງສະຫວັນນະເຂດ, ສປປ ລາວ",
    coordinates: { lat: 16.5, lng: 104.8 },
    team: [
      {
        name: "ນາງ ວິໄລວັນ ສົມພອນ",
        role: "ວິສະວະກອນໂຍທາ",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTi7p-LZ68sk9bKBWAdxYoxiAjos60t8ZSo6uePhz-h6TPbVEstSMPyqnB1tQ3Ly2vqkyFsfAw5VoOIW5gpU5ExkbsvLAeEKvzVYtCN4o_BOI5kgSxYZCsvRNxtstTcBQYeYjac-Nin9BEH2SXuPXi4_Ta9Z4POKo4ZuJ0GxwuhiImT5ZWHjTJZ0GK5_S7pSqv3Qu-e9HKUeUPMHJ1O2UTn2sRZLK2-j1hRHP0GCqFlZeZBNSpY4X1Bw",
        active: true,
        phone: "020 7788 9900"
      }
    ]
  },
  {
    id: "PRJ-004",
    title: "ວາງລະບົບສາຍສົ່ງໄຟຟ້າແຮງສູງ 500kV",
    client: "ກຸ່ມພະລັງງານໄຟຟ້າພາກໃຕ້",
    progress: 15,
    status: "ກຳລັງສຳຫຼວດ",
    location: "ແຂວງອັດຕະປື, ສປປ ລາວ",
    coordinates: { lat: 14.8, lng: 106.8 },
    team: [
      {
        name: "ທ່ານ ອານຸສອນ ສີຫາວົງ",
        role: "ຫົວໜ້າທີມສຳຫຼວດ",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxluIFtCMv0qOHTGknVD5eeDh2WBmmpDtorjHxpUCIQgiuQrFwiEfRyzNA9mOifU3Wig3mzMjZkW5J6lgjVyHtPR5OuJRKjr-MtonPJ6yXg6UTe4m-Lpap2_6q8Zf8KSPUfdX6KatghzImZItZR36EGiOtqxNFDNtQPpePeqxOAz32A0pU5Z6SOlTSjs9oGjFFZCScaHxYL_upa9DRGFXUmEaRaXzaq8tuRkQW_KpbxYJyuYL_i-U-5w",
        active: true,
        phone: "020 5556 1234"
      }
    ]
  }
];

export const initialCORSStations: CORSStation[] = [
  {
    id: "ANUV",
    name: "ອານຸວົງ",
    type: "ເກົ່າ",
    status: "Online",
    issue: "Internet expired problem"
  },
  {
    id: "ASFT",
    name: "ອາດສະພັງທອງ",
    type: "ໃໝ່",
    status: "Online",
    issue: "Receiver problem"
  },
  {
    id: "BLPD",
    name: "ບົວລະພາ",
    type: "ໃໝ່",
    status: "Offline",
    issue: "Receiver problem (ສ້ອມແປງ)"
  },
  {
    id: "DJEU",
    name: "ດັກຈຶງ",
    type: "ໃໝ່",
    status: "Online",
    issue: "UPS problem"
  },
  {
    id: "THKH",
    name: "ທ່າແຂກ",
    type: "ໃໝ່",
    status: "Offline",
    issue: "Electrical problem (ຖືກຕັດໄຟ)"
  },
  {
    id: "HPPV",
    name: "ຊຳເໜືອ",
    type: "ເກົ່າ",
    status: "Offline",
    issue: "Internet expired"
  },
  {
    id: "KENT",
    name: "ແກ່ນທ້າວ",
    type: "ເກົ່າ",
    status: "Online",
    issue: "none"
  }
];

export const initialQuotations: Quotation[] = [
  {
    id: "QT-2024-001",
    refNo: "QT-2023-11004",
    customerName: "Lao-China Railway Co., Ltd",
    date: "2024-05-14",
    validity: "30 ວັນ",
    items: [
      {
        id: "item-1",
        description: "Repair Service for Total Station (Leica TS16)",
        details: "Full calibration, lens cleaning, and firmware update.",
        qty: 1,
        unitPrice: 2500000
      },
      {
        id: "item-2",
        description: "CORS Station Maintenance",
        details: "Quarterly site inspection and hardware diagnostic.",
        qty: 2,
        unitPrice: 4200000
      }
    ],
    terms: "ລາຄານີ້ລວມຄ່າຂົນສົ່ງພາຍໃນນະຄອນຫຼວງວຽງຈັນ. ສໍາລັບຕ່າງແຂວງຈະມີຄ່າໃຊ້ຈ່າຍເພີ່ມເຕີມຕາມໄລຍະທາງຕົວຈິງ.",
    subtotal: 10900000,
    vat: 763000,
    total: 11663000
  }
];

export const initialNotes: InternalNote[] = [
  {
    id: "note-1",
    repairId: "REP-2024-0089",
    author: "ຊ່າງ ພອນ",
    date: "14/05/2024",
    text: "ຕ້ອງການອາໄຫຼ່ Prism Holder ໃໝ່ ເນື່ອງຈາກໂຕເກົ່າມີຮອຍແຕກ."
  },
  {
    id: "note-2",
    repairId: "REP-2024-0089",
    author: "Admin",
    date: "13/05/2024",
    text: "ລູກຄ້າແຈ້ງວ່າຕ້ອງການເຄື່ອງຄືນກ່ອນວັນທີ 20 ນີ້."
  }
];

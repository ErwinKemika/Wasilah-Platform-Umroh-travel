export type ItineraryDay = {
  day: number;
  title: string;
  detail: string;
};

export type UmrohPackage = {
  id: string;
  slug: string;
  title: string;
  travelName: string;
  licenseNo: string; // No. izin PPIU / PIHK Kemenag
  verified: boolean;
  type: "Umroh" | "Haji";
  category: string; // e.g. "Umroh Reguler", "Umroh Plus", "Haji Furoda"
  priceIDR: number; // harga mulai (kamar quad)
  roomPricing: {
    quad: number;
    triple: number;
    double: number;
  };
  dpIDR: number; // uang muka
  departureDate: string; // ISO date
  durationDays: number;
  embarkasi: string; // kota keberangkatan
  airline: string;
  hotelMakkah: string;
  hotelMakkahStars: number;
  hotelMakkahDistance: string;
  hotelMadinah: string;
  hotelMadinahStars: number;
  hotelMadinahDistance: string;
  quota: number;
  seatsLeft: number;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  highlights: string[];
  facilities: string[]; // perlengkapan & layanan
  included: string[];
  excluded: string[];
  requirements: string[]; // syarat dokumen
  itinerary: ItineraryDay[];
};

const umrohItinerary = (extra: ItineraryDay[] = []): ItineraryDay[] => [
  {
    day: 1,
    title: "Keberangkatan dari Tanah Air",
    detail:
      "Berkumpul di bandara, pembagian perlengkapan, dan penerbangan menuju Jeddah/Madinah.",
  },
  {
    day: 2,
    title: "Tiba di Madinah",
    detail:
      "Check-in hotel, istirahat, dilanjutkan ibadah di Masjid Nabawi dan salat Arba'in.",
  },
  {
    day: 3,
    title: "Ziarah Kota Madinah",
    detail:
      "Raudhah, Makam Rasulullah ﷺ, Masjid Quba, Jabal Uhud, dan Kebun Kurma.",
  },
  {
    day: 4,
    title: "Perjalanan ke Makkah (Miqat)",
    detail:
      "Mengambil miqat di Bir Ali, umrah wajib: tawaf, sa'i, dan tahallul.",
  },
  ...extra,
  {
    day: 98,
    title: "Kembali ke Tanah Air",
    detail: "Tawaf wada', perjalanan ke bandara Jeddah, dan penerbangan pulang.",
  },
];

const commonFacilities = [
  "Bimbingan manasik 2x + buku panduan",
  "Perlengkapan: koper, tas paspor, kain ihram / mukena, seragam batik",
  "Muthawif & tour leader berpengalaman",
  "Air zamzam 5 liter",
  "Handling bandara & manasik",
];

const commonIncluded = [
  "Tiket pesawat PP kelas ekonomi",
  "Visa umrah & asuransi perjalanan",
  "Akomodasi hotel selama program",
  "Konsumsi 3x sehari menu Indonesia",
  "Transportasi bus AC selama di Arab Saudi",
  "City tour Makkah & Madinah",
];

const commonExcluded = [
  "Pembuatan paspor",
  "Vaksin meningitis & PCR (bila diwajibkan)",
  "Kelebihan bagasi & pengeluaran pribadi (laundry, telepon)",
  "Biaya suntik vaksin tambahan",
  "Tips untuk muthawif & sopir (opsional)",
];

const commonRequirements = [
  "Paspor berlaku minimal 8 bulan, nama minimal 3 suku kata",
  "Kartu vaksin meningitis (ICV)",
  "Pas foto berwarna 4x6 latar putih (tampak wajah 80%)",
  "Fotokopi KTP, Kartu Keluarga, dan buku nikah / akta lahir",
  "Buku kuning vaksin & surat mahram bagi jamaah wanita di bawah 45 tahun",
];

function makePricing(base: number) {
  return {
    quad: base,
    triple: Math.round((base + base * 0.09) / 100000) * 100000,
    double: Math.round((base + base * 0.2) / 100000) * 100000,
  };
}

export const packages: UmrohPackage[] = [
  {
    id: "wsl-001",
    slug: "umroh-reguler-hemat-9-hari-baitullah",
    title: "Umroh Reguler Hemat 9 Hari",
    travelName: "Baitullah Barokah Wisata",
    licenseNo: "PPIU No. 1274 Tahun 2021",
    verified: true,
    type: "Umroh",
    category: "Umroh Reguler",
    priceIDR: 26900000,
    roomPricing: makePricing(26900000),
    dpIDR: 5000000,
    departureDate: "2026-10-12",
    durationDays: 9,
    embarkasi: "Jakarta (CGK)",
    airline: "Saudia Airlines",
    hotelMakkah: "Al Kiswah Towers",
    hotelMakkahStars: 4,
    hotelMakkahDistance: "600 m dari Masjidil Haram (shuttle 24 jam)",
    hotelMadinah: "Golden Al Massa",
    hotelMadinahStars: 4,
    hotelMadinahDistance: "250 m dari Masjid Nabawi",
    quota: 45,
    seatsLeft: 12,
    rating: 4.7,
    reviewCount: 218,
    highlights: ["Bimbingan ibadah intensif", "Manasik 2x", "City tour Thaif"],
    facilities: commonFacilities,
    included: commonIncluded,
    excluded: commonExcluded,
    requirements: commonRequirements,
    itinerary: umrohItinerary([
      {
        day: 5,
        title: "Ibadah di Masjidil Haram",
        detail: "Umrah sunnah, memperbanyak tawaf dan salat berjamaah.",
      },
      {
        day: 6,
        title: "City tour Makkah & Thaif",
        detail: "Jabal Nur, Jabal Tsur, Padang Arafah, Jabal Rahmah, dan Thaif.",
      },
    ]),
  },
  {
    id: "wsl-002",
    slug: "umroh-plus-turki-12-hari-andalusia",
    title: "Umroh Plus Turki 12 Hari",
    travelName: "Andalusia Travel Mandiri",
    licenseNo: "PPIU No. 892 Tahun 2020",
    verified: true,
    type: "Umroh",
    category: "Umroh Plus",
    priceIDR: 38500000,
    roomPricing: makePricing(38500000),
    dpIDR: 7500000,
    departureDate: "2026-11-03",
    durationDays: 12,
    embarkasi: "Jakarta (CGK)",
    airline: "Turkish Airlines",
    hotelMakkah: "Swissôtel Al Maqam",
    hotelMakkahStars: 5,
    hotelMakkahDistance: "Terhubung langsung ke pelataran Masjidil Haram",
    hotelMadinah: "Dallah Taibah",
    hotelMadinahStars: 5,
    hotelMadinahDistance: "150 m dari Masjid Nabawi",
    quota: 40,
    seatsLeft: 5,
    rating: 4.9,
    reviewCount: 341,
    featured: true,
    highlights: ["Tour Istanbul 3 hari", "Hotel bintang 5", "Muthawif senior"],
    facilities: [...commonFacilities, "Tour guide berbahasa Indonesia di Turki"],
    included: [...commonIncluded, "Tour Istanbul: Blue Mosque, Hagia Sophia, Bosphorus cruise"],
    excluded: commonExcluded,
    requirements: [...commonRequirements, "Visa Turki (diurus travel, dokumen menyusul)"],
    itinerary: umrohItinerary([
      {
        day: 5,
        title: "Ibadah di Masjidil Haram",
        detail: "Umrah sunnah dan memperbanyak ibadah di Multazam & Hijr Ismail.",
      },
      {
        day: 6,
        title: "City tour Makkah",
        detail: "Jabal Rahmah, Mina, Muzdalifah, Jabal Tsur, dan Ji'ranah.",
      },
      {
        day: 8,
        title: "Terbang ke Istanbul",
        detail: "Perjalanan menuju Turki, check-in hotel di kawasan Sultanahmet.",
      },
      {
        day: 9,
        title: "Istanbul Heritage Tour",
        detail: "Blue Mosque, Hagia Sophia, Topkapi Palace, dan Grand Bazaar.",
      },
      {
        day: 10,
        title: "Bosphorus & Camlica",
        detail: "Bosphorus cruise, Bukit Camlica, dan Taksim Square.",
      },
    ]),
  },
  {
    id: "wsl-003",
    slug: "umroh-ramadhan-full-10-hari-nur-hidayah",
    title: "Umroh Ramadhan Full 10 Hari",
    travelName: "Nur Hidayah Tour",
    licenseNo: "PPIU No. 1503 Tahun 2022",
    verified: true,
    type: "Umroh",
    category: "Umroh Ramadhan",
    priceIDR: 41200000,
    roomPricing: makePricing(41200000),
    dpIDR: 10000000,
    departureDate: "2027-03-08",
    durationDays: 10,
    embarkasi: "Jakarta (CGK)",
    airline: "Garuda Indonesia",
    hotelMakkah: "Pullman ZamZam",
    hotelMakkahStars: 5,
    hotelMakkahDistance: "100 m dari Masjidil Haram",
    hotelMadinah: "Anwar Al Madinah Mövenpick",
    hotelMadinahStars: 5,
    hotelMadinahDistance: "Menghadap langsung Masjid Nabawi",
    quota: 50,
    seatsLeft: 23,
    rating: 4.8,
    reviewCount: 276,
    highlights: ["I'tikaf 10 malam terakhir", "Sahur & buka di hotel", "Dekat Masjidil Haram"],
    facilities: [...commonFacilities, "Paket sahur & buka puasa di hotel"],
    included: commonIncluded,
    excluded: commonExcluded,
    requirements: commonRequirements,
    itinerary: umrohItinerary([
      {
        day: 5,
        title: "Ibadah Ramadhan di Makkah",
        detail: "Tarawih di Masjidil Haram dan memperbanyak tilawah.",
      },
      {
        day: 6,
        title: "City tour Makkah",
        detail: "Jabal Nur, Arafah, Jabal Rahmah, Mina, dan Muzdalifah.",
      },
      {
        day: 7,
        title: "Persiapan i'tikaf",
        detail: "Bimbingan i'tikaf dan pengaturan jadwal ibadah 10 malam terakhir.",
      },
    ]),
  },
  {
    id: "wsl-004",
    slug: "haji-furoda-tanpa-antre-26-hari-safar-mabrur",
    title: "Haji Furoda Tanpa Antre 26 Hari",
    travelName: "Safar Mabrur Internasional",
    licenseNo: "PIHK No. 447 Tahun 2019",
    verified: true,
    type: "Haji",
    category: "Haji Furoda",
    priceIDR: 245000000,
    roomPricing: makePricing(245000000),
    dpIDR: 75000000,
    departureDate: "2027-05-14",
    durationDays: 26,
    embarkasi: "Jakarta (CGK)",
    airline: "Saudia Airlines",
    hotelMakkah: "Fairmont Makkah Clock Tower",
    hotelMakkahStars: 5,
    hotelMakkahDistance: "Terhubung ke pelataran Masjidil Haram",
    hotelMadinah: "The Oberoi Madina",
    hotelMadinahStars: 5,
    hotelMadinahDistance: "80 m dari Masjid Nabawi",
    quota: 30,
    seatsLeft: 8,
    rating: 4.9,
    reviewCount: 96,
    highlights: ["Visa haji resmi (furoda)", "Tenda Arafah VIP Maktab", "Pembimbing 1:10 jamaah"],
    facilities: [
      "Visa haji furoda resmi (mujamalah)",
      "Tenda Arafah & Mina VIP ber-AC",
      "Pembimbing ibadah 1:10 jamaah",
      "Perlengkapan lengkap + koper kabin",
      "Manasik intensif 4x + gladi lapangan",
    ],
    included: [
      "Tiket pesawat PP kelas ekonomi premium",
      "Visa haji furoda & asuransi",
      "Hotel bintang 5 di Makkah & Madinah",
      "Konsumsi full board menu Indonesia",
      "Transportasi bus VIP & kereta cepat Haramain",
      "Layanan Armuzna (Arafah–Muzdalifah–Mina) VIP",
    ],
    excluded: [
      "Pembuatan paspor",
      "Vaksin meningitis & pemeriksaan kesehatan",
      "DAM & qurban",
      "Pengeluaran pribadi",
      "Tips muthawif & petugas (opsional)",
    ],
    requirements: [
      "Paspor berlaku minimal 8 bulan, nama minimal 3 suku kata",
      "Kartu vaksin meningitis (ICV) & vaksin polio",
      "Surat keterangan sehat dari rumah sakit",
      "Pas foto berwarna 4x6 latar putih",
      "Fotokopi KTP, KK, buku nikah / akta lahir",
      "Bukti kepesertaan (kartu haji) bila pernah berhaji",
    ],
    itinerary: [
      { day: 1, title: "Keberangkatan ke Madinah", detail: "Berkumpul di bandara dan penerbangan langsung ke Madinah." },
      { day: 2, title: "Arba'in di Masjid Nabawi", detail: "Check-in hotel dan memulai salat Arba'in 40 waktu." },
      { day: 4, title: "Ziarah Madinah", detail: "Raudhah, Masjid Quba, Jabal Uhud, dan Kebun Kurma." },
      { day: 8, title: "Menuju Makkah", detail: "Miqat di Bir Ali, umrah, lalu fokus ibadah di Masjidil Haram." },
      { day: 15, title: "Persiapan Armuzna", detail: "Manasik akhir, pembagian kartu Nusuk, dan pengaturan kloter." },
      { day: 17, title: "Wukuf di Arafah", detail: "Puncak haji: wukuf, khutbah, dan doa di Padang Arafah." },
      { day: 18, title: "Muzdalifah & Mina", detail: "Mabit di Muzdalifah, lempar jumrah, dan tahallul." },
      { day: 21, title: "Tawaf Ifadah", detail: "Menyempurnakan rukun haji dengan tawaf ifadah dan sa'i." },
      { day: 26, title: "Kembali ke Tanah Air", detail: "Tawaf wada' dan penerbangan pulang dari Jeddah." },
    ],
  },
  {
    id: "wsl-005",
    slug: "umroh-ekonomis-9-hari-arrahman-kaffah",
    title: "Umroh Ekonomis 9 Hari",
    travelName: "Arrahman Kaffah Wisata",
    licenseNo: "PPIU No. 1611 Tahun 2022",
    verified: true,
    type: "Umroh",
    category: "Umroh Reguler",
    priceIDR: 25400000,
    roomPricing: makePricing(25400000),
    dpIDR: 5000000,
    departureDate: "2026-09-21",
    durationDays: 9,
    embarkasi: "Surabaya (SUB)",
    airline: "Scoot / Saudia",
    hotelMakkah: "Rayaana Ajyad",
    hotelMakkahStars: 3,
    hotelMakkahDistance: "800 m dari Masjidil Haram (shuttle)",
    hotelMadinah: "Al Eairy Aparthotel",
    hotelMadinahStars: 3,
    hotelMadinahDistance: "400 m dari Masjid Nabawi",
    quota: 48,
    seatsLeft: 30,
    rating: 4.5,
    reviewCount: 154,
    highlights: ["Harga paling ramah", "Berangkat dari Surabaya", "Kuota masih banyak"],
    facilities: commonFacilities,
    included: commonIncluded,
    excluded: commonExcluded,
    requirements: commonRequirements,
    itinerary: umrohItinerary([
      { day: 5, title: "Ibadah di Masjidil Haram", detail: "Umrah sunnah dan salat berjamaah lima waktu." },
      { day: 6, title: "City tour Makkah", detail: "Jabal Rahmah, Arafah, Mina, dan Ji'ranah." },
    ]),
  },
  {
    id: "wsl-006",
    slug: "umroh-plus-aqsa-13-hari-madinah-iman",
    title: "Umroh Plus Aqsa (Palestina) 13 Hari",
    travelName: "Madinah Iman Travel",
    licenseNo: "PPIU No. 733 Tahun 2019",
    verified: true,
    type: "Umroh",
    category: "Umroh Plus",
    priceIDR: 44900000,
    roomPricing: makePricing(44900000),
    dpIDR: 10000000,
    departureDate: "2026-12-08",
    durationDays: 13,
    embarkasi: "Jakarta (CGK)",
    airline: "Royal Jordanian",
    hotelMakkah: "Makkah Towers",
    hotelMakkahStars: 5,
    hotelMakkahDistance: "200 m dari Masjidil Haram",
    hotelMadinah: "Frontel Al Harithia",
    hotelMadinahStars: 5,
    hotelMadinahDistance: "180 m dari Masjid Nabawi",
    quota: 35,
    seatsLeft: 9,
    rating: 4.8,
    reviewCount: 122,
    featured: true,
    highlights: ["Salat di Masjidil Aqsa", "Ziarah Yerusalem & Yordania", "Rcombongan terbatas"],
    facilities: [...commonFacilities, "Tour guide lokal di Yordania & Palestina"],
    included: [...commonIncluded, "Tour Aqsa: Dome of the Rock, Kota Tua Yerusalem, Laut Mati, Petra"],
    excluded: [...commonExcluded, "Visa masuk wilayah Palestina (diurus travel)"],
    requirements: [...commonRequirements, "Paspor tanpa cap Israel sebelumnya"],
    itinerary: umrohItinerary([
      { day: 5, title: "Ibadah di Masjidil Haram", detail: "Umrah sunnah dan memperbanyak ibadah." },
      { day: 6, title: "City tour Makkah", detail: "Jabal Nur, Arafah, Mina, dan Muzdalifah." },
      { day: 8, title: "Terbang ke Amman", detail: "Perjalanan menuju Yordania, ziarah Laut Mati." },
      { day: 9, title: "Menuju Yerusalem", detail: "Perjalanan darat, salat di Masjidil Aqsa." },
      { day: 10, title: "Ziarah Aqsa", detail: "Dome of the Rock, Kota Tua, dan tempat bersejarah para nabi." },
      { day: 11, title: "Petra", detail: "Menjelajahi situs warisan dunia Petra sebelum kembali ke Amman." },
    ]),
  },
  {
    id: "wsl-007",
    slug: "umroh-awal-tahun-9-hari-sakinah-mubarak",
    title: "Umroh Awal Tahun 9 Hari",
    travelName: "Sakinah Mubarak Tour",
    licenseNo: "PPIU No. 1420 Tahun 2021",
    verified: true,
    type: "Umroh",
    category: "Umroh Reguler",
    priceIDR: 28700000,
    roomPricing: makePricing(28700000),
    dpIDR: 5000000,
    departureDate: "2027-01-19",
    durationDays: 9,
    embarkasi: "Medan (KNO)",
    airline: "Saudia Airlines",
    hotelMakkah: "Al Ghufran Safwah",
    hotelMakkahStars: 4,
    hotelMakkahDistance: "350 m dari Masjidil Haram",
    hotelMadinah: "Shaza Al Madinah",
    hotelMadinahStars: 4,
    hotelMadinahDistance: "220 m dari Masjid Nabawi",
    quota: 45,
    seatsLeft: 18,
    rating: 4.6,
    reviewCount: 88,
    highlights: ["Berangkat dari Medan", "Cuaca sejuk awal tahun", "Hotel dekat masjid"],
    facilities: commonFacilities,
    included: commonIncluded,
    excluded: commonExcluded,
    requirements: commonRequirements,
    itinerary: umrohItinerary([
      { day: 5, title: "Ibadah di Masjidil Haram", detail: "Umrah sunnah dan salat berjamaah." },
      { day: 6, title: "City tour Makkah", detail: "Jabal Rahmah, Arafah, Mina, dan Ji'ranah." },
    ]),
  },
  {
    id: "wsl-008",
    slug: "umroh-plus-dubai-11-hari-andalusia",
    title: "Umroh Plus Dubai 11 Hari",
    travelName: "Andalusia Travel Mandiri",
    licenseNo: "PPIU No. 892 Tahun 2020",
    verified: true,
    type: "Umroh",
    category: "Umroh Plus",
    priceIDR: 36200000,
    roomPricing: makePricing(36200000),
    dpIDR: 7500000,
    departureDate: "2027-02-15",
    durationDays: 11,
    embarkasi: "Jakarta (CGK)",
    airline: "Emirates",
    hotelMakkah: "Hilton Suites Makkah",
    hotelMakkahStars: 4,
    hotelMakkahDistance: "450 m dari Masjidil Haram",
    hotelMadinah: "Millennium Al Aqeeq",
    hotelMadinahStars: 4,
    hotelMadinahDistance: "300 m dari Masjid Nabawi",
    quota: 42,
    seatsLeft: 14,
    rating: 4.7,
    reviewCount: 133,
    highlights: ["Tour Dubai 2 hari", "Penerbangan Emirates", "Burj Khalifa & Desert Safari"],
    facilities: [...commonFacilities, "Tour guide berbahasa Indonesia di Dubai"],
    included: [...commonIncluded, "Tour Dubai: Burj Khalifa, Dubai Mall, Desert Safari, Palm Jumeirah"],
    excluded: commonExcluded,
    requirements: commonRequirements,
    itinerary: umrohItinerary([
      { day: 5, title: "Ibadah di Masjidil Haram", detail: "Umrah sunnah dan salat berjamaah." },
      { day: 6, title: "City tour Makkah", detail: "Jabal Nur, Arafah, Mina, dan Muzdalifah." },
      { day: 8, title: "Terbang ke Dubai", detail: "Perjalanan menuju Uni Emirat Arab, check-in hotel." },
      { day: 9, title: "Dubai City Tour", detail: "Burj Khalifa, Dubai Mall, Dubai Frame, dan Palm Jumeirah." },
      { day: 10, title: "Desert Safari", detail: "Petualangan gurun, dune bashing, dan makan malam BBQ." },
    ]),
  },
  {
    id: "wsl-009",
    slug: "haji-plus-kuota-resmi-30-hari-safar-mabrur",
    title: "Haji Plus Kuota Resmi 30 Hari",
    travelName: "Safar Mabrur Internasional",
    licenseNo: "PIHK No. 447 Tahun 2019",
    verified: true,
    type: "Haji",
    category: "Haji Khusus (ONH Plus)",
    priceIDR: 172000000,
    roomPricing: makePricing(172000000),
    dpIDR: 55000000,
    departureDate: "2027-06-02",
    durationDays: 30,
    embarkasi: "Jakarta (CGK)",
    airline: "Garuda Indonesia",
    hotelMakkah: "Anjum Makkah",
    hotelMakkahStars: 5,
    hotelMakkahDistance: "500 m dari Masjidil Haram (shuttle 24 jam)",
    hotelMadinah: "Dar Al Iman InterContinental",
    hotelMadinahStars: 5,
    hotelMadinahDistance: "Menghadap Masjid Nabawi",
    quota: 25,
    seatsLeft: 6,
    rating: 4.8,
    reviewCount: 71,
    highlights: ["Kuota haji khusus resmi Kemenag", "Antre lebih singkat", "Pembimbing bersertifikat"],
    facilities: [
      "Kuota haji khusus resmi (nomor porsi)",
      "Tenda Arafah & Mina maktab khusus",
      "Pembimbing ibadah bersertifikat Kemenag",
      "Manasik 5x + gladi Armuzna",
      "Perlengkapan lengkap + koper",
    ],
    included: [
      "Tiket pesawat PP kelas ekonomi",
      "Biaya haji khusus & asuransi jiwa",
      "Hotel bintang 5 Makkah & Madinah",
      "Konsumsi full board menu Indonesia",
      "Transportasi bus & kereta cepat Haramain",
      "Layanan Armuzna maktab khusus",
    ],
    excluded: [
      "Pembuatan paspor",
      "Vaksin & pemeriksaan kesehatan",
      "DAM & qurban",
      "Pengeluaran pribadi",
      "Tips petugas (opsional)",
    ],
    requirements: [
      "Nomor porsi haji khusus / mendaftar porsi baru",
      "Paspor berlaku minimal 8 bulan, nama 3 suku kata",
      "Kartu vaksin meningitis & polio",
      "Surat keterangan sehat",
      "Fotokopi KTP, KK, buku nikah / akta lahir",
    ],
    itinerary: [
      { day: 1, title: "Keberangkatan ke Madinah", detail: "Berkumpul di asrama haji dan penerbangan ke Madinah." },
      { day: 3, title: "Arba'in di Masjid Nabawi", detail: "Memulai salat Arba'in 40 waktu dan ziarah Raudhah." },
      { day: 6, title: "Ziarah Madinah", detail: "Masjid Quba, Jabal Uhud, Kebun Kurma, dan Masjid Qiblatain." },
      { day: 10, title: "Menuju Makkah", detail: "Miqat di Bir Ali, umrah, lalu ibadah di Masjidil Haram." },
      { day: 18, title: "Persiapan Armuzna", detail: "Manasik akhir dan pembagian kartu Nusuk." },
      { day: 20, title: "Wukuf di Arafah", detail: "Puncak ibadah haji: wukuf dan doa di Arafah." },
      { day: 21, title: "Muzdalifah & Mina", detail: "Mabit, lempar jumrah aqabah, dan tahallul awal." },
      { day: 24, title: "Tawaf Ifadah", detail: "Tawaf ifadah, sa'i, dan menyelesaikan rukun haji." },
      { day: 30, title: "Kembali ke Tanah Air", detail: "Tawaf wada' dan penerbangan pulang." },
    ],
  },
  {
    id: "wsl-010",
    slug: "umroh-keluarga-12-hari-baitullah",
    title: "Umroh Keluarga 12 Hari",
    travelName: "Baitullah Barokah Wisata",
    licenseNo: "PPIU No. 1274 Tahun 2021",
    verified: true,
    type: "Umroh",
    category: "Umroh Keluarga",
    priceIDR: 33800000,
    roomPricing: makePricing(33800000),
    dpIDR: 7500000,
    departureDate: "2026-12-22",
    durationDays: 12,
    embarkasi: "Jakarta (CGK)",
    airline: "Saudia Airlines",
    hotelMakkah: "Sofwah Orchid",
    hotelMakkahStars: 4,
    hotelMakkahDistance: "300 m dari Masjidil Haram",
    hotelMadinah: "Le Meridien Madinah",
    hotelMadinahStars: 4,
    hotelMadinahDistance: "200 m dari Masjid Nabawi",
    quota: 40,
    seatsLeft: 21,
    rating: 4.7,
    reviewCount: 109,
    highlights: ["Jadwal liburan sekolah", "Kamar keluarga (family room)", "Pendamping anak"],
    facilities: [...commonFacilities, "Family room & menu ramah anak", "Diskon khusus anak di bawah 12 tahun"],
    included: commonIncluded,
    excluded: commonExcluded,
    requirements: [...commonRequirements, "Akta kelahiran anak & kartu identitas anak (KIA)"],
    itinerary: umrohItinerary([
      { day: 5, title: "Ibadah di Masjidil Haram", detail: "Umrah sunnah bersama keluarga dan salat berjamaah." },
      { day: 6, title: "City tour Makkah", detail: "Jabal Rahmah, Arafah, Mina, dan Ji'ranah." },
      { day: 8, title: "Waktu keluarga", detail: "Belanja oleh-oleh di pasar Makkah dan istirahat bersama." },
    ]),
  },
];

// Normalisasi: hari "98" adalah placeholder untuk hari terakhir program.
for (const p of packages) {
  p.itinerary = p.itinerary
    .map((d) => (d.day === 98 ? { ...d, day: p.durationDays } : d))
    .sort((a, b) => a.day - b.day);
}

export function getPackage(idOrSlug: string): UmrohPackage | undefined {
  return packages.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}

export const embarkasiList = Array.from(
  new Set(packages.map((p) => p.embarkasi)),
).sort();

export type UmrohPackage = {
  id: string;
  title: string;
  travelName: string;
  type: "Umroh" | "Haji";
  priceIDR: number;
  departureDate: string; // ISO date
  durationDays: number;
  airline: string;
  hotelMakkah: string;
  hotelMadinah: string;
  quota: number;
  seatsLeft: number;
  rating: number;
  featured?: boolean;
  highlights: string[];
};

export const packages: UmrohPackage[] = [
  {
    id: "wsl-001",
    title: "Umroh Reguler Hemat 9 Hari",
    travelName: "Baitullah Barokah Wisata",
    type: "Umroh",
    priceIDR: 26900000,
    departureDate: "2026-10-12",
    durationDays: 9,
    airline: "Saudia Airlines",
    hotelMakkah: "Al Kiswah Towers ★4",
    hotelMadinah: "Golden Al Massa ★4",
    quota: 45,
    seatsLeft: 12,
    rating: 4.7,
    highlights: ["Bimbingan ibadah intensif", "Manasik 2x", "City tour Thaif"],
  },
  {
    id: "wsl-002",
    title: "Umroh Plus Turki 12 Hari",
    travelName: "Andalusia Travel Mandiri",
    type: "Umroh",
    priceIDR: 38500000,
    departureDate: "2026-11-03",
    durationDays: 12,
    airline: "Turkish Airlines",
    hotelMakkah: "Swissôtel Al Maqam ★5",
    hotelMadinah: "Dallah Taibah ★5",
    quota: 40,
    seatsLeft: 5,
    rating: 4.9,
    featured: true,
    highlights: ["Tour Istanbul 3 hari", "Hotel bintang 5", "Muthawif berpengalaman"],
  },
  {
    id: "wsl-003",
    title: "Umroh Ramadhan Full 10 Hari",
    travelName: "Nur Hidayah Tour",
    type: "Umroh",
    priceIDR: 41200000,
    departureDate: "2027-03-08",
    durationDays: 10,
    airline: "Garuda Indonesia",
    hotelMakkah: "Pullman ZamZam ★5",
    hotelMadinah: "Anwar Al Madinah Mövenpick ★5",
    quota: 50,
    seatsLeft: 23,
    rating: 4.8,
    highlights: ["I'tikaf 10 malam terakhir", "Sahur & buka di hotel", "Dekat Masjidil Haram"],
  },
  {
    id: "wsl-004",
    title: "Haji Furoda Tanpa Antre 26 Hari",
    travelName: "Safar Mabrur Internasional",
    type: "Haji",
    priceIDR: 245000000,
    departureDate: "2027-05-14",
    durationDays: 26,
    airline: "Saudia Airlines",
    hotelMakkah: "Fairmont Makkah Clock Tower ★5",
    hotelMadinah: "The Oberoi Madina ★5",
    quota: 30,
    seatsLeft: 8,
    rating: 4.9,
    highlights: ["Visa haji resmi (furoda)", "Tenda Arafah VIP Maktab", "Pembimbing 1:10 jamaah"],
  },
];

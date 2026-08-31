export type Testimonial = {
  name: string;
  city: string;
  packageTitle: string;
  rating: number;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Hajjah Suryani",
    city: "Bekasi",
    packageTitle: "Umroh Ramadhan Full 10 Hari",
    rating: 5,
    quote:
      "Semua transparan dari awal. Rincian biaya jelas, tidak ada tagihan mendadak menjelang berangkat. Muthawifnya sabar membimbing orang tua saya.",
  },
  {
    name: "Ustadz Fadhil",
    city: "Bandung",
    packageTitle: "Umroh Plus Turki 12 Hari",
    rating: 5,
    quote:
      "Saya bandingkan 4 travel di Wasilah dalam satu layar. Pilih yang paling cocok, DP-nya ditahan Wasilah dulu. Rasa amannya beda.",
  },
  {
    name: "Keluarga Pak Rahmat",
    city: "Surabaya",
    packageTitle: "Umroh Keluarga 12 Hari",
    rating: 4,
    quote:
      "Berangkat sekeluarga 5 orang. Family room-nya beneran muat, anak-anak dapat pendamping. Prosesnya cepat, dokumen tinggal upload.",
  },
  {
    name: "Bapak Hendra",
    city: "Medan",
    packageTitle: "Haji Furoda Tanpa Antre 26 Hari",
    rating: 5,
    quote:
      "Visa furoda benar-benar resmi, keberangkatan sesuai jadwal. Pembimbing 1 banding 10 jamaah jadi tidak pernah merasa ditinggal.",
  },
];

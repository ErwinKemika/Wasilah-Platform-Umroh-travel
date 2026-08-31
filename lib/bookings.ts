// Penyimpanan pendaftaran sementara (in-memory) untuk keperluan prototipe.
// Data hilang saat server restart — cukup untuk demo, bukan produksi.

export type Pilgrim = {
  fullName: string;
  nik: string;
  gender: "L" | "P";
};

export type Booking = {
  code: string;
  packageId: string;
  packageTitle: string;
  travelName: string;
  roomType: "quad" | "triple" | "double";
  contactName: string;
  phone: string;
  email: string;
  embarkasi: string;
  pilgrims: Pilgrim[];
  pricePerPax: number;
  total: number;
  dpTotal: number;
  createdAt: string;
};

// Next.js membundel tiap route handler terpisah, jadi Map biasa akan
// terduplikasi per-route. Tempelkan ke globalThis agar satu instance
// dipakai bersama seluruh route selama proses server hidup.
const globalForBookings = globalThis as unknown as {
  __wasilahBookings?: Map<string, Booking>;
};

const store =
  globalForBookings.__wasilahBookings ??
  (globalForBookings.__wasilahBookings = new Map<string, Booking>());

function generateCode(): string {
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  const stamp = Date.now().toString(36).slice(-4).toUpperCase();
  return `WSL-${stamp}${rand}`;
}

export function createBooking(data: Omit<Booking, "code" | "createdAt">): Booking {
  const code = generateCode();
  const booking: Booking = {
    ...data,
    code,
    createdAt: new Date().toISOString(),
  };
  store.set(code, booking);
  return booking;
}

export function getBooking(code: string): Booking | undefined {
  return store.get(code.toUpperCase());
}

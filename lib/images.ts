// Foto banner per paket. File ada di /public/images (sumber: Wikimedia Commons).
const packageImages: Record<string, string> = {
  "wsl-001": "/images/masjidil-haram.jpg",
  "wsl-002": "/images/istanbul.jpg",
  "wsl-003": "/images/tawaf.jpg",
  "wsl-004": "/images/mecca.jpg",
  "wsl-005": "/images/masjid-nabawi.jpg",
  "wsl-006": "/images/aqsa.jpg",
  "wsl-007": "/images/medina.jpg",
  "wsl-008": "/images/dubai.jpg",
  "wsl-009": "/images/tawaf.jpg",
  "wsl-010": "/images/medina.jpg",
};

const FALLBACK = "/images/masjidil-haram.jpg";

export function packageImage(id: string): string {
  return packageImages[id] ?? FALLBACK;
}

export function packageGallery(
  hotelMakkahStars: number,
): { label: string; src: string }[] {
  return [
    { label: "Masjidil Haram", src: "/images/masjidil-haram.jpg" },
    { label: "Masjid Nabawi", src: "/images/masjid-nabawi.jpg" },
    { label: `Hotel ★${hotelMakkahStars}`, src: "/images/hotel.jpg" },
  ];
}

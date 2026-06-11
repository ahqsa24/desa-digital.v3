// =====================================================
// Digital Nudge Service — Badge Desa (Village Badges)
// Perhitungan kelayakan badge dilakukan di frontend
// berdasarkan data inovasi terverifikasi.
// =====================================================
export type VillageBadgeKey =
  | "sahabat_inovator"
  | "adopter_spesialis"
  | "adopter_giat"
  | "penggiat_digital"
  | "penggerak_inovasi";
export interface VillageBadgeStatus {
  key: VillageBadgeKey;
  name: string;
  description: string;
  earned: boolean;
  /** Urutan prioritas — semakin kecil semakin tinggi */
  priority: number;
  /** Warna aksen badge */
  color: string;
  /** Warna shadow untuk pill badge */
  shadowColor: string;
  /** Emoji/icon fallback */
  emoji: string;
}
// ----- Metadata Badge Desa (urutan: terbaik → terendah) -----
const VILLAGE_BADGE_META: Omit<VillageBadgeStatus, "earned">[] = [
  {
    key: "sahabat_inovator",
    name: "Sahabat Inovator",
    description: "Jumlah inovator unik yang berkontribusi ≥ 10",
    priority: 1,
    color: "#FF2F00",
    shadowColor: "rgba(255, 47, 0, 0.35)",
    emoji: "🎯",
  },
  {
    key: "adopter_spesialis",
    name: "Adopter Spesialis",
    description: "Jumlah inovasi terverifikasi pada salah satu kategori ≥ 5",
    priority: 2,
    color: "#FF8C00",
    shadowColor: "rgba(255, 140, 0, 0.35)",
    emoji: "🏅",
  },
  {
    key: "adopter_giat",
    name: "Adopter Giat",
    description: "Jumlah inovasi terverifikasi pada salah satu kategori ≥ 4",
    priority: 3,
    color: "#FFD700",
    shadowColor: "rgba(255, 215, 0, 0.35)",
    emoji: "⭐",
  },
  {
    key: "penggiat_digital",
    name: "Penggiat Digital",
    description: "Total inovasi terverifikasi ≥ 7",
    priority: 4,
    color: "#347357",
    shadowColor: "rgba(52, 115, 87, 0.35)",
    emoji: "💡",
  },
  {
    key: "penggerak_inovasi",
    name: "Penggerak Inovasi",
    description: "Total inovasi terverifikasi ≥ 3",
    priority: 5,
    color: "#2196F3",
    shadowColor: "rgba(33, 150, 243, 0.35)",
    emoji: "🚀",
  },
];
// ----- Rules Engine -----
/**
 * Menghitung kelayakan seluruh badge desa berdasarkan data inovasi.
 *
 * @param innovations - Array inovasi terverifikasi milik desa.
 *   Setiap objek diharapkan memiliki:
 *   - `kategori` (string)
 *   - `userId` atau `innovatorId` (string) — ID inovator
 *   - `namaInnovator` atau `namaInovator` (string) — fallback identitas inovator
 * @returns Array `VillageBadgeStatus` (5 badge), diurutkan dari prioritas tertinggi.
 */
export function calculateVillageBadges(
  innovations: any[]
): VillageBadgeStatus[] {
  // --- Hitung metrik dasar ---
  const totalVerified = innovations.length;
  // Hitung per kategori
  const categoryCount: Record<string, number> = {};
  const uniqueInnovators = new Set<string>();
  innovations.forEach((inov) => {
    // Kategori
    const cat = inov.kategori || "Tidak Berkategori";
    categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    // Inovator unik
    const innovatorKey =
      inov.userId || inov.innovatorId || inov.namaInnovator || inov.namaInovator || "";
    if (innovatorKey) {
      uniqueInnovators.add(innovatorKey);
    }
  });
  const maxCategoryCount = Math.max(0, ...Object.values(categoryCount));
  const uniqueInnovatorCount = uniqueInnovators.size;
  // --- Evaluasi tiap badge ---
  const results: VillageBadgeStatus[] = VILLAGE_BADGE_META.map((meta) => {
    let earned = false;
    switch (meta.key) {
      case "sahabat_inovator":
        earned = uniqueInnovatorCount >= 10;
        break;
      case "adopter_spesialis":
        earned = maxCategoryCount >= 5;
        break;
      case "adopter_giat":
        earned = maxCategoryCount >= 4;
        break;
      case "penggiat_digital":
        earned = totalVerified >= 7;
        break;
      case "penggerak_inovasi":
        earned = totalVerified >= 3;
        break;
    }
    return { ...meta, earned };
  });
  return results;
}
/**
 * Mengembalikan N badge terbaik yang sudah diperoleh (earned),
 * diurutkan berdasarkan prioritas (terbaik dulu).
 */
export function getTopEarnedBadges(
  badges: VillageBadgeStatus[],
  count: number = 2
): VillageBadgeStatus[] {
  return badges
    .filter((b) => b.earned)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, count);
}
/**
 * Mengembalikan seluruh metadata badge desa (tanpa status earned).
 */
export function getAllBadgeMeta(): Omit<VillageBadgeStatus, "earned">[] {
  return [...VILLAGE_BADGE_META];
}

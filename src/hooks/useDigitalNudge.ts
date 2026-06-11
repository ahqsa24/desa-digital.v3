"use client";
import { useState, useEffect, useMemo } from "react";
import { getVillageInnovations } from "Services/villageServices";
import {
  calculateVillageBadges,
  getTopEarnedBadges,
  VillageBadgeStatus,
} from "Services/digitalNudgeService";
// Simple in-memory cache to avoid refetching for same village in card lists
const badgeCache = new Map<
  string,
  { badges: VillageBadgeStatus[]; timestamp: number }
>();
const CACHE_TTL = 5 * 60 * 1000; // 5 menit
/**
 * Hook untuk menghitung badge desa berdasarkan ID desa.
 * Melakukan fetch inovasi lalu menghitung badge secara client-side.
 *
 * Digunakan di: CardVillage, Home Villages
 */
export function useVillageBadges(villageId: string | undefined) {
  const [allBadges, setAllBadges] = useState<VillageBadgeStatus[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!villageId) return;
    // Cek cache
    const cached = badgeCache.get(villageId);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      setAllBadges(cached.badges);
      return;
    }
    let cancelled = false;
    const fetchAndCalculate = async () => {
      setLoading(true);
      setError(null);
      try {
        const res: any = await getVillageInnovations(
          villageId,
          "Terverifikasi"
        );
        const innovations = res.innovations || res.data || [];
        if (!cancelled) {
          const badges = calculateVillageBadges(innovations);
          setAllBadges(badges);
          // Simpan ke cache
          badgeCache.set(villageId, {
            badges,
            timestamp: Date.now(),
          });
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message || "Gagal memuat badge");
          console.error("useVillageBadges error:", err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchAndCalculate();
    return () => {
      cancelled = true;
    };
  }, [villageId]);
  /** 2 badge terbaik yang diperoleh */
  const topBadges = useMemo(
    () => getTopEarnedBadges(allBadges, 2),
    [allBadges]
  );
  /** Semua badge yang diperoleh */
  const earnedBadges = useMemo(
    () => allBadges.filter((b) => b.earned),
    [allBadges]
  );
  return {
    /** Semua 5 badge (termasuk yang belum diperoleh) */
    allBadges,
    /** Hanya badge yang sudah diperoleh */
    earnedBadges,
    /** Maks 2 badge terbaik (untuk tampilan kartu) */
    topBadges,
    loading,
    error,
  };
}

/**
 * Minimal stub untuk mendukung halaman inovator yang belum memiliki badge logic.
 * Saat ini belum ada kalkulasi badge inovator, jadi hasilnya kosong.
 */
export function useDigitalNudge(): {
  badges: Array<{
    name: string;
    icon: string;
    status: string;
    criteria_desc: string;
  }>;
} {
  return {
    badges: [],
  };
}

/**
 * Hook untuk menghitung badge desa dari data inovasi yang sudah tersedia.
 * Tidak melakukan fetch — berguna jika data inovasi sudah di-fetch di halaman.
 *
 * Digunakan di: Halaman Detail Desa, Halaman Profil Desa
 */
export function useVillageBadgesFromInnovations(innovations: any[]) {
  const allBadges = useMemo(
    () => calculateVillageBadges(innovations),
    [innovations]
  );
  const topBadges = useMemo(
    () => getTopEarnedBadges(allBadges, 2),
    [allBadges]
  );
  const earnedBadges = useMemo(
    () => allBadges.filter((b) => b.earned),
    [allBadges]
  );
  return { allBadges, earnedBadges, topBadges };
}

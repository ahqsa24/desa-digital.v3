export interface DigitalNudgeBadge {
  name: string;
  icon: string;
  status: "diperoleh" | "belum";
  criteria_desc: string;
}

export const getInnovatorBadges = (
  innovationCount: number,
  villageCount: number
): DigitalNudgeBadge[] => {
  return [
    {
      name: "Inovator Perintis",
      icon: "",
      status: innovationCount >= 1 ? "diperoleh" : "belum",
      criteria_desc: "Memiliki minimal 1 inovasi.",
    },
    {
      name: "Si Inovatif",
      icon: "",
      status: innovationCount >= 15 ? "diperoleh" : "belum",
      criteria_desc: "Memiliki minimal 15 inovasi.",
    },
    {
      name: "Kolaboratif Handal",
      icon: "",
      status: villageCount >= 15 ? "diperoleh" : "belum",
      criteria_desc: "Memiliki minimal 15 desa dampingan.",
    },
    {
      name: "Sahabat Desa",
      icon: "",
      status: villageCount >= 30 ? "diperoleh" : "belum",
      criteria_desc: "Memiliki minimal 30 desa dampingan.",
    },
    {
      name: "Pemimpin Pasar",
      icon: "",
      status: villageCount >= 100 ? "diperoleh" : "belum",
      criteria_desc: "Memiliki minimal 100 desa dampingan.",
    },
  ];
};

export const getVillageBadges = (
  appliedInnovationCount: number,
  categoryCounts: Record<string, number> = {},
  appliedInnovationDates: string[] = [],
  distinctInnovatorIds: string[] = []
): DigitalNudgeBadge[] => {
  // Helper: check if there is any run of 6 consecutive months with at least one application
  const hasSixConsecutiveMonths = () => {
    if (!appliedInnovationDates || appliedInnovationDates.length === 0) return false;

    const monthNums = new Set<number>();
    appliedInnovationDates.forEach((d) => {
      try {
        const dt = new Date(d);
        if (isNaN(dt.getTime())) return;
        const m = dt.getFullYear() * 12 + dt.getMonth();
        monthNums.add(m);
      } catch (e) {
        // ignore
      }
    });

    if (monthNums.size < 6) return false;

    const months = Array.from(monthNums).sort((a, b) => a - b);
    const monthSet = new Set(months);

    for (const m of months) {
      let ok = true;
      for (let i = 1; i < 6; i++) {
        if (!monthSet.has(m + i)) {
          ok = false;
          break;
        }
      }
      if (ok) return true;
    }

    return false;
  };

  // Adopter spesialis: check if any single category has at least 7 applied innovations
  const maxCategory = Math.max(0, ...Object.values(categoryCounts || {}));

  return [
    {
      name: "Penggerak Inovasi",
      icon: "",
      status: appliedInnovationCount >= 3 ? "diperoleh" : "belum",
      criteria_desc: "Memiliki minimal 3 inovasi yang diterapkan.",
    },
    {
      name: "Penggiat Digital",
      icon: "",
      status: appliedInnovationCount >= 10 ? "diperoleh" : "belum",
      criteria_desc: "Memiliki minimal 10 inovasi digital yang diterapkan.",
    },
    {
      name: "Adopter spesialis",
      icon: "",
      status: maxCategory >= 7 ? "diperoleh" : "belum",
      criteria_desc: "Memiliki minimal 7 inovasi dari 1 kategori yang sama.",
    },
    {
      name: "Adopter giat",
      icon: "",
      status: maxCategory >= 4 ? "diperoleh" : "belum",
      criteria_desc: "Menerapkan minimal 4 inovasi dari 1 kategori yang sama.",
    },
    {
      name: "Sahabat inovator",
      icon: "",
      status: (distinctInnovatorIds?.length || 0) >= 15 ? "diperoleh" : "belum",
      criteria_desc: "Menerapkan inovasi dari minimal 15 inovator berbeda.",
    },
  ];
};
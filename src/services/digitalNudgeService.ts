export interface DigitalNudgeBadge {
  name: string;
  icon: string;
  status: "diperoleh" | "belum";
  criteria_desc: string;
}

export const getInnovatorBadges = (): DigitalNudgeBadge[] => {
  return [
    {
      name: "Terus Berkembang",
      icon: "",
      status: "diperoleh",
      criteria_desc: "Terus aktif mengembangkan inovasi.",
    },
    {
      name: "Si Inovatif",
      icon: "",
      status: "diperoleh",
      criteria_desc: "Memiliki inovasi yang memberikan dampak.",
    },
    {
      name: "Kolaboratif Handal",
      icon: "",
      status: "belum",
      criteria_desc: "Aktif berkolaborasi dengan berbagai pihak.",
    },
    {
      name: "Sahabat Desa",
      icon: "",
      status: "diperoleh",
      criteria_desc: "Berkontribusi dalam pengembangan desa.",
    },
    {
      name: "Pemimpin Pasar",
      icon: "",
      status: "belum",
      criteria_desc: "Inovasi berhasil menjangkau pasar lebih luas.",
    },
  ];
};
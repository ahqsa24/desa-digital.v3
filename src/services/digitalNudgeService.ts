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
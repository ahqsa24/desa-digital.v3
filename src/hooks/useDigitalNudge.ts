import { useMemo } from "react";
import { getInnovatorBadges } from "@/services/digitalNudgeService";

export const useDigitalNudge = () => {
  const badges = useMemo(() => {
    return getInnovatorBadges();
  }, []);

  return {
    badges,
  };
};
import { useMemo } from "react";
import { getInnovatorBadges } from "@/services/digitalNudgeService";

export const useDigitalNudge = (
  innovationCount: number,
  villageCount: number
) => {
  const badges = useMemo(() => {
    return getInnovatorBadges(
      innovationCount,
      villageCount
    );
  }, [innovationCount, villageCount]);

  return {
    badges,
  };
};
import { useMemo } from "react";
import { getInnovatorBadges, getVillageBadges } from "@/services/digitalNudgeService";

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

export const useVillageDigitalNudge = (
  appliedInnovationCount: number,
  categoryCounts: Record<string, number> = {},
  appliedInnovationDates: string[] = [],
  distinctInnovatorIds: string[] = []
) => {
  const badges = useMemo(() => {
    return getVillageBadges(
      appliedInnovationCount,
      categoryCounts,
      appliedInnovationDates,
      distinctInnovatorIds
    );
  }, [appliedInnovationCount, JSON.stringify(categoryCounts), JSON.stringify(appliedInnovationDates), JSON.stringify(distinctInnovatorIds)]);

  return { badges };
};
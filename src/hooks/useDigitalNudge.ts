import { useState, useEffect } from "react";
import {
  getInnovatorBadges,
  getVillageBadges,
  DigitalNudgeBadge,
} from "@/services/digitalNudgeService";

export type BadgeType = "innovator" | "village";

export interface UseBadgeOptions {
  type: BadgeType;
  // Innovator metrics
  innovationCount?: number;
  villageCount?: number;
  // Village metrics
  appliedInnovationCount?: number;
  categoryCounts?: Record<string, number>;
  appliedInnovationDates?: string[];
  distinctInnovatorIds?: string[];
}

// In-memory cache for badges to prevent redundant loading and flicker
const badgeCache = new Map<string, DigitalNudgeBadge[]>();

// Helper to generate a stable cache key
const getCacheKey = (options: UseBadgeOptions): string => {
  const {
    type,
    innovationCount = 0,
    villageCount = 0,
    appliedInnovationCount = 0,
    categoryCounts = {},
    appliedInnovationDates = [],
    distinctInnovatorIds = [],
  } = options;

  if (type === "innovator") {
    return `${type}-${innovationCount}-${villageCount}`;
  } else {
    const sortedCategories = Object.keys(categoryCounts)
      .sort()
      .reduce((acc, key) => {
        acc[key] = categoryCounts[key];
        return acc;
      }, {} as Record<string, number>);
    const sortedDates = [...appliedInnovationDates].sort();
    const sortedIds = [...distinctInnovatorIds].sort();

    return `${type}-${appliedInnovationCount}-${JSON.stringify(sortedCategories)}-${JSON.stringify(sortedDates)}-${JSON.stringify(sortedIds)}`;
  }
};

// Simulated asynchronous fetch function
const fetchBadgesFromService = async (
  options: UseBadgeOptions
): Promise<DigitalNudgeBadge[]> => {
  const {
    type,
    innovationCount = 0,
    villageCount = 0,
    appliedInnovationCount = 0,
    categoryCounts = {},
    appliedInnovationDates = [],
    distinctInnovatorIds = [],
  } = options;

  if (type === "innovator") {
    if (innovationCount < 0 || villageCount < 0) {
      throw new Error("Invalid count values for innovator profile.");
    }
    return getInnovatorBadges(innovationCount, villageCount);
  } else if (type === "village") {
    if (appliedInnovationCount < 0) {
      throw new Error("Invalid applied innovation count for village profile.");
    }
    return getVillageBadges(
      appliedInnovationCount,
      categoryCounts,
      appliedInnovationDates,
      distinctInnovatorIds
    );
  } else {
    throw new Error(`Unknown badge type: ${type}`);
  }
};

export const useBadge = (options: UseBadgeOptions) => {
  const cacheKey = getCacheKey(options);

  // Initialize with cached value if present to avoid flicker
  const cachedVal = badgeCache.get(cacheKey);
  const [badges, setBadges] = useState<DigitalNudgeBadge[]>(cachedVal || []);
  const [loading, setLoading] = useState<boolean>(!cachedVal);
  const [error, setError] = useState<string | null>(null);
  const [retryTrigger, setRetryTrigger] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;
    const currentCached = badgeCache.get(cacheKey);

    if (currentCached) {
      setBadges(currentCached);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    fetchBadgesFromService(options)
      .then((data) => {
        if (!isMounted) return;
        badgeCache.set(cacheKey, data);
        setBadges(data);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Failed to fetch badges");
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [cacheKey, retryTrigger]);

  const refetch = () => {
    // Clear cache for this key and force retry
    badgeCache.delete(cacheKey);
    setRetryTrigger((prev) => prev + 1);
  };

  return { badges, loading, error, refetch };
};
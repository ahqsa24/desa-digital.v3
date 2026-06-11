"use client";
import React from "react";
import styled from "styled-components";
import { Box, Flex, Text, Skeleton, Wrap, WrapItem } from "@chakra-ui/react";
import Badge from "./badge";
import { VillageBadgeStatus } from "Services/digitalNudgeService";
// ====================================================
// VillageBadgeChip — Pill badge mini untuk CardVillage
// Desain mengikuti spesifikasi Figma user
// ====================================================
const ChipWrapper = styled.div<{ $color: string; $shadowColor: string }>`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px 4px;
  gap: 4px;
  height: 20px;
  max-width: 110px;
  background: #ffffff;
  box-shadow: 0px 0px 4px ${(props) => props.$color};
  border-radius: 30px;
  flex-shrink: 0;
`;
const ChipEmoji = styled.span`
  width: 14px;
  height: 14px;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  flex-shrink: 0;
`;
const ChipLabel = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 8px;
  line-height: 140%;
  color: #1f2937;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
interface VillageBadgeChipProps {
  badge: VillageBadgeStatus;
}
/**
 * Badge pill kecil untuk ditampilkan pada CardVillage.
 * Menampilkan emoji + nama badge dalam pill berwarna.
 */
export function VillageBadgeChip({ badge }: VillageBadgeChipProps) {
  return (
    <ChipWrapper $color={badge.color} $shadowColor={badge.shadowColor}>
      <ChipEmoji>{badge.emoji}</ChipEmoji>
      <ChipLabel>{badge.name}</ChipLabel>
    </ChipWrapper>
  );
}
// ====================================================
// VillageBadgeSection — Section lengkap untuk halaman
// detail/profil desa (menampilkan semua 5 badge)
// ====================================================
interface VillageBadgeSectionProps {
  allBadges: VillageBadgeStatus[];
  loading?: boolean;
  title?: string;
}
/**
 * Section badge desa lengkap (5 badge).
 * Badge yang belum diperoleh ditampilkan terkunci (abu-abu).
 * Menggunakan komponen `Badge` yang sudah ada.
 */
export function VillageBadgeSection({
  allBadges,
  loading = false,
  title = "Badge Desa",
}: VillageBadgeSectionProps) {
  if (loading) {
    return (
      <Box>
        <Text
          fontSize="12px"
          fontWeight="700"
          color="#1F2937"
          paddingBottom="12px"
        >
          {title}
        </Text>
        <Flex gap="8px" flexWrap="wrap">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} height="38px" width="150px" borderRadius="full" />
          ))}
        </Flex>
      </Box>
    );
  }
  if (!allBadges || allBadges.length === 0) return null;
  return (
    <Box>
      <Text
        fontSize="12px"
        fontWeight="700"
        color="#1F2937"
        paddingBottom="12px"
      >
        {title}
      </Text>
      <Wrap spacing="8px">
        {allBadges.map((badge) => (
          <WrapItem key={badge.key}>
            <Badge
              name={badge.name}
              icon={badge.emoji}
              status={badge.earned ? "diperoleh" : "belum"}
              criteria_desc={badge.description}
              size="sm"
              showTooltip={true}
            />
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
}

import { Flex } from "@chakra-ui/react";
import React from "react";
import { useTranslations } from "next-intl";
import {
  Container,
  Background,
  CardContent,
  Title,
  ContBadge,
  Description,
  Logo,
  Location,
} from "./_cardVillageStyle";
import { VillageBadgeChip } from "Components/digitalNudge/VillageBadge";
import { VillageBadgeStatus } from "Services/digitalNudgeService";
import { useVillageBadges } from "Hooks/useDigitalNudge";
type CardVillageProps = {
  provinsi?: string;
  kabupatenKota?: string;
  logo: string;
  header?: string;
  id: string;
  namaDesa: string;
  onClick?: () => void;
  ranking?: number;
  jumlahInovasiDiterapkan?: number
  isHome: boolean
  highlightQuery?: string;
  /** Maks 2 badge terbaik yang diperoleh desa. Jika tidak disuplai, akan di-fetch otomatis. */
  topBadges?: VillageBadgeStatus[];
};
function CardVillage(props: CardVillageProps) {
  const t = useTranslations("Village");
    const { provinsi, kabupatenKota, logo, header, namaDesa, onClick, ranking, jumlahInovasiDiterapkan, isHome, highlightQuery, topBadges: propBadges, id } = props;
  // Auto-fetch badges jika tidak disuplai via props
  const { topBadges: fetchedBadges } = useVillageBadges(propBadges ? undefined : id);
  const topBadges = propBadges || fetchedBadges;
  const renderHighlightedText = (value?: string) => {
    if (!value) {
      return value;
    }
    const query = highlightQuery?.trim();
    if (!query) {
      return value;
    }
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const matches = value.split(new RegExp(`(${escapedQuery})`, "ig"));
    return matches.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark
          key={`${part}-${index}`}
          style={{
            backgroundColor: "#bbf7d0",
            color: "inherit",
            borderRadius: "4px",
            padding: "0 2px",
          }}
        >
          {part}
        </mark>
      ) : (
        <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>
      )
    );
  };
  return (
    <Container onClick={onClick} $isHome={isHome}>
      <Background src={header} alt="background" />
      <CardContent $isHome={isHome}>
        <Logo src={logo} alt={logo} />
        <ContBadge>
          {topBadges && topBadges.length > 0 && (
            <>
              {topBadges.map((badge) => (
                <VillageBadgeChip key={badge.key} badge={badge} />
              ))}
            </>
          )}
          {ranking == 1 && <img src="/icons/badge-1.svg" alt="badge" />}
          {ranking == 2 && <img src="/icons/badge-2.svg" alt="badge" />}
          {ranking == 3 && <img src="/icons/badge-3.svg" alt="badge" />}
        </ContBadge>
        <Title $isHome={isHome}>{renderHighlightedText(namaDesa)}</Title>
        <Description>{t("appliedInnovationsCount", { count: jumlahInovasiDiterapkan ?? 0 })}</Description>
        <Flex direction="column" marginTop="auto">
          <Location>
            <img src="/icons/location.svg" alt="loc" />
            <Description>
              {renderHighlightedText(kabupatenKota || "")}, {renderHighlightedText(provinsi || "")}{" "}
            </Description>{" "}
          </Location>
        </Flex>
      </CardContent>
    </Container>
  );
}
export default CardVillage;
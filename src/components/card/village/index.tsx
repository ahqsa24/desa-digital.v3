import { Flex } from "@chakra-ui/react";
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
};

function CardVillage(props: CardVillageProps) {
  const { provinsi, kabupatenKota, logo, header, namaDesa, onClick, ranking, jumlahInovasiDiterapkan, isHome } = props;

  return (
    <Container onClick={onClick} $isHome={isHome}>
      <Background src={header} alt="background" />
      <CardContent>
        <Logo src={logo} alt={logo} />
        <ContBadge>
          {ranking == 1 && <img src="/icons/badge-1.svg" alt="badge" />}
          {ranking == 2 && <img src="/icons/badge-2.svg" alt="badge" />}
          {ranking == 3 && <img src="/icons/badge-3.svg" alt="badge" />}
        </ContBadge>
        <Title>{namaDesa}</Title>
        <Description>{jumlahInovasiDiterapkan} Inovasi diterapkan</Description>
        <Flex direction="column" marginTop="auto">
          <Location>
            <img src="/icons/location.svg" alt="loc" />
            <Description>
              {kabupatenKota}, {provinsi}{" "}
            </Description>{" "}
          </Location>
        </Flex>
      </CardContent>
    </Container>
  );
}

export default CardVillage;

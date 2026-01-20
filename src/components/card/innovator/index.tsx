import {
  Container,
  Background,
  CardContent,
  Title,
  Description,
  Logo,
  ContBadge,
} from "./_cardInnovatorStyle";


import { Flex } from "@chakra-ui/react";


type CardInnovatorProps = {
  id: string;
  header: string;
  logo: string;
  namaInovator: string;
  jumlahDesaDampingan: number
  jumlahInovasi: number
  onClick?: () => void;
  ranking?: number;
};

function CardInnovator(props: CardInnovatorProps) {
  const {
    header,
    logo,
    namaInovator,
    onClick,
    jumlahDesaDampingan,
    jumlahInovasi,
    ranking
  } = props;

  return (
    <Container onClick={onClick}>
      <Background src={header || "/images/default-header.svg"} alt={namaInovator} />
      <CardContent>
        <Logo src={logo || "/images/default-logo.svg"} alt={logo} />
        <ContBadge>
          {ranking == 1 && <img src="/icons/badge-1.svg" alt="badge" />}
          {ranking == 2 && <img src="/icons/badge-2.svg" alt="badge" />}
          {ranking == 3 && <img src="/icons/badge-3.svg" alt="badge" />}
        </ContBadge>
        <Title>{namaInovator}</Title>
        <Flex direction="column" marginTop="auto">
          <Description>{jumlahDesaDampingan} Desa Dampingan</Description>
          <Description>{jumlahInovasi} Inovasi</Description>
        </Flex>
      </CardContent>
    </Container>
  );
}

export default CardInnovator;

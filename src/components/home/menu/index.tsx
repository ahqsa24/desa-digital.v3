"use client";

import { Box, Image as ChakraImage, Spinner, Text } from "@chakra-ui/react";
import Container from "Components/container";
import { paths } from "Consts/path";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCategories } from "Services/categoryServices";
import { GridContainer, GridItem, MenuContainer } from "./_menuStyle";

import AgriFoodIcon from "@public/icons/agri-food.svg";
import EGovernmentIcon from "@public/icons/e-government.svg";
import InformationSystemIcon from "@public/icons/information-system.svg";
import LocalInfrastructureIcon from "@public/icons/local-infrastructure.svg";
import MenuAllIcon from "@public/icons/menu-all.svg";
import SmartAgriIcon from "@public/icons/smart-agri.svg";

import PembuatanIklanIcon from "@public/icons/pembuatan-innovasi.svg";
import VerifDesaIcon from "@public/icons/verifikasi-desa.svg";
import VerifInnovatorIcon from "@public/icons/verifikasi-innovator.svg";
import VerifKlaimIcon from "@public/icons/verifikasi-klaim.svg";
import VerifTambahInnovasiIcon from "@public/icons/verifikasi-tambah-innovasi.svg";
import Image from "next/image";
import Link from "next/link";

type MenuProps = {
  isAdmin?: boolean;
};

const LoadingSpinner = () => {
  return (
    <Box style={{ display: "flex", justifyContent: "center", padding: "16px" }}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        size="lg"
        color="#347357"
      />
    </Box>
  );
};

const Menu: React.FC<MenuProps> = ({ isAdmin = false }) => {
  const router = useRouter();
  const { data, isLoading, isFetched } = useQuery("menu", getCategories);

  const predefinedCategories = [
    {
      icon: SmartAgriIcon,
      title: "Pertanian Cerdas",
    },
    {
      icon: AgriFoodIcon,
      title: "Pemasaran Agri-Food dan E-Commerce",
    },
    {
      icon: EGovernmentIcon,
      title: "E-Government",
    },
    {
      icon: InformationSystemIcon,
      title: "Sistem Informasi",
    },
    {
      icon: LocalInfrastructureIcon,
      title: "Infrastruktur Lokal",
    },
    {
      icon: MenuAllIcon,
      title: "Semua Kategori Inovasi",
    },
  ];

  const adminMenu = [
    {
      icon: VerifDesaIcon,
      title: "Verifikasi Desa",
    },
    {
      icon: VerifInnovatorIcon,
      title: "Verifikasi Inovator",
    },
    {
      icon: VerifKlaimIcon,
      title: "Verifikasi Klaim Inovasi",
    },
    {
      icon: VerifTambahInnovasiIcon,
      title: "Verifikasi Tambah Inovasi",
    },
    {
      icon: PembuatanIklanIcon,
      title: "Pembuatan Iklan",
    },
    {
      icon: MenuAllIcon,
      title: "Semua Kategori Inovasi",
    },
  ];

  const [menu, setMenu] = useState<
    { icon: any; title: string }[]
  >([]);
  const menuItems = isAdmin ? adminMenu : predefinedCategories;



  useEffect(() => {
    if (isFetched && data) {
      setMenu(menuItems);
    }
  }, [isFetched, data, isAdmin, menuItems]);

  return (
    <Container>
      <MenuContainer>
        {isLoading && <LoadingSpinner />}
        {!isAdmin && !isLoading && (
          <Text
            textAlign="center"
            // m="16px 0 16px 0"
            mb="16px"
            fontSize="14px"
            fontWeight="700"
            color="brand.100"
          >
            Kategori Inovasi
          </Text>
        )}
        {isFetched && (
          <GridContainer>
            {menu?.map(
              (
                { icon, title }: { icon: any; title: string },
                idx: number
              ) => (
                <GridItem
                  key={idx}
                  as={Link}
                  href={
                    title === "Semua Kategori Inovasi"
                      ? paths.INNOVATION_PAGE
                      : isAdmin
                        ? paths.VERIFICATION_PAGE.replace(":category", title)
                        : paths.INNOVATION_CATEGORY_PAGE.replace(":category", title)
                  }
                  style={{ textDecoration: 'none' }}
                >
                  {/* Assuming icon is imported SVG object for next/image */}
                  <Image src={icon} alt={title} width={40} height={40} style={{ width: '40px', height: '40px' }} />
                  <Text
                    fontSize="12px"
                    fontWeight="400"
                    lineHeight="140%"
                    textAlign="center"
                    mt="8px"
                    width="90px"
                    height="auto"
                    color="black"
                  >
                    {title}
                  </Text>
                </GridItem>
              )
            )}
          </GridContainer>
        )}
      </MenuContainer>
    </Container>
  );
};
export default Menu;

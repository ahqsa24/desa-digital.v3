"use client";

import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Stack,
  Tooltip,
} from "@chakra-ui/react";
import Ads from "Components/ads/Ads";
import BestBanner from "Components/banner/BestBanner";
import Container from "Components/container";
import Dashboard from "Components/dashboard/dashboard";
import Loading from "Components/loading";
import Rediness from "Components/rediness/Rediness";
import SearchBarLink from "src/components/home/search/SearchBarLink";
import TopBar from "Components/topBar";
import { paths } from "Consts/path";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useUser } from "src/contexts/UserContext";
import Hero from "src/components/home/hero";
import Innovator from "src/components/home/innovator";
import Villages from "src/components/home/villages";
import Menu from "src/components/home/menu";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "Components/topBar/LanguageSwitcher";

export default function Home() {
  const t = useTranslations("Home");
  const router = useRouter();
  const { role, isInnovatorVerified, loading } = useUser()
  const [searchValue, setSearchValue] = useState("");

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && searchValue.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      }
    };
    return () => {
    };
  }, [searchValue, router]);

  if (loading) {
    return <Loading />
  }

  const handleAddInnovationClick = () => {
    if (role === "innovator" && isInnovatorVerified) {
      // Assuming paths.ADD_INNOVATION is correct (e.g. /innovation/add)
      router.push(paths.ADD_INNOVATION);
    } else {
      toast.warning(
        "Akun anda belum terdaftar atau terverifikasi sebagai inovator",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  return (
    <Container page>
      <TopBar
        title={t("title")}
        rightElement={<LanguageSwitcher />}
      />
      <Hero
        description={t("description")}
        text={t("country")}
        isAdmin={role === "admin"}
        isInnovator={role === "innovator"}
        isVillage={role === "village"}
      />
      <Stack direction="column" gap={2}>
        <SearchBarLink
          placeholderText={t("searchPlaceholder")}
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
          onKeyDown={handleSearchSubmit}
        />
        <Menu />
        <Flex direction="row" justifyContent="space-between" padding="0 14px">
          <Rediness />
          <Ads />
        </Flex>
        {(role === "village" || role === "innovator") && <Dashboard />}
        <BestBanner />
        <Box mt="120px">
          <Innovator />
        </Box>
        <Box mt="-32px">
          <Villages />
        </Box>
      </Stack>
      {role === "innovator" && (
        <Tooltip
          label={t("addInnovation")}
          aria-label="Tambah Inovasi Tooltip"
          placement="top"
          hasArrow
          bg="#347357"
          color="white"
          fontSize="12px"
          p={1}
          borderRadius="8"
        >
          <Button
            borderRadius="50%"
            width="60px"
            height="60px"
            padding="0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="fixed"
            zIndex="999"
            bottom="75px"
            marginLeft="267px"
            marginRight="33px"
            marginBottom="1"
            onClick={handleAddInnovationClick}
          >
            <IconButton icon={<AddIcon />} aria-label="Tambah Inovasi" />
          </Button>
        </Tooltip>
      )}
    </Container>
  );
}

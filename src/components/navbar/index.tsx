"use client";

import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Home from "@public/icons/home.svg";
import HomeActive from "@public/icons/home-active.svg";
import Village from "@public/icons/village.svg";
import VillageActive from "@public/icons/village-active.svg";
import User from "@public/icons/user.svg";
import UserActive from "@public/icons/user-active.svg";
import { paths } from "Consts/path";
import Loading from "Components/loading";
import { useAdminStatus } from "Hooks/useAdminStatus";
import { useTranslations } from "next-intl";
import {
  OuterContainer,
  Container,
  GridContainer,
  GridItem,
  Text,
} from "./_navbarStyle";

const Navbar: React.FC = () => {
  const t = useTranslations("Common.navbar");
  const router = useRouter();
  const pathname = usePathname();
  const { isAdmin, checking } = useAdminStatus();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // Tampilkan loading selama status admin sedang dicek
  if (checking) return <Loading />;

  // Dynamic menu tergantung role
  const menu = [
    {
      icon: Home,
      active: HomeActive,
      label: t("home"),
      path: isAdmin ? paths.ADMIN_PAGE : paths.LANDING_PAGE,
    },
    {
      icon: Village,
      active: VillageActive,
      label: t("village"),
      path: paths.VILLAGE_PAGE,
    },
    {
      icon: User,
      active: UserActive,
      label: t("innovator"),
      path: paths.INNOVATOR_PAGE,
    },
  ];

  // Perbolehkan tampil jika berada di salah satu route ini
  const show = [
    paths.LANDING_PAGE,
    paths.VILLAGE_PAGE,
    paths.INNOVATOR_PAGE,
    paths.ADMIN_PAGE,
  ];

  // Check if current pathname is in the show list
  // Note: This exact match might fail for dynamic routes. 
  // For now keeping 1:1 migration logic.
  if (!show.includes(pathname || "")) return null;

  return (
    <OuterContainer suppressHydrationWarning={true}>
      <Container>
        <GridContainer>
          {menu.map(({ icon, active, label, path }, idx) => (
            <Link key={idx} href={path} style={{ textDecoration: 'none' }}>
              <GridItem>
                <Image
                  src={pathname === path ? active : icon}
                  alt={label}
                  width={20}
                  height={20}
                  style={{ width: '20px', height: '20px' }}
                />
                <Text>{label}</Text>
              </GridItem>
            </Link>
          ))}
        </GridContainer>
      </Container>
    </OuterContainer>
  );
};

export default Navbar;

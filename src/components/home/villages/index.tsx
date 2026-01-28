import { Box } from "@chakra-ui/react";
import CardVillage from "Components/card/village";
import { paths } from "Consts/path";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getUsers } from "Services/userServices";
import { firestore } from "@/firebase/clientApp";
import { CardContainer, Horizontal, Title } from "./_villagesStyle";
import { useTranslations } from "next-intl";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";

const Village: React.FC = () => {
  const t = useTranslations("Home");
  const router = useRouter();
  const [villages, setVillages] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const villagesRef = collection(firestore, "villages");
      const q = query(
        villagesRef,

        orderBy("jumlahInovasiDiterapkan", "desc"), // Urutkan dari inovasi terbanyak
        limit(5) // Ambil hanya 5 desa teratas
      );

      const snapShot = await getDocs(q);
      const villagesData = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVillages(villagesData);
    };
    fetchData();
  }, []);

  return (
    <Box padding="0 14px">
      <Title>{t("featuredVillages")}</Title>
      <CardContainer>
        <Horizontal>
          {villages.map((item: any, idx: number) => (
            <Link
              href={paths.DETAIL_VILLAGE_PAGE.replace(':id', item.userId || item.id)}
              key={item.id}
              style={{ textDecoration: 'none', width: '38%', flexShrink: 0, display: 'block' }}
            >
              <CardVillage
                isHome={false}
                namaDesa={item.namaDesa || item.lokasi?.desaKelurahan?.label}
                logo={item.logo || "/images/default-logo.svg"}
                header={item.header || "/images/default-header.svg"}
                kabupatenKota={
                  item.kabupatenKota || item.lokasi?.kabupatenKota?.label
                }
                provinsi={item.provinsi || item.lokasi?.provinsi?.label}
                jumlahInovasiDiterapkan={item.jumlahInovasiDiterapkan}
                ranking={idx + 1}
                id={item.userId || item.id}
              />
            </Link>
          ))}
        </Horizontal>
      </CardContainer>
    </Box>
  );
};

export default Village;

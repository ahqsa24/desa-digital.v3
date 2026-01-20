"use client";

import React, { useEffect, useState } from "react";
import { paths } from "Consts/path";
import TopBar from "Components/topBar";
import Container from "Components/container";
import CardInnovation from "Components/card/innovation";
import { useRouter, useParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import {
    DetailContainer,
    Container as CategoryContainer
} from "../_styles";
import { getDocuments, getDocumentById } from "src/firebase/inovationTable";
import { DocumentData } from "firebase/firestore";

import { Image } from "@chakra-ui/react";

export default function InnovationCategoryPage() {
    const router = useRouter();
    const params = useParams();
    const category = decodeURIComponent(params.category as string);

    const [data, setData] = useState<DocumentData[]>([]);
    const [innovators, setInnovators] = useState<Record<string, DocumentData>>(
        {}
    );
    const [loadingInnovators, setLoadingInnovators] = useState<boolean>(true);

    useEffect(() => {
        getDocuments("innovations")
            .then((detailInovasi) => {
                setData(detailInovasi);
            })
            .catch((error) => {
                console.error("Error fetching innovation details:", error);
            });
    }, []);

    useEffect(() => {
        const fetchInnovators = async () => {
            setLoadingInnovators(true);
            const innovatorData: Record<string, DocumentData> = {};
            for (const item of data) {
                if (item.innovatorId) {
                    const detailInnovator = await getDocumentById(
                        "innovators",
                        item.innovatorId
                    );
                    innovatorData[item.innovatorId] = detailInnovator;
                }
            }
            setInnovators(innovatorData);
            setLoadingInnovators(false);
        };

        if (data.length > 0) {
            fetchInnovators();
        }
    }, [data]);

    const innovationByCategory = data.filter(
        (item) => item.kategori === category
    );

    return (
        <Container page>
            <TopBar title={category || "Kategori"} onBack={() => router.back()} />
            <CategoryContainer>
                {innovationByCategory.length === 0 ? (
                    <p>Inovasi tidak ditemukan</p>
                ) : (
                    <DetailContainer>
                        {innovationByCategory.map((item, idx) => (
                            <CardInnovation
                                key={idx}
                                {...item}
                                innovatorLogo={
                                    loadingInnovators ? (
                                        <Skeleton circle width={50} height={50} />
                                    ) : (
                                        innovators[item.innovatorId]?.logo || (
                                            <Image src="/images/default-logo.svg" alt="logo" width='20px' height='20px' objectFit='cover' borderRadius="50%" />
                                        )
                                    )
                                }
                                innovatorName={
                                    loadingInnovators ? (
                                        <Skeleton width={100} />
                                    ) : (
                                        innovators[item.innovatorId]?.namaInovator || item.namaInnovator
                                    )
                                }
                                onClick={() =>
                                    router.push(`/innovation/detail/${item.id}`)
                                }
                            />
                        ))}
                    </DetailContainer>
                )}
            </CategoryContainer>
        </Container>
    );
}

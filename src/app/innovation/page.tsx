"use client";

import React, { useEffect, useState } from "react";
import { paths } from "Consts/path";
import TopBar from "Components/topBar";
import Container from "Components/container";
import CardCategory from "Components/card/category";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { getCategories } from "Services/categoryServices";
import Loading from "Components/loading";
import { Container as CategoryContainer } from "./_styles";

type ListProps = {
    data: any;
    isFetched: boolean;
    isLoading: boolean;
};

function List(props: ListProps) {
    const { data, isFetched, isLoading } = props;

    const router = useRouter();
    const [menu, setMenu] = useState<any[]>([]);

    const handleClick = (category: string) => {
        router.push(`/innovation/${category}`);
    };

    useEffect(() => {
        if (isFetched) {
            const temp = [...(data?.slice(0, data?.length - 1) || [])];
            setMenu(temp);
        }
    }, [isFetched]);

    return (
        <>
            {isLoading && <Loading />}
            {isFetched &&
                menu.map((item: any, idx: number) => (
                    <CardCategory
                        {...item}
                        key={idx}
                        onClick={() => handleClick(item.title)}
                    />
                ))}
        </>
    );
}

export default function InnovationPage() {
    const router = useRouter();
    const { data, isFetched, isLoading } = useQuery("category", getCategories);

    const listProps = {
        data,
        isFetched,
        isLoading,
    };

    return (
        <Container page>
            <TopBar title="Kategori Inovasi" onBack={() => router.back()} />
            <CategoryContainer>
                <List {...listProps} />
            </CategoryContainer>
        </Container>
    );
}

"use client";

import { Box, Flex, Stack } from "@chakra-ui/react";
import Ads from "Components/ads/Ads";
import BestBanner from "Components/banner/BestBanner";
import Container from "Components/container";
import Dashboard from "Components/dashboard/dashboard";
import Rediness from "Components/rediness/Rediness";
import SearchBarLink from "src/components/home/search/SearchBarLink";
import TopBar from "Components/topBar";
import React, { useState } from "react";
import Hero from "src/components/home/hero";
import Innovator from "src/components/home/innovator";
import Menu from "src/components/home/menu";
import Villages from "src/components/home/villages";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchValue.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchValue)}`);
        }
    };

    return (
        <Container page>
            <TopBar title="Desa Digital Indonesia" />
            <Hero
                description="Admin Inovasi Desa"
                text="Digital Indonesia"
                isAdmin={true}
            />
            <Stack direction="column" gap={2}>
                <SearchBarLink
                    placeholderText="Cari inovasi, inovator, atau desa..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleSearch}
                />
                <Menu isAdmin={true} />
                <Flex direction="row" justifyContent="space-between" padding="0 14px">
                    <Rediness />
                    <Ads />
                </Flex>
                <Dashboard />
                <BestBanner />
                <Box mt="120px">
                    <Innovator />
                </Box>
                <Box mt="-10px">
                    <Villages />
                </Box>
            </Stack>
        </Container>
    );
}

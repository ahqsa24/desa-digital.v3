"use client";

import { Box, Stack } from "@chakra-ui/react";
import TopBar from "Components/topBar";
import { useRouter } from "next/navigation";
import React from "react";
import ScoreCardDashboardDesa from "Components/dashboard/admin/dashboardDesa/scorecardDashboardDesa";
import SebaranKlasifikasiDashboardDesa from "Components/dashboard/admin/dashboardDesa/sebaranKlasifikasiDashboardDesa";
import SebaranPotensiDesa from "Components/dashboard/admin/dashboardDesa/sebaranPotensiDesa";
import SebaranKondisiDesa from "Components/dashboard/admin/dashboardDesa/sebaranKondisiDesa";


const DashboardAdminDesa: React.FC = () => {
    const router = useRouter();

    return (
        <Box>
            {/* Top Bar */}
            <TopBar title="Data Desa" onBack={() => router.back()} />

            <Stack gap="16px" paddingTop="55px" />

            <ScoreCardDashboardDesa />
            {/* <SebaranProvinsiDashboardDesa/> dipindah ke dashboard depan */}
            <SebaranKlasifikasiDashboardDesa />
            <SebaranPotensiDesa />
            <SebaranKondisiDesa />

            <Box pb={10} />
        </Box >
    );
};

export default DashboardAdminDesa;

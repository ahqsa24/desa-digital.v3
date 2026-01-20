"use client";

import { Box, Stack } from "@chakra-ui/react";
import TopBar from "Components/topBar";
import { useRouter } from "next/navigation";
import React from "react";
import ScoreCardDashboardInnovations from "Components/dashboard/admin/dashboardInovasi/scorecardDashboardInovasi";
import SebaranKategoriInnovations from "Components/dashboard/admin/dashboardInovasi/sebaranKategoriInovasi";
import Top5Innovations from "Components/dashboard/admin/dashboardInovasi/top5Inovasi";



const DashboardAdminInovasi: React.FC = () => {
    //State untuk navigasi page
    const router = useRouter();

    return (
        <Box>
            {/* Top Bar */}
            <TopBar title="Data Inovasi" onBack={() => router.back()} />

            <Stack gap="16px" paddingTop="55px" />

            <ScoreCardDashboardInnovations />
            <SebaranKategoriInnovations />
            <Top5Innovations />

            {/* TOP 5 INOVASI SELESAI */}
            <Box pb={10} />
        </Box>
    );
};

export default DashboardAdminInovasi;

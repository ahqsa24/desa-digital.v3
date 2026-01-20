"use client";

import { Box, Flex, Stack } from "@chakra-ui/react";
import TopBar from "Components/topBar";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import InformasiUmum from "Components/dashboard/admin/informasiumum";
import Leaderboard from "Components/dashboard/admin/merger";
import PetaLama from "Components/dashboard/admin/petaOld";
import DownloadReport from "Components/dashboard/admin/downloadReport";
import Hero from "src/components/home/hero";

const DashboardAdmin = () => {
    const router = useRouter();
    const [userRole, setUserRole] = useState(null); // State untuk menyimpan peran pengguna

    return (
        <Box>
            <TopBar
                title="Dashboard"
                onBack={() => router.back()}
                rightElement={<DownloadReport />}
            />
            <Stack
                gap="16px"
                paddingTop="55px">
            </Stack>
            <Hero
                description="Admin"
                text=""
                customTitle="Selamat Datang"
                minHeight={100}
                gapSize={2}
            />
            <InformasiUmum />
            <Leaderboard />
            {/* <DesaDigitalUnggulan/>
            <InovatorUnggulan/>
            <InovasiUnggulan/> */}
            <Box pb={5} />
            <PetaLama />
            <Box pb={50} />
        </Box>
    );
};

export default DashboardAdmin;

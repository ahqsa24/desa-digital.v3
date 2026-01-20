"use client";

import { Box, Grid } from "@chakra-ui/react";
import Container from "Components/container";
import TopBar from "Components/topBar";
import Header from "src/components/dashboard/ministry/header";
import { useRouter } from "next/navigation";
import InfoCards from "src/components/dashboard/ministry/infoCards";
import PieChartInnovation from "src/components/dashboard/ministry/categoryInnovation";
import PieChartInnovator from "src/components/dashboard/ministry/categoryInnovator";
import PieChartVillage from "src/components/dashboard/ministry/categoryVillage";
import BarChartMinistry from "src/components/dashboard/ministry/barChart";
import MapVillages from "src/components/dashboard/ministry/mapVillages";
import LogoutButton from "Components/topBar/RightContent/LogoutButton";
import { getAuth } from "firebase/auth";

const DashboardMinistry = () => {
    const router = useRouter();
    const auth = getAuth();
    const user = auth.currentUser;
    const userName = user?.displayName || "Kementerian";

    return (
        <Container page>
            <TopBar
                title={`Dashboard ${userName}`}
                rightElement={<LogoutButton />}
            />
            <Header description="KMS Desa Digital" text="Indonesia" />
            <InfoCards></InfoCards>
            <PieChartVillage></PieChartVillage>
            <PieChartInnovation></PieChartInnovation>
            <PieChartInnovator></PieChartInnovator>
            <MapVillages></MapVillages>
            <BarChartMinistry></BarChartMinistry>
        </Container>
    );
};

export default DashboardMinistry;

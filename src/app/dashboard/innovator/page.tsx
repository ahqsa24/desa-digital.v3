"use client";

import Container from "Components/container";
import TopBar from "Components/topBar";
import Header from "src/components/dashboard/innovator/header";
import InfoCards from "src/components/dashboard/innovator/infoCards";
import TopVillages from "src/components/dashboard/innovator/topVillages";
import TopInnovations from "src/components/dashboard/innovator/topInnovations";
import TableInnovator from "src/components/dashboard/innovator/categoryInnovation";
import MapVillages from "src/components/dashboard/innovator/mapVillages";
import BarChartInnovator from "src/components/dashboard/innovator/barchartInnovator";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";

const DashboardInnovator = () => {
    const router = useRouter();
    const auth = getAuth();
    const user = auth.currentUser;
    const userName = user?.displayName || "Inovator";

    return (
        <Container page>
            <TopBar
                title={`Dashboard ${userName}`}
                onBack={() => router.back()}
            />
            <Header description="KMS Desa Digital" text="Indonesia" />

            <InfoCards />
            <TopInnovations />
            <TopVillages />
            <TableInnovator />
            <MapVillages />
            <BarChartInnovator />
        </Container>
    );
};

export default DashboardInnovator;

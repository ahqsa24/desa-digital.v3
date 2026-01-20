"use client";

import Container from "Components/container";
import TopBar from "Components/topBar";
import { useRouter } from "next/navigation";
import CategoryInnovation from "src/components/dashboard/ministry/innovation/categoryInnovation";
import ChartInnovation from "src/components/dashboard/ministry/innovation/chartInnovation";
import DetailInnovations from "src/components/dashboard/ministry/innovation/detailInnovations";
import DetailVillagesInnovation from "src/components/dashboard/ministry/innovation/detailVillagesInnovation";
import { getAuth } from "firebase/auth";
import { useState } from "react";

const DashboardMinistryInnovation = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const userName = user?.displayName || "Kementerian";
    const router = useRouter();

    const [selectedInovator, setSelectedInovator] = useState<string | null>(null);
    const [selectedInovasi, setSelectedInovasi] = useState<string | null>(null);
    const [hasRowClicked, setHasRowClicked] = useState(false);

    const handleSliceClick = (inovatorName: string) => {
        setSelectedInovator(inovatorName);
        setSelectedInovasi(null);
        setHasRowClicked(false);
    };

    const handleInnovationSelect = (inovasi: string) => {
        setSelectedInovasi(inovasi);
        setHasRowClicked(true);
    };

    return (
        <Container page>
            <TopBar title={`Dashboard ${userName} - Inovasi`} onBack={() => router.back()} />
            <CategoryInnovation onSliceClick={handleSliceClick} />
            <DetailInnovations selectedCategory={selectedInovator} onInnovationSelect={handleInnovationSelect} />
            <DetailVillagesInnovation selectedInovasi={selectedInovasi} hasRowClicked={hasRowClicked} />
            <ChartInnovation />
        </Container>
    );
};

export default DashboardMinistryInnovation;

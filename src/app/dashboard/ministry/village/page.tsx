"use client";

import Container from "Components/container";
import TopBar from "Components/topBar";
import { useRouter } from "next/navigation";
import PieChartVillage from "src/components/dashboard/ministry/village/categoryVillage";
import ChartVillage from "src/components/dashboard/ministry/village/chartVillage";
import DetailVillages from "src/components/dashboard/ministry/village/detailVillages";
import DetailInnovationsVillage from "src/components/dashboard/ministry/village/detailInnovationsVillage";
import { getAuth } from "firebase/auth";
import { useState } from "react";

const DashboardMinistryVillage = () => {
    const router = useRouter();
    const auth = getAuth();
    const user = auth.currentUser;
    const userName = user?.displayName || "Kementerian";

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedVillage, setSelectedVillage] = useState<string | null>(null);
    const [hasRowClicked, setHasRowClicked] = useState(false);

    const handleCategoryClick = (category: string | null) => {
        setSelectedCategory(category);
        setSelectedVillage(null);
    };

    const handleRowClick = (village: string) => {
        setSelectedVillage(village);
        setHasRowClicked(true);
    };

    return (
        <Container page>
            <TopBar title={`Dashboard ${userName} - Desa`} onBack={() => router.back()} />
            <PieChartVillage onSliceClick={handleCategoryClick} />
            <DetailVillages selectedCategory={selectedCategory} onRowClick={handleRowClick} />
            <DetailInnovationsVillage selectedVillage={selectedVillage} hasRowClicked={hasRowClicked} />
            <ChartVillage />
        </Container>
    );
};

export default DashboardMinistryVillage;

"use client";

import Container from "Components/container";
import TopBar from "Components/topBar";
import { useRouter } from "next/navigation";
import PieChartInnovator from "src/components/dashboard/ministry/innovator/categoryInnovator";
import DetailInnovations from "src/components/dashboard/ministry/innovator/detailInnovationsInnovator";
import DetailInnovators from "src/components/dashboard/ministry/innovator/detailInnovators";
import { getAuth } from "firebase/auth";
import { useState } from "react";

const DashboardMinistryInnovator = () => {
    const router = useRouter();
    const auth = getAuth();
    const user = auth.currentUser;
    const userName = user?.displayName || "Kementerian";

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedInnovator, setSelectedInnovator] = useState<string | null>(null);
    const [selectedVillage, setSelectedVillage] = useState<string | null>(null);

    const handleCategorySelect = (category: string | null) => {
        setSelectedCategory(category);
        setSelectedInnovator(null);
        setSelectedVillage(null);
    };

    const handleInnovatorSelect = (innovator: string | null) => {
        setSelectedInnovator(innovator);
        setSelectedVillage(null);
    };

    return (
        <Container page>
            <TopBar title={`Dashboard ${userName} - Inovator`} onBack={() => router.back()} />

            <PieChartInnovator onSliceClick={handleCategorySelect} />

            <DetailInnovators
                kategoriInovator={selectedCategory}
                onSelectInovator={handleInnovatorSelect}
            />

            <DetailInnovations
                filterInnovator={selectedInnovator || ""}
                onSelectVillage={setSelectedVillage}
            />
        </Container>
    );
};

export default DashboardMinistryInnovator;

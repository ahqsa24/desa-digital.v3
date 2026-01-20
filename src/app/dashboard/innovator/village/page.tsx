"use client";

import { useState } from "react";
import Container from "Components/container";
import TopBar from "Components/topBar";
import { useRouter } from "next/navigation";
import TopInnovations from "src/components/dashboard/innovator/village/topVillages";
import DetailInnovations from "src/components/dashboard/innovator/village/detailInnovationsVillage";
import DetailVillages from "src/components/dashboard/innovator/village/detailVillages";
import { getAuth } from "firebase/auth";

const DashboardInnovatorVillage = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const userName = user?.displayName || "Inovator";
    const router = useRouter();
    const [selectedDesa, setSelectedDesa] = useState<{ id: string; nama: string } | null>(null);

    return (
        <Container page>
            <TopBar
                title={`Dashboard ${userName} - Desa`}
                onBack={() => router.back()}
            />
            <TopInnovations />
            <>
                <DetailVillages onSelectVillage={(id, nama) => setSelectedDesa({ id, nama })} />
                <DetailInnovations
                    villageId={selectedDesa?.id || ""}
                    namaDesa={selectedDesa?.nama || ""}
                    onBack={() => setSelectedDesa(null)}
                />
            </>
        </Container>
    );
};

export default DashboardInnovatorVillage;

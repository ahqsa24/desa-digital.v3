"use client";

import { useState } from "react";
import Container from "Components/container";
import TopBar from "Components/topBar";
import { useRouter } from "next/navigation";
import TopInnovations from "src/components/dashboard/innovator/innovation/topInnovations";
import DetailInnovations from "src/components/dashboard/innovator/innovation/detailInnovations";
import DetailVillages from "src/components/dashboard/innovator/innovation/detailVillagesInnovation";
import { getAuth } from "firebase/auth";

const DashboardInnovatorInnovation = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const userName = user?.displayName || "Inovator";
    const router = useRouter();
    const [selectedInovasi, setSelectedInovasi] = useState<{ id: string; nama: string } | null>(null);

    return (
        <Container page>
            <TopBar
                title={`Dashboard ${userName} - Inovasi`}
                onBack={() => router.back()}
            />
            <TopInnovations></TopInnovations>
            <>
                <DetailInnovations onSelectInnovation={(id, nama) => setSelectedInovasi({ id, nama })} />
                <DetailVillages
                    innovationId={selectedInovasi?.id || ""}
                    namaInovasi={selectedInovasi?.nama || ""}
                    onBack={() => setSelectedInovasi(null)}
                />
            </>
        </Container>
    );
};

export default DashboardInnovatorInnovation;

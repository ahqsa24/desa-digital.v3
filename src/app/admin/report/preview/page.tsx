"use client";

import TopBar from "Components/topBar";
import { useRouter } from "next/navigation";
import { NavbarButton } from "../_styles";
import React, { useEffect, useState } from "react";
import PreviewRDocs from "Components/report/VillagePreview";
import {
    Box,
    Button,
    Stack,
    Flex,
} from "@chakra-ui/react";

const PreviewReportAdmin: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    return (
        <Flex height="100vh" direction="column">
            <TopBar title="Report Admin" onBack={() => router.back()} />
            <Stack gap="16px" paddingTop="30px" />
            <Box flex="1" p="0 16px">

            </Box>
            <NavbarButton>
                <Button
                    type="submit"
                    fontSize={14}
                    width="100%"
                    height="44px"
                    isLoading={loading}
                >
                    Download Report
                </Button>
            </NavbarButton>
        </Flex>
    );
}

export default PreviewReportAdmin;

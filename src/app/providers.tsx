"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { theme } from "src/chakra/theme";
import { UserProvider } from "src/contexts/UserContext";

const queryClient = new QueryClient();
export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <CacheProvider>
                <ChakraProvider theme={theme}>
                    <UserProvider>
                        <div suppressHydrationWarning={true}>
                            {children}
                            <ToastContainer
                                position="top-center"
                                autoClose={2000}
                                theme="light"
                                transition={Bounce}
                            />
                        </div>
                    </UserProvider>
                </ChakraProvider>
            </CacheProvider>
        </QueryClientProvider>
    );
}

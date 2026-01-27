"use client";

import { Button, Menu, MenuButton, MenuList, MenuItem, Text, Flex } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useLanguage } from "src/contexts/LanguageContext";
import Image from "next/image";

export default function LanguageSwitcher() {
    const { locale, setLocale } = useLanguage();

    const languages = [
        { code: "id", label: "ID", flag: "https://flagcdn.com/w20/id.png" },
        { code: "en", label: "EN", flag: "https://flagcdn.com/w20/gb.png" },
    ];

    const currentLang = languages.find((lang) => lang.code === locale) || languages[0];

    return (
        <Menu>
            <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon color="white" boxSize={3} />}
                variant="ghost"
                size="xs"
                height="32px"
                pl={1}
                pr={0}
                _hover={{ bg: "transparent" }}
                _active={{ bg: "transparent" }}
            >
                <Flex align="center">
                    <Text color="white" fontWeight="700" fontSize="14px">
                        {currentLang.label}
                    </Text>
                </Flex>
            </MenuButton>
            <MenuList minW="60px" bg="white" borderColor="gray.200" zIndex={1000}>
                {languages.map((lang) => (
                    <MenuItem
                        key={lang.code}
                        onClick={() => setLocale(lang.code as "id" | "en")}
                        display="flex"
                        alignItems="center"
                        _hover={{ bg: "gray.100" }}
                    >
                        <Text color="black" fontSize="12px">
                            {lang.label === "ID" ? "Indonesia" : "English"}
                        </Text>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}

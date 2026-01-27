import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useTranslations } from "next-intl";


const Rediness: React.FC = () => {
  const t = useTranslations("Components.rediness");
  return (
    // <Container>
    <Flex>
      <Box
        backgroundImage="url('/images/rediness.svg')"
        height="160px"
        width="160px"
        backgroundSize="cover"
        backgroundPosition="center"
        padding="12px"
        borderRadius="12px"
      >
        <Text
          fontSize="16px"
          fontWeight="700"
          color="#374151"
          lineHeight="140%"
          mb="11px"
        >
          {t.rich("title", {
            br: () => <br />
          })}
        </Text>
        <Button
          width="87px"
          height="26px"
          fontSize="10px"
          fontWeight="500"
          padding="6px 20px"
        >
          {t("button")}
        </Button>
      </Box>
    </Flex>
    // </Container>
  );
};
export default Rediness;

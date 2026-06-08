import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Tooltip,
  useColorModeValue,
  Icon,
  BoxProps,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { Award, Lock, CheckCircle2 } from "lucide-react";

export interface DigitalNudgeBadgeProps extends Omit<BoxProps, "name"> {
  /** The name of the badge (e.g., "Kecamatan Terpadu") */
  name: string;
  /** Path or URL to the badge icon, or a generic string */
  icon: string;
  /** Status of the badge: 'diperoleh' (obtained) or 'belum' (not yet obtained) */
  status: "diperoleh" | "belum" | string;
  /** Description of the criteria to earn the badge */
  criteria_desc: string;
  /** Size variant of the badge pill */
  size?: "sm" | "md" | "lg";
  /** Whether to show a detailed tooltip on hover */
  showTooltip?: boolean;
}

const Badge = ({
  name,
  icon,
  status,
  criteria_desc,
  size = "md",
  showTooltip = true,
  ...rest
}: DigitalNudgeBadgeProps) => {
  const [imageError, setImageError] = useState(false);

  // Normalize status value
  const isObtained = status?.toLowerCase() === "diperoleh" || status?.toLowerCase() === "achieved";

  // Size configurations
  const sizeConfigs = {
    sm: {
      height: "28px",
      fontSize: "xs",
      iconSize: "20px",
      paddingLeft: "4px",
      paddingRight: "10px",
      gap: 2,
    },
    md: {
      height: "38px",
      fontSize: "sm",
      iconSize: "28px",
      paddingLeft: "5px",
      paddingRight: "14px",
      gap: 3,
    },
    lg: {
      height: "48px",
      fontSize: "md",
      iconSize: "36px",
      paddingLeft: "6px",
      paddingRight: "18px",
      gap: 4,
    },
  };

  const config = sizeConfigs[size] || sizeConfigs.md;

  // Colors & Styling Tokens based on status & mode
  // Brand color is #347357 (brand.100)
  const activeBg = useColorModeValue("green.50", "rgba(52, 115, 87, 0.12)");
  const activeBorderColor = useColorModeValue("green.200", "rgba(52, 115, 87, 0.35)");
  const activeTextColor = useColorModeValue("brand.110", "green.200");
  const activeHoverBg = useColorModeValue("green.100", "rgba(52, 115, 87, 0.2)");
  const activeHoverBorder = useColorModeValue("brand.120", "#347357");
  const activeGlow = useColorModeValue(
    "0 4px 12px rgba(52, 115, 87, 0.15)",
    "0 4px 20px rgba(52, 115, 87, 0.3)"
  );

  const lockedBg = useColorModeValue("gray.50", "rgba(255, 255, 255, 0.03)");
  const lockedBorderColor = useColorModeValue("gray.200", "gray.800");
  const lockedTextColor = useColorModeValue("gray.400", "gray.500");
  const lockedHoverBorder = useColorModeValue("gray.300", "gray.700");

  const bg = isObtained ? activeBg : lockedBg;
  const borderColor = isObtained ? activeBorderColor : lockedBorderColor;
  const textColor = isObtained ? activeTextColor : lockedTextColor;

  // Render the badge icon with proper grayscale/opacity based on obtained status
  const renderIcon = () => {
    const isUrl = icon && (icon.startsWith("/") || icon.startsWith("http") || icon.startsWith("."));

    if (isUrl && !imageError) {
      return (
        <Flex
          align="center"
          justify="center"
          w={config.iconSize}
          h={config.iconSize}
          borderRadius="full"
          overflow="hidden"
          bg={isObtained ? "white" : "gray.100"}
          border="1px solid"
          borderColor={isObtained ? "green.100" : "gray.200"}
          transition="all 0.2s"
          filter={isObtained ? "none" : "grayscale(100%)"}
          opacity={isObtained ? 1 : 0.4}
        >
          <Image
            src={icon}
            alt={name}
            w="80%"
            h="80%"
            objectFit="contain"
            onError={() => setImageError(true)}
          />
        </Flex>
      );
    }

    // Fallback to React Icons / Lucide if no image URL or failed to load
    return (
      <Flex
        align="center"
        justify="center"
        w={config.iconSize}
        h={config.iconSize}
        borderRadius="full"
        bg={isObtained ? "green.100" : "gray.100"}
        color={isObtained ? "brand.100" : "gray.400"}
        transition="all 0.2s"
        opacity={isObtained ? 1 : 0.5}
      >
        <Icon as={Award} w="60%" h="60%" />
      </Flex>
    );
  };

  // Detailed Interactive Tooltip Content
  const tooltipContent = (
    <VStack align="start" spacing={1.5} p={1.5} maxW="280px">
      <Text fontWeight="bold" fontSize="sm" color="white">
        {name}
      </Text>
      <HStack spacing={1.5} align="center">
        <Icon
          as={isObtained ? CheckCircle2 : Lock}
          w={3.5}
          h={3.5}
          color={isObtained ? "green.400" : "yellow.500"}
        />
        <Text
          fontSize="xs"
          fontWeight="semibold"
          color={isObtained ? "green.400" : "yellow.500"}
        >
          {isObtained ? "Diperoleh" : "Belum Diperoleh"}
        </Text>
      </HStack>
      <Box h="1px" w="100%" bg="gray.700" my={0.5} />
      <Text fontSize="xs" color="gray.300" lineHeight="1.4">
        {criteria_desc || "Tidak ada deskripsi kriteria."}
      </Text>
    </VStack>
  );

  const pillContent = (
    <Flex
      display="inline-flex"
      alignItems="center"
      height={config.height}
      borderRadius="full"
      border="1px solid"
      borderColor={borderColor}
      bg={bg}
      pl={config.paddingLeft}
      pr={config.paddingRight}
      gap={config.gap}
      color={textColor}
      transition="all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
      cursor="pointer"
      userSelect="none"
      position="relative"
      _hover={{
        transform: "translateY(-1.5px)",
        borderColor: isObtained ? activeHoverBorder : lockedHoverBorder,
        bg: isObtained ? activeHoverBg : lockedBg,
        boxShadow: isObtained ? activeGlow : "none",
      }}
      {...rest}
    >
      {renderIcon()}

      <Text
        fontWeight="600"
        fontSize={config.fontSize}
        letterSpacing="wide"
        noOfLines={1}
      >
        {name}
      </Text>

      {/* Lock status indicator on the far right for locked badges */}
      {!isObtained && (
        <Icon
          as={Lock}
          w={size === "sm" ? 3 : size === "md" ? 3.5 : 4}
          h={size === "sm" ? 3 : size === "md" ? 3.5 : 4}
          color="gray.400"
          ml={-0.5}
        />
      )}
    </Flex>
  );

  if (showTooltip) {
    return (
      <Tooltip
        label={tooltipContent}
        bg="gray.900"
        color="white"
        px={3}
        py={2}
        borderRadius="lg"
        boxShadow="xl"
        hasArrow
        placement="top"
        openDelay={150}
        closeDelay={100}
      >
        {pillContent}
      </Tooltip>
    );
  }

  return pillContent;
};

export default Badge;
import { Spinner, Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

function Loading() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Jika belum di-mount di client, render versi minimal yang statis
  if (!isMounted) {
    return (
      <Box
        suppressHydrationWarning={true}
        style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#EEF8F4" }}
      />
    )
  }

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#EEF8F4",
      }}
    >
      <Spinner
        thickness="4px" speed="0.65s" emptyColor="gray.200" size="xl" color="#347357"
      />
      <Box ml={4} fontSize="xl" color="#347357">
        Loading...
      </Box>
    </Box>
  )
}

export default Loading
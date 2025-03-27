import Profile from "../component/Profile";
import Feeds from "../component/Feeds";
import TopPost from "../component/Top";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";

const Home = () => {
  // Modified breakpoint to ensure iPad Pro (1024px) doesn't show these components
  const showProfileAndTopPost = useBreakpointValue({
    base: false,
    sm: false,
    md: false,
    lg: false, // Hide on iPad Pro (1024px)
    xl: true, // Only show on larger screens (typically 1280px+)
  });

  return (
    <Flex direction="column" width="100%" position="relative">
      {showProfileAndTopPost && (
        <Box width="100%" zIndex="10">
          <Profile />
        </Box>
      )}
      <Flex
        width="100%"
        justifyContent="space-between"
        flexDirection={{ base: "column", xl: "row" }}
        mt={{ base: 2, xl: 4 }}
      >
        <Box
          width={{ base: "100%", xl: showProfileAndTopPost ? "60%" : "100%" }}
          order={{ base: 2, xl: 1 }}
        >
          <Feeds />
        </Box>
        {showProfileAndTopPost && (
          <Box
            width={{ base: "100%", xl: "35%" }}
            order={{ base: 1, xl: 2 }}
            mb={{ base: 4, xl: 0 }}
          >
            <TopPost />
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Home;

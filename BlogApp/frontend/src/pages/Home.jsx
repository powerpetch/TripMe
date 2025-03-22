import Profile from "../component/Profile";
import Feeds from "../component/Feeds";
import TopPost from "../component/Top";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";

const Home = () => {
  // Determine if we're on mobile/iPhone screen
  const showTopPost = useBreakpointValue({
    base: false, // Hide on iPhone/mobile
    sm: true, // Show on all larger screens
  });

  return (
    <Flex direction="column" width="100%" position="relative">
      {/* Profile at the top */}
      <Box width="100%" zIndex="10">
        <Profile />
      </Box>

      {/* Main content area */}
      <Flex
        width="100%"
        justifyContent="space-between"
        flexDirection={{ base: "column", md: "row" }}
        mt={{ base: 2, md: 4 }}
      >
        {/* Feeds in the center/left */}
        <Box
          width={{ base: "100%", md: showTopPost ? "60%" : "100%" }}
          order={{ base: 2, md: 1 }}
        >
          <Feeds />
        </Box>

        {/* TopPost on the right - conditionally rendered */}
        {showTopPost && (
          <Box
            width={{ base: "100%", md: "35%" }}
            order={{ base: 1, md: 2 }}
            mb={{ base: 4, md: 0 }}
          >
            <TopPost />
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Home;

import {
  Avatar,
  Card,
  CardBody,
  Container,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import Postbox from "./Postbox";
import CreateModal from "./CreateModal";
import { useEffect, useState } from "react";
import { fetchAllPosts } from "../api";

const Feeds = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [allPost, setAllPost] = useState([]);

  // Responsive container width based on screen size
  const containerWidth = useBreakpointValue({
    base: "95%", // iPhone (mobile)
    sm: "85%", // Small tablets
    md: "70%", // iPad/tablets
    lg: "46%", // Desktop/laptop (original size)
  });

  // Adjust top margin for smaller screens
  const marginTop = useBreakpointValue({
    base: "65px",
    md: "75px",
  });

  // Responsive card padding
  const cardPadding = useBreakpointValue({
    base: "10px",
    md: "15px",
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetchAllPosts();
        setAllPost(response.data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <VStack>
        <Container
          mt={1}
          maxW={containerWidth}
          bg={"#eef2f3"}
          borderRadius={"25px"}
          border={"1px solid #E4E0E1"}
          boxShadow={"lg"}
          marginTop={marginTop}
          position={"fixed"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={10}
          overflowY="auto"
          mx="auto" // Center container on all screen sizes
        >
          <Container mt={10} maxW={"container.md"} height="100vh">
            <SimpleGrid
              columns={1}
              spacing={useBreakpointValue({ base: 2, md: 4 })}
            >
              <Card
                onClick={onOpen}
                h={useBreakpointValue({ base: "50px", md: "57px" })}
                borderRadius="20px"
                boxShadow={"lg"}
                display="flex"
                alignItems="left"
                justifyContent="center"
                px={cardPadding}
                cursor={"pointer"}
              >
                <CardBody display="flex" alignItems="center">
                  <Avatar
                    size={useBreakpointValue({ base: "xs", md: "sm" })}
                    style={{ marginRight: "10px" }}
                  />
                  <Text
                    color={"gray.500"}
                    fontSize={useBreakpointValue({ base: "sm", md: "md" })}
                  >
                    Share your moment
                  </Text>
                </CardBody>
              </Card>

              {/* Reverse array so latest posts are at the top */}
              {[...allPost].reverse().map((post) => (
                <Postbox key={post._id} post={post} />
              ))}
            </SimpleGrid>
            <CreateModal isOpen={isOpen} onClose={onClose} />
          </Container>
        </Container>
      </VStack>
    </>
  );
};

export default Feeds;

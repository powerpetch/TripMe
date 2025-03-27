import {
  Container,
  Flex,
  Text,
  Heading,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Box,
  Image,
  Divider,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { getTopPost } from "../api";

const TopPost = () => {
  const [topPost, setTopPost] = useState([]);

  useEffect(() => {
    const fetchTopPost = async () => {
      try {
        const response = await getTopPost();
        console.log("Full API Response:", response);
        if (!response.success) {
          alert("Error getting top posts");
          return;
        }
        setTopPost(response.data);
      } catch (error) {
        console.log("API Fetch Error:", error);
      }
    };

    fetchTopPost();
  }, []);

  const sortedPosts = [...topPost].sort(
    (a, b) => b.likebyLength - a.likebyLength
  );

  return (
    <Container
      position="fixed"
      top={{ base: "10%", md: "40%" }}
      right={{ base: "10px", md: "20px" }}
      transform="translateY(-50%)"
      w={{ base: "90%", sm: "80%", md: "320px" }} // Adjust width on different screens
      maxH="420px"
      bgColor={"transparent"}
      borderRadius="lg"
      p={4}
      zIndex="1000"
    >
      <Box
        bg="#73A285"
        color="white"
        textAlign="center"
        p={2}
        borderRadius="md"
        mb={3}
      >
        <Heading as="h3" size="md">
          🔥 Top Posts
        </Heading>
      </Box>

      <Divider borderColor="#166534" mb={3} />

      {sortedPosts.length === 0 ? (
        <Text textAlign="center" color="gray.500">
          No top posts available
        </Text>
      ) : (
        sortedPosts.map((top, index) => (
          <Popover key={top._id} placement="bottom-start">
            <PopoverTrigger>
              <Box
                padding="12px"
                backgroundColor="white"
                borderRadius="8px"
                marginBottom="12px"
                boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                cursor="pointer"
                transition="all 0.3s ease"
                _hover={{
                  boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
                  transform: "scale(1.05)",
                }}
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <Text
                    fontWeight="bold"
                    color="#166534"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    {top.country}
                  </Text>
                  <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">
                    {top.name}
                  </Text>
                </Flex>
                <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500">
                  #{index + 1}
                </Text>
                <Flex alignItems="center" mt={2}>
                  <Icon
                    as={FcLike}
                    color="#166534"
                    boxSize={{ base: 3, md: 4 }}
                    mr={2}
                  />
                  <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">
                    {top.likebyLength} Likes
                  </Text>
                </Flex>
              </Box>
            </PopoverTrigger>
            <PopoverContent
              borderRadius="md"
              border={"none"}
              boxShadow="lg"
              bg="white"
              width={{ base: "90%", sm: "80%", md: "260px" }} // Adjust width on different screens
            >
              <PopoverArrow />
              <PopoverBody>
                <Flex direction="column" alignItems="flex-start">
                  <Text
                    color="gray.600"
                    fontSize={{ base: "xs", md: "sm" }}
                    mb={3}
                  >
                    {top.country}
                  </Text>
                  <Text
                    color="gray.800"
                    fontSize={{ base: "sm", md: "md" }}
                    mb={2}
                  >
                    {top.content}
                  </Text>
                  {top.image && (
                    <Image
                      src={top.image}
                      alt="Post Image"
                      borderRadius="md"
                      boxSize={{ base: "150px", md: "200px" }} // Adjust image size for responsiveness
                      objectFit="cover"
                      mb={3}
                    />
                  )}
                  <Flex alignItems="center" mt={3}>
                    <Icon
                      as={FcLike}
                      color="#166534"
                      boxSize={{ base: 4, md: 5 }}
                      mr={2}
                    />
                    <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">
                      {top.likebyLength} Likes
                    </Text>
                  </Flex>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        ))
      )}
    </Container>
  );
};

export default TopPost;

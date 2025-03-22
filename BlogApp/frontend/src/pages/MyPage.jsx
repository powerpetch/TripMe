import { useEffect, useState } from "react";
import { deletePost, fetchMyPost } from "../api";
import {
  Container,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import Postbox from "../component/Postbox";
import CreateModal from "../component/CreateModal";
import Profile from "../component/Profile";

const MyPage = () => {
  const [myPost, setMyPost] = useState([]);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Responsive values
  const containerMaxWidth = useBreakpointValue({
    base: "95%",
    sm: "90%",
    md: "70%",
    lg: "46%",
  });

  const containerPosition = useBreakpointValue({
    base: "relative",
    md: "fixed",
  });

  const containerMarginTop = useBreakpointValue({
    base: "65px",
    md: "75px",
  });

  const innerMarginTop = useBreakpointValue({
    base: 4,
    md: 10,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetchMyPost();
        console.log(response);
        setMyPost(response.data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (postID) => {
    try {
      const response = await deletePost(postID);
      setMyPost((newPost) => newPost.filter((post) => post._id !== postID));
      console.log(response.status);

      toast({
        title: "",
        description: response.message,
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "error",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Profile />
      <Container
        mt={1}
        maxW={containerMaxWidth}
        bg={"#eef2f3"}
        borderRadius={"15px"}
        border={"1px solid #E4E0E1"}
        boxShadow={"lg"}
        marginTop={containerMarginTop}
        position={containerPosition}
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={10}
        overflowY="auto"
        mx="auto" // Center on mobile
        height={containerPosition === "relative" ? "auto" : "auto"}
        pb={4} // Add padding at bottom for mobile
      >
        <Container
          mt={innerMarginTop}
          maxW={"container.md"}
          height={containerPosition === "fixed" ? "100vh" : "auto"}
          px={{ base: 2, md: 4 }}
        >
          <SimpleGrid columns={1} spacing={{ base: 3, md: 4 }}>
            {[...myPost].reverse().map((post) => (
              <Postbox
                key={post._id}
                post={post}
                onDelete={() => handleDelete(post._id)}
              />
            ))}
          </SimpleGrid>
          {myPost.length === 0 && (
            <Text
              fontSize={"lg"}
              align={"center"}
              color={"blue.700"}
              onClick={onOpen}
              cursor={"pointer"}
              my={4}
            >
              Make some post!!!
            </Text>
          )}
        </Container>
      </Container>
      <CreateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default MyPage;

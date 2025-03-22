import { useEffect, useState } from "react";
import { deletePost, fetchMyPost } from "../api";
import {
  Container,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Postbox from "../component/Postbox";
import CreateModal from "../component/CreateModal";
const MyPage = () => {
  const [myPost, setMyPost] = useState([]);

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetchMyPost("cheng");
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
      <Container
        mt={10}
        maxW={"40%"}
        bg={"white"}
        borderRadius={"10px"}
        border={"1px solid #E4E0E1"}
        boxShadow={"lg"}
        marginTop={"75px"}
        position={"fixed"} // Fix the container's position
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={10}
        overflowY={"auto"}
        sx={{
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        <Container
          mt={10}
          maxW={"container.md"}
          height="100vh" // Make sure the height is full for scrolling content
        >
          <SimpleGrid columns={1}>
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

import { useEffect, useState } from "react";
import { fetchAllPosts } from "../api";
import {
  Card,
  CardBody,
  Container,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import Postbox from "../component/Postbox";
import CreateModal from "../component/CreateModal";
import { MdOutlineAccountCircle } from "react-icons/md";
import Profile from "../component/Profile";
// import { CreateModal } from "../component/CreateModal.jsx";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [allPost, setAllPost] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetchAllPosts();
        console.log(response.data.posts);
        setAllPost(response.data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
    <Profile />
      <VStack>
        <Container
          mt={1}
          maxW={"50%"}
          bg={"white"}
          borderRadius={"10px"}
          border={"1px solid #E4E0E1"}
          boxShadow={"lg"}
          marginTop={"75px"}
          position={"fixed"} // Change to relative
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={10}
          overflowY="auto"
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
          <Container mt={10} maxW={"container.md"} height="100vh">
            <SimpleGrid columns={1}>
              {/* <div
                onClick={onOpen}
                style={{
                  width: "100%",
                  padding: "15px",
                  border: "1px solid #E4E0E1",
                  borderRadius: "20px",
                  backgroundColor: "white",
                  cursor: "text", // Makes it look like an input
                  fontSize: "16px",
                  color: "#666",
                  textAlign: "left",
                }}
              >
                Share your moment.
              </div> */}
              <Card
                onClick={onOpen}
                h="57px"
                borderRadius="20px"
                display="flex"
                alignItems="left"
                justifyContent="center" 
                px="15px" 
                cursor={"pointer"}
              >
                <CardBody display="flex" alignItems="center">
 
                  <MdOutlineAccountCircle
                    size="30px"
                    style={{ marginRight: "10px" }}
                  />
                  <Text color={"gray.500"}>Share your moment</Text>
                </CardBody>
              </Card>

              {/* กลับด้าน array โพสล่าสุดอยู่ข้างบน */}
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

export default Home;

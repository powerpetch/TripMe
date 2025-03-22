import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useLocation } from "react-router";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegCommentDots } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { MdOutlineAccountCircle } from "react-icons/md";
import CommentModal from "./commentModal";
import { formatDistanceToNow } from "date-fns";
import { getLike, likePost } from "../api";
import { useState } from "react";

const Postbox = ({ post, onDelete }) => {
  const location = useLocation();
  const isMyPage = location.pathname === "/mypage";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [countLike, setCountLike] = useState(0);
  const handleLike = async () => {
    try {
      const response = await likePost(post._id);

      if(response.success){
        setCountLike((prevLikes) => prevLikes + 1)
      }

      console.log(response);
    } catch (error) {
      alert(`Error liking post on react ${error}`);
    }
  };

  useState(() => {
    const fetchLikes = async () => {
      try {
        const response = await getLike(post._id);
        let countLike = response.data;
        setCountLike(countLike);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLikes();
  }, [post._id]);
  return (
    <Box>
      <Card size="md" mb={4} borderRadius={"25px"} mt={5}>
        <CardHeader display="flex" alignItems="center" py="4">
          <MdOutlineAccountCircle size="30px" style={{ marginRight: "10px" }} />
          <Box ml="7px" width="100%">
            <Heading size="md">{post.country}</Heading>

            <Flex alignItems="center" width="100%" gap={"5px"}>
              <Text fontSize="13px" color="gray.500">
                by {post.name},
              </Text>
              <Text fontSize="13px" color="gray.500">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </Text>
            </Flex>
          </Box>
        </CardHeader>

        <CardBody ml={"40px"} py={"1"}>
          <Text>{post.content}</Text>
        </CardBody>
        {post.image && post.image !== "" && (
          <Flex justify="center" align="center" overflow="hidden">
            <Image
              src={post.image}
              alt="Post image"
              maxWidth="90%"
              maxHeight="400px"
              objectFit="contain"
              borderRadius="lg"
              mb={"20px"}
            />
          </Flex>
        )}

        {isMyPage && (
          <CardFooter display={"flex"} justifyContent={"flex-end"}>
            <Button
              borderRadius={"5px"}
              bgColor={"red.600"}
              color={"white"}
              mt={2}
              onClick={() => onDelete()}
            >
              <RiDeleteBin6Line size={"20px"} />
            </Button>
          </CardFooter>
        )}
        <ButtonGroup>
          <Button
            width={"50%"}
            bg="white"
            _hover={{ bg: "#f0f0f0" }}
            colorScheme="none"
            onClick={onOpen}
          >
            <FaRegCommentDots size={"15px"} color="black" />
          </Button>
          <Button
            width={"50%"}
            bg="white"
            _hover={{ bg: "#f0f0f0" }}
            colorScheme="none"
            onClick={handleLike}
          >
            <FcLike size={"15px"} />
            <Text color={"black"} fontSize={13} ml={3}>{countLike}</Text>
          </Button>
        </ButtonGroup>
      </Card>
      <CommentModal isOpen={isOpen} onClose={onClose} postid={post._id} />
    </Box>
  );
};

export default Postbox;

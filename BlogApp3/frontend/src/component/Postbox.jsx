import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Image,
  Text,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useLocation } from "react-router";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegCommentDots } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import CommentModal from "./commentModal";
import { formatDistanceToNow } from "date-fns";
import { getLike, likePost } from "../api";
import { useState, useEffect } from "react";

const Postbox = ({ post, onDelete }) => {
  // All hooks must be called at the top level of your component
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [countLike, setCountLike] = useState(0);

  // Move all useBreakpointValue calls to the top level
  const avatarSize = useBreakpointValue({ base: "xs", md: "sm" });
  const headingSize = useBreakpointValue({ base: "sm", md: "md" });
  const textSize = useBreakpointValue({ base: "12px", md: "13px" });
  const contentFontSize = useBreakpointValue({ base: "sm", md: "md" });
  const iconSize = useBreakpointValue({ base: "13px", md: "15px" });
  const deleteIconSize = useBreakpointValue({ base: "16px", md: "18px" });
  const cardMargin = useBreakpointValue({ base: "3", md: "5" });
  const cardBodyMargin = useBreakpointValue({ base: "20px", md: "40px" });
  const cardPadding = useBreakpointValue({ base: "3", md: "4" });
  const imageMaxHeight = useBreakpointValue({ base: "300px", md: "400px" });

  const isMyPage = location.pathname === "/mypage";

  const handleLike = async () => {
    try {
      const response = await likePost(post._id);

      if (response.success === "updated") {
        console.log(response);
        setCountLike(response.likes);
      }

      if (response.success === true) {
        setCountLike((prevLikes) => prevLikes + 1);
      }

      console.log(response);
    } catch (error) {
      alert(`Error liking post on react ${error}`);
    }
  };

  useEffect(() => {
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
    <>
      <Card
        size="md"
        mb={cardMargin}
        borderRadius={"15px"}
        mt={cardMargin}
        boxShadow={"md"}
        overflow="hidden"
      >
        <CardHeader
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          py={cardPadding}
        >
          <Flex alignItems="center" gap="10px">
            <Avatar name={post.name} size={avatarSize} />
            <Box>
              <Heading size={headingSize}>{post.country}</Heading>
              <Flex alignItems="center" gap="5px" mt="2">
                <Text fontSize={textSize} color="gray.500">
                  by {post.name},
                </Text>
                <Text fontSize={textSize} color="gray.500">
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </Text>
              </Flex>
            </Box>
          </Flex>

          {isMyPage && (
            <Button
              borderRadius="5px"
              bgColor="transparent"
              size="20px"
              onClick={() => onDelete()}
            >
              <RiDeleteBin6Line size={deleteIconSize} color="red" />
            </Button>
          )}
        </CardHeader>

        <CardBody ml={cardBodyMargin} py={"1"}>
          <Text fontSize={contentFontSize}>{post.content}</Text>
        </CardBody>

        {post.image && post.image !== "" && (
          <Flex justify="center" align="center" overflow="hidden">
            <Image
              src={post.image}
              alt="Post image"
              maxWidth="90%"
              maxHeight={imageMaxHeight}
              objectFit="contain"
              borderRadius="lg"
              mb={"20px"}
            />
          </Flex>
        )}

        <ButtonGroup>
          <Button
            width={"50%"}
            bg="white"
            transition="all 0.3s ease"
            _hover={{
              boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
              transform: "scale(1.05)",
            }}
            colorScheme="none"
            onClick={onOpen}
          >
            <FaRegCommentDots size={iconSize} color="black" />
          </Button>
          <Button
            width={"50%"}
            bg="white"
            transition="all 0.3s ease"
            _hover={{
              boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
              transform: "scale(1.05)",
            }}
            colorScheme="none"
            onClick={handleLike}
          >
            <FcLike size={iconSize} />
            <Text color={"black"} fontSize={textSize} ml={3}>
              {countLike}
            </Text>
          </Button>
        </ButtonGroup>
      </Card>
      <CommentModal isOpen={isOpen} onClose={onClose} postid={post._id} />
    </>
  );
};

export default Postbox;

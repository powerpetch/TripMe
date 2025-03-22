import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Avatar,
  Flex,
  Button,
  Input,
  ModalFooter,
  Text,
  Divider,
  Box,
} from "@chakra-ui/react";
import { addComment, getComments } from "../api";
import { BsSend } from "react-icons/bs";

const CommentsModal = ({ isOpen, onClose, postid }) => {
  const [commentInput, setCommentInput] = useState({
    content: "",
  });
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    const fetchAllComments = async () => {
      try {
        const response = await getComments(postid);
        if (response.success) {
          setAllComments(response.data.comments);
        }
      } catch (error) {
        console.log(error);
        alert("Error getting all comments");
      }
    };
    fetchAllComments();
  }, [postid]);

  const handleCommentSubmit = async () => {
    if (!commentInput.content.trim()) {
      alert("Please fill in the content field");
      return;
    }

    try {
      const response = await addComment(commentInput, postid);
      if (response.success) {
        setCommentInput({ content: "" });

        // เรียก คอมเม้นใหม่อีกรอบ
        const updatedComments = await getComments(postid);
        if (updatedComments.success) {
          setAllComments(updatedComments.data.comments);
        }
      } else {
        alert("Error adding comment");
      }
    } catch (error) {
      alert("Error adding comment");
      console.error("API Error:", error);
    }
  };

  //   ในโฮมเพจจะแมพ แต่ละโพส แต่ละโพส ก้จะมีคอมเม้นต

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Comment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {allComments.length > 0 ? (
            allComments.map((comment, index) => (
              <>
                <Box py={2}>
                  <Divider borderWidth="1px" borderColor="gray.300" my={4} />
                  <Flex key={index} mt={2} align="center" mb={2} gap={3}>
                    <Avatar size="sm" name={comment.user} />
                    <Text fontWeight="bold" color="gray.700">
                      {comment.user}
                    </Text>
                  </Flex>
                  <Text ml={12} color="gray.600">
                    {comment.content}
                  </Text>
                </Box>
              </>
            ))
          ) : (
            <Text>No comments yet.</Text>
          )}
        </ModalBody>
        <ModalFooter isCentered>
          <Flex mt={4} align="center">
            <Avatar size="sm" name={commentInput.user} />
            <Input
              placeholder="Add comment"
              ml={3}
              value={commentInput.content}
              onChange={(e) =>
                setCommentInput({ ...commentInput, content: e.target.value })
              }
              size="sm"
            />
            <Button
              size="sm"
              ml={2}
              onClick={handleCommentSubmit}
              isDisabled={!commentInput.content.trim()}
            >
              <BsSend size={"20px"} />
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CommentsModal;

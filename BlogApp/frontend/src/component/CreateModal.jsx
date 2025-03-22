import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaImage } from "react-icons/fa6";
import { createPost } from "../api";
import { Link } from "react-router";

const CreateModal = ({ isOpen, onClose }) => {
  const [newPost, setNewPost] = useState({
    country: "",
    content: "",
    image: "",
  });

  const toast = useToast();
  const fileInputRef = useRef(null);

  const handleSubmit = async () => {
    if (!newPost.country || !newPost.content) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("country", newPost.country);
    formData.append("content", newPost.content);

    if (newPost.image) {
      formData.append("image", newPost.image);
    }

    try {
      const response = await createPost(formData);

      if (response.success) {
        toast({
          title: "Success",
          description: response.message,
          status: "success",
          isClosable: true,
        });
        onClose;
      } else {
        toast({
          title: "Error",
          description: response.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Unexpected error??",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"lg"} >
      <ModalOverlay
        bg="rgba(0, 0, 0, 0.4)"
        style={{
          backdropFilter: "blur(10px)",
        }}
      />
      <ModalContent maxW={"40%"}>
        <ModalHeader>Share your moment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Country"
            mb={4}
            value={newPost.country}
            onChange={(e) => setNewPost({ ...newPost, country: e.target.value })}
          />
          <Textarea
          height={"150px"}
          size={"lg"}
            placeholder="How is your trip?"
            value={newPost.content}
            onChange={(e) =>
              setNewPost({ ...newPost, content: e.target.value })
            }
          />
          <Button
          mt={"10px"}
            leftIcon={<FaImage size={"20px"} />}
            variant="outline"
            colorScheme="teal"
            size="md"
            onClick={() => fileInputRef.current.click()}
            border={"0"}
          >
          </Button>
          <Input
            type="file"
            onChange={(e) =>
              setNewPost({ ...newPost, image: e.target.files[0] })
            }
            display="none" // Hide the default file input
            ref={fileInputRef}
          />
        </ModalBody>

        <ModalFooter>
          <Link to={"/mypage"}>
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </Link>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateModal;

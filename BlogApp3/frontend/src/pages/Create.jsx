import {
  Box,
  Button,
  Container,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { VscOctoface } from "react-icons/vsc";
import { FaImage } from "react-icons/fa6";

import { createPost } from "../api";
import { Link } from "react-router";

const Create = () => {
  const [newPost, setNewPost] = useState({
    name: "",
    content: "",
    image: "",
  });

  const toast = useToast();
  const fileInputRef = useRef(null);

  const handleSubmit = async () => {
    if (!newPost.name || !newPost.content) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", newPost.name);
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
    <>
      <Container maxW={"container.sm"} mt={10}>
        <VStack spacing={8}>
          <Box
            w={"full"}
            bg={"grey.800"}
            p={6}
            rounded={"lg"}
            shadow={"lg"}
            gap={4}
            bgColor={"white"}
            padding={"50px"}
          >
            <VStack spacing={4}>
              <VscOctoface size={"40px"} />

              <Input
                placeholder="Post as who?"
                value={newPost.name}
                onChange={(e) =>
                  setNewPost({ ...newPost, name: e.target.value })
                }
              />
              <Input
                placeholder="Whats on your mind?"
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
              />
              <Button
                leftIcon={<FaImage />}
                variant="outline"
                colorScheme="teal"
                size="md"
                onClick={() => fileInputRef.current.click()}
              >
                Upload Image
              </Button>
              <Input
                type="file"
                onChange={(e) =>
                  setNewPost({ ...newPost, image: e.target.files[0] })
                }
                display="none" // Hide the default file input
                ref={fileInputRef}
              />
              <Link to={"/mypage"}>
                <Button
                  colorScheme="teal"
                  variant="outline"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </Button>
              </Link>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default Create;

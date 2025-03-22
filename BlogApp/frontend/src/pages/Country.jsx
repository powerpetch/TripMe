import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { getPlan } from "../api";
import PlanModel from "../component/PlanModel";
import { FaEarthAmericas } from "react-icons/fa6";
import { MdAutoAwesome } from "react-icons/md";

const Country = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [prompt, setPrompt] = useState({
    country: "",
    duration: "",
  });
  const [loading, setLoading] = useState(false);
  const [out, setOut] = useState([]);
  const toast = useToast();

  const handlePrompt = async () => {
    if (!prompt.country || !prompt.duration) {
      toast({
        title: "Incomplete fields",
        description: "Please fill in all fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    try {
      const response = await getPlan(prompt);
      //split each element by Day: num
      const output = response.data.response.split(/(?=Day \d+:)/);
      setOut(output);

      onClose();
      setLoading(false);
      if (response.success) {
        toast({
          title: "Plan fetched successfully",
          description: "Check the console for details",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: response.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Container
        mt={10}
        maxW={"container.md"}
        marginTop={"75px"}
        bg={"white"}
        borderRadius={"20px"}
        border={"1px solid #E4E0E1"}
        boxShadow={"lg"}
        position={"fixed"}
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={10}
        display={"flex"}
        justifyContent={"center"}
        overflow={"auto"}
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
        {out.length === 0 && (
          <Container
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <VStack spacing={8} align="center">
              <Text color="#7f858b" fontSize={"20px"}>
                Let AI plan your trip
              </Text>
              <Button
                onClick={onOpen}
                variant="unstyled"
                display="inline-flex"
                borderRadius="full" // This makes the button circular
                bg="white"
                boxShadow="lg"
                mt={5}
                w={"200px"}
                h={"200px"}
              >
                <MdAutoAwesome
                  size="70px"
                  style={{
                    fill: "url(#gradient)", // Apply the gradient as a fill
                  }}
                />
                <svg style={{ position: "absolute" }}>
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#ff7e5f" />
                      <stop offset="100%" stopColor="#feb47b" />
                    </linearGradient>
                  </defs>
                </svg>
              </Button>
            </VStack>
          </Container>
        )}
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader display={"flex"} alignItems={"center"}>
              Easy trip...
              <FaEarthAmericas />
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Input
                  ref={initialRef}
                  onChange={(e) =>
                    setPrompt({ ...prompt, country: e.target.value })
                  }
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>How long?</FormLabel>
                <Input
                  onChange={(e) =>
                    setPrompt({ ...prompt, duration: e.target.value })
                  }
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="teal"
                mr={3}
                onClick={handlePrompt}
                isLoading={loading}
                loadingText="Fetching Plan"
              >
                Get plan!!
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <VStack>
          {out.map((day, index) => (
            <PlanModel key={index} response={day} />
          ))}
        </VStack>
      </Container>
    </>
  );
};

export default Country;

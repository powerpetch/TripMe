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
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
  VStack,
  Box,
  Heading,
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
  const [out, setOut] = useState([]); // The AI output lines
  const toast = useToast();

  // Same function used by both the modal and the top bar
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
      // Split the big string by "Day X:" lines
      const output = response.data.response.split(/(?=Day \d+:)/);
      setOut(output);

      // If we came from the modal, close it
      onClose();
      setLoading(false);

      if (response.success) {
        toast({
          title: "Plan fetched successfully",
          description: "AI plan is shown below",
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
      flexDirection="column"
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
      p={4}
    >
      {out.length > 0 && (
        <Box mb={6} p={4} borderRadius="lg" boxShadow="sm" bg="gray.50">
          <Heading size="md" color="teal.600" mb={4}>
            Generate Another Plan
          </Heading>
          <VStack spacing={4}>
            <Input
              placeholder="Country (e.g., Japan)"
              value={prompt.country}
              onChange={(e) => setPrompt({ ...prompt, country: e.target.value })}
              size="lg"
              bg="white"
            />
            <Input
              placeholder="Duration (e.g., 7 days)"
              value={prompt.duration}
              onChange={(e) => setPrompt({ ...prompt, duration: e.target.value })}
              size="lg"
              bg="white"
            />
            <Button
              colorScheme="teal"
              onClick={handlePrompt}
              isLoading={loading}
              loadingText="Generating"
              width="full"
              size="lg"
            >
              Get Plan
            </Button>
          </VStack>
        </Box>
      )}

      {out.length === 0 && (
        <Container
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <VStack spacing={8} align="center">
            <Text color="#7f858b" fontSize={"24px"} fontWeight="bold">
              Let AI plan your trip
            </Text>
            <Button
              onClick={onOpen}
              variant="unstyled"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="full"
              bg="white"
              boxShadow="lg"
              w={"200px"}
              h={"200px"}
              _hover={{ transform: "scale(1.05)" }}
              transition="transform 0.2s"
            >
              <MdAutoAwesome
                size="70px"
                style={{
                  fill: "url(#gradient)",
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
        isCentered
        size={{ base: "sm", md: "md" }}
      >
        <ModalOverlay />
        <ModalContent
          mx={{ base: 4, md: 0 }}
          w={{ base: "auto", md: "md" }}
          maxW={{ base: "90%", md: "md" }}
          borderRadius="md"
        >
          <ModalHeader display="flex" alignItems="center" gap={2}>
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
              size={{ base: "sm", md: "md" }}
            >
              Get plan!!
            </Button>
            <Button onClick={onClose} size={{ base: "sm", md: "md" }}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={4}>
        {Array.isArray(out) &&
          out.length > 0 &&
          out
            .filter((day) => day.trim() !== "" && day !== "\n")
            .map((day, index) => <PlanModel key={index} response={day} />)}
      </SimpleGrid>
    </Container>
  );
};

export default Country;

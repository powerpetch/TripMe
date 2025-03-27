import {
  Box,
  Container,
  Input,
  InputGroup,
  InputLeftAddon,
  SimpleGrid,
  useBreakpointValue,
  VStack,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import PublicProfile from "../component/PublicProfile";

const Search = () => {
  const iconSize = useBreakpointValue({
    base: "18px",
    sm: "20px",
    md: "23px",
  });

  const containerWidth = useBreakpointValue({
    base: "95%", // iPhone (mobile)
    sm: "85%", // Small tablets
    md: "70%", // iPad/tablets
    lg: "46%", // Desktop/laptop (original size)
  });

  // Adjust top margin for smaller screens
  const marginTop = useBreakpointValue({
    base: "65px",
    md: "75px",
  });

  const [user, setUser] = useState("");
  const [searchUser, setSearchUser] = useState(null);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchUser(user);
    }
  };

  return (
    <>
      <VStack spacing={4}>
        <Container
          position={"fixed"}
          top={0}
          left={0}
          right={0}
          zIndex={10}
          mt={1}
          maxW={containerWidth}
          bg={"#eef2f3"}
          borderRadius={"25px"}
          border={"1px solid #E4E0E1"}
          boxShadow={"lg"}
          marginTop={marginTop}
          mx="auto"
          p={5}
          maxHeight="90vh"
          overflowY="auto"
        >
          <SimpleGrid
            columns={1}
            spacing={useBreakpointValue({ base: 2, md: 4 })}
          >
            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <InputGroup
                borderRadius="50px"
                boxShadow="md"
                _hover={{ boxShadow: "lg" }}
                _focusWithin={{ boxShadow: "lg", borderColor: "teal.500" }}
                maxWidth="400px"
                width="100%"
              >
                <InputLeftAddon
                  borderRadius="50px 0 0 50px"
                  backgroundColor="#F7FAFC"
                >
                  <IoMdSearch
                    size={iconSize}
                    style={{
                      strokeWidth: "1",
                      color: "#4FD1C5",
                    }}
                  />
                </InputLeftAddon>
                <Input
                  type="text"
                  placeholder="Search for a user..."
                  onChange={(e) => setUser(e.target.value)}
                  onKeyDown={(e) => {
                    handleSearch(e);
                  }}
                  borderRadius="0 50px 50px 0"
                  paddingLeft="10px"
                  paddingRight="10px"
                  fontSize="lg"
                  borderColor="#E2E8F0"
                  _focus={{ borderColor: "teal.500" }}
                  _placeholder={{ color: "#A0AEC0" }}
                />
              </InputGroup>
            </Box>

            {searchUser && (
              <Box width="100%">
                <Center>
                  <PublicProfile username={searchUser} />
                </Center>
              </Box>
            )}
          </SimpleGrid>
        </Container>
      </VStack>
    </>
  );
};

export default Search;

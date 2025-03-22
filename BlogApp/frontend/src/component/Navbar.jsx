import {
  Box,
  ButtonGroup,
  Button,
  useDisclosure,
  Image,
  HStack,
} from "@chakra-ui/react";
import { Link, useLocation, } from "react-router-dom";
import CreateModal from "./CreateModal";
import { IoHome } from "react-icons/io5";
import { IoPersonSharp } from "react-icons/io5";
import { CiSquarePlus } from "react-icons/ci";
import { RiRobot3Line } from "react-icons/ri";
import logo from "../images/new-logo-green.png";

const Navbar = () => {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogoClick = () => {
    window.location.href = 'http://localhost:3000';
  };

  return (
    <HStack
      bg={"white"}
      width="100%"
      height="55px"
      padding="10px"
      boxShadow={"lg"}
      position="fixed"
      top="0"
      left="0"
      zIndex="10"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      
      <Box
        position={"absolute"}
        left="10px"
        cursor="pointer" 
        onClick={handleLogoClick}
      >
        <Image 
          src={logo} 
          objectFit={"contain"} 
          w={"50%"} 
          fill={"#166534"} 
          ml={"50px"}
        />
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        flexGrow="1"
        mb={"30px"}
      >
        <ButtonGroup gap="7" mt={10} flexDirection="row" alignItems="center" spacing={"90px"}>
          <Link to={"/"}>
            <Button
              color={location.pathname === "/" ? "white" : "#166534"}
              bg={location.pathname === "/" ? "#166534" : "transparent"}
              // color={"#166534"}
              variant={"ghost"}
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                _hover: {
                  bg: "#d1d1d1", // Lighter hover effect color
                  boxShadow: "lg",
                },
              }}
            >
              <IoHome size={"23px"} />
            </Button>
          </Link>
          <Link to={"/mypage"}>
            <Button
              color={location.pathname === "/mypage" ? "white" : "#166534"}
              bg={location.pathname === "/mypage" ? "#166534" : "transparent"}
              variant={"ghost"}
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                _hover: {
                  bg: "#d1d1d1", // Lighter hover effect color
                  boxShadow: "lg",
                },
              }}
            >
              <IoPersonSharp size={"23px"} />
            </Button>
          </Link>

          <Link to={"/country"}>
            <Button
              color={location.pathname === "/country" ? "white" : "#166534"}
              bg={location.pathname === "/country" ? "#166534" : "transparent"}
              variant={"ghost"}
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                _hover: {
                  bg: "#d1d1d1", // Lighter hover effect color
                  boxShadow: "lg",
                },
              }}
            >
              <RiRobot3Line size={"23px"} />
            </Button>
          </Link>
          <Button
            variant={"ghost"}
            color={"#166534"}
            width="100%"
            onClick={onOpen}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              _hover: {
                bg: "#d1d1d1",
                boxShadow: "lg",
              },
            }}
          >
            <CiSquarePlus
              size={"23px"}
              style={{
                strokeWidth: "1",
              }}
            />
          </Button>
        </ButtonGroup>
      </Box>
      <CreateModal isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
};

export default Navbar;

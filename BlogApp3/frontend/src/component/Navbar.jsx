import {
  Box,
  ButtonGroup,
  Button,
  useDisclosure,
  Image,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import CreateModal from "./CreateModal";
import { IoHome } from "react-icons/io5";
import { IoPersonSharp } from "react-icons/io5";
import { CiSquarePlus } from "react-icons/ci";
import { RiRobot3Line } from "react-icons/ri";
import logo from "../images/new-logo-green.png";
import { IoMdSearch } from "react-icons/io";

const Navbar = () => {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const tripMe = () => {
    window.location.href = "http://localhost:3000/";
  };

  const iconSize = useBreakpointValue({
    base: "18px",    // Mobile
    sm: "20px",      // Tablet
    md: "22px",      // iPad/Small laptop
    lg: "23px",      // Desktop
    xl: "24px"       // Large screens
  });
  const buttonSpacing = useBreakpointValue({
    base: "2",
    sm: "4",
    md: "5",
    lg: "6",
    xl: "7"
  });
  const groupSpacing = useBreakpointValue({
    base: "10px",
    sm: "30px",
    md: "50px",
    lg: "70px",
    xl: "90px"
  });
  const logoWidth = useBreakpointValue({
    base: "30%",
    sm: "35%",
    md: "40%",
    lg: "45%",
    xl: "50%"
  });
  const logoMargin = useBreakpointValue({
    base: "10px",
    sm: "20px",
    md: "35px",
    lg: "40px",
    xl: "50px"
  });
  

  const logoDisplay = useBreakpointValue({
    base: "none",
    sm: "none",
    md: "none",
    lg: "block",
  });

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
        onClick={tripMe}
        style={{ cursor: "pointer" }}
        display={logoDisplay} 
      >
        <Image
          src={logo}
          objectFit={"contain"}
          w={logoWidth}
          fill={"#166534"}
          ml={logoMargin}
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
        <ButtonGroup
          gap={buttonSpacing}
          mt={10}
          flexDirection="row"
          alignItems="center"
          spacing={groupSpacing}
        >
          <Link to={"/"}>
            <Button
              color={"#166534"}
              variant={"ghost"}
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                _hover: {
                  bg: "#d1d1d1", 
                  boxShadow: "lg",
                },
                borderBottom:
                  location.pathname === "/" ? "2px solid #166534" : "none", 
              }}
            >
              <IoHome size={iconSize} />
            </Button>
          </Link>
          <Link to={"/mypage"}>
            <Button
              color={"#166534"}
              variant={"ghost"}
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                _hover: {
                  bg: "#d1d1d1",
                  boxShadow: "lg",
                },
                borderBottom:
                  location.pathname === "/mypage"
                    ? "2px solid #166534"
                    : "none", 
              }}
            >
              <IoPersonSharp size={iconSize} />
            </Button>
          </Link>
          <Link to={"/country"}>
            <Button
              color={"#166534"}
              variant={"ghost"}
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                _hover: {
                  bg: "#d1d1d1", 
                  boxShadow: "lg",
                },
                borderBottom:
                  location.pathname === "/country"
                    ? "2px solid #166534"
                    : "none", 
              }}
            >
              <RiRobot3Line size={iconSize} />
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
              size={iconSize}
              style={{
                strokeWidth: "1",
              }}
            />
          </Button>
          <Link to={"/search"}>
            <Button
              variant={"ghost"}
              color={"#166534"}
              width="100%"
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
              <IoMdSearch
                size={iconSize}
                style={{
                  strokeWidth: "1",
                }}
              />
            </Button>
          </Link>
        </ButtonGroup>
      </Box>
      <CreateModal isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
};

export default Navbar;

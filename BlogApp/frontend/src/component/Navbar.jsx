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

const Navbar = () => {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const tripMe = () => {
    window.location.href = "http://localhost:3000/";
  };

  // Responsive values based on screen size
  const iconSize = useBreakpointValue({ base: "18px", sm: "20px", md: "23px" });
  const buttonSpacing = useBreakpointValue({ base: "4", sm: "5", md: "7" });
  const groupSpacing = useBreakpointValue({
    base: "30px",
    sm: "60px",
    md: "90px",
  });
  const logoWidth = useBreakpointValue({ base: "40%", sm: "45%", md: "50%" });
  const logoMargin = useBreakpointValue({
    base: "20px",
    sm: "35px",
    md: "50px",
  });

  // Control logo visibility - hidden on mobile, visible on sm and above
  const logoDisplay = useBreakpointValue({ base: "none", sm: "block" });

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
        display={logoDisplay} // Hide on mobile, show on tablet and up
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
                  bg: "#d1d1d1", // Lighter hover effect color
                  boxShadow: "lg",
                },
                borderBottom:
                  location.pathname === "/" ? "2px solid #166534" : "none", // Green bottom border
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
                  bg: "#d1d1d1", // Lighter hover effect color
                  boxShadow: "lg",
                },
                borderBottom:
                  location.pathname === "/mypage"
                    ? "2px solid #166534"
                    : "none", // Green bottom border
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
                  bg: "#d1d1d1", // Lighter hover effect color
                  boxShadow: "lg",
                },
                borderBottom:
                  location.pathname === "/country"
                    ? "2px solid #166534"
                    : "none", // Green bottom border
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
        </ButtonGroup>
      </Box>
      <CreateModal isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
};

export default Navbar;

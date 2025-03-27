import {
  Avatar,
  Box,
  Divider,
  Flex,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getUser } from "../api";

const Profile = () => {
  const [user, setUser] = useState({});

  // Responsive values
  const boxWidth = useBreakpointValue({ base: "95%", sm: "260px" });
  const boxMargin = useBreakpointValue({ base: "0 auto", sm: "0 0 0 10px" });
  const boxHeight = useBreakpointValue({ base: "80px", sm: "100px" });
  const flexPadding = useBreakpointValue({ base: "0 15px", sm: "0 0 0 20px" }); // Increased left padding
  const avatarSize = useBreakpointValue({ base: "sm", sm: "md" });
  const fontSize = useBreakpointValue({ base: "lg", sm: "xl" });

  const toMyPage = () => {
    window.location.href = "http://localhost:5173/mypage";
  };

  const toMyProfile = () => {
    window.location.href = "http://localhost:3000/profile";
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUser();
        setUser(response.profile);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <Box
      margin={boxMargin}
      mt={6}
      alignContent={"center"}
      height={boxHeight}
      boxShadow={"md"}
      bg={"#F8F6F4"}
      borderRadius={30}
      w={boxWidth}
      transition="all 0.3s ease"
      ml={5}
    >
      <Flex
        p={flexPadding}
        pl={useBreakpointValue({ base: "20px", sm: "25px" })} // Additional left padding
        align="center"
        justify="start"
        direction="row"
        gap={useBreakpointValue({ base: 2, sm: 4 })}
        height="100%"
      >
        <Avatar name={user.avatar} size={avatarSize} />
        <Text
          fontSize={fontSize}
          fontWeight="bold"
          onClick={toMyProfile}
          sx={{ cursor: "pointer" }}
        >
          {user.username}
        </Text>
        <Divider
          orientation="vertical"
          height={useBreakpointValue({ base: "10px", sm: "13px" })}
          borderWidth="0.7px"
          borderColor="gray.800"
        />
        <Text
          fontSize={useBreakpointValue({ base: "xs", sm: "sm" })}
          color={"gray.600"}
          onClick={toMyPage}
          sx={{
            cursor: "pointer",
          }}
        >
          MyPost
        </Text>
      </Flex>
    </Box>
  );
};

export default Profile;

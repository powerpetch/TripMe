import { Avatar, Card, CardHeader, Text } from "@chakra-ui/react";
import { useState } from "react";
import { getUser } from "../api";

const Profile = () => {
  const [user, setUser] = useState([]);

  useState(() => {
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
    <Card boxSize={"19%"} ml={10} mt={7} borderRadius={"10px"} h={40}>
      <CardHeader
        display={"flex"}
        alignItems={"center"} 
        h="100%" 
        flexDirection="row" 
        ml={5}
      >
        <Avatar name={user.username} boxSize={"80px"} mb={2} />
        <Text ml={5}>{user.username}</Text>
      </CardHeader>
    </Card>
  );
};

export default Profile;

import { useEffect, useState } from "react";
import { findPostsByName, findUserByName } from "../api";
import { Text, Box, Heading, Avatar } from "@chakra-ui/react";
import Postbox from "./Postbox";

const PublicProfile = ({ username }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await findUserByName(username);
        if (!response.user || response.user.length === 0) {
          setUserNotFound(true);
        } else {
          setUser(response.user[0]);
        }
      } catch (error) {
        console.error(error);
        setUserNotFound(true);
      }
    };
    fetchUser();
  }, [username]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await findPostsByName(username);
        setPosts(response.data.posts);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };
    fetchPosts();
  }, [username]);

  if (userNotFound) {
    return (
      <Text fontSize="lg" color="red.500" textAlign="center">
        User not found
      </Text>
    );
  }

  return (
    <Box width="100%" p={0}>
      <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
        {/* Show avatar or fallback to username */}
        <Avatar name={user?.username} src={user?.avatar || undefined} />
      </Box>
      <Heading fontSize="2xl" color="black" mb={4} textAlign="center">
        {user?.username}
      </Heading>
      {error ? (
        <Text fontSize="md" color="red.500" textAlign="center">
          Error loading posts
        </Text>
      ) : (
        posts
          .slice()
          .reverse()
          .map((post) => <Postbox key={post._id} post={post} />)
      )}
    </Box>
  );
};

export default PublicProfile;

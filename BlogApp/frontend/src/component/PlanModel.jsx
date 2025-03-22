import { Box, Card, Container, Text } from "@chakra-ui/react";

const PlanModel = ({ response }) => {
  return (
    <div>
      <Box>
        <Card
          size="md"
          mb={4}
          boxShadow={"md"}
          mr={4}
          borderRadius={"25px"}
          mt={5}
        >
          <Container>
            <Text>{response}</Text>
          </Container>
        </Card>
      </Box>
    </div>
  );
};

export default PlanModel;

import { Box, Card, Text, Divider, Badge } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const PlanModel = ({ response }) => {
  const [plan, setPlan] = useState(response);

  useEffect(() => {
    if (response && response !== "") {
      localStorage.setItem("tripPlan", response);
      setPlan(response);
    } else {
      const savedPlan = localStorage.getItem("tripPlan");
      if (savedPlan) setPlan(savedPlan);
    }
  }, [response]);

  const planArray = plan?.split(/(?=Day \d+:)/) || [];

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" gap={8} mt={10}>
      {planArray.map((dayPlan, index) => (
        <Card
          key={index}
          boxShadow="md"
          borderRadius="15px"
          p={4}
          bgGradient="linear(to-r, teal.50, cyan.50)"
          maxW="300px"
          minH="150px"
        >
          <Badge bgColor="transparent" fontSize="sm" mb={3}>
            {dayPlan.match(/Day \d+/) || `Day ${index + 1}`}
          </Badge>
          <Divider mb={3} borderColor="teal.200" />
          <Text fontSize="md" color="gray.700" fontWeight="medium">
            {dayPlan.replace(/Day \d+:/, "").trim() || "No details available"}
          </Text>
        </Card>
      ))}
    </Box>
  );
};

export default PlanModel;

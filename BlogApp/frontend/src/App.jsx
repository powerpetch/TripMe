import { Box, ChakraProvider } from "@chakra-ui/react";
import Navbar from "./component/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Create from "./pages/Create.jsx";
import MyPage from "./pages/MyPage.jsx";
import Country from "./pages/Country.jsx";

function App() {
  const location = window.location.href;

  return (
    <ChakraProvider >
      <Box
        bgColor={"#efefef"}
        bgSize="cover"
        bgPosition="center"
        minHeight="100vh"
      >
        <Box >
          <Navbar location={location}/>
        </Box>

        <Box pt="80px">
          <Routes>
            <Route path="/country" element={<Country />} />
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;

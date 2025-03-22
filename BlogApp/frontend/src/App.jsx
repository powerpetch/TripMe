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
    <ChakraProvider>
      <Box
        sx={{
          backgroundImage: `linear-gradient(to top left, #8e9eab, #eef2f3), repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0px, rgba(0, 0, 0, 0.1) 10px, rgba(0, 0, 0, 0.05) 10px, rgba(0, 0, 0, 0.05) 20px)`,
          backgroundSize: "cover, 100px 100px", // Background grid size adjusted for more visibility
          minHeight: "100vh",
          animation: "moveWave 15s linear infinite", // Adjusted animation speed for more visibility
        }}
      >
        <Box>
          <Navbar location={location} />
        </Box>

        <Box pt="80px">
          <Routes>
            <Route path="/country" element={<Country />} />
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </Box>

        <style>
          {`
      @keyframes moveWave {
        0% {
          background-position: 0 0;
        }
        50% {
          background-position: 100% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
    `}
        </style>
      </Box>
    </ChakraProvider>
  );
}

export default App;

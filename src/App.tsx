import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import PostcodesPage from "./pages/PostcodesPage";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserProvider } from "./context/useAuth";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<PostcodesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

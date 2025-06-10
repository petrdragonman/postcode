import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import PostcodesPage from "./pages/PostcodesPage";
import { BrowserRouter, Route, Routes } from "react-router";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PostcodesPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

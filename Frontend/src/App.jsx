import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import AuthContextProvider from "./context/AuthContextProvider";
import Layout from './components/Layout';
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Layout><LoginPage /></Layout>} />
            <Route path="/home" element={<PrivateRoute><Layout><HomePage /></Layout></PrivateRoute>} />
            {/* <Route path="/history" element={<PrivateRoute><Layout><HistoryPage /></Layout></PrivateRoute>} /> */}
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;

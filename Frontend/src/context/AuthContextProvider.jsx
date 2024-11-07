import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { login, logout } from "../api/endpoint";
import { useNavigate } from "react-router-dom";
import { is_authenticate } from "../api/endpoint";

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state to prevent premature navigation
  const navigate = useNavigate();

  const loginUser = async (data) => {
    const response = await login(data);
    if (response.data.success) {
      setAuth(true);
    }
    return response;
  };

  const logoutUser = async () => {
    const response = await logout();
    if (response.data.success) {
      setAuth(false);
    }
    return response;
  };

  useEffect(() => {
    const validateToken = async () => {
      const accessToken = sessionStorage.getItem("access_token");
      console.log("Access Token Found:", accessToken); // Debugging log
      if (accessToken) {
        try {
          // Check with server if token is valid
          const isValid = await is_authenticate();
          console.log("Authentication Response:", isValid.data); // Debugging log

          if (isValid.data.success) {
            setAuth(true);
          } else {
            setAuth(false);
            sessionStorage.removeItem("access_token"); // Remove invalid token
          }
        } catch (error) {
          console.error("Error during authentication check:", error);
          setAuth(false);
          sessionStorage.removeItem("access_token"); // Remove token on error
        }
      } else {
        console.log("No token found, setting auth to false.");
        setAuth(false);
      }
      setLoading(false); // Finish loading after checking auth
    };

    validateToken();
  }, []);

  // Navigate to login if not authenticated and loading is done
  useEffect(() => {
    if (!loading && !auth) {
      console.log("Redirecting to login page.");
      navigate("/"); // Redirect to login only if not authenticated and loading is complete
    }
  }, [auth, loading, navigate]);

  return (
    <AuthContext.Provider value={{ auth, loginUser, logoutUser }}>
      {!loading && children} {/* Render children only if loading is false */}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

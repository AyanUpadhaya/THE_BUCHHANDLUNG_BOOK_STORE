import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useAuthCheck = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const { setUser } = useAuth();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("buchhandlung_auth");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Failed to retrieve user from localStorage:", error);
    } finally {
      setAuthChecked(true);
    }
  }, []);

  return authChecked;
};

export default useAuthCheck;

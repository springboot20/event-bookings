import { useContext } from "react";
import { AuthContextWrapper } from "../../context/auth/AuthContext";


export const useAuth = () => useContext(AuthContextWrapper);

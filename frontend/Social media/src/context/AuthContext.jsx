import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosCalls/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axiosInstance.get("/user/me");
                setUser(response.data);
            } catch (error) {
                console.log(error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user,setUser, loading, setLoading,}} >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
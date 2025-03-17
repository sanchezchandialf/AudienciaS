import { UserProfile } from '../models/user';
import React, { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/AuthService';
import toast from 'react-hot-toast';

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    logout: () => void;
    loginUser: (email: string, contraseña: string) => Promise<void>;
    isLoggedIn: () => boolean;
};
const UserContext = createContext<UserContextType>({} as UserContextType); 
export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
        }
        setIsReady(true);
    }, []);

    const loginUser = async (email: string, contraseña: string) => {
        try {
            const res = await login(email, contraseña);
            if (!res.token) {
                toast.error("Invalid credentials");
                return;
            }
            const userObj = res.usuario;
            localStorage.setItem("token", res.token);
            localStorage.setItem("user", JSON.stringify(userObj));
            setToken(res.token);
            setUser(userObj);
            toast.success("Login Success!");
            navigate("/estadisticas"); // Navegación directa
        } catch (error) {
            console.error("Error en la autentificación", error);
            toast.error("Server error occurred");
        }
    };

    const isLoggedIn = () => {
        return !!user;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
        navigate("/");
    };

    return (
        <UserContext.Provider
            value={{ loginUser, user, token, logout, isLoggedIn }}
        >
            {isReady ? children : <div>Loading...</div>}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);
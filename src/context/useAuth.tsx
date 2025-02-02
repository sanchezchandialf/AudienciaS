import { UserProfile, UserProfileToken } from '../models/user';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/AuthService';
import toast from 'react-hot-toast';
type UserContextType = {
    user: UserProfile | null;
    token : string | null;
    
    logout: () => void;
    loginUser: (email: string, contraseña: string) => Promise<void>;
    isLoggedIn: () => boolean;
};

type  Props = {children: React.ReactNode};

const UserContext = createContext<UserContextType>({} as UserContextType); 

export const UserProvider = ({children}: Props) => {
    const navigate = useNavigate();
    const  [token,setToken ] =useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user=localStorage.getItem('user');
        const token=localStorage.getItem('token');
        if(user && token){
            setUser(JSON.parse(user));
            setToken(token);
        }
        setIsReady(true);
    }, []);

    const loginUser = async (email: string, contraseña: string) => {
        await login(email, contraseña)
          .then((res) => {
            if (res) {
              localStorage.setItem("token", res?.data.token);
              const userObj = {
                id: res?.data.id,
                userName: res?.data.userName,
                email: res?.data.email,
                isAdmin: res?.data.isAdmin,
              };
              localStorage.setItem("user", JSON.stringify(userObj));
              setToken(res?.data.token!);
              setUser(userObj!);
              toast.success("Login Success!");
              navigate("/search");
            }
          })
          .catch((e) => toast.error("Server error occured"));
      };

      const isLoggedIn = () => {
        return !!user;
      };

      const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
        navigate("/");
      };

      return (
        <UserContext.Provider
          value={{ loginUser, user, token, logout, isLoggedIn,  }}
        >
          {isReady ? children : null}
        </UserContext.Provider>
      );
    };
    
    export const useAuth = () => React.useContext(UserContext);


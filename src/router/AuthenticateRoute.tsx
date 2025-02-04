import { FC, PropsWithChildren } from "react";
import { UserProfile } from "../models/user";
import { useAuth } from "../context/useAuth";
import { BrowserRoutes } from "./BrowserRoutes";
import { Navigate } from "react-router-dom";

interface AuthComponentProps  {

    requiredRole?:Boolean
}

const AuthorizedComponent: FC<PropsWithChildren<AuthComponentProps>> = ({
    children,
    requiredRole
}) => {

        const {user}=useAuth();
        if(!user){
          return (
            <Navigate
                to={BrowserRoutes.HOME}
                replace={true}
            />
          ) ;

        }

        if(requiredRole && !user.esAdmin){
            return (
                <Navigate
                    to={BrowserRoutes.ESTADISTICAS}
                    replace={true}
                
                />   
            );
        }

        return <>{children}</>;

    }
export default  AuthorizedComponent;
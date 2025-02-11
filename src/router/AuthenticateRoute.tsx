import { FC, PropsWithChildren } from "react";
import { useAuth } from "../context/useAuth";
import { BrowserRoutes } from "./BrowserRoutes";
import { Navigate } from "react-router-dom";

interface AuthComponentProps {
    requiredRole?: boolean;
}

const AuthorizedComponent: FC<PropsWithChildren<AuthComponentProps>> = ({
    children,
    requiredRole
}) => {
    const { user } = useAuth();

    if (!user) {
        return (
            <Navigate
                to={BrowserRoutes.HOME}
                replace={true}
            />
        );
    }

    console.log(user);

    if (requiredRole && !user.esAdmin) {
        return null;
    }

    return <>{children}</>;
};

export default AuthorizedComponent;

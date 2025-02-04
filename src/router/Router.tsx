import { createBrowserRouter } from "react-router-dom";
import { BrowserRoutes } from "./BrowserRoutes";
import Home from "../features/home/home";
import LoginPage from "../features/authentication/login";
import Estadistic from "../features/users/estadistic";
import { UserProvider } from "../context/useAuth";
import Navbar from "../shared/components/navbar";
import Layout from "../shared/components/layouts";

const Router = createBrowserRouter([
   
   {
        element:<Layout/>,
        children:[
    {
        path:BrowserRoutes.HOME,
        element:(
            <UserProvider>
            < Home />
            </UserProvider>
          
        ),
    },
    {
        path:BrowserRoutes.LOGIN,
        element:(
            <UserProvider>
                <LoginPage />
            </UserProvider>
            
        )
    },
    {
        path:BrowserRoutes.FORM,
        element:(
            <UserProvider><Home /></UserProvider>
            
        )
    },
    {
        path:BrowserRoutes.AUDIENCIAS,
        element:(
            <UserProvider> <Estadistic /></UserProvider>
        )
    }
    	]
   }
   
   
    
]);

export default Router
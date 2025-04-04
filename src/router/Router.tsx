import { createBrowserRouter } from "react-router-dom";
import { BrowserRoutes } from "./BrowserRoutes";
import Home from "../features/home/home";
import LoginPage from "../features/authentication/login";
import Estadistic from "../features/users/estadistic";
import Layout from "../shared/components/layouts";
import AuthorizedComponent from "./AuthenticateRoute";
import Form from "../features/form/form";
import { UserProvider } from "../context/useAuth.tsx"; // Importa aquí
import Calendario from "../features/calendar/calendar.tsx";
import ListaPersonalizada from "../features/users/components/ListAudiencia.tsx";
import Edit from "../features/users/components/EditList.tsx";
import UpdatePassword from "../features/users/components/edit.tsx";

const Router = createBrowserRouter([
  {
    element: (
      <UserProvider> {/* Envuelve el Layout con UserProvider */}
        <Layout />
      </UserProvider>
    ),
    children: [
      {
        path: BrowserRoutes.LOGIN,
        element: 
          <LoginPage />,

        
      },


      {
        path: BrowserRoutes.HOME,
        element:
        <AuthorizedComponent>
         <Home />,
        </AuthorizedComponent>
      },

      {
        path: BrowserRoutes.FORM,
        element: <Form />,
      },
      {
        path: BrowserRoutes.ESTADISTICAS,
        element: (
          <AuthorizedComponent>
            <Estadistic />
          </AuthorizedComponent>
        ),
      },
      
      
      {
        path:BrowserRoutes.CALENDARIO,
        element:(
          <AuthorizedComponent>
            <Calendario/>
          </AuthorizedComponent>
        )
      },
      {
        path: BrowserRoutes.AUDIENCIA_DETALLE,
        element: (
          <AuthorizedComponent>
            <ListaPersonalizada/>
          </AuthorizedComponent>
        ),
      },
      {
        path: BrowserRoutes.EDITAR,
        element:(
          <AuthorizedComponent>
            <Edit/>
          </AuthorizedComponent>
        )
        
      },
      {
        path:BrowserRoutes.EDITPASWWORD,
        element:(
          <AuthorizedComponent>
            <UpdatePassword/>
          </AuthorizedComponent>
        )
      }
    ],
  },
]);

export default Router;
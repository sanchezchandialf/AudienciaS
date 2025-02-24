import { createBrowserRouter } from "react-router-dom";
import { BrowserRoutes } from "./BrowserRoutes";
import Home from "../features/home/home";
import LoginPage from "../features/authentication/login";
import Estadistic from "../features/users/estadistic";
import Layout from "../shared/components/layouts";
import AuthorizedComponent from "./AuthenticateRoute";
import Form from "../features/form/form";
import AudienciasList from "../features/users/components/AudienciasList";
import { UserProvider } from "../context/useAuth.tsx"; // Importa aquí
import EditView from "../features/users/components/editview.tsx";

const Router = createBrowserRouter([
  {
    element: (
      <UserProvider> {/* Envuelve el Layout con UserProvider */}
        <Layout />
      </UserProvider>
    ),
    children: [
      {
        path: BrowserRoutes.HOME,
        element: <Home />,
      },
      {
        path: BrowserRoutes.LOGIN,
        element: <LoginPage />,
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
        path: BrowserRoutes.MISAUDIENCIAS,
        element: (
          <AuthorizedComponent>
            <AudienciasList />
          </AuthorizedComponent>
        ),
      },
      {
        path: BrowserRoutes.EDITAR_AUDICENCIA,
        element: (
          <AuthorizedComponent>
            <EditView/>
          </AuthorizedComponent>
        ),
      },
    ],
  },
]);

export default Router;
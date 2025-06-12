import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { allRoutes } from "./routes";
import type { RoutesConfig } from "./configs/models/router.model";
import RouteGuard from "./core/gaurds/RouteGuard";
import AuthLayout from "./components/layout/AuthLayout";
import UnAuthLayout from "./components/layout/UnAuthLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        {
          allRoutes.map((route: RoutesConfig)=>(
            <Route   
               key={route.path}
                path={route.path}
                element={
                  <RouteGuard privateRoute={route.private}>
                    {route.private ? (
                      <AuthLayout>{route.page ? <route.page /> : null}</AuthLayout>
                    ) : route.page ? (
                      <UnAuthLayout>
                        <route.page />
                      </UnAuthLayout>
                    ) : null}
                  </RouteGuard>
                }
            />
          ))
        }
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;

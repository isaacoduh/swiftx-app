import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layouts/layout";
import DetailPage from "./pages/DetailPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import UserProfilePage from "./pages/UserProfilePage";
import ManageStorePage from "./pages/ManageStorePage";
import OrderStatusPage from "./pages/OrderStatusPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route
        path="/search/:city"
        element={
          <Layout showHero={false}>
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path="/detail/:storeId"
        element={
          <Layout showHero={false}>
            <DetailPage />
          </Layout>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/order-status"
          element={
            <Layout>
              <OrderStatusPage />
            </Layout>
          }
        />
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
        <Route
          path="/manage-store"
          element={
            <Layout>
              <ManageStorePage />
            </Layout>
          }
        />
      </Route>
    </Routes>
  );
};
export default AppRoutes;

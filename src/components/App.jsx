import { Route, Routes } from 'react-router-dom';

import { Layout } from './Layout';
import { RegisterPage } from 'pages/RegisterPage';
import { LoginPage } from 'pages/LoginPage';
import { DashboardPage } from 'pages/DashboardPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { AdminPage } from 'pages/AdminPage';
import { UserAccountPage } from 'pages/UserAccountPage';

import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';
import { AdminRoute } from './AdminRoute';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <PrivateRoute component={DashboardPage} redirectTo="/login" />
          }
        />
        <Route
          path="user"
          element={
            <PrivateRoute component={UserAccountPage} redirectTo="/login" />
          }
        />
        <Route
          path="admin"
          element={<AdminRoute component={AdminPage} redirectTo="/login" />}
        />
        <Route
          path="register"
          element={<RestrictedRoute component={RegisterPage} redirectTo="/" />}
        />
        <Route
          path="login"
          element={<RestrictedRoute component={LoginPage} redirectTo="/" />}
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

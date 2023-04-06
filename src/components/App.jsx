import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { RegisterPage } from 'pages/RegisterPage';
import { LoginPage } from 'pages/LoginPage';
import { DashboardPage } from 'pages/DashboardPage';
import { NotFoundPage } from 'pages/NotFoundPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

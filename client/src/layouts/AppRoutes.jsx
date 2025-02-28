import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import Signin from "../components/authComponents/Signin";
import Signup from "../components/authComponents/Signup";
import SetPassword from "../components/authComponents/SetPassword";
import ResetPassword from "../components/authComponents/ResetPasswowrd";
import Dashboard from "../components/dashboard/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <section style={{ marginTop: "150px" }}>Page Not Found</section>
        }
      />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="/" element={<HomePage />} />

      <Route path="/auth" element={<AuthPage />}>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="set-password" element={<SetPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

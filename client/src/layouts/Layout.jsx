import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import AppRoutes from "./AppRoutes";

const Layout = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/dashboard" &&
        location.pathname !== "/blog/create" && (
          <header>
            <NavBar />
          </header>
        )}
      <main>
        <AppRoutes />
      </main>
      {location.pathname !== "/dashboard" &&
        location.pathname !== "/blog/create" && (
          <footer>
            <Footer />
          </footer>
        )}
    </>
  );
};

export default Layout;

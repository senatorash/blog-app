import { Outlet } from "react-router-dom";

const AuthPage = () => {
  return (
    <section className="container">
      <div className="row">
        <div className="col-lg-2 col-12"></div>
        <div className="col-lg-8 col-12">
          <Outlet />
        </div>
        <div className="col-lg-2 col-12"></div>
      </div>
    </section>
  );
};
export default AuthPage;

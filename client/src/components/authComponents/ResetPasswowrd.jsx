import { MdLockReset } from "react-icons/md";
import classes from "./Auth.module.css";
import logo from "../../assets/ProAsh.png";
const ResetPassword = () => {
  return (
    <div data-aos="fade-up">
      <form>
        <div className={`row ${classes.formContainer} align-items-center`}>
          {/* <div className="col-lg-3"></div> */}

          <div className="col-lg-6  col-md-6">
            <div className={`d-lg-none d-sm-block d-md-none ${classes.logo_1}`}>
              <img
                src={logo}
                alt="logo"
                style={{
                  width: "60%",
                }}
              />
            </div>
            <div>
              <h1 className={`mb-2 align-items-center ${classes.sign_in}`}>
                <span
                  style={{
                    marginRight: "5px",
                  }}
                >
                  <MdLockReset size={25} />
                </span>
                Reset Password
              </h1>
              <p
                className="text-lg-start text-md-start text-sm-center"
                style={{ fontSize: "15px", lineHeight: "1.5" }}
              >
                Enter your email below to reset your account password
              </p>
            </div>
            <div className={`form-group mb-3 ${classes.input_field}`}>
              <input
                className="form-control"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="submit"
                className={`btn btn-secondary ${classes.btn}`}
              />
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <img
              className={`d-lg-inline d-md-inline d-none   ${classes.logo}`}
              src={logo}
              style={{
                width: "80%",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.37)",
              }}
              alt="logo"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default ResetPassword;

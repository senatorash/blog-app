import { useState } from "react";
import { MdLockReset } from "react-icons/md";
import { useResetUserPasswordMutation } from "../../lib/apis/authApis";
import classes from "./Auth.module.css";
import logo from "../../assets/ProAsh.png";
import SuccessCard from "../success/SuccessCard";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const [resetUserPassword, { isError, isLoading, error, data, isSuccess }] =
    useResetUserPasswordMutation();

  console.log(data);
  console.log(error);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      return;
    }

    return await resetUserPassword({ email });
  };
  return (
    <div data-aos="fade-up">
      <form onSubmit={handleSubmit}>
        <div className={`row ${classes.formContainer} align-items-center`}>
          {/* <div className="col-lg-3"></div> */}
          {isSuccess && <SuccessCard successMessage={data.message} />}

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
                onChange={(event) => setEmail(event.target.value)}
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

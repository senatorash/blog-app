import { useEffect, useState } from "react";
import { FaUserLock } from "react-icons/fa";
import AOS from "aos";
import { useParams, useNavigate } from "react-router-dom";
import {
  useSetUserPasswordMutation,
  useVerifyPasswordResetDataMutation,
} from "../../lib/apis/authApis";
import usePasswordValidator from "../../hooks/usePasswordValidator";
import classes from "./Auth.module.css";
import logo from "../../assets/ProAsh.png";
import ErrorCard from "../error/ErrorCard";
import SuccessCard from "../success/SuccessCard";

const SetNewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const { resetPasswordData } = params;

  const [setUserPassword, { isError, isLoading, isSuccess, data, error }] =
    useSetUserPasswordMutation();

  console.log(data);
  console.log(error);
  console.log(isError);
  const [
    verifyPasswordResetData,
    { isError: _isError, isSuccess: _isSuccess, data: _data, error: _error },
  ] = useVerifyPasswordResetDataMutation();

  console.log(_data);

  useEffect(() => {
    if (resetPasswordData) {
      const data = atob(resetPasswordData).split(":");

      verifyPasswordResetData({
        userId: data[1],
        resetPasswordToken: data[0],
      });
    }
  }, []);

  const { passwordError, confirmPasswordError } = usePasswordValidator(
    password,
    confirmPassword
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    // if (!password || confirmPassword) {
    //   return;
    // }

    return await setUserPassword({
      email: _data?.response?.email,
      password: password,
      confirmPassword: confirmPassword,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/auth/signin");
    }
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <div data-aos="fade-up">
      <form onSubmit={handleSubmit}>
        <div className={`row ${classes.formContainer}`}>
          {/* <div className="col-lg-3"></div> */}
          {/* Success and Error Message for Verification */}
          {/* {_isError && <ErrorCard errorMessage={_error.data.error} />} */}
          {_isSuccess && (
            <SuccessCard successMessage={_data.message || data.message} />
          )}

          <div className="col-lg-6 col-md-6">
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
                <span style={{ marginRight: "10px" }}>
                  {/* <MdLock size={24} />
                   */}
                  <FaUserLock />
                </span>
                Set Password
              </h1>
              <p
                className="text-start"
                style={{ fontSize: "15px", lineHeight: "1.5" }}
              >
                Set your password below to have full access to your dashboard
              </p>
            </div>
            <div className={`form-group mb-3 ${classes.input_field}`}>
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
            {passwordError.length > 0 && (
              <ul className="text-danger" style={{ marginLeft: "25px" }}>
                {passwordError.map((error, index) => (
                  <li
                    className="text-start"
                    style={{
                      listStyleType: "disc",
                      fontSize: "10px",
                    }}
                    key={index}
                  >
                    <p className="text-danger" style={{ fontSize: "10px" }}>
                      {error}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <div className={`form-group mb-3 ${classes.input_field}`}>
              <input
                className="form-control"
                type="password"
                placeholder="Confirm Password"
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
            {confirmPasswordError.length > 0 && (
              <ul style={{ marginLeft: "25px" }}>
                {confirmPasswordError.map((error, index) => (
                  <li
                    className="text-danger text-start"
                    style={{ listStyleType: "disc", fontSize: "10px" }}
                    key={index}
                  >
                    <p className="text-danger" style={{ fontSize: "10px" }}>
                      {error}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            <div className="form-group mb-3">
              <input
                //   placeholder=""
                type="submit"
                className={`btn btn-secondary ${classes.btn}`}
                value={isLoading ? "Please Wait..." : "Set Password"}
              />
            </div>
          </div>

          <div className="col-lg-6 col-md-6 mt-5 ">
            <img
              className={`d-lg-inline d-md-inline d-none  ${classes.logo}`}
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
export default SetNewPassword;

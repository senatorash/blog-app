import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import { MdLogin } from "react-icons/md";
import { GoogleLogin } from "@react-oauth/google";
import {
  useLoginUserMutation,
  useLoginUserWithGoogleMutation,
} from "../../lib/apis/authApis";
import classes from "../authComponents/Auth.module.css";
import logo from "../../assets/ProAsh.png";
import ErrorCard from "../error/ErrorCard";
import SuccessCard from "../success/SuccessCard";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { data, error, isError, isSuccess }] =
    useLoginUserMutation();

  const [loginUserWithGoogle, { data: _data, isSuccess: _isSuccess }] =
    useLoginUserWithGoogleMutation();
  console.log(_data);
  console.log(_isSuccess);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      return;
    }
    const response = await loginUser({ email, password }).unwrap();

    if (response.data) {
      const { refreshTokenExpiry, refreshToken } = response.data;
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem(
        "refreshTokenExpiry",
        Date.now() + refreshTokenExpiry
      );
    }
  };

  const googleResponse = async (response) => {
    await loginUserWithGoogle({ token: response.credential });
  };

  useEffect(() => {
    if (_isSuccess && _data) {
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [_isSuccess, _data, navigate]);

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("refreshToken", data?.refreshToken);
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, data, navigate]);

  // check if refreshToken has expired
  const checkTokenExpiry = () => {
    const expiryTime = localStorage.getItem("refreshTokenExpiry");
    if (expiryTime && Date.now() > expiryTime) {
      localStorage.clear();
      navigate("/auth/signin");
    }
  };

  // check refreshToken expiry every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      checkTokenExpiry();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // check token expiry on component mount
  useEffect(() => {
    checkTokenExpiry();
  }, []);

  // animate on scroll
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <div data-aos="fade-up">
      <form onSubmit={handleSubmit}>
        <div className={`row ${classes.formContainer} align-items-center `}>
          {/* <div className="col-lg-3"></div> */}
          {isError && <ErrorCard errorMessage={error?.data?.error} />}
          {isSuccess && <SuccessCard successMessage={data.message} />}

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
                  <MdLogin size={20} />
                </span>
                Sign In
              </h1>
              <p
                className="text-start"
                style={{ fontSize: "15px", lineHeight: "1.5" }}
              >
                Enter your details below to log in to your account
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
            <div className={`form-group mb-3 ${classes.input_field}`}>
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className={`mb-3 ${classes.forget}`}>
              <div className="form-check form-switch">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  id="remember"
                />
                <label
                  className="form-check-label"
                  htmlFor="remember"
                  style={{ fontSize: "13px" }}
                >
                  Remember Me
                </label>
              </div>

              <Link to="/auth/reset-password" style={{ fontSize: "13px" }}>
                Forget Password?
              </Link>
            </div>

            <GoogleLogin onSuccess={googleResponse} />
            <div className="form-group mb-3">
              <input
                type="submit"
                className={`btn btn-secondary ${classes.btn}`}
              />
            </div>
          </div>

          <div
            className="col-lg-6 col-md-6 "
            data-aos="fade-right"
            delay="1000"
          >
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
export default Signin;

import { useState } from "react";
import AOS from "aos";
import { MdAppRegistration } from "react-icons/md";
import { useCreateUserMutation } from "../../lib/apis/userApis";
import classes from "../authComponents/Auth.module.css";
import logo from "../../assets/ProAsh.png";
import { useEffect } from "react";
import SuccessCard from "../success/SuccessCard";
import ErrorCard from "../error/ErrorCard";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");

  const [createUser, { isError, isSuccess, data, error }] =
    useCreateUserMutation();

  console.log(data);
  console.log(error);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !firstName || !lastName || !gender) {
      return;
    }

    return await createUser({
      email,
      firstName,
      lastName,
      gender,
    });
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  return (
    <div data-aos="fade-up" delay="200">
      <form onSubmit={handleSubmit}>
        <div className={`row ${classes.formContainer} align-items-center `}>
          {/* <div className="col-lg-3"></div> */}
          {isError && <ErrorCard errorMessage={error.data.message} />}
          {isSuccess && <SuccessCard successMessage={data.message} />}
          <div className="col-lg-6  col-md-6 ">
            <div
              data-aos="fade-down"
              delay="1000"
              className={`d-lg-none d-sm-block d-md-none ${classes.logo_1}`}
            >
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
                  <MdAppRegistration size={20} />
                </span>
                Sign Up
              </h1>
              <p
                className="text-lg-start text-md-start text-sm-center"
                style={{ fontSize: "15px", lineHeight: "1.5" }}
              >
                Enter your details below to create your account and get started
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
                type="text"
                placeholder="First Name"
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
            <div className={`form-group mb-3 ${classes.input_field}`}>
              <input
                className="form-control"
                type="text"
                placeholder="Last Name"
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
            <div className={`form-group mb-3 ${classes.input_field}`}>
              <select
                className={`form-control ${classes.select_opt}`}
                value={gender}
                onChange={(event) => setGender(event.target.value)}
              >
                <option value="" disabled>
                  Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <input
                type="submit"
                className={`btn btn-secondary ${classes.btn}`}
              />
            </div>
          </div>

          <div data-aos="fade-right" delay="1000" className="col-lg-6 col-md-6">
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
export default Signup;

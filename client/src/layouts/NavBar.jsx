import { useState, useEffect } from "react";
import AOS from "aos";
import { Link } from "react-scroll";
import { FaSignInAlt } from "react-icons/fa";
import { useGetCurrentUserMutation } from "../lib/apis/userApis";
import classes from "./NavBar.module.css";
import logo from "../assets/ProAsh.png";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const [getCurrentUser, { isError, data, error, isSuccess }] =
    useGetCurrentUserMutation();

  console.log(data);

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 300,
      once: false,
    });
  }, []);

  return (
    <nav
      delay="100"
      className={`navbar navbar-expand-md bg-light ${
        isScrolled ? "nav-sticky" : ""
      }`}
    >
      <div className="container-fluid">
        <a className="navbar-brand">
          <img src={logo} alt="logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav ml-auto">
            <li className={`nav-item ${classes.pointer}`}>
              <Link className="nav-link" to="home" smooth={true} duration={500}>
                Home
              </Link>
            </li>
            <li className={`nav-item ${classes.pointer}`}>
              <Link
                className="nav-link"
                to="about"
                smooth={true}
                duration={500}
              >
                About
              </Link>
            </li>
            <li className={`nav-item ${classes.pointer}`}>
              <Link
                className="nav-link"
                to="services"
                smooth={true}
                duration={500}
              >
                Services
              </Link>
            </li>
            <li className={`nav-item ${classes.pointer}`}>
              <Link
                className="nav-link"
                to="contact"
                smooth={true}
                duration={500}
              >
                Contact
              </Link>
            </li>
            <li className={`nav-item ${classes.pointer}`}>
              <Link
                className={`nav-link ${classes.sign_in}`}
                to="contact"
                smooth={true}
                duration={500}
              >
                <FaSignInAlt color="white" /> Get Started
              </Link>
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;

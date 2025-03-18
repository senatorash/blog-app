import { useEffect, useState } from "react";
import AOS from "aos";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaHome,
  FaSearch,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaBarsStaggered } from "react-icons/fa6";
import { useGetCurrentUserMutation } from "../../lib/apis/userApis";
import classes from "./Dashboard.module.css"; // Custom CSS for styling
import DashboardContent from "./DashboardContent";

const Dashboard = () => {
  // const [isScrolled, setIsScrolled] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const [getCurrentUser, { data }] = useGetCurrentUserMutation();
  console.log(data);

  const { user } = useSelector((state) => state.userState);
  console.log(user);

  const capitalise = (str) => str.charAt(0).toUpperCase();
  const last = capitalise(user?.lastName[0]);
  const first = capitalise(user?.firstName);

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 500,
      once: false,
    });
  }, []);
  const handleToggle = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  useEffect(() => {
    AOS.init({
      duration: 300,
      once: false,
    });
  }, []);

  return (
    <div
      className={`${classes.dashboard}`}
      // className={`${classes.dashboard}`}
    >
      {/* Hamburger Menu for mobile screen */}
      <div
        className="toggle d-block d-sm-none d-md-none d-lg-none p-4 "
        onClick={toggleOffcanvas}
      >
        <FaBarsStaggered size={25} />
      </div>

      {/* Side bar for mobile screen */}
      <div
        className={`offcanvas offcanvas-start ${showOffcanvas ? "show" : ""}`}
        tabIndex="-1"
        style={{ visibility: showOffcanvas ? "visible" : "hidden" }}
        data-bs-theme="dark"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title ">
            <span>
              <Link className="m-3">
                <FaBarsStaggered color="white" size={20} title="menu" />
              </Link>
            </span>
            Menu
          </h5>
          <button
            type="button nav flex-column"
            className="btn-close"
            onClick={toggleOffcanvas}
          ></button>
        </div>
        <div className="offcanvas-body">
          <nav>
            <ul className={`mb-5 ${classes.name}`}>
              <h4>{`${last}${first}`}</h4>
            </ul>
            <ul
              style={{ cursor: "pointer" }}
              className={`${classes.nav_icons} p-2`}
            >
              <li className="mb-3">
                <Link to="/">
                  <FaHome color="white" size={20} title="Home" />{" "}
                  <span>HOME</span>
                </Link>
              </li>
              {/* <li className="mb-3"></li> */}

              <li className="mb-3">
                <Link>
                  <FaCog color="white" size={20} /> <span>SETTINGS </span>
                </Link>
              </li>
              <li>
                <Link>
                  <FaUser color="white" size={20} />
                  <span>PROFILE</span>
                </Link>
              </li>
              <li style={{ position: "absolute", bottom: "10px" }}>
                <Link>
                  <FaSignOutAlt color="white" />
                  <span>LOGOUT</span>
                </Link>
              </li>
            </ul>
          </nav>
          <div>
            <div className={``}>
              {/* <h4 className="mb-3">My Workplace</h4> */}
              <div
                className={`form-group position-relative ${classes.form_group}`}
              >
                <input
                  className="form-control mb-3 ps-4"
                  type="text"
                  placeholder="Search Blogs"
                />
                <FaSearch
                  size={20}
                  className="position-absolute top-50 pr-5 end-0 translate-middle-y "
                />
              </div>
              <Link className="btn btn-secondary mb-3" to="/create-blog">
                <p style={{ color: "white" }}>Create New Blogs</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Side Bar  */}
      <div className="d-none d-sm-block d-md-block d-lg-block">
        <nav className={`${classes.sidebar}`}>
          <ul className={`mb-5 ${classes.name}`}>
            <h4 style={{ fontWeight: "600" }}>AS</h4>
          </ul>
          <ul
            style={{ cursor: "pointer" }}
            className={`${classes.nav_icons} p-2`}
          >
            <li className="mb-3">
              <Link to="/">
                <FaHome color="white" size={20} title="Home" />
              </Link>
            </li>
            <li className="mb-3" onClick={handleToggle}>
              <Link>
                <FaBarsStaggered color="white" size={20} title="menu" />
              </Link>
            </li>
            <li className="mb-3">
              <Link>
                <FaCog color="white" size={20} title="settings" />
              </Link>
            </li>
            <li>
              <Link>
                <FaUser color="white" size={20} title="profile" />
              </Link>
            </li>
            <li style={{ position: "absolute", bottom: "10px" }}>
              <Link>
                <FaSignOutAlt color="white" title="logout" />
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <div
            className={`${classes.content} ${
              showSidebar
                ? "d-none d-sm-block d-md-block d-lg-block"
                : classes.withSidebar
            }`}
          >
            <h4 className="mb-3">My Workplace</h4>
            <div className="form-group">
              <input
                className="form-control mb-3"
                type="text"
                placeholder="Search Blogs"
              />
            </div>
            <Link className="btn btn-secondary mb-3" to="/create-blog">
              <p style={{ color: "white" }}>Create New Blogs</p>
            </Link>

            <p>All Blogs</p>
            <hr />
          </div>
        </div>
      </div>
      <DashboardContent showSidebar={showSidebar} />
    </div>
  );
};
export default Dashboard;

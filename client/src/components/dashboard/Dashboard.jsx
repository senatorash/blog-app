import React, { useEffect, useState } from "react";
import AOS from "aos";
import { Link } from "react-router-dom";
import { FaUser, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";
import classes from "./Dashboard.module.css"; // Custom CSS for styling
import DashboardContent from "./DashboardContent";

const Dashboard = () => {
  // const [isScrolled, setIsScrolled] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleToggle = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    AOS.init({
      duration: 300,
      once: false,
    });
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
  return (
    <div
      className={`${classes.dashboard}`}
      // className={`${classes.dashboard}`}
    >
      <nav className={`${classes.sidebar}`}>
        <ul className={`mb-5 ${classes.name}`}>
          <li>AS</li>
        </ul>
        <ul
          style={{ cursor: "pointer" }}
          className={`${classes.nav_icons} p-2`}
        >
          <li className="mb-3" onClick={handleToggle}>
            <FaBars size={20} />
          </li>

          <li className="mb-3">
            <FaCog size={20} />
          </li>
          <li>
            <FaUser size={20} />
          </li>
          <li style={{ position: "absolute", bottom: "120px" }}>
            <FaSignOutAlt />
          </li>
        </ul>
      </nav>
      <div>
        <div
          className={`${classes.content} ${
            showSidebar ? classes.withSidebar : ""
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
        <DashboardContent showSidebar={showSidebar} />
      </div>
    </div>
  );
};
export default Dashboard;

// import { Link } from "react-router-dom";
// import { FaUser, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";
// import classes from "./Dashboard.module.css";
// const DashboardModal = (showOffcanvas, toggleOffcanvas, handleToggle, ) => {
//   return (
//     <div
//       className={`offcanvas offcanvas-start ${showOffcanvas ? "show" : ""}`}
//       tabIndex="-1"
//       style={{ visibility: showOffcanvas ? "visible" : "hidden" }}
//       data-bs-theme="dark"
//     >
//       <div className="offcanvas-header">
//         <h5 className="offcanvas-title">Menu</h5>
//         <button
//           type="button nav flex-column"
//           className="btn-close"
//           onClick={toggleOffcanvas}
//         ></button>
//       </div>
//       <div className="offcanvas-body">
//         <nav className={`${classes.sidebar}`}>
//           <ul className={`mb-5 ${classes.name}`}>
//             <li>AS</li>
//           </ul>
//           <ul
//             style={{ cursor: "pointer" }}
//             className={`${classes.nav_icons} p-2`}
//           >
//             <li className="mb-3" onClick={handleToggle}>
//               <Link>
//                 <FaBars color="white" size={20} title="menu" />
//               </Link>
//             </li>

//             <li className="mb-3">
//               <Link>
//                 <FaCog color="white" size={20} title="settings" />
//               </Link>
//             </li>
//             <li>
//               <Link>
//                 <FaUser color="white" size={20} title="profile" />
//               </Link>
//             </li>
//             <li style={{ position: "absolute", bottom: "10px" }}>
//               <Link>
//                 <FaSignOutAlt color="white" title="logout" />
//               </Link>
//             </li>
//           </ul>
//         </nav>
//         <div>
//           <div
//             className={`${classes.content} ${
//               showSidebar ? "" : classes.withSidebar
//             }`}
//           >
//             <h4 className="mb-3">My Workplace</h4>
//             <div className="form-group">
//               <input
//                 className="form-control mb-3"
//                 type="text"
//                 placeholder="Search Blogs"
//               />
//             </div>
//             <Link className="btn btn-secondary mb-3" to="/create-blog">
//               <p style={{ color: "white" }}>Create New Blogs</p>
//             </Link>

//             <p>All Blogs</p>
//             <hr />
//           </div>
//           {/* <DashboardContent showSidebar={showSidebar} /> */}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default DashboardModal;

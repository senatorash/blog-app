import { useSelector } from "react-redux";
import classes from "./Dashboard.module.css";

const DashboardContent = ({ showSidebar }) => {
  const { user } = useSelector((state) => state.userState);
  console.log(user);

  const capitalise = (str) => str.charAt(0).toUpperCase();
  const last = capitalise(user?.lastName[0]);
  const first = capitalise(user?.firstName);

  return (
    <div
      className={`${classes.main_content} 
      ${showSidebar ? `${classes.fullWidth}` : ""}
    `}
    >
      <h1 className={`${classes.main_content_text}`}>
        Welcome Back,{" "}
        <span style={{ color: "#007bff", fontWeight: "800" }}>
          {user?.username}
        </span>
      </h1>
      <p>Lots of content here...</p>
    </div>
  );
};
export default DashboardContent;

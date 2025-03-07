import classes from "./Dashboard.module.css";

const DashboardContent = ({ showSidebar }) => {
  return (
    <div
      className={`${classes.main_content} 
      ${showSidebar ? `${classes.fullWidth}` : ""}
    `}
    >
      <h1 className={`${classes.main_content_text}`}>
        Welcome Back,{" "}
        <span style={{ color: "#007bff", fontWeight: "800" }}>Ashimi</span>
      </h1>
      <p>Lots of content here...</p>
    </div>
  );
};
export default DashboardContent;

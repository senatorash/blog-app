import classes from "./Dashboard.module.css";

const DashboardContent = ({ showSidebar }) => {
  return (
    <div
      class={`${classes.main_content} 
      ${showSidebar ? "" : classes.fullWidth}
    `}
    >
      <h1>Welcome Back, Ashimi</h1>
      <p>Lots of content here...</p>
    </div>
  );
};
export default DashboardContent;

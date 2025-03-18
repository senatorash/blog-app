const SuccessCard = ({ successMessage }) => {
  return (
    <div
      className="alert alert-success text-center"
      style={{ borderRadius: "20px" }}
      role="alert"
    >
      {successMessage}
    </div>
  );
};
export default SuccessCard;

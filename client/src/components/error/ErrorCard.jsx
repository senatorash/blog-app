const ErrorCard = ({ errorMessage }) => {
  return (
    <div
      className="alert alert-danger text-center"
      style={{ borderRadius: "50px" }}
      role="alert"
    >
      {errorMessage}
    </div>
  );
};
export default ErrorCard;

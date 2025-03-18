import { useEffect, useState } from "react";

const usePasswordValidator = (password, confirmPassword) => {
  const [passwordError, setPasswordError] = useState([]);
  const [confirmPasswordError, setConfirmPasswordError] = useState([]);

  const validatePassword = () => {
    let errors = [];
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter.");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }

    if (!/\d/.test(password)) {
      errors.push("Password must contain at least one number.");
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push(
        'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>).'
      );
    }

    setPasswordError([...errors]);
  };

  const validateConfirmPassword = () => {
    let errors = [];
    if (password !== confirmPassword) {
      errors.push("Password does not match");
    }

    setConfirmPasswordError([...errors]);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (password.length > 0) {
        validatePassword();
      }

      if (confirmPassword.length > 0) {
        validateConfirmPassword();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [confirmPassword, password]);

  return { passwordError, confirmPasswordError };
};
export default usePasswordValidator;

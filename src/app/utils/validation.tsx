export const emailValidation = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return "Please enter your email!";
  } else if (!emailRegex.test(email)) {
    return "Please enter a valid email address!";
  }

  return "";
};

export const passwordValidation = (
  passwordValue: string,
  confirmPasswordValue: string
) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

  if (!passwordValue) {
    return "Please enter your password!";
  } else if (passwordValue.length < 6) {
    return "Password must be at least 6 characters long!";
  } else if (!passwordRegex.test(passwordValue)) {
    return "Password must contain uppercase, lowercase letters, a number, and a special character!";
  }

  return "";
};

export const signInpasswordValidation = (passwordValue: string) => {
  if (!passwordValue) {
    return "Please enter your password!";
  }

  return "";
};

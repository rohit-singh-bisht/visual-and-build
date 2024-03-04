import { Slide } from "react-toastify";

export const toastifySettings = {
  position: "top-right",
  autoClose: 4000,
  theme: "colored",
  transition: Slide,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const registerUserObj = {
  name: "",
  email: "",
  password: "",
};

export const loginUserObj = {
  username: "",
  password: "",
};

export function verifyPasswordStrength(password) {
  if (password.length < 8) {
    return {
      success: false,
      message: "Password is too short. It must be at least 8 characters long.",
    };
  }
  if (!/[A-Z]/.test(password)) {
    return {
      success: false,
      message: "Password must contain at least one uppercase letter.",
    };
  }
  if (!/[a-z]/.test(password)) {
    return {
      success: false,
      message: "Password must contain at least one lowercase letter.",
    };
  }
  if (!/\d/.test(password)) {
    return {
      success: false,
      message: "Password must contain at least one digit.",
    };
  }
  if (!/[!@#$%^&*()-+=_]/.test(password)) {
    return {
      success: false,
      message: "Password must contain at least one special character.",
    };
  }

  return {
    success: true,
    message: "Password meets the strength requirements.",
  };
}

export const contactFormStateObj = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export const addressFormObj = {
  fullName: "",
  phoneNumber: "",
  pincode: "",
  locality: "",
  address: "",
  city: "",
  state: "",
  landmark: "",
  alternateNumber: "",
  label: "",
};

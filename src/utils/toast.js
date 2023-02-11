import { toast } from "react-toastify";

export const messageSuccess = (text = "", timeout = 1000) =>
  toast.success(text, { autoClose: timeout });

export const messageWarning = (text = "", timeout = 1000) =>
  toast.warning(text, { autoClose: timeout });

  export const messageError = (text = "", timeout = 1000) =>
  toast.error(text, { autoClose: timeout });
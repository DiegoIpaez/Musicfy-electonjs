import { toast } from "react-toastify";

export const messageSuccess = (text = "") =>
  toast.success(text, { autoClose: true });

export const messageWarning = (text = "") =>
  toast.warning(text, { autoClose: true });

  export const messageError = (text = "") =>
  toast.error(text, { autoClose: true });
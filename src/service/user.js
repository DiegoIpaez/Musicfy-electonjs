import { toast } from "react-toastify";
import { db, auth } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore/lite";
import {
  updateProfile,
  sendEmailVerification,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

export const addUsername = async (user, newName) => {
  await updateProfile(user, { displayName: newName }).catch(() =>
    toast.error("Error al asignar el nombre al usuario.")
  );
};

export const sendVerificationEmail = async (user) => {
  await sendEmailVerification(user)
    .then(() => toast.success("Se ha enviado un email de verificacion."))
    .catch((err) =>
      handleError(err.code, "al enviar el email de verificacion")
    );
};

export const isAdminUser = async (uid) => {
  const docuRef = doc(db, `admins/${uid}`);
  const query = await getDoc(docuRef);
  return query.exists();
};

export const reauthenticate = async (password) => {
  const user = auth.currentUser;
  const credentials = EmailAuthProvider.credential(user.email, password);
  const isAuthtenticated = reauthenticateWithCredential(user, credentials);;
  return isAuthtenticated; 
};

export const handleError = (code, error) => {
  switch (code) {
    case "auth/wrong-password":
      toast.warning("El usuario o la contraseña son incorrectos");
      break;
    case "auth/user-not-found":
      toast.warning("El usuario o la contraseña son incorrectos");
      break;
    case "auth/too-manu-request":
      toast.warning(
        "Has hecho demasiadas solicitudes de reenvio de email en muy poco tiempo"
      );
      break;
    default:
      toast.error(`Error ${error}`);
      break;
  }
};

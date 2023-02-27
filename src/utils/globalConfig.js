export const formCheckIn = (value) => {
  return {
    username: value,
    email: value,
    password: value,
  };
};

export const formLogin = (value) => {
  return {
    email: value,
    password: value,
  };
};

export const commonMessages = {
  wrongPassword: "La contreseña no es correcta, intentelo de nuevo.",
  generalError: "Error del servidor, intentelo de nuevo en otro momento",
  emailInUse: "Email en uso, pruebe otro."
};

export const firebaseCodeErrors = {
  emailAndPasswordError: "auth/wrong-password",
  notFounUsers: "auth/user-not-found",
  tooManuRequest: "auth/too-manu-request",
  emailInUse: "auth/email-already-in-use",
}

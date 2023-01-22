export function validateEmail(email) {
  const validation =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validation.test(String(email).toLowerCase());
}

export const loginValidation = (user) => {
  let errors = {};

  if (!validateEmail(user.email)) {
    errors.email = true;
  }
  if (!user.password) {
    errors.password = true;
  }
  if (user.password.length < 6) {
    errors.password = true;
  }

  return errors;
};

export const formValidations = (user) => {
  let errors = {};

  if (!validateEmail(user.email)) {
    errors.email = true;
  }
  if (!user.password) {
    errors.password = true;
  }
  if (!user.username) {
    errors.username = true;
  }
  if (user.password.length < 6) {
    errors.password = true;
  }

  return errors;
};
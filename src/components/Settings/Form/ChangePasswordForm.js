import { useState } from "react";
import { Form, Input, Button, Icon } from "semantic-ui-react";
import { updatePassword } from "firebase/auth";
import { auth } from '../../../utils/firebase';
import { reauthenticate } from "../../../service/user";
import {
  commonMessages,
  firebaseCodeErrors,
} from "../../../utils/globalConfig";
import {
  messageSuccess,
  messageWarning,
  messageError,
} from "../../../utils/toast";

const { Field } = Form;

const ChangePasswordForm = ({ setShowModal }) => {
  const [showPassoword, setShowPassoword] = useState(false);
  const [showNewPassoword, setShowNewPassoword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updatedPassword = async ({ password, newPassword }) => {
    try {
      setIsLoading(true);
      const isAuthenticate = await reauthenticate(password);
      if (isAuthenticate) {
        const user = auth.currentUser;
        await updatePassword(user, newPassword);
        messageSuccess("Contraseña actualizada!.");
        auth.signOut();
      }
    } catch (error) {
      switch (error?.code) {
        case firebaseCodeErrors.emailAndPasswordError:
        return messageWarning(commonMessages.wrongPassword);
        case firebaseCodeErrors.emailInUse:
          return messageWarning(commonMessages.emailInUse);
        default:
          return messageError(commonMessages.generalError);;
      }
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  };

  const validationAndGetMsgError = ({ password, newPassword, confirmPassword }) => {
    if (password === "") return "La contraseña no puede ir vacia.";
    if (newPassword === "") return "La nueva contraseña no puede ir vacia.";
    if (newPassword === password) return "No puede ser igual a la contraseña anterior";
    if (confirmPassword === "") return "debe confimar la contraseña.";
    if (confirmPassword !== newPassword) return "Debe ser la misma contraseña.";
    return '';
  }

  const onSubmit = async ({ target }) => {
    const formData = new FormData(target);
    const values = Object.fromEntries(formData);
    const msgError = validationAndGetMsgError(values);
    if (msgError) return messageWarning(msgError);
    await updatedPassword(values);
  };

  return (
    <Form onSubmit={(values) => onSubmit(values)}>
      <Field>
        <Input
          name="password"
          placeholder="Contraseña actual"
          type={showPassoword ? "text" : "password"}
          icon={
            <Icon
              name={showPassoword ? "eye slash outline" : "eye"}
              onClick={() => setShowPassoword(!showPassoword)}
              link
            />
          }
        />
      </Field>
      <Field>
        <Input
          name="newPassword"
          placeholder="Nueva contraseña"
          type={showNewPassoword ? "text" : "password"}
          icon={
            <Icon
              name={showNewPassoword ? "eye slash outline" : "eye"}
              onClick={() => setShowNewPassoword(!showNewPassoword)}
              link
            />
          }
        />
      </Field>
      <Field>
        <Input
          name="confirmPassword"
          placeholder="Repetir contraseña"
          type="password"
        />
      </Field>
      <Button loading={isLoading} type="submit">
        Actualizar contraseña
      </Button>
    </Form>
  );
};

export default ChangePasswordForm;

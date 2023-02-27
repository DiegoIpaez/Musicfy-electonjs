import { useState } from "react";
import { Form, Input, Button, Icon } from "semantic-ui-react";
import { updateEmail } from "firebase/auth";
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

const ChangeEmailForm = ({ email, setShowModal }) => {
  const [showPassoword, setShowPassoword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updatedEmail = async ({ newEmail, password }) => {
    try {
      setIsLoading(true);
      const isAuthenticate = await reauthenticate(password);
      if (isAuthenticate) {
        const user = auth.currentUser;
        await updateEmail(user, newEmail)
        messageSuccess("Email actualizado!.");
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

  const onSubmit = async ({ target }) => {
    const formData = new FormData(target);
    const { newEmail, password } = Object.fromEntries(formData);
    if (newEmail === email)
      return messageWarning("El email no puede ser el mismo");
    if (newEmail === "") return messageWarning("El email no puede ir vacio");
    if (password === "") return messageWarning("El password no puede ir vacio");
    await updatedEmail({ newEmail, password });
  };

  return (
    <Form onSubmit={(values) => onSubmit(values)}>
      <Field>
        <Input name="newEmail" defaultValue={email} type="text" />
      </Field>
      <Field>
        <Input
          name="password"
          placeholder="contraseña"
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
      <Button loading={isLoading} type="submit">
        Actualizar email
      </Button>
    </Form>
  );
};

export default ChangeEmailForm;

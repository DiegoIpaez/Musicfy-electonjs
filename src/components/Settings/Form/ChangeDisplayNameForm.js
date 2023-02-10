import { useState } from "react";
import { toast } from "react-toastify";
import { Form, Input, Button } from "semantic-ui-react";
import { auth } from '../../../utils/firebase';
import { addUsername } from '../../../service/user'

const { Field } = Form;

const ChangeDisplayNameForm = ({ displayName, setShowModal }) => {
  const [isLoading, setIsLoading] = useState(false);

  const updateUserName = async (newName) => {
    try {
      setIsLoading(true);
      await addUsername(auth.currentUser, newName);
      toast.success('Actualizado pa!', { autoClose: true })
    } catch (error) {
      return toast.error('Error del servidor, intentelo de nuevo en otro momento')
    }finally{
      setIsLoading(false);
      setShowModal(false);
    }
  };

  const onSubmit = async (values) => {
    const newName = values.target[0].value;
    if (!newName || newName === '') {
      return toast.error('El nombre no puede estar vacio')
    }
    await updateUserName(newName);
  } 
    
  return (
    <Form onSubmit={(values) => onSubmit(values)}>
      <Field>
        <Input defaultValue={displayName} />
      </Field>
      <Button loading={isLoading} type="submit">Actualizar Nombre</Button>
    </Form>
  );
};

export default ChangeDisplayNameForm;

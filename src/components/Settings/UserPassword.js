import { Button } from "semantic-ui-react";
import ChangePasswordForm from "./Form/ChangePasswordForm";

const UserPassword = ({ user, setShowModal, setModalContent }) => {
  const handleOpenModal = () => {
    const title = "Actualizar Nombre";
    const content = (
      <ChangePasswordForm
        setShowModal={setShowModal}
      />
    );
    setModalContent({ title, content });
    setShowModal(true);
  };
  const onEdit = () => {
    handleOpenModal();
  };
  return (
    <div className="user-password">
      <h3>Contraseña: *** *** *** ****</h3>
      <Button circular onClick={() => onEdit()}>
        Actualizar
      </Button>
    </div>
  );
};

export default UserPassword;
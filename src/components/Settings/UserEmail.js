import { Button } from "semantic-ui-react";
import ChangeEmailForm from "./Form/ChangeEmailForm";

const UserEmail = ({ user, setShowModal, setModalContent }) => {
  const handleOpenModal = () => {
    const title = "Actualizar Email";
    const content = (
      <ChangeEmailForm email={user.email} setShowModal={setShowModal} />
    );
    setModalContent({ title, content });
    setShowModal(true);
  };
  const onEdit = () => {
    handleOpenModal();
  };
  return (
    <div className="user-email">
      <h3>Email: {user.email}</h3>
      <Button circular onClick={() => onEdit()}>
        <span className="btn-act">Actualizar</span>
      </Button>
    </div>
  );
};

export default UserEmail;

import { Button } from "semantic-ui-react";
import ChangeDisplayNameForm from "./Form/ChangeDisplayNameForm";

const UserName = ({ user, setShowModal, setModalContent }) => {
  const handleOpenModal = () => {
    const title = "Actualizar Nombre";
    const content = (
      <ChangeDisplayNameForm
        displayName={user.displayName}
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
    <div className="user-name">
      <h2>{user.displayName}</h2>
      <Button circular onClick={() => onEdit()}>
        Actualizar
      </Button>
    </div>
  );
};

export default UserName;

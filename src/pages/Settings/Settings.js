import "./settings.scss";
import UploadAvatar from "../../components/Settings/UploadAvatar";
import UserName from "../../components/Settings/UserName";
import UserEmail from "../../components/Settings/UserEmail";
import BasicModal from "../../components/Modal/BasicModal";
import { useState } from "react";
import UserPassword from "../../components/Settings/UserPassword";

const Settings = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    content: "",
  });

  return (
    <div className="settings">
      <h2>Configuracion de usuario</h2>
      <div className="avatar-name">
        <UploadAvatar user={user} />
        <UserName
          user={user}
          setShowModal={setShowModal}
          setModalContent={setModalContent}
        />
      </div>
      <UserEmail
        user={user}
        setShowModal={setShowModal}
        setModalContent={setModalContent}
      />
      <UserPassword
        user={user}
        setShowModal={setShowModal}
        setModalContent={setModalContent}
      />
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title={modalContent?.title}
      >
        {modalContent?.content}
      </BasicModal>
    </div>
  );
};

export default Settings;

import "./basicModal.scss";
import { Modal, Icon } from "semantic-ui-react";

const { Content, Header } = Modal;

const BasicModal = ({ show, setShow, title, children, size }) => {
  const onClose = () => setShow(false);
  return (
    <Modal
      className="basic-modal"
      open={show}
      onClose={() => onClose()}
      size={size ?? "tiny"}
    >
      <Header>
        <h3>{title}</h3>
        <Icon name="close" onClick={() => onClose()}></Icon>
      </Header>
      <Content>{children}</Content>
    </Modal>
  );
};

export default BasicModal;

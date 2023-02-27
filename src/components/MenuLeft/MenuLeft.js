import "./menuLeft.scss";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { isAdminUser } from "../../service/user";
import { adminMenuItems, userMenuItems } from "./menuItems";
import BasicModal from "../Modal/BasicModal";
import AddArtist from '../Artist/AddArtist';
import AddAlbum from "../Albums/AddAlbum";
import AddSong from "../Songs/AddSong";

const { Item } = Menu;

export default function MenuLeft({ user }) {
  const location = useLocation();

  const initialModalContent = {
    title: "",
    content: "",
  };

  const [activeMenu, setActiveMenu] = useState('');
  const [admin, setAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(initialModalContent);

  useEffect(() => setActiveMenu(location?.pathname), [location])
  useEffect(() => {
    const fetchingAdminUserData = async () => {
      try {
        const adminUser = await isAdminUser(user.uid);
        setAdmin(adminUser);
      } catch (error) {
        toast.warning("Error del servidor.");
      }
    };
    fetchingAdminUserData();
  }, [user]);

  const handlerModal = (type) => {
    switch (type) {
      case "artist":
        setModalContent({
          title: "Nuevo artista",
          content: <AddArtist setShowModal={setShowModal} />,
        });
        setShowModal(true);
        break;
      case "album":
        setModalContent({
          title: "Nuevo album",
          content: <AddAlbum setShowModal={setShowModal}/>,
        });
        setShowModal(true);
        break;
      case "song":
        setModalContent({
          title: "Nueva cancion",
          content: <AddSong setShowModal={setShowModal}/>,
        });
        setShowModal(true);
        break;
      default:
        setModalContent(initialModalContent);
        setShowModal(false);
        break;
    }
  };

  const getMenuItems = (menuItems) =>
    menuItems.map((item, i) => (
      <Item
        key={`${item.name}${i}`}
        as={item?.pathname && Link}
        to={item?.pathname ?? '/'}
        name={item.name}
        active={activeMenu === item.pathname}
        onClick={item?.modalKey ? () => handlerModal(item?.modalKey) : ()=>{}}
      >
        <Icon name={item.iconName} /> {item.label}
      </Item>
    ));

  return (
    <>
      <Menu className="menu-left" vertical>
        <div className="top">{getMenuItems(userMenuItems)}</div>
        <div className="footer">{admin && getMenuItems(adminMenuItems)}</div>
      </Menu>
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title={modalContent.title}
      >
        {modalContent.content}
      </BasicModal>
    </>
  );
}

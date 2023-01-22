import "./menuLeft.scss";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { isAdminUser } from "../../service/user";
import { adminMenuItems, userMenuItems } from "./menuItems";

const { Item } = Menu;

export default function MenuLeft({ user }) {
  const location = useLocation();
  const [activeMenu, setAtiveMenu] = useState(location?.pathname);
  const [admin, setAdmin] = useState(false);

  const handleMenu = (_, menu) => setAtiveMenu(menu.to);

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

  const getMenuItems = (menuItems) =>
    menuItems.map((item, i) => (
      <Item
        key={`${item.name}${i}`}
        as={Link}
        to={item.pathname}
        name={item.name}
        active={activeMenu === item.pathname}
        onClick={handleMenu}
      >
        <Icon name={item.iconName} /> {item.label}
      </Item>
    ));

  return (
    <Menu className="menu-left" vertical>
      <div className="top">{getMenuItems(userMenuItems)}</div>
      <div className="footer">{admin && getMenuItems(adminMenuItems)}</div>
    </Menu>
  );
}

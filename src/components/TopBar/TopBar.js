import "./topBar.scss";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Icon, Image } from "semantic-ui-react";
import { auth } from "../../utils/firebase";
import userImage from "../../assets/png/user.png";

const TopBar = ({ user }) => {
  const navigate = useNavigate();
  const getAvatar = () => !user?.photoURL ? userImage : user?.photoURL;
  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      toast.warning("Hubo un error, intentelo de nuevo mas tarde.");
    }
  };
  const goBack = () => navigate("/");
  return (
    <div className="top-bar">
      <div className="top-bar__left">
        <Icon name="angle left" onClick={() => goBack()} />
      </div>
      <div className="top-bar__right">
        <Link to="/settings">
          <Image src={getAvatar()} />
          {user.displayName}
        </Link>
        <Icon name="power off" onClick={() => logout()} />
      </div>
    </div>
  );
};

export default TopBar;

import "./settings.scss";
import UploadAvatar from "../../components/Settings/UploadAvatar";

const Settings = ({ user }) => {
  return (
    <div className="settings">
      <h2>Configuracion de usuario</h2>
      <div className="avatar-name">
        <UploadAvatar user={user} />
        <h3>User name</h3>
      </div>
    </div>
  );
};

export default Settings;

import "./auth.scss";
import AuthOptions from "../../components/Auth/AuthOptions";
import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from "../../components/Auth/RegisterForm";
import { useState } from "react";
import backgroundAuth from "../../assets/jpg/background-auth.jpg";
import logoNameWhite from "../../assets/png/logo-name-white.png";

export default function Auth() {
  const [selectedForm, setselectedForm] = useState(null);

  const handlerForm = () => {
    switch (selectedForm) {
      case "login":
        return <LoginForm setselectedForm={setselectedForm} />;
      case "register":
        return <RegisterForm setselectedForm={setselectedForm} />;
      default:
        return <AuthOptions setselectedForm={setselectedForm} />;
    }
  };

  return (
    <div className="auth" style={{ backgroundImage: `url(${backgroundAuth})` }}>
      <div className="auth__dark" />
      <div className="auth__box">
        <div className="auth__box-logo">
          <img src={logoNameWhite} alt="Musicfy" />
        </div>
        {handlerForm()}
      </div>
    </div>
  );
}

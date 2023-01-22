import "./authOptions.scss"
import { Button } from "semantic-ui-react";

export default function AuthOptions(props) {
  const { setselectedForm } = props;

  return (
    <div className="auth-options">
      <h3>Millones de canciones gratis en Musicfy</h3>
      <Button className="register" onClick={() => setselectedForm('register')}>Registrate gratis</Button>
      <Button className="login" onClick={() => setselectedForm('login')}>Iniciar sesion</Button>
    </div>
  )
}

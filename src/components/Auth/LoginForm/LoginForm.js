import "./loginForm.scss";
import { auth } from "../../../utils/firebase";
import { useState } from "react";
import { formLogin } from "../../../utils/globalConfig";
import { loginValidation } from "../../../utils/formValidations";
import { sendVerificationEmail, handleError } from "../../../service/user";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from "react-toastify";
import { Button, Icon, Form, Input } from "semantic-ui-react";

const { Field } = Form;

export default function LoginForm({ setselectedForm }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState(formLogin(false));
  const [formData, setFormData] = useState(formLogin(""));
  const [userActive, setUserActive] = useState(null);
  const [user, setUser] = useState(null);

  const handlerShowPassword = () => setShowPassword(!showPassword);

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async () => {
    setFormErrors({});
    const errors = loginValidation(formData);

    if (Object.keys(errors).length === 0) {
      const { email, password } = formData;
      setLoading(true)
      signInWithEmailAndPassword(auth, email, password)
        .then((res)=>{
          setUser(res.user);
          setUserActive(res.user.emailVerified);
          if (res.user.emailVerified === false) {
            toast.warning('Debes verificar tu cuenta antes de ingresar.')
          }
        })
        .catch((err)=>handleError(err.code, 'al iniciar sesion.'))
        .finally(()=>{
          setLoading(false)
        })
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="login-form">
      <h1>Musica para todos...</h1>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Field>
          <Input
            type="text"
            name="email"
            placeholder="Email"
            icon="mail outline"
            error={formErrors.email}
          />
          {formErrors.email && (
            <span className="error-text">
              Por favor ingrese un correo electronico valido.
            </span>
          )}
        </Field>
        <Field>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            error={formErrors.password}
            icon={
              showPassword ? (
                <Icon
                  name="eye slash outline"
                  link
                  onClick={handlerShowPassword}
                />
              ) : (
                <Icon name="eye" link onClick={handlerShowPassword} />
              )
            }
          />
          {formErrors.password && (
            <span className="error-text">
              La contraseña debe ser mayor a 6 caracteres minimo.
            </span>
          )}
        </Field>
        <Button type="submit" loading={loading}>Iniciar sesion</Button>
      </Form>
      {userActive === false && (
        <div className="resend-verification-email">
          <p>
            Si no has recibido el email de verificacion puedes volver a enviarlo
            haciendo click{" "}
            <span
              onClick={() => {
                sendVerificationEmail(user);
                setUserActive(null);
              }}
            >
              aqui.
            </span>
          </p>
        </div>
      )}
      <div className="login-form__options">
        <p onClick={() => setselectedForm(null)}>Volver</p>
        <p onClick={() => setselectedForm("register")}>
          No tienes cuenta? <span>Registrate</span>
        </p>
      </div>
    </div>
  );
}

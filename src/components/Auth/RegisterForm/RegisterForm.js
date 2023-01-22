import "./registerForm.scss";
import { auth } from "../../../utils/firebase";
import { useState } from "react";
import { formValidations } from "../../../utils/formValidations";
import { formCheckIn } from "../../../utils/globalConfig";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addUsername, sendVerificationEmail } from "../../../service/user";
import { Button, Icon, Form, Input } from "semantic-ui-react";

const { Field } = Form;

export default function RegisterForm({ setselectedForm }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState(formCheckIn(false));
  const [formData, setFormData] = useState(formCheckIn(""));

  const handlerShowPassword = () => setShowPassword(!showPassword);

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = () => {
    setFormErrors({});
    const errors = formValidations(formData);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then(() => {
          setLoading(false);
          addUsername(auth.currentUser, formData.username);
          sendVerificationEmail(auth.currentUser);
          setselectedForm(null);
        })
        .catch(() => {
          setLoading(false);
          toast.error("Hubo un error al crear la cuenta, reintentelo");
        });
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="register-form">
      <h1>Empieza a escuchar con una cuenta de Musicfy gratis</h1>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Field>
          <Input
            type="text"
            name="username"
            placeholder="Nombre"
            icon="user"
            error={formErrors.username}
          />
          {formErrors.username && (
            <span className="error-text">No puede esta vacio este campo.</span>
          )}
        </Field>
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
        <Button type="submit" loading={loading}>
          Continuar
        </Button>
      </Form>

      <div className="register-form__options">
        <p onClick={() => setselectedForm(null)}>Volver</p>
        <p onClick={() => setselectedForm("login")}>
          Ya tienes cuenta en Musicfy? <span>Iniciar sesion</span>
        </p>
      </div>
    </div>
  );
}

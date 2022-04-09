import { useNavigate } from "react-router-dom";

import { Form, Input, Button, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import GoogleLogin from "react-google-login";

import images from "../../images/images";

import "./_Login.scss";

const { logo } = images;

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__container__title">Iniciar Sesión</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "El correo ingresado no es válido.",
              },
              {
                required: true,
                message: "Por favor ingrese su correo.",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Correo"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su contraseña.",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Contraseña"
            />
          </Form.Item>

          <Form.Item>
            <div className="login-form-formItem">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-formItem-button"
                style={{ justifySelf: "center" }}
              >
                Ingresar
              </Button>
            </div>
          </Form.Item>
        </Form>
        <div className="login__container__containerLink">
          <span
            onClick={() => navigate("/registro")}
            className="login__container__containerLink__link"
          >
            ¿Aun no tienes una cuenta? Regístrate.
          </span>
        </div>

        <Divider plain>o</Divider>
        <div className="login__container__google">
          <GoogleLogin
            // clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
            buttonText="Iniciar sesión con Google"
            // onSuccess={responseSuccessGoogle}
            // onFailure={responseFailureGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <div className="login__container__logoContainer">
          <img
            onClick={() => navigate("/")}
            className="login__container__logoContainer__logo"
            src={logo}
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

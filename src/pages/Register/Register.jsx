import { useNavigate } from "react-router-dom";

import { Form, Input, Button, Divider } from "antd";
import GoogleLogin from "react-google-login";

import images from "../../images/images";

import "./_Register.scss";

const { logo } = images;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="register">
      <div className="register__container">
        <h1 className="register__container__title">Registrarme</h1>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="Correo"
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
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Contraseña"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su contraseña.",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirmar Contraseña"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Por favor confirme su contraseña.",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error("Las contraseñas ingresadas no coinciden.")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="name"
            label="Nombre"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su nombre.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lastname"
            label="Apellido"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su apellido.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <div className="register-form-formItem">
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-formItem-button"
              style={{ justifySelf: "center" }}
            >
              Registrarme
            </Button>
          </div>
        </Form>
        <div className="register__container__containerLink">
          <span
            onClick={() => navigate("/ingresar")}
            className="register__container__containerLink__link"
          >
            ¿Ya tienes una cuenta? Ingresa aquí.
          </span>
        </div>

        <Divider plain>o</Divider>
        <div className="register__container__google">
          <GoogleLogin
            // clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
            buttonText="Regístrate con Google"
            // onSuccess={responseSuccessGoogle}
            // onFailure={responseFailureGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <div className="register__container__logoContainer">
          <img
            onClick={() => navigate("/")}
            className="register__container__logoContainer__logo"
            src={logo}
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loginAdminAsync, alertLogin } from "../../redux/slices/adminSlice";
import { AlertError } from "../../components/Alert/index.js";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import images from "../../images/images";

import "./_LoginAdmin.scss";

const { logo } = images;

const LoginAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cont, setCont] = useState(0);
  const ROLE = JSON.parse(localStorage.getItem("infoUserILoveTrekApp"))?.role;

  // Status to know if the admin is logged in
  const stateLoggedAdmin = JSON.parse(
    localStorage.getItem("infoUserILoveTrekApp")
  )?.token;

  const alertOnLogin = useSelector(alertLogin) ?? false;

  const onFinish = async (values) => {
    await dispatch(loginAdminAsync(values));
    setCont(cont + 1);
  };

  useEffect(() => {
    if (stateLoggedAdmin) {
      if (ROLE === "admin") window.location = "/admin/usuarios";
      else window.location = "/buscar-destino";
    }
  }, [cont]);

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

        <div className="login__container__logoContainer">
          <img
            onClick={() => navigate("/")}
            className="login__container__logoContainer__logo"
            src={logo}
            alt="logo"
          />
        </div>
      </div>
      <AlertError
        alertOn={alertOnLogin}
        message="Correo o contraseña incorrectos."
      />
    </div>
  );
};

export default LoginAdmin;

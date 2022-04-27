import { useState } from "react";

import { ButtonPrimary } from "../../components/ButtonPrimary";
import { CardSimplePlace } from "../../components/CardSimplePlace";
import { CardPlace } from "../../components/CardPlace";
import AddIcon from "@mui/icons-material/Add";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { Form, Input } from "antd";
import { CarouselCards2 } from "../../components/Carousel";

import images from "../../images/images";
import places from "../../utils/constants/MockPlaces";
import "./_Profile.scss";
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
const { man, catarata } = images;
const imgurl =
  "https://www.cdc.gov/preconception/spanish/images/man-with-arms-crossed.jpg";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    setEdit(false);
  };
  const handlePhoto = (e) => {
    e.preventDefault();
  };

  return (
    <div className="profile">
      <div style={{ width: "100%" }}>
        <h1 className="profile__title">Perfil de Manuel Baella</h1>

        {edit ? (
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
          >
            <div className="profile__edit__body">
              <button
                className="profile__edit__body__imgContainer"
                style={{
                  backgroundImage: `url(${imgurl})`,
                }}
                onClick={handlePhoto}
              >
                {imgurl === "" ? (
                  <div className="profile__edit__body__imgContainer__img">
                    <AddIcon fontSize="inherit" style={{ fontSize: "50px" }} />
                    Añadir Foto
                  </div>
                ) : (
                  <div className="profile__edit__body__imgContainer__img">
                    <InsertEmoticonIcon
                      fontSize="inherit"
                      style={{ fontSize: "50px" }}
                    />
                    Cambiar Foto
                  </div>
                )}
              </button>

              <div className="profile__edit__body__info">
                <div className="profile__edit__body__info__row">
                  <p className="profile__edit__body__info__row__text">
                    Nombre:{" "}
                    <span className="profile__edit__body__info__row__text__subtext">
                      Manuel
                    </span>
                  </p>
                  <p className="profile__edit__body__info__row__text">
                    Apellido:{" "}
                    <span className="profile__edit__body__info__row__text__subtext">
                      Baella
                    </span>
                  </p>
                </div>
                <p className="profile__edit__body__info__text">
                  Correo:{" "}
                  <span className="profile__edit__body__info__text__subtext">
                    test@test.com
                  </span>
                </p>
                <Form.Item name="password" label="Contraseña" hasFeedback>
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  label="Confirmar"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error("Las contraseñas no coinciden.")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <div className="profile__edit__body__info__buttonContainer">
                  <ButtonPrimary
                    onClick={() => setEdit(false)}
                    label="Cancelar"
                  />
                  <ButtonPrimary onClick={onFinish} label="Editar Perfil" />
                </div>
              </div>
            </div>
          </Form>
        ) : (
          <div className="profile__body">
            <div className="profile__body__imgContainer">
              <img
                className="profile__body__imgContainer__img"
                src={man}
                alt="photo profile"
              />
            </div>

            <div className="profile__body__info">
              <div className="profile__body__info__row">
                <p className="profile__body__info__row__text">
                  Nombre:{" "}
                  <span className="profile__body__info__row__text__subtext">
                    Manuel
                  </span>
                </p>
                <p className="profile__body__info__row__text">
                  Apellido:{" "}
                  <span className="profile__body__info__row__text__subtext">
                    Baella
                  </span>
                </p>
              </div>
              <p className="profile__body__info__text">
                Correo:{" "}
                <span className="profile__body__info__text__subtext">
                  test@test.com
                </span>
              </p>

              <div className="profile__body__info__buttonContainer">
                <ButtonPrimary
                  onClick={() => setEdit(true)}
                  label="Editar Perfil"
                />
              </div>
            </div>
          </div>
        )}

        <h3 className="profile__subtitle">Visitados recientemente</h3>
        <div className="profile__container">
          <CarouselCards2
            body={places.map((place, i) => (
              <CardSimplePlace
                key={i}
                name={place.name}
                difficulty={place.difficulty}
                walkTime={place.walkTime}
                time={place.time}
                city={place.city}
                image={catarata}
              />
            ))}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;

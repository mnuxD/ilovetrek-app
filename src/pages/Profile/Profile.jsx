import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toUser } from "../../redux/slices/userSlice";

import { ButtonPrimary } from "../../components/ButtonPrimary";
import { CardSimplePlace } from "../../components/CardSimplePlace";
import { CardPlace } from "../../components/CardPlace";

import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { Form, Input } from "antd";
import { CarouselCards2 } from "../../components/Carousel";
import images from "../../images/images";
import places from "../../utils/constants/MockPlaces";
import { cloudinary_constant } from "../../utils/constants/cloudinary_constant";
import "./_Profile.scss";

import {
  updateUser1Async,
  updateUser2Async,
  userToEdit,
} from "../../redux/slices/userSlice";

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
const { catarata } = images;

const Profile = () => {
  const dispatch = useDispatch();
  const USER = useSelector(toUser);
  const ID = JSON.parse(localStorage.getItem("infoUserILoveTrekApp"))?._id;
  const [edit, setEdit] = useState(false);
  const [photoUserUrl, setPhotoUserUrl] = useState(USER?.photo_url);
  const [passCorrect, setPassCorrect] = useState(true);
  const pass1 = useRef("");
  const pass2 = useRef("");
  const [form] = Form.useForm();

  console.log(pass1.current?.input?.value, pass2.current?.input?.value);
  console.log(passCorrect);
  const goEdit = async () => {
    setEdit(true);
    await dispatch(userToEdit(USER));
    setPhotoUserUrl(USER?.photo_url);
    setPassCorrect(true);
  };
  const onFinish = async () => {
    const dataUser1 = {
      password: pass1.current?.input?.value,
      photo_url: photoUserUrl,
    };
    const dataUser2 = {
      photo_url: photoUserUrl,
    };
    if (pass1.current?.input?.value === pass2.current?.input?.value) {
      await dispatch(userToEdit(dataUser2));
      if (pass1.current?.input?.value !== "") {
        await dispatch(updateUser1Async({ id: ID, ...dataUser1 }));
      } else if (pass1.current?.input?.value === "") {
        await dispatch(updateUser2Async({ id: ID, ...dataUser2 }));
      }
      setEdit(false);
    }
  };
  const handlePhoto = (e) => {
    e.preventDefault();

    window.cloudinary.openUploadWidget(
      cloudinary_constant("user-ilovetrekapp", true, false),
      (err, result) => {
        if (!err && result?.event === "success") {
          const { secure_url } = result?.info;
          setPhotoUserUrl(secure_url);
        }
      }
    );
  };

  return (
    <div className="profile">
      <div style={{ width: "100%" }}>
        <h1 className="profile__title">
          Perfil de {USER?.firstname.split(" ")[0]}{" "}
          {USER?.lastname.split(" ")[0]}
        </h1>

        {edit ? (
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
          >
            <div className="profile__edit__body">
              <div
                className="profile__edit__body__imgContainer"
                style={{
                  backgroundImage: `url(${photoUserUrl})`,
                }}
                onClick={handlePhoto}
              >
                {USER?.photo_url === "" ? (
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
              </div>

              <div className="profile__edit__body__info">
                <div className="profile__edit__body__info__row">
                  <p className="profile__edit__body__info__row__text">
                    Nombre:{" "}
                    <span className="profile__edit__body__info__row__text__subtext">
                      {USER?.firstname}
                    </span>
                  </p>
                  <p className="profile__edit__body__info__row__text">
                    Apellido:{" "}
                    <span className="profile__edit__body__info__row__text__subtext">
                      {USER?.lastname}
                    </span>
                  </p>
                </div>
                <p className="profile__edit__body__info__text">
                  Correo:{" "}
                  <span className="profile__edit__body__info__text__subtext">
                    {USER?.email}
                  </span>
                </p>
                <Form.Item name="password" label="Contraseña" hasFeedback>
                  <Input.Password ref={pass1} />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  label="Confirmar"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (getFieldValue("password") === value) {
                          setPassCorrect(true);
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          setPassCorrect(false),
                          new Error("Las contraseñas no coinciden.")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password ref={pass2} />
                </Form.Item>
                <div className="profile__edit__body__info__buttonContainer">
                  <ButtonPrimary
                    onClick={() => setEdit(false)}
                    label="Cancelar"
                  />
                  <ButtonPrimary
                    onClick={onFinish}
                    label="Guardar"
                    disabled={!passCorrect}
                  />
                </div>
              </div>
            </div>
          </Form>
        ) : (
          <div className="profile__body">
            <div className="profile__body__imgContainer">
              {USER?.photo_url === "" ? (
                <PersonIcon fontSize="inherit" />
              ) : (
                <img
                  className="profile__body__imgContainer__img"
                  src={USER?.photo_url}
                  onerror=""
                />
              )}
            </div>

            <div className="profile__body__info">
              <div className="profile__body__info__row">
                <p className="profile__body__info__row__text">
                  Nombre:{" "}
                  <span className="profile__body__info__row__text__subtext">
                    {USER?.firstname}
                  </span>
                </p>
                <p className="profile__body__info__row__text">
                  Apellido:{" "}
                  <span className="profile__body__info__row__text__subtext">
                    {USER?.lastname}
                  </span>
                </p>
              </div>
              <p className="profile__body__info__text">
                Correo:{" "}
                <span className="profile__body__info__text__subtext">
                  {USER?.email}
                </span>
              </p>

              <div className="profile__body__info__buttonContainer">
                <ButtonPrimary onClick={goEdit} label="Editar Perfil" />
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

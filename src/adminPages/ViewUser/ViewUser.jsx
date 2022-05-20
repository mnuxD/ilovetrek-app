import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "antd";

import { ButtonPrimary } from "../../components/ButtonPrimary";

import PersonIcon from "@mui/icons-material/Person";

import "./_ViewUser.scss";

import {
  getOneUserAsync,
  toUser,
  updateUser2Async,
  userToEdit,
} from "../../redux/slices/userSlice";
import { useNavigate, useParams } from "react-router-dom";
const { TextArea } = Input;

const ViewUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const USER = useSelector(toUser);
  const { id } = useParams();

  useEffect(async () => {
    await dispatch(getOneUserAsync(id));
  }, []);

  const handleApprove = () => {
    const userApproved = {
      status: "Aprobado",
      role: "guide",
    };
    dispatch(updateUser2Async({ id, ...userApproved }));
    dispatch(userToEdit(userApproved));
  };

  const handleReject = () => {
    const userRejected = {
      status: "Rechazado",
      role: "user",
    };
    dispatch(updateUser2Async({ id, ...userRejected }));
    dispatch(userToEdit(userRejected));
  };

  const handleBlock = async () => {
    const userBlocked = {
      status: "none",
      role: "user",
    };
    await dispatch(updateUser2Async({ id, ...userBlocked }));
    await dispatch(userToEdit(userBlocked));
  };

  return (
    <div className="profile">
      <div style={{ width: "100%" }}>
        <h1 className="profile__title">
          Perfil de {USER?.firstname.split(" ")[0]}{" "}
          {USER?.lastname.split(" ")[0]}
        </h1>

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
          </div>
        </div>
      </div>
      <div className="guide">
        <div className="guide__container">
          <h3 className="guide__container__subsubtitle">Redes sociales</h3>
          <div className="guide__container__social">
            <div className="guide__container__social__item">
              <span className="guide__container__social__item__label">
                Instagram:
              </span>{" "}
              <Input
                required
                style={{ width: "250px" }}
                value={USER?.instagram}
              />
            </div>
            <div className="guide__container__social__item">
              <span className="guide__container__social__item__label">
                Facebook:
              </span>{" "}
              <Input
                required
                style={{ width: "250px" }}
                value={USER?.facebook}
              />
            </div>
            <div className="guide__container__social__item">
              <span className="guide__container__social__item__label">
                LinkedIn:
              </span>{" "}
              <Input
                required
                style={{ width: "250px" }}
                value={USER?.linkedin}
              />
            </div>
            <div className="guide__container__social__item">
              <span className="guide__container__social__item__label">
                Otro:
              </span>{" "}
              <Input style={{ width: "250px" }} value={USER?.other1} />
            </div>
            <div className="guide__container__social__item">
              <span className="guide__container__social__item__label">
                Otro:
              </span>{" "}
              <Input style={{ width: "250px" }} value={USER?.other2} />
            </div>
            <div className="guide__container__social__item">
              <span className="guide__container__social__item__label">
                Otro:
              </span>{" "}
              <Input style={{ width: "250px" }} value={USER?.other3} />
            </div>
          </div>
          <h3 className="guide__container__subsubtitle">Acerca de ti</h3>
          <p className="guide__container__text">
            Cuentanos acerca de ti y tu experiencia guiando o explorando.
          </p>
          <TextArea
            value={USER?.about_you}
            required
            placeholder="Cuéntanos tu experiencia..."
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
          <h3 className="guide__container__subsubtitle">
            Acciones de Administrador
          </h3>
        </div>
        <div className="guide__buttons">
          <ButtonPrimary
            label="Aprobar"
            disabled={USER?.status === "Aprobado"}
            onClick={handleApprove}
          />
          <ButtonPrimary
            label="Rechazar"
            disabled={
              USER?.status === "Rechazado" || USER?.status === "Aprobado"
            }
            onClick={handleReject}
          />
          <ButtonPrimary
            label="Bloquear Beneficios de Guía"
            disabled={USER?.status !== "Aprobado"}
            onClick={handleBlock}
          />
          <ButtonPrimary
            label="Volver"
            onClick={() => navigate("/admin/usuarios")}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewUser;

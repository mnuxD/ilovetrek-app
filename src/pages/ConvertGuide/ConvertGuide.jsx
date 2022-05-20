import { Input } from "antd";
import { useEffect, useState } from "react";
import { ButtonPrimaryForm } from "../../components/ButtonPrimaryForm";
import { ButtonPrimary } from "../../components/ButtonPrimary";
import {
  updateUser2Async,
  userToEdit,
  toUser,
} from "../../redux/slices/userSlice";
import "./_ConvertGuide.scss";
import { useDispatch, useSelector } from "react-redux";

const { TextArea } = Input;

const ConvertGuide = () => {
  const ID = JSON.parse(localStorage.getItem("infoUserILoveTrekApp"))?._id;
  const USER = useSelector(toUser);
  const dispatch = useDispatch();
  const [send, setSend] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { elements } = e.target;
    const guideProfile = {
      status: "Enviado",
      instagram: elements[0].value,
      facebook: elements[1].value,
      linkedin: elements[2].value,
      other1: elements[3].value,
      other2: elements[4].value,
      other3: elements[5].value,
      about_you: elements[6].value,
    };
    dispatch(userToEdit(guideProfile));
    await dispatch(updateUser2Async({ id: ID, ...guideProfile }));
    setSend(true);
  };

  const handleSendOther = () => {
    setSend(false);
  };
  useEffect(() => {
    if (USER?.status === "send") {
      setSend(true);
    }
  }, [USER?.status]);
  return (
    <>
      {!send ? (
        <form onSubmit={handleSubmit} className="guide">
          <h1 className="guide__title">Convertirme en Guía</h1>
          <div className="guide__container">
            <p className="guide__container__subtitle">
              ¿Qué significa ser un guía?
            </p>
            <p className="guide__container__text">
              Como guía de I LOVE TREK podrás editar y registrar nuevos destinos
              en la sección de “Buscar un destino” y dar a conocer nuestro
              maravilloso país a los amantes del trekking. Por otro lado, podrás
              registrar en la plataforma grupos más numerosos de personas a
              quienes vayas a guiar en alguna ruta de trekking.
            </p>
            <p className="guide__container__subtitle">
              ¿Por qué necesitan mis datos?
            </p>
            <p className="guide__container__text">
              De esta manera podremos asegurarnos de que eres una persona
              capacitada para compartir información vital de los destinos de
              trekking y poder guiar grupos de personas por estas rutas. La
              información que nos brindes a continuación no será compartida con
              nadie.
            </p>
            <h3 className="guide__container__subsubtitle">Redes sociales</h3>
            <p className="guide__container__text">
              Ingrese sus redes sociales que demuestren su experiencia guiando,
              perfil profesional, entre otros.
            </p>
            <div className="guide__container__social">
              <div className="guide__container__social__item">
                <span className="guide__container__social__item__label">
                  Instagram:
                </span>{" "}
                <Input required style={{ width: "250px" }} />
              </div>
              <div className="guide__container__social__item">
                <span className="guide__container__social__item__label">
                  Facebook:
                </span>{" "}
                <Input required style={{ width: "250px" }} />
              </div>
              <div className="guide__container__social__item">
                <span className="guide__container__social__item__label">
                  LinkedIn:
                </span>{" "}
                <Input required style={{ width: "250px" }} />
              </div>
              <div className="guide__container__social__item">
                <span className="guide__container__social__item__label">
                  Otro:
                </span>{" "}
                <Input style={{ width: "250px" }} />
              </div>
              <div className="guide__container__social__item">
                <span className="guide__container__social__item__label">
                  Otro:
                </span>{" "}
                <Input style={{ width: "250px" }} />
              </div>
              <div className="guide__container__social__item">
                <span className="guide__container__social__item__label">
                  Otro:
                </span>{" "}
                <Input style={{ width: "250px" }} />
              </div>
            </div>
            <h3 className="guide__container__subsubtitle">Acerca de ti</h3>
            <p className="guide__container__text">
              Cuentanos acerca de ti y tu experiencia guiando o explorando.
            </p>
            <TextArea
              //   value={value}
              //   onChange={this.onChange}
              required
              placeholder="Cuéntanos tu experiencia..."
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </div>
          <div className="guide__button">
            <ButtonPrimaryForm label="Enviar" />
          </div>
        </form>
      ) : (
        <div className="guide">
          <h1 className="guide__title">Convertirme en Guía</h1>
          <div className="guide__container">
            <p className="guide__container__text2">
              Ya has enviado tu solicitud para convertirte en guía.
            </p>
            <h3 className="guide__container__subsubtitle">
              ¿Quieres enviar una nueva solicitud?
            </h3>
            <p className="guide__container__text2">
              Esto reempazará tu solicitud anterior.
            </p>
          </div>
          <div className="guide__button">
            <ButtonPrimary
              label="Enviar nueva solicitud"
              onClick={handleSendOther}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ConvertGuide;

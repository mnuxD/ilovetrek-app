import { useNavigate } from "react-router-dom";
import { ButtonPrimary } from "../ButtonPrimary";

import "./_CardPlace.scss";

const CardPlace = ({ name, difficulty, walkTime, time, image, city }) => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate("/buscar-destino/place");
  };

  return (
    <div className="card">
      <div className="card__containerImage">
        <img
          className="card__containerImage__image"
          src={image}
          alt="photo__place"
        />
      </div>
      <div className="card__text">
        <p className="card__text__title">{name}</p>
        <p className="card__text__info">
          Dificultad:{" "}
          <span className="card__text__info--data">{difficulty}</span>
        </p>
        <p className="card__text__info">
          Tiempo de Caminata:{" "}
          <span className="card__text__info--data">{walkTime}</span>
        </p>
        <p className="card__text__extrainfo">
          A {time} horas de {city}
        </p>
        <div className="card__text__button">
          <ButtonPrimary label="Ver más" onClick={handleViewMore} />
        </div>
      </div>
    </div>
  );
};

export default CardPlace;

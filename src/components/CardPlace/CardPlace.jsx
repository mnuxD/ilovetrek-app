import { useNavigate } from "react-router-dom";
import { ButtonPrimary } from "../ButtonPrimary";

import "./_CardPlace.scss";

const CardPlace = ({ name, difficulty, time, time_city, image, city, id }) => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    window.location = `/buscar-destino/destino/${id}`;
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
          Caminata:{" "}
          <span className="card__text__info--data">
            {time[0]} - {time[1]} horas
          </span>
        </p>
        <p className="card__text__extrainfo">
          A {time_city} horas de {city}
        </p>
        <div className="card__text__button">
          <ButtonPrimary label="Ver más" onClick={handleViewMore} />
        </div>
      </div>
    </div>
  );
};

export default CardPlace;

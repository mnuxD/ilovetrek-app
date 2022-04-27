import { useNavigate } from "react-router-dom";
import { ButtonPrimary } from "../ButtonPrimary";

import "./_OtherCard.scss";

const CardSimplePlace = ({ name, difficulty, walkTime, time, image, city }) => {
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
        <p className="card__text__title2">{name}</p>
        <p className="card__text__info2">Visitado el 27/04/2022</p>

        <div className="card__text__button">
          <ButtonPrimary label="Volver a ver" onClick={handleViewMore} />
        </div>
      </div>
    </div>
  );
};

export default CardSimplePlace;

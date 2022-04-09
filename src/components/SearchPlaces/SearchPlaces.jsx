import { useState, useRef, useEffect } from "react";

import { CarouselCards } from "../../components/Carousel";
import { CardPlace } from "../../components/CardPlace";

import images from "../../images/images.jsx";
import places from "../../utils/constants/MockPlaces";

import "./_SearchPlaces.scss";

const { catarata, notfound } = images;

const SearchPlaces = () => {
  const [selectedPlaces, setSelectedPlaces] = useState(places);
  const place = useRef("");
  const city = useRef("");
  const difficulty = useRef("");

  const filter = () => {
    let selected = [];
    const transformText = (str) => {
      return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    };
    places?.map((placemap, i) => {
      if (
        transformText(placemap.name).includes(
          transformText(place.current.value)
        ) &&
        transformText(placemap.city).includes(
          transformText(city.current.value)
        ) &&
        transformText(placemap.difficulty).includes(
          transformText(difficulty.current.value)
        )
      ) {
        selected.push(placemap);
      }
    });
    setSelectedPlaces(selected);
  };

  const handleCleanPlace = () => {
    place.current.value = "";
    filter();
  };
  const handleCleanCity = () => {
    city.current.value = "";
    filter();
  };
  const handleCleanDifficulty = () => {
    difficulty.current.value = "";
    filter();
  };
  return (
    <>
      <div className="search">
        <form className="search__form">
          <span className="search__form__label">Lugar: </span>
          <input
            className="search__form__input"
            placeholder="Nombre del destino"
            name="place"
            ref={place}
            onChange={filter}
          />
          <input
            onClick={handleCleanPlace}
            className="search__form__button"
            type="reset"
            value="X"
          />
        </form>
        <form className="search__form">
          <span className="search__form__label">Ciudad: </span>
          <input
            className="search__form__input"
            placeholder="Ciudad del destino"
            ref={city}
            onChange={filter}
          />
          <input
            onClick={handleCleanCity}
            className="search__form__button"
            type="reset"
            value="X"
          />
        </form>
        <form className="search__form">
          <span className="search__form__label">Dificultad: </span>
          <select
            className="search__form__input"
            placeholder="Dificultad del destino"
            ref={difficulty}
            onChange={filter}
            defaultValue=""
          >
            <option value="">Seleccione una dificultad</option>
            <option value="Facil">Fácil</option>
            <option value="Media">Media</option>
            <option value="Exigente">Exigente</option>
            <option value="Experto">Experto</option>
          </select>
          <input
            onClick={handleCleanDifficulty}
            className="search__form__button2"
            type="reset"
            value="X"
          />
        </form>
      </div>
      {selectedPlaces.length !== 0 ? (
        <CarouselCards
          body={selectedPlaces.map((place, i) => (
            <CardPlace
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
      ) : (
        <div className="carousel__notFound">
          <img
            className="carousel__notFound__image"
            src={notfound}
            alt="place not found"
          />
          <p className="carousel__notFound__text">
            No hemos encontrado el destino que buscas :(
          </p>
        </div>
      )}
    </>
  );
};

export default SearchPlaces;

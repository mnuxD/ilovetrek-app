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
    places?.map((placemap, i) => {
      if (
        placemap.name
          .toLowerCase()
          .includes(place.current.value.toLowerCase()) &&
        placemap.city
          .toLowerCase()
          .startsWith(city.current.value.toLowerCase()) &&
        placemap.difficulty
          .toLowerCase()
          .startsWith(difficulty.current.value.toLowerCase())
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
          <input
            className="search__form__input"
            placeholder="Dificultad del destino"
            ref={difficulty}
            onChange={filter}
          />
          <input
            onClick={handleCleanDifficulty}
            className="search__form__button"
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
        <div className="notFound">
          <img
            className="notFound__image"
            src={notfound}
            alt="place not found"
          />
          <p className="notFound__text">
            No hemos encontrado el destino que buscas :(
          </p>
        </div>
      )}
    </>
  );
};

export default SearchPlaces;

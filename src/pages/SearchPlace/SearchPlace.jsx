import "./_SearchPlace.scss";
import { SearchPlaces2 } from "../../components/SearchPlaces";

const SearchPlace = () => {
  return (
    <div className="searchPlace">
      <h1 className="searchPlace__title">
        Bienvenido Manuel, elige el destino ideal para ti
      </h1>
      <div className="searchPlace__container">
        <SearchPlaces2 />
      </div>
    </div>
  );
};

export default SearchPlace;

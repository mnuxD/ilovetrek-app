import { useEffect } from "react";

import "./_SearchPlace.scss";
import { SearchPlaces2 } from "../../components/SearchPlaces";
import { toUser } from "../../redux/slices/userSlice";

import { useSelector, useDispatch } from "react-redux";
import { getAllPlacesAsync, allPlaces } from "../../redux/slices/placeSlice";

const SearchPlace = () => {
  const dispatch = useDispatch();
  const USER = useSelector(toUser);
  const places = useSelector(allPlaces);

  useEffect(async () => {
    const places_await = await dispatch(getAllPlacesAsync());
    console.log(places);
  }, []);
  return (
    <div className="searchPlace">
      <h1 className="searchPlace__title">
        Bienvenid@ {USER?.firstname.split(" ")[0]}, elige el destino ideal para
        ti
      </h1>
      <div className="searchPlace__container">
        {places && <SearchPlaces2 places={places} />}
      </div>
    </div>
  );
};

export default SearchPlace;

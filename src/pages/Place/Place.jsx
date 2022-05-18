import { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import { ButtonPrimary } from "../../components/ButtonPrimary";
import { CardComment } from "../../components/CardComment";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

import "./_Place.scss";

import images from "../../images/images";
import comments from "../../utils/constants/MockComments";
import { ModalComment } from "../../components/ModalComment";

import { useSelector, useDispatch } from "react-redux";
import { getOnePlaceAsync, thisPlace } from "../../redux/slices/placeSlice";
import {
  getRatingsByPlaceAsync,
  ratings,
} from "../../redux/slices/ratingSlice";
import { useParams } from "react-router-dom";

const { catarata, man } = images;

const Place = () => {
  const dispatch = useDispatch();
  const ID_USER = JSON.parse(localStorage.getItem("infoUserILoveTrekApp"))?._id;
  const { id } = useParams();
  const place = useSelector(thisPlace);
  const thisRatings = useSelector(ratings);
  console.log("RATINGS", thisRatings);
  useEffect(async () => {
    const place_await = await dispatch(getOnePlaceAsync(id));
    const ratings_await = await dispatch(getRatingsByPlaceAsync(id));
    console.log("PLACE", place);
  }, []);
  const color = "#00d23b";
  const [value, setValue] = useState(null);

  return (
    <div className="place">
      <section className="place__section1">
        <div className="place__section1__photoContainer">
          <img
            className="place__section1__photoContainer__image"
            src={place?.photos[0]}
            alt="photo_place"
          />
        </div>
        <div className="place__section1__infoContainer">
          <p className="place__section1__infoContainer__title">{place?.name}</p>
          <div className="place__section1__infoContainer__info">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className="place__section1__infoContainer__info__label">
                Dificultad:{" "}
                <span className="place__section1__infoContainer__info__label__text">
                  {place?.difficulty}
                </span>
              </p>
              <p className="place__section1__infoContainer__info__label">
                Aforo:{" "}
                <span className="place__section1__infoContainer__info__label__text">
                  {place?.capacity}
                </span>
              </p>
            </div>
            <p className="place__section1__infoContainer__info__label">
              Tiempo de Caminata:{" "}
              <span className="place__section1__infoContainer__info__label__text">
                {place?.time[0]}-{place?.time[1]} horas
              </span>
            </p>
            <p className="place__section1__infoContainer__info__label">
              Ubicación:{" "}
              <span className="place__section1__infoContainer__info__label__text">
                A {place?.time_city} horas de {place?.city}
              </span>
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p className="place__section1__infoContainer__info__label">
                Calificación:{" "}
                <span className="place__section1__infoContainer__info__label__text">
                  {place?.rating}
                </span>
              </p>
              <Rating
                value={parseFloat(place?.rating)}
                precision={0.1}
                readOnly
              />
            </div>
          </div>
        </div>
      </section>

      <section className="place__section2">
        <p className="place__section2__text">{place?.description}</p>
        <p className="place__section2__title">
          ¿Cuándo visitarás {place?.name}
        </p>
        <div className="place__section2__container">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Seleccione fecha"
              value={value}
              minDate={moment(moment().format("L")).toDate()}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField size="small" {...params} />}
            />
          </LocalizationProvider>
          <TextField
            size="small"
            label="Cantidad de personas"
            sx={{ m: 1, width: "200px" }}
            defaultValue={1}
            readOnly
            type="number"
            onKeyDown={(event) => {
              event.preventDefault();
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">persona(s)</InputAdornment>
              ),
              inputProps: { min: 1, max: 5 },
            }}
          />

          <ButtonPrimary label="Registrar Visita" />
        </div>
        <div
          className="place__section2__capacity"
          style={{ backgroundColor: `${color}` }}
        >
          20 personas registraron su asistencia el 20/04/2022
        </div>
        <p className="place__section2__note">
          Nota: El registro de tu visita es únicamente utilizado para saber
          aproximadamente la cantidad de personas que visitarán este destino en
          esa fecha y mostrárselo a los demás para evitar aglomeraciones. No
          compartiremos la fecha de tu visita con nadie.
        </p>
        <div className="place__section2__container">
          <div className="place__section2__container__item">
            <div className="place__section2__container__item--green" />
            Poca concurrencia
          </div>
          <div className="place__section2__container__item">
            <div className="place__section2__container__item--orange" />
            Media concurrencia
          </div>
          <div className="place__section2__container__item">
            <div className="place__section2__container__item--red" />
            Alta concurrencia, no recomendable asistir
          </div>
        </div>
        <p className="place__section2__title">¿Cómo llegar?</p>
        <p className="place__section2__text">{place?.how_to_get}</p>
        <p className="place__section2__title">Recomendaciones</p>
        <p className="place__section2__text">{place?.tips}</p>
        <p className="place__section2__title">
          ¿Ya has visitado {place?.name}?
        </p>
        <ModalComment
          place_name={place?.name}
          place_id={place?._id}
          user_id={ID_USER}
        />

        <div className="place__section2__containerComments">
          {thisRatings?.map((rating, i) => (
            <CardComment
              key={i}
              name={rating.name_user}
              rating={rating.rating}
              comment={rating.comment}
              photo_user={rating.photo_user}
              image={rating.photo_url}
            />
          ))}
          {thisRatings?.length === 0 && <>Hola</>}
        </div>
      </section>
    </div>
  );
};

export default Place;

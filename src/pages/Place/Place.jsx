import { useState } from "react";
import Rating from "@mui/material/Rating";
import { ButtonPrimary } from "../../components/ButtonPrimary";
import { AddComment } from "../../components/AddComment";
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

const { catarata, man } = images;

const Place = () => {
  const color = "#00d23b";
  const [value, setValue] = useState(null);

  return (
    <div className="place">
      <section className="place__section1">
        <div className="place__section1__photoContainer">
          <img
            className="place__section1__photoContainer__image"
            src={catarata}
            alt="photo_place"
          />
        </div>
        <div className="place__section1__infoContainer">
          <p className="place__section1__infoContainer__title">
            Catarata Antankallo
          </p>
          <div className="place__section1__infoContainer__info">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className="place__section1__infoContainer__info__label">
                Dificultad:{" "}
                <span className="place__section1__infoContainer__info__label__text">
                  Media
                </span>
              </p>
              <p className="place__section1__infoContainer__info__label">
                Aforo:{" "}
                <span className="place__section1__infoContainer__info__label__text">
                  30
                </span>
              </p>
            </div>
            <p className="place__section1__infoContainer__info__label">
              Tiempo de Caminata:{" "}
              <span className="place__section1__infoContainer__info__label__text">
                2-3 horas
              </span>
            </p>
            <p className="place__section1__infoContainer__info__label">
              Ubicación:{" "}
              <span className="place__section1__infoContainer__info__label__text">
                A 3 horas de Lima
              </span>
            </p>
            <img src={catarata} alt="mapa" /> {/*Aca va el mapa */}
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
                  4.9
                </span>
              </p>
              <Rating defaultValue={2} precision={0.1} readOnly />
            </div>
          </div>
        </div>
      </section>
      <section className="place__section2">
        <p className="place__section2__text">
          La Catarata de Antankallo, forma parte de algunas de las caídas de
          agua que se pueden ubicar en la región de Lima. Esta caída de agua, se
          encuentra en el distrito de Matucana, en la provincia de Huarochirí,
          en el mismo Valle del Rímac.
        </p>
        <p className="place__section2__title">
          ¿Cuándo visitarás Catarata Antankallo
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
        <p className="place__section2__text">
          Para llegar a la Catarata Antankallo, debemos dirigirnos hacia chosica
          y tomar el transporte publico hacia la ciudad de Matucana. Una vez
          ahi, dirígete hacia la entrada de la ruta a una cuadra de la plaza de
          armas (puedes preguntar una referencia a los lugareños). Deberás pagar
          una entrada de S./3.00 y empezarás la ruta hacia Antankallo.
        </p>
        <p className="place__section2__title">Recomendaciones</p>
        <p className="place__section2__text">
          Recuerda llevar bloqueador solar, repelente, agua para el camino y
          alimentos ligeros. También ten en cuenta llevar ropa adecuada ya que
          es un lugar caluroso, asi como calzado con cocadas ya que el camino es
          accidentado y empinado por ciertos tramos.
        </p>
        <p className="place__section2__title">
          ¿Ya has visitado Catarata Antankallo?
        </p>
        <AddComment />
        <ModalComment />
        <div className="place__section2__containerComments">
          {comments.map((comment, i) => (
            <CardComment
              key={i}
              name={comment.name}
              lastname={comment.lastname}
              rating={comment.rating}
              comment={comment.comment}
              image={man}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Place;

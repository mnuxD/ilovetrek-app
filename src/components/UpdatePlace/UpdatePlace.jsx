import "./_UpdatePlace.scss";
import { ButtonPrimaryForm } from "../ButtonPrimaryForm";
import { ButtonPrimary } from "../ButtonPrimary";
import { Input, Select } from "antd";
import FlipCameraIosIcon from "@mui/icons-material/FlipCameraIos";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { cloudinary_constant } from "../../utils/constants/cloudinary_constant";
import { updatePlaceAsync, placeToEdit } from "../../redux/slices/placeSlice";

const { TextArea } = Input;
const { Option } = Select;

const UpdatePlace = ({ place, id, onClickChangeUpdate }) => {
  const dispatch = useDispatch();
  const [difficulty, setDifficulty] = useState();
  const [photosPlaceUrl, setPhotosPlaceUrl] = useState([]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const placeData = {
      name: e.target[0].value,
      photos: photosPlaceUrl.length === 0 ? place.photos : photosPlaceUrl,
      difficulty: !difficulty ? place.difficulty : difficulty,
      capacity: e.target[2].value,
      time: [e.target[3].value, e.target[4].value],
      time_city: e.target[5].value,
      city: e.target[6].value,
      description: e.target[7].value,
      how_to_get: e.target[8].value,
      tips: e.target[9].value,
    };
    await dispatch(placeToEdit(placeData));
    await dispatch(updatePlaceAsync({ id: id, ...placeData }));
    onClickChangeUpdate();
  };

  const handlePhotos = (e) => {
    e.preventDefault();
    let photosArray = [];
    window.cloudinary.openUploadWidget(
      cloudinary_constant("place-ilovetrekapp", false, true),
      (err, result) => {
        if (!err && result?.event === "success") {
          photosArray.push(result.info.secure_url);
          setPhotosPlaceUrl(photosArray);
        }
      }
    );
  };

  return (
    <>
      {place && (
        <form onSubmit={handleUpdate} className="createPlace">
          <h1 className="createPlace__title">Crear un Destino</h1>
          <section className="createPlace__section1">
            <div
              style={{
                backgroundImage: `url(${
                  photosPlaceUrl.length > 0
                    ? photosPlaceUrl[0]
                    : place?.photos[0]
                })`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            >
              <div
                onClick={handlePhotos}
                className="createPlace__section1__photoContainer"
              >
                <FlipCameraIosIcon fontSize="inherit" />
                Cambiar Fotos
              </div>
            </div>

            <div className="createPlace__section1__infoContainer">
              <Input
                defaultValue={place?.name}
                required
                placeholder="Nombre del lugar"
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  padding: "5px",
                }}
              />
              <div className="createPlace__section1__infoContainer__info">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="createPlace__section1__infoContainer__info__label">
                    Dificultad:{" "}
                    <Select
                      required
                      style={{ width: "100px" }}
                      placeholder=""
                      onChange={(e) => setDifficulty(e)}
                      defaultValue={place?.difficulty}
                    >
                      <Option value="Fácil">Fácil</Option>
                      <Option value="Media">Media</Option>
                      <Option value="Exigente">Exigente</Option>
                      <Option value="Difícil">Difícil</Option>
                    </Select>
                  </div>
                  <div className="createPlace__section1__infoContainer__info__label">
                    Aforo:{" "}
                    <Input
                      required
                      style={{ width: "50px", padding: "5px" }}
                      type="number"
                      defaultValue={place?.capacity}
                    />
                  </div>
                </div>
                <div className="createPlace__section1__infoContainer__info__label">
                  Tiempo de Caminata:{" "}
                  <span className="createPlace__section1__infoContainer__info__label__text">
                    <Input
                      required
                      style={{ width: "35px", padding: "5px" }}
                      type="number"
                      defaultValue={place?.time[0]}
                    />
                    -
                    <Input
                      required
                      style={{ width: "35px", padding: "5px" }}
                      type="number"
                      defaultValue={place?.time[1]}
                    />{" "}
                    horas
                  </span>
                </div>
                <div className="createPlace__section1__infoContainer__info__label">
                  Ubicación:{" "}
                  <span className="createPlace__section1__infoContainer__info__label__text">
                    A{" "}
                    <Input
                      required
                      style={{ width: "35px", padding: "5px" }}
                      type="number"
                      defaultValue={place?.time_city}
                    />{" "}
                    horas de{" "}
                    <Input
                      required
                      style={{ width: "100px", padding: "5px" }}
                      placeholder="Ciudad"
                      defaultValue={place?.city}
                    />
                  </span>
                </div>
              </div>
            </div>
          </section>
          <section className="createPlace__section2">
            <TextArea
              required
              placeholder="Breve descripción del lugar..."
              autoSize={{ minRows: 3, maxRows: 5 }}
              defaultValue={place?.description}
            />

            <p className="createPlace__section2__title">¿Cómo llegar?</p>
            <TextArea
              required
              placeholder="Información detallada de como llegar al lugar..."
              autoSize={{ minRows: 5, maxRows: 6 }}
              defaultValue={place?.how_to_get}
            />
            <p className="createPlace__section2__title">Recomendaciones</p>
            <TextArea
              required
              placeholder="Describe las recomendaciones que deben seguir los visitantes para tener una mejor experiencia..."
              autoSize={{ minRows: 5, maxRows: 6 }}
              defaultValue={place?.tips}
            />
          </section>
          <div style={{ marginTop: "20px" }}>
            <ButtonPrimaryForm label="Guardar cambios" />{" "}
            <ButtonPrimary
              label="Cancelar Cambios"
              onClick={() => onClickChangeUpdate()}
            />
          </div>
        </form>
      )}
    </>
  );
};

export default UpdatePlace;

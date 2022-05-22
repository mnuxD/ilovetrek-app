import "./_CreatePlace.scss";
import { ButtonPrimaryForm } from "../../components/ButtonPrimaryForm";
import { ButtonPrimary } from "../../components/ButtonPrimary";
import { Form, Input, Select } from "antd";
import AddIcon from "@mui/icons-material/Add";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cloudinary_constant } from "../../utils/constants/cloudinary_constant";
import { createPlaceAsync, placeCreated } from "../../redux/slices/placeSlice";

const { TextArea } = Input;
const { Option } = Select;

const CreatePlace = () => {
  const dispatch = useDispatch();
  const isCreated = useSelector(placeCreated);
  const ID = JSON.parse(localStorage.getItem("infoUserILoveTrekApp"))?._id;
  const ROLE = JSON.parse(localStorage.getItem("infoUserILoveTrekApp"))?.role;
  const [difficulty, setDifficulty] = useState();
  const [photosPlaceUrl, setPhotosPlaceUrl] = useState([]);
  const [created, setCreated] = useState(false);

  useEffect(() => {
    if (isCreated) setCreated(true);
  }, [isCreated]);

  const handleCreate = async (e) => {
    e.preventDefault();
    const newPlace = {
      id_user: ID,
      name: e.target[0].value,
      photos: photosPlaceUrl,
      difficulty: difficulty,
      capacity: e.target[2].value,
      time: [e.target[3].value, e.target[4].value],
      time_city: e.target[5].value,
      city: e.target[6].value,
      description: e.target[7].value,
      how_to_get: e.target[8].value,
      tips: e.target[9].value,
    };
    await dispatch(createPlaceAsync(newPlace));
    // setCreated(true);
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
      {!created ? (
        <form onSubmit={handleCreate} className="createPlace">
          <h1 className="createPlace__title">Crear un Destino</h1>
          <section className="createPlace__section1">
            {photosPlaceUrl[0] ? (
              <div
                onClick={handlePhotos}
                className="createPlace__section1__photoContainer"
                style={{
                  backgroundImage: `url(${photosPlaceUrl[0]})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                }}
              >
                <AddIcon fontSize="inherit" />
                Añadir Fotos
              </div>
            ) : (
              <div
                onClick={handlePhotos}
                className="createPlace__section1__photoContainer"
              >
                <AddIcon fontSize="inherit" />
                Añadir Fotos
              </div>
            )}

            <div className="createPlace__section1__infoContainer">
              <Input
                required
                placeholder="Nombre del lugar"
                style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
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
                    />
                    -
                    <Input
                      required
                      style={{ width: "35px", padding: "5px" }}
                      type="number"
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
                    />{" "}
                    horas de{" "}
                    <Input
                      required
                      style={{ width: "100px", padding: "5px" }}
                      placeholder="Ciudad"
                    />
                  </span>
                </div>
              </div>
            </div>
          </section>
          <section className="createPlace__section2">
            <TextArea
              //   value={value}
              //   onChange={this.onChange}
              required
              placeholder="Breve descripción del lugar..."
              autoSize={{ minRows: 3, maxRows: 5 }}
            />

            <p className="createPlace__section2__title">¿Cómo llegar?</p>
            <TextArea
              //   value={value}
              //   onChange={this.onChange}
              required
              placeholder="Información detallada de como llegar al lugar..."
              autoSize={{ minRows: 5, maxRows: 6 }}
            />
            <p className="createPlace__section2__title">Recomendaciones</p>
            <TextArea
              //   value={value}
              //   onChange={this.onChange}
              required
              placeholder="Describe las recomendaciones que deben seguir los visitantes para tener una mejor experiencia..."
              autoSize={{ minRows: 5, maxRows: 6 }}
            />
          </section>
          <div style={{ marginTop: "20px" }}>
            <ButtonPrimaryForm
              label="Finalizar"
              disabled={photosPlaceUrl.length === 0 || !difficulty}
            />
          </div>
        </form>
      ) : (
        <div className="created">
          <h1 className="created__title">
            Su destino ha sido creado con éxito! Un administrador verificará los
            datos registrados para su posterior publicación.
          </h1>
          <div className="created__buttons">
            {ROLE !== "admin" && (
              <ButtonPrimary
                label="Buscar destinos"
                onClick={() => (window.location = "/buscar-destino")}
              />
            )}

            <ButtonPrimary
              label="Registrar otro lugar"
              onClick={() => (window.location = "/crear-destino")}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePlace;

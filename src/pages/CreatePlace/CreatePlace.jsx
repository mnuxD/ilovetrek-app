import "./_CreatePlace.scss";
import { ButtonPrimaryForm } from "../../components/ButtonPrimaryForm";
import { Form, Input, Select } from "antd";
import AddIcon from "@mui/icons-material/Add";

import images from "../../images/images";

const { catarata } = images;
const { TextArea } = Input;
const { Option } = Select;

const CreatePlace = () => {
  const handleCreate = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleCreate} className="createPlace">
      <h1 className="createPlace__title">Crear un Destino</h1>
      <section className="createPlace__section1">
        <div className="createPlace__section1__photoContainer">
          <AddIcon fontSize="inherit" />
          Añadir Imagen
        </div>
        <div className="createPlace__section1__infoContainer">
          <Input
            required
            placeholder="Nombre del lugar"
            style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
          />
          <div className="createPlace__section1__infoContainer__info">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="createPlace__section1__infoContainer__info__label">
                Dificultad:{" "}
                <Select required style={{ width: "100px" }} placeholder="">
                  <Option value="Fácil">Fácil</Option>
                  <Option value="Media">Media</Option>
                  <Option value="Exigente">Exigente</Option>
                  <Option value="Experto">Experto</Option>
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
            <img src={catarata} alt="mapa" /> {/*Aca va el mapa */}
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
        <ButtonPrimaryForm label="Finalizar" />
      </div>
    </form>
  );
};

export default CreatePlace;

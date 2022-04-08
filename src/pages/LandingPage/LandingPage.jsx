import { ButtonSecondaryPurple } from "../../components/ButtonSecondaryPurple";
import { ButtonSecondary } from "../../components/ButtonSecondary";
import { SearchPlaces } from "../../components/SearchPlaces";

import images from "../../images/images.jsx";

import "./_LandingPage.scss";

const { logo, ig, fb, tiktok, turist, guide } = images;
const LandingPage = () => {
  const handleClick = () => {
    console.log("Gola");
  };
  return (
    <div className="root">
      <section className="section1">
        <div className="section1__containerLogo">
          <img
            className="section1__containerLogo__logo"
            src={logo}
            alt="logo_ilovetrek"
          />
        </div>
        <div className="section1__containerTitle">
          <h1 className="section1__containerTitle__title">
            <span className="section1__containerTitle__title--1">Inicia</span>{" "}
            <span className="section1__containerTitle__title--2">esta</span>{" "}
            <br />
            <span className="section1__containerTitle__title--1">aventura</span>
          </h1>
          <p className="section1__containerTitle__subtitle">
            Encuentra destinos hermosos a pocas horas de tu ciudad y compártenos
            tu experiencia.
          </p>
          <div className="section1__containerTitle__buttons">
            <ButtonSecondaryPurple label="Ingresar" />
            <ButtonSecondaryPurple label="Registrarme" />
          </div>
        </div>
        <div className="section1__containerSocialmedia">
          <img
            className="section1__containerSocialmedia__socialmedia"
            src={fb}
            alt="facebook-icon"
          />
          <img
            className="section1__containerSocialmedia__socialmedia"
            src={ig}
            alt="instagram-icon"
          />
          <img
            className="section1__containerSocialmedia__socialmedia"
            src={tiktok}
            alt="tiktok-icon"
          />
        </div>
        <img className="section1__turist" src={turist} alt="turist" />
      </section>
      <section className="section2">
        <div className="section2__titleContainer">
          <h1 className="section2__titleContainer__title">
            Elige el destino ideal para ti
          </h1>
        </div>
        <SearchPlaces />
      </section>
      <section className="section3">
        <div className="section3__text">
          <p className="section3__text__title">¿Tienes experiencia guiando?</p>
          <p className="section3__text__subtitle">
            Se parte de nuestra comunidad de guías y comparte nuevos destinos
          </p>
          <div className="section3__text__button">
            <ButtonSecondary label="Unirme" />
          </div>
        </div>

        <img className="section3__image" src={guide} alt="photo_guide" />
      </section>
    </div>
  );
};

export default LandingPage;

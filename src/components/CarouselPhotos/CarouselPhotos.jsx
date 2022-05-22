import { Carousel } from "antd";
import "./_CarouselPhotos.scss";

const CarouselPhotos = ({ photos }) => (
  <Carousel autoplay dots={true}>
    {photos.map((photo, i) => (
      <div key={i} className="containerPhotos">
        <img className="containerPhotos__image" src={photo} alt="photo" />
      </div>
    ))}
  </Carousel>
);

export default CarouselPhotos;

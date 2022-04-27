import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";

import "./_CardComment.scss";
import images from "../../images/images";

const { man, catarata } = images;

const CardComment = ({ name, lastname, rating, comment, image, photoUser }) => {
  return (
    <div className="cardComment">
      <div className="cardComment__containerImage">
        <img
          className="cardComment__containerImage__image"
          src={catarata}
          alt="photo__place"
        />
      </div>
      <div className="cardComment__containerText">
        <div className="cardComment__containerText__row">
          <div className="cardComment__containerText__row__item">
            <Avatar alt={name} src={man} />
            <p className="cardComment__containerText__row__item__name">
              {name} {lastname}
            </p>
          </div>
          <div className="cardComment__containerText__row__item">
            <p className="cardComment__containerText__row__item__rating">
              {rating}
            </p>
            <Rating defaultValue={rating} readOnly />
          </div>
        </div>
        <div className="cardComment__containerText__commentContainer">
          {comment}
        </div>
      </div>
    </div>
  );
};

export default CardComment;

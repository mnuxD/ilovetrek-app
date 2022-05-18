import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { ButtonPrimary } from "../ButtonPrimary";
import { ButtonPrimaryOutlined } from "../ButtonPrimaryOutlined";
import { Upload, message, Input } from "antd";
import { RetweetOutlined, PlusOutlined } from "@ant-design/icons";
import { AddComment } from "./AddComment";
import { cloudinary_constant } from "../../utils/constants/cloudinary_constant";
import {
  getRatingsByPlaceAsync,
  createRatingAsync,
  ratingCreated,
} from "../../redux/slices/ratingSlice";
import { getOnePlaceAsync } from "../../redux/slices/placeSlice";

import "./_ModalComment.scss";
import labels from "../../utils/constants/RatingLabels";

const { TextArea } = Input;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
};

const getLabelText = (value) => {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
};

const ModalComment = ({ place_name, place_id, user_id }) => {
  const dispatch = useDispatch();
  const isCreated = useSelector(ratingCreated);
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [value, setValue] = useState();
  const [commentValue, setCommentValue] = useState("");
  const [hover, setHover] = useState(-1);
  const handleOpen = () => {
    setValue();
    setImageUrl("");
    setCommentValue("");
    setOpen(true);
  };
  const handleClose = () => {
    setValue();
    setImageUrl("");
    setCommentValue("");
    setOpen(false);
  };

  const handlePhoto = (e) => {
    e.preventDefault();
    window.cloudinary.openUploadWidget(
      cloudinary_constant("rating-ilovetrekapp", true, false),
      (err, result) => {
        if (!err && result?.event === "success") {
          const { secure_url } = result?.info;
          setImageUrl(secure_url);
        }
      }
    );
  };

  const handlePublish = async () => {
    const newRating = {
      id_user: user_id,
      id_place: place_id,
      photo_url: imageUrl,
      rating: value,
      comment: commentValue,
    };
    console.log("RATING", newRating);
    await dispatch(createRatingAsync(newRating));
    await dispatch(getRatingsByPlaceAsync(place_id));
    await dispatch(getOnePlaceAsync(place_id));
    handleClose();
  };

  return (
    <div>
      <AddComment onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="boxModal">
          <div
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundSize: "cover",
            }}
          >
            <div className="boxModal__button" onClick={handlePhoto}>
              {imageUrl ? (
                // <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                <div className="boxModal__button__content">
                  <RetweetOutlined className="boxModal__button__content__icon" />
                  <div className="boxModal__button__content__text">
                    Cambiar imagen
                  </div>
                </div>
              ) : (
                <div className="boxModal__button__content">
                  <PlusOutlined className="boxModal__button__content__icon" />
                  <div className="boxModal__button__content__text">
                    Agregar imagen
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="boxModal__body">
            <p className="boxModal__body__title">
              ¿Como calificarías {place_name}?
            </p>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Rating
                size="large"
                // value={value}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              {value !== null ? (
                <Box style={{ height: "22px" }}>
                  {labels[hover !== -1 ? hover : value]}
                </Box>
              ) : (
                <Box style={{ height: "22px" }} />
              )}
            </Box>
            <TextArea
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Cuéntanos tu experiencia..."
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
            <div className="boxModal__body__buttonContainer">
              <ButtonPrimaryOutlined label="Cancelar" onClick={handleClose} />
              <ButtonPrimary
                label="Enviar"
                onClick={handlePublish}
                disabled={imageUrl === "" || !value || commentValue === ""}
              />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalComment;

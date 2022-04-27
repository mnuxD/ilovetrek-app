import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { ButtonPrimary } from "../ButtonPrimary";
import { ButtonPrimaryOutlined } from "../ButtonPrimaryOutlined";
import { Upload, message, Input } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";

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

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const getLabelText = (value) => {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
};

const ModalComment = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [value, setValue] = useState();
  const [hover, setHover] = useState(-1);
  const [rows, setRows] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl("www.image.com");
        setLoading(false);
      });
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="boxModal">
          {/* <ImgCrop rotate> */}
          <Upload
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            <div className="boxModal__button">
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                <div className="boxModal__button__content">
                  {loading ? (
                    <LoadingOutlined className="boxModal__button__content__icon" />
                  ) : (
                    <PlusOutlined className="boxModal__button__content__icon" />
                  )}
                  <div className="boxModal__button__content__text">
                    Agregar imagen
                  </div>
                </div>
              )}
            </div>
          </Upload>
          {/* </ImgCrop> */}
          <div className="boxModal__body">
            <p className="boxModal__body__title">
              ¿Como calificarías Catarata Antakallo?
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
                value={value}
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
              //   value={value}
              //   onChange={this.onChange}
              placeholder="Cuéntanos tu experiencia..."
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
            <div className="boxModal__body__buttonContainer">
              <ButtonPrimaryOutlined label="Cancelar" onClick={handleClose} />
              <ButtonPrimary label="Enviar" onClick={handleClose} />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalComment;

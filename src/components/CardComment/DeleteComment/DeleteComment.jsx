import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ButtonPrimary } from "../../ButtonPrimary";

import "./_DeleteComment.scss";

import {
  deleteRatingAsync,
  getRatingsByPlaceAsync,
} from "../../../redux/slices/ratingSlice";
import { getOnePlaceAsync } from "../../../redux/slices/placeSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DeleteComment = ({ idRating, idPlace }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = async () => {
    await dispatch(deleteRatingAsync(idRating));
    await dispatch(getRatingsByPlaceAsync(id));
    await dispatch(getOnePlaceAsync(idPlace));
    handleClose();
  };

  return (
    <div className="containerDelete">
      <IconButton onClick={handleOpen}>
        <DeleteIcon fontSize="inherit" color="error" />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ¿Desea eliminar esta publicación permanentemente?
          </Typography>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <ButtonPrimary label="Eliminar" onClick={handleDelete} />
            <ButtonPrimary label="Cancelar" onClick={handleClose} />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteComment;

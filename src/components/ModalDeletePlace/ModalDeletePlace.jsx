import { useState } from "react";
import { useDispatch } from "react-redux";
import { ButtonPrimary } from "../../components/ButtonPrimary";
import {
  deletePlaceAsync,
  getAllPlacesAsync,
} from "../../redux/slices/placeSlice";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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

const ModalDeletePlace = ({ idPlace, namePlace }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleDelete = async () => {
    await dispatch(deletePlaceAsync(idPlace));
    await dispatch(getAllPlacesAsync());
    setOpen(false);
  };
  return (
    <>
      <a onClick={handleOpen} href="">
        Eliminar
      </a>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ¿Desea eliminar el destino {namePlace} permanentemente?
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
    </>
  );
};

export default ModalDeletePlace;

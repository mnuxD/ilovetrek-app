import "./_PlacesAdmin.scss";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllPlacesAsync,
  deletePlaceAsync,
  allPlaces,
} from "../../redux/slices/placeSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const PlacesAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const places = useSelector(allPlaces);

  useEffect(async () => {
    await dispatch(getAllPlacesAsync());
  }, []);

  return (
    <div className="places">
      <h1 className="places__title">Administrar Destinos</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell align="right">Estado</StyledTableCell>
              <StyledTableCell align="right">Calificación</StyledTableCell>
              <StyledTableCell align="right">Opciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {places?.map((place, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell component="th" scope="row">
                  {place.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {place.verified ? "Verificado" : "No verificado"}
                </StyledTableCell>
                <StyledTableCell align="right">{place.rating}</StyledTableCell>
                <StyledTableCell align="right">
                  <a
                    href=""
                    onClick={() => navigate(`/admin/destinos/${place._id}`)}
                  >
                    Revisar
                  </a>{" "}
                  |{" "}
                  <a
                    onClick={async () =>
                      await dispatch(deletePlaceAsync(place._id))
                    }
                    href=""
                  >
                    Eliminar
                  </a>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PlacesAdmin;

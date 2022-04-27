import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

const ButtonsDrawer = [
  {
    text: "Buscar un destino",
    url: "/buscar-destino",
    user: "both",
    icon: <TravelExploreIcon style={{ color: "white" }} />,
  },
  {
    text: "Perfil",
    url: "/perfil",
    user: "both",
    icon: <PersonIcon style={{ color: "white" }} />,
  },
  {
    text: "Convertirme en Guía",
    url: "/convertirme-en-guia",
    user: "user",
    icon: <GroupsIcon style={{ color: "white" }} />,
  },
  {
    text: "Crear un Destino",
    url: "/crear-destino",
    user: "guide",
    icon: <AddLocationAltIcon style={{ color: "white" }} />,
  },
];

export default ButtonsDrawer;

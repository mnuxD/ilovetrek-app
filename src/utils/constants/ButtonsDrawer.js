import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import BadgeIcon from "@mui/icons-material/Badge";

const ButtonsDrawer = [
  {
    text: "Buscar un destino",
    url: "/buscar-destino",
    user: "both",
    admin: false,
    icon: <TravelExploreIcon style={{ color: "white" }} />,
  },
  {
    text: "Perfil",
    url: "/perfil",
    user: "both",
    admin: false,
    icon: <PersonIcon style={{ color: "white" }} />,
  },
  {
    text: "Convertirme en Guía",
    url: "/convertirme-en-guia",
    user: "user",
    admin: false,
    icon: <GroupsIcon style={{ color: "white" }} />,
  },
  {
    text: "Administrar Usuarios",
    url: "/admin/usuarios",
    user: "admin",
    admin: true,
    icon: <BadgeIcon style={{ color: "white" }} />,
  },
  {
    text: "Administrar Destinos",
    url: "/admin/destinos",
    user: "admin",
    admin: true,
    icon: <DisplaySettingsIcon style={{ color: "white" }} />,
  },

  {
    text: "Crear un Destino",
    url: "/crear-destino",
    user: "guide",
    admin: true,
    icon: <AddLocationAltIcon style={{ color: "white" }} />,
  },
];

export default ButtonsDrawer;

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneUserAsync, toUser } from "../../redux/slices/userSlice";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import images from "../../images/images";

import "./_LayoutLeft.scss";
import ButtonsDrawer from "../../utils/constants/ButtonsDrawer";

const { logo } = images;

const drawerWidth = 240;

const LayoutLeft = ({ body }, props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [url, setUrl] = useState(location.pathname);
  console.log("url", url);

  const { windows } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  //ROLE
  const ROLE = JSON.parse(localStorage.getItem("infoUserILoveTrekApp"))?.role;
  //ID
  const ID = JSON.parse(localStorage.getItem("infoUserILoveTrekApp"))?._id;
  //USER
  const USER = useSelector(toUser);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const endSesion = async () => {
    await localStorage.removeItem("infoUserILoveTrekApp");
    window.location = "/";
  };
  console.log("USER", USER);
  useEffect(() => {
    if (!USER) dispatch(getOneUserAsync(ID));
  }, []);

  const drawer = (
    <div className="drawer">
      <div>
        <div className="drawer__header">
          <Avatar
            className="drawer__header__avatar"
            alt={USER?.firstname}
            src={USER?.photo_url}
          />
          <p className="drawer__header__name">
            {USER?.firstname?.split(" ")[0]} {USER?.lastname?.split(" ")[0]}
          </p>
        </div>
        <List className="drawer__list">
          {ButtonsDrawer.map(
            (item, i) =>
              (item.user === ROLE || item.user === "both") && (
                <ListItem
                  key={i}
                  button
                  className="drawer__list__item"
                  onClick={() => navigate(item.url)}
                  style={{
                    backgroundColor: "#355790",
                    marginBottom: "5px",
                  }}
                >
                  <ListItemIcon className="drawer__list__item__iconContainer">
                    {item.icon}
                  </ListItemIcon>
                  <p className="drawer__list__item__text">{item.text}</p>
                </ListItem>
              )
          )}
          <ListItem
            button
            className="drawer__list__item"
            onClick={endSesion}
            style={{
              backgroundColor: "#355790",
              marginBottom: "5px",
            }}
          >
            <ListItemIcon className="drawer__list__item__iconContainer">
              <LogoutIcon className="drawer__list__item__iconContainer__icon" />
            </ListItemIcon>
            <p className="drawer__list__item__text">Cerrar Sesión</p>
          </ListItem>
        </List>
      </div>
      <div className="drawer__footer">
        <a href="/">
          <img className="drawer__footer__logo" src={logo} alt="logo" />
        </a>
      </div>
    </div>
  );

  // const container =
  //   window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex" }}>
      {url === "/" ||
      url === "/ingresar" ||
      url === "/registro" ||
      url === "/registro-exitoso" ? (
        <></>
      ) : (
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            // container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            // ModalProps={{
            //   keepMounted: true, // Better open performance on mobile.
            // }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
        style={{
          padding: "0px",
        }}
      >
        {url === "/" ||
        url === "/ingresar" ||
        url === "/registro" ||
        url === "/registro-exitoso" ? (
          <></>
        ) : (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
            style={{
              position: "absolute",
              marginLeft: "5px",
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        {body}
      </Box>
    </Box>
  );
};

export default LayoutLeft;

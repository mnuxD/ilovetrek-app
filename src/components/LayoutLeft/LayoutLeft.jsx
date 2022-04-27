import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const [url, setUrl] = useState(location.pathname);
  console.log("url", url);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const endSesion = () => {
    console.log("end sesion");
  };

  const drawer = (
    <div className="drawer">
      <div>
        <div className="drawer__header">
          <Avatar
            className="drawer__header__avatar"
            alt="Manuel Baella"
            src="/broken-image.jpg"
          />
          <p className="drawer__header__name">Manuel Baella</p>
        </div>
        <List className="drawer__list">
          {ButtonsDrawer.map((item, i) => (
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
          ))}
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
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
        style={{
          display:
            url === "/" || url === "/ingresar" || url === "/registro"
              ? "none"
              : "flex",
        }}
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
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
          style={{
            position: "absolute",
            marginLeft: "5px",
            display:
              (url === "/" || url === "/ingresar" || url === "/registro") &&
              "none",
          }}
        >
          <MenuIcon />
        </IconButton>
        {body}
      </Box>
    </Box>
  );
};

export default LayoutLeft;

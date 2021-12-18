import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import "./Navbar.css";
import Searchbar from "./Searchbar";
import UserAvatar from "./UserAvatar";

export default function Navbar() {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          CHIRP
        </Typography>
        <NavLink to="/" className="navLink">
          <Typography variant="button"> Home </Typography>
        </NavLink>
        <NavLink to="/profile" className="navLink">
          <Typography variant="button"> Profile </Typography>
        </NavLink>
        <Searchbar />
        <UserAvatar user={user} sx={{ marginLeft: "auto", p: 0 }} />
        <Button size="small" onClick={logout} variant="outlined" sx={{ mx: 2 }}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

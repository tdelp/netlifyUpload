
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Logo = "/images/Adoptopia.png";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    handleMenuClose();
    navigate("/");
  };
  const buttonStyle = {
                        marginLeft: "8px",
                        transition: "background-color 0.3s ease",
                        "&:hover": {
                          backgroundColor: "gray",
                        },
                      };
  return (
    <AppBar position="static" sx={{ bgcolor: "darkgreen" , display: "flex"}}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
       
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={Logo}
            alt="Adoptopia Logo"
            style={{ height: "60px", marginRight: "15px" }}
          />
        </Box>

        {/* Desktop Menu */}
        <Box>
          <Button component={Link} to="/" color="inherit" sx={buttonStyle}>
            Home
          </Button>
          {isAuthenticated ? (
            <>
              <Button component={Link} to="/main" color="inherit" sx={buttonStyle}>
                Leadership Board
              </Button>
              <Button component={Link} to="/species" color="inherit" sx={buttonStyle}>
                Browse Animals
              </Button>
              <Button component={Link} to="/profile" color="inherit" sx={buttonStyle}>
                Profile
              </Button>
              <Button onClick={handleLogout} color="inherit" sx={buttonStyle}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" color="inherit" sx={buttonStyle}>
                Login
              </Button>
              <Button component={Link} to="/register" color="inherit" sx={buttonStyle}>
                Register
              </Button>
            </>
          )}
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem component={Link} to="/" onClick={handleMenuClose}>
              Home
            </MenuItem>
            {isAuthenticated ? (
              <>
                <MenuItem component={Link} to="/main" onClick={handleMenuClose}>
                  LeaderBoard
                </MenuItem>
                <MenuItem component={Link} to="/species" onClick={handleMenuClose}>
                  Browse Animals
                </MenuItem>
                <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </>
            ) : (
              <>
                <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
                  Login
                </MenuItem>
                <MenuItem component={Link} to="/register" onClick={handleMenuClose}>
                  Register
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

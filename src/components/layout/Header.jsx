import * as React from 'react';
import { useState } from 'react';
import { Card } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Button, Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../../features/user/userSlice'
import { userLogoutReq } from '../../apis';
import Cookies from 'js-cookie'
import { useAlert } from 'react-alert';
import Logo from '../../images/logo.png'



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Header() {
  const [keyword, setKeyword] = useState("");
  const alert = useAlert();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const SearchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`)
    } else {
      navigate('/products')
    }
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  function getAllCookieNames() {
    const cookies = document.cookie.split("; ");
    const cookieNames = cookies.map(cookie => cookie.split("=")[0]);
    return cookieNames;
  }

  const handleLogout = () => {
    userLogoutReq()
      .then(res => {
        console.log(Cookies.get('token'))
        Cookies.remove("token");
        localStorage.removeItem("token");
        console.log("Token removed successfully.");
        dispatch(userLogout());
        navigate('/');
        alert.success("Logout successfully.");
      });
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <img
                src={Logo}
                alt="Logo"
                style={{ width: "40px", height: "40px", color: "white" }}
              />
            </IconButton>
          </Link>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Typography
              color='white'
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              SHOPAHOLIC
            </Typography>
          </Link>

          <Search style={{ display: 'inline' }}>
            <Stack direction="row">
              <IconButton onClick={SearchSubmitHandler}>
                <SearchIcon style={{ color: 'white' }} />
              </IconButton>
              <StyledInputBase
                component='span'
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </Stack>
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          {
            isAuthenticated && user ? (
              <>
                <Link style={{ textDecoration: 'none' }} to='/me'>
                  <IconButton sx={{ px: 2 }}>
                    <Avatar src={user.user.avatar.url} />
                  </IconButton>
                </Link>
                <Link to='me/cart'>
                  <IconButton sx={{ pr: 2 }} color='white' aria-label="cart" >
                    <Badge badgeContent={totalItemsInCart} color="primary">
                      <ShoppingCartIcon style={{ color: 'white' }} />
                    </Badge>
                  </IconButton>
                </Link>
                <Link style={{ textDecoration: 'none' }}>
                  <Button onClick={handleLogout} sx={{ px: 2, whiteSpace: 'nowrap' }} variant='contained'>
                    Sign Out
                  </Button>
                </Link>
              </>

            ) : (
              <Link style={{ textDecoration: 'none' }} to='/user/login'>
                <Button sx={{ px: 2, whiteSpace: 'nowrap' }} variant='contained'>
                  Log In
                </Button>
              </Link>
            )
          }
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
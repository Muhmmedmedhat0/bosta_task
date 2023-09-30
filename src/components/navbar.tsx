import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { setLanguage } from '../app/features/language/language-slice';
import { styled, alpha } from '@mui/material/styles';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import PrimarySearch from './search';

function Navbar() {
  const pages = ['home', 'prices', 'talkToSalesDepartment'];
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // languages
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );

  React.useEffect(() => {
    // Set the language when the component mounts
    i18n.changeLanguage(currentLanguage);
  }, [i18n, currentLanguage]);

  const availableLanguages = ['ENG', 'العربية']; // Add more languages as needed

  const handleLanguageChange = (newLanguage: string) => {
    if (newLanguage !== currentLanguage) {
      dispatch(setLanguage(newLanguage));
      if (newLanguage === 'ENG') {
        i18n.changeLanguage('en');
      } else {
        i18n.changeLanguage('ar');
      }
    }
  };

  // search
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
    position="static"
      sx={{ borderBottom: '1px solid #ddd', backgroundColor: 'white' }}
      className="main-color"
      elevation={0}>
        <Toolbar>
          <Link to="/" className="main-color">
            <Typography
              variant="h4"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Cairo',
                fontWeight: 700,
                textDecoration: 'none',
              }}>
              {t('logo')}
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              className="main-color">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}>
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    sx={{
                      fontFamily: 'Cairo',
                      fontSize: '1rem',
                      '&:hover': { color: '#f4050d' },
                    }}
                    color="black"
                    textAlign="center">
                    {' '}
                    {t(page)}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link to="/">
            <Typography
              className="main-color"
              variant="h4"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                textDecoration: 'none',
                fontFamily: 'Cairo',
              }}>
              {t('logo')}
            </Typography>
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex', alignItems: 'center' },
            }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  display: 'block',
                  mx: 2,
                  fontFamily: 'Cairo',
                  fontSize: '1rem',
                  color: 'black',
                  '&:hover': { color: '#f4050d' },
                }}>
                {t(page)}
              </Button>
            ))}
            <Box>
              <Button
                sx={{
                  color: 'black',
                  fontFamily: 'Cairo',
                  fontSize: '1rem',
                  '&:hover': { color: '#f4050d' },
                }}
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                disableElevation
                onClick={handleClick}
                endIcon={
                  open ? (
                    <KeyboardArrowDownIcon />
                  ) : currentLanguage === 'العربية' ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )
                }>
                {t('trackYourOrder')}
              </Button>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}>
                <Typography py={1} textAlign="center">
                  {t('trackYourOrder')}
                </Typography>
                <PrimarySearch />
              </StyledMenu>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mx: 2 }}>
                <Typography
                  sx={{
                    color: 'black',
                    fontFamily: 'Cairo',
                    fontSize: '1rem',
                    '&:hover': { color: '#f4050d' },
                  }}>
                  {currentLanguage}
                </Typography>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {availableLanguages.map((language) => {
                if (language !== currentLanguage) {
                  return (
                    <MenuItem
                      key={language}
                      onClick={() => handleLanguageChange(language)}>
                      <Typography
                        sx={{
                          color: 'black',
                          fontFamily: 'Cairo',
                          fontSize: '1rem',
                          '&:hover': { color: '#f4050d' },
                        }}
                        onClick={handleCloseUserMenu}
                        textAlign="center">
                        {language}
                      </Typography>
                    </MenuItem>
                  );
                }
                return null;
              })}
            </Menu>
          </Box>
        </Toolbar>
    </AppBar>
  );
}
export default Navbar;

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

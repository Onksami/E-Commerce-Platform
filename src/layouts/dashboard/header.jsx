import PropTypes from 'prop-types';
import {  useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';

import Iconify from 'src/components/iconify';

import Searchbar from './common/searchbar';
import { NAV, HEADER } from './config-layout';
import AccountPopover from './common/account-popover';
import LanguagePopover from './common/language-popover';
import { AuthContext } from '../../context/AuthContext';
import NotificationsPopover from './common/notifications-popover';


// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');

    const navigate = useNavigate(); // useNavigate kancasını kullanarak navigate fonksiyonunu tanımlayın

  
  const authContext = useContext(AuthContext);

  // eslint-disable-next-line prefer-destructuring
  const session = authContext.session; 

  console.log("Header Session", session);

  // const shouldRenderContent = session !== null; // if session value is not "null", then it renders true, 

  const renderContent = (
    <>
    {!lgUp && (
      <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
        <Iconify icon="eva:menu-2-fill" />
      </IconButton>
    )}

    <Searchbar />

    <Box sx={{ flexGrow: 1 }} />

    
    {session === null ? ( // Check if session is null 
    <Stack direction="row" alignItems="center" spacing={1}> 
      <Button onClick={() => navigate('/login')} color="primary"> 
        Login
      </Button> 
      <Button onClick={() => navigate('/register')} color="primary"> 
        Register
      </Button> 
      </Stack>
    ) : (
      <Stack direction="row" alignItems="center" spacing={1}>
        <LanguagePopover />
        <NotificationsPopover />
        <AccountPopover />
      </Stack>
    )}


  
  </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

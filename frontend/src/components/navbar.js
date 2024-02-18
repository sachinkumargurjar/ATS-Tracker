import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import SvgIcon from '@mui/material/SvgIcon';

// Import your SVG file
import { ReactComponent as TestSvg } from './test.svg';
import name from './name.svg';

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <SvgIcon component={TestSvg} viewBox="0 0 24 24" sx={{ width: 32, height: 32 }} />
          <Typography width="72.77px" height="19.81px">Crux</Typography>
          <Avatar
            alt="User Logo"
            src="/user-logo.jpg" // Replace with the path to your user logo
            sx={{ width: 32, height: 32 }}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

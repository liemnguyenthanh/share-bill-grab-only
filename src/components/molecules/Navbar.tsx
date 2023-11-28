import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import Image from 'next/image';

function Navbar() {
  return (
    <AppBar color="transparent" position="static">
      <Toolbar>
        <Image src="/images/bita.webp" alt="logo" width={80} height={80} />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

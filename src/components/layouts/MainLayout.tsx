'use Client';
import { Box, Container } from '@mui/material';
import { PropsWithChildren } from 'react';
import Navbar from '../molecules/Navbar';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Container maxWidth="lg">
      <Navbar />
      <Box display="flex" gap={1} marginTop={2}>
        {children}
      </Box>
    </Container>
  );
};

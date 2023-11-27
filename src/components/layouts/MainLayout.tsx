'use Client';
import { Box, Container } from '@mui/material';
import { PropsWithChildren } from 'react';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Container maxWidth="lg">
      <Box display="flex" gap={1}>
        {children}
      </Box>
    </Container>
  );
};

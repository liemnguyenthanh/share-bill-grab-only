'use client';
import { Box, keyframes } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const loader = keyframes`
  from {
    transform: translate(-30px);
  }
  to {
    transform: translate(300px);
  }
`;

const LoadingItem = styled(Box)({
  background: `linear-gradient(to bottom, #2838c7 0%,#5979ef 17%,#869ef3 32%,#869ef3 45%,#5979ef 59%,#2838c7 100%)`,
  animation: `${loader} 2s infinite`,
  animationTimingFunction: 'linear',
});

export const Loading = () => {
  return (
    <Box height={'100dvh'} display="flex" alignItems="center" justifyContent="center">
      <Box
        width={300}
        height={10}
        border={2}
        borderRadius={'7px'}
        borderColor={'#b2b2b2'}
        p={'2px 1px'}
        overflow="hidden"
        fontSize={0}
      >
        {Array.from({ length: 3 }, (_, index) => (
          <LoadingItem key={index} width={30} height={1} display="inline-block" mr={'2px'} />
        ))}
      </Box>
    </Box>
  );
};

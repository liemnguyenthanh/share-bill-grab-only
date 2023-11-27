'use client';
import { RankingType } from '@/types';
import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

type Props = {
  rankingItems: RankingType[];
};

export const Ranking = ({ rankingItems }: Props) => {
  return (
    <Stack
      gap={2}
      flexShrink={0}
      position="sticky"
      top={10}
      height={1}
      borderRadius={4}
      bgcolor={'#ff1818'}
      p={2}
    >
      <Typography fontWeight={500} fontSize={24} textAlign="center">
        Top 10 người ....
      </Typography>
      <Stack gap={1}>
        {rankingItems.map((item, index) => (
          <Box key={index}>
            <Typography>
              <Typography>No{index + 1}</Typography>
              {item.slug}
            </Typography>
            <Typography>{item.distance_to_now}</Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

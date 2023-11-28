'use client';
import { RankingType } from '@/types';
import { convertToVND, getDate, getTimeAgo } from '@/utils/helper';
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
        Top 10 người nợ lâu nhất bitA
      </Typography>
      <Stack gap={1}>
        {rankingItems.map((item, index) => (
          <Box key={index} mb={1.5} pb={1.5} borderBottom={2} borderColor={'white'}>
            <Box display="flex" alignItems="center" gap={2}>
              <Box
                borderRadius={50}
                p={1}
                bgcolor={'white'}
                width="fit-content"
                mb={1}
                display="flex"
                alignItems="end"
              >
                <Typography
                  fontSize={
                    index < 4 ? 40 * ((rankingItems.length - index) / rankingItems.length) : 14
                  }
                >
                  No.{index + 1}
                </Typography>
              </Box>

              <Typography fontSize={24} fontWeight={500} textTransform="capitalize">
                {item.name}
              </Typography>
            </Box>
            <Typography>{getDate(item.date)}</Typography>
            <Typography>
              {getTimeAgo(item.payment_period)} -- {convertToVND(item.price)}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

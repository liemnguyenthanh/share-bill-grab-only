'use client'
import { HomeProvider } from '@/providers';
import { Container, Grid, Stack } from '@mui/material';
import { DishManage, FeesManage, ShareBillResult, Steps } from '../molecules';

export const HomePage = () => {
  return (
    <HomeProvider>
      <Container maxWidth='xl'>
        <Grid container columnSpacing={5} my={2}>
          <Grid item md={8}>
            <DishManage />
          </Grid>
          <Grid item md={4}>
            <FeesManage />
          </Grid>
        </Grid>
        <Stack gap={2}>
          <Steps />
          <ShareBillResult />
        </Stack>
      </Container>
    </HomeProvider>
  )
}

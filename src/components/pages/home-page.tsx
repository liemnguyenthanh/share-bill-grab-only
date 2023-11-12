'use client'
import { HomeProvider } from '@/providers';
import { Container, Grid } from '@mui/material';
import { DishManage, FeesManage, ShareBillResult } from '../molecules';

export const HomePage = () => {
  return (
    <HomeProvider>
      <Container>
        <Grid container columnSpacing={5} my={2}>
          <Grid item md={6}>
            <DishManage />
          </Grid>
          <Grid item md={6}>
            <FeesManage />
          </Grid>
        </Grid>
        <ShareBillResult />
      </Container>
    </HomeProvider>
  )
}
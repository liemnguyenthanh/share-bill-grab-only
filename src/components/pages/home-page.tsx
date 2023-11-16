'use client'
import { HomeProvider } from '@/providers';
import { Container, CssBaseline } from '@mui/material';
import { ClientOnly } from '../atoms';
import { Steps } from '../molecules';
import { TabsProcessing } from '../organisms';

export const HomePage = () => {

  return (
    <HomeProvider>
      <ClientOnly>
        <CssBaseline />
        <Steps />
        <Container maxWidth='xl'>
          <TabsProcessing />
        </Container>
      </ClientOnly>
    </HomeProvider >
  )
}

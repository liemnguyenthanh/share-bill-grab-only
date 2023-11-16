import React from 'react'
import { DishManage, FeesManage, ShareBillResult } from '../molecules'
import { Box, Container } from '@mui/material'
import SwipeableViews from 'react-swipeable-views';
import { useHomeContext } from '@/providers';
import { ESteps } from '@/types';
export const TabsProcessing = () => {
  const { stepActive } = useHomeContext()
  const tabs = [
    {
      id: ESteps.DISH,
      component: <DishManage />
    },
    {
      id: ESteps.FEES,
      component: <FeesManage />
    },
    {
      id: ESteps.RESULT,
      component: <ShareBillResult />
    },
  ]

  return (
    <Container maxWidth='xl'>
      <SwipeableViews index={stepActive}>
        {tabs.map(tab => (
          <div
            role='tabpanel'
            id={`full-width-tabpanel-${tab.id}`}
            aria-labelledby={`full-width-tab-${tab.id}`}
            key={tab.id}
          >
            <Box m={2}>
              {tab.component}
            </Box>
          </div>
        ))}
      </SwipeableViews>
    </Container>
  )
}
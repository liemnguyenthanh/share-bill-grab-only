'use client'
import { HomeContext, useHomeContext } from '@/providers';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import PaidIcon from '@mui/icons-material/Paid';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import * as React from 'react';
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: '#d2d2d2',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className, icon } = props;
  const { updateStep } = useHomeContext()

  const icons: { [index: string]: React.ReactElement } = {
    1: <SettingsIcon />,
    2: <PaidIcon />,
    3: <Diversity1Icon />,
    4: <AccessibleForwardIcon />
  };

  const handleClick = () => {
    if (completed) {
      updateStep(parseFloat(String(icon)) - 1)
    }
  }

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className} onClick={handleClick} sx={{ cursor: completed ? 'pointer' : 'not-allowed' }}>
      {icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ['Upload dish', 'upload fees', 'fill total users', 'Liem by Calculate'];

export const Steps = () => {
  const [activeStep, setActiveStep] = React.useState(-1)
  const { dishItems, fees, totalMembers } = useHomeContext()

  React.useEffect(() => {
    if (dishItems.length) {
      setActiveStep(0)

      if (fees?.discount && fees.shipping && fees.subtotal) {
        setActiveStep(1)

        if (totalMembers) {
          setActiveStep(2)
          setTimeout(() => {
            setActiveStep(3)
          }, 1000);
        }
      }
    }
  }, [dishItems, fees, totalMembers])

  return (
    <Box pb={23}>
      <Box position='fixed' width={1} top={0} bgcolor={'#35b760'} zIndex={2} py={5}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                <Typography fontSize={14} color={'#fff'} textTransform={'capitalize'} fontWeight={600}>{label}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
}

import * as React from 'react';
import { styled } from '@mui/material/styles';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { shipmentData } from '../types/shipment.types';
import { useTranslation } from 'react-i18next';
import { Box, Paper } from '@mui/material';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'none',
      backgroundColor: '#f4050d',
      // edit direction on rtl
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'none',
      backgroundColor: '#f4050d',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'none',
    backgroundColor: '#f4050d',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'none',
    backgroundColor: '#f4050d',
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <LocalShippingIcon />,
    2: <LocalShippingIcon />,
    3: <LocalShippingIcon />,
    4: <DoneAllIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}>
      {/* {icons[String(props.icon)]} */}
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        icons[String(props.icon)]
      )}
    </ColorlibStepIconRoot>
  );
}

const steps = [
  'shipmentHasBeenCreated',
  'shipmentHasBeenReceivedFromTheMerchant',
  'shipmentIsOutForDelivery',
  'sentDeliveredHanded',
];

interface SteppersProps {
  shipmentData: shipmentData;
}

export default function Steppers({ shipmentData }: SteppersProps) {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = React.useState<number>(0);
  React.useEffect(() => {
    // Parse the shipmentData to determine the current step
    if (shipmentData && shipmentData.CurrentStatus) {
      const currentState = shipmentData.CurrentStatus.state;

      // Determine the current step based on currentState
      let newCurrentStep = 0;
      switch (currentState) {
        case 'PACKAGE_RECEIVED':
          newCurrentStep = 2;
          break;
        case 'OUT_FOR_DELIVERY':
          newCurrentStep = 3;
          break;
        case 'DELIVERED':
          newCurrentStep = 4;
          break;
        default:
          newCurrentStep = 1; // Default to the second step
          break;
      }

      setCurrentStep(newCurrentStep);
    }
  }, [shipmentData]);

  return (
    <Box mx={2} my={2}>
      <Paper variant="elevation">
        <Stepper
          alternativeLabel
          activeStep={currentStep}
          connector={<ColorlibConnector />}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {t(label)}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>
    </Box>
  );
}

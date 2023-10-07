import { Box, Grid, Paper, Typography } from '@mui/material';
import { shipmentData } from '../types/shipment.types';
import { useTranslation } from 'react-i18next';

interface statusProps {
  shipmentData: shipmentData;
}

function Status({ shipmentData }: statusProps) {
	const { t } = useTranslation();

  let fontColor = 'inherit'; // Default color

  // Check the value of shipmentData?.CurrentStatus?.state and set fontColor accordingly
  switch (shipmentData?.CurrentStatus?.state) {
    case 'DELIVERED':
      fontColor = 'green';
      break;
    case 'CANCELLED':
      fontColor = 'red';
      break;
    case 'DELIVERED_TO_SENDER':
      fontColor = 'yellow';
      break;
    // Add more cases for other status values if needed
    default:
      break;
  }
  
  return (
    <Box mx={2} my={2}>
      <Paper variant="elevation">
        <Grid container padding={2}>
          <Grid item xs={12} md={3} textAlign='start'>
            <Typography color='GrayText' mb={2}>{t('shippingNumber')}: {shipmentData?.TrackingNumber}</Typography>
            <Typography fontWeight='bolder' style={{ color: fontColor }}>{t(shipmentData?.CurrentStatus?.state)}</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography color='GrayText' mb={2}>{t('lastUpdate')}</Typography>
            <Typography fontWeight='bold'>{shipmentData?.CurrentStatus?.timestamp?.split('T')[0]}</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography color='GrayText' mb={2}>{t('merchantName')}</Typography>
            <Typography fontWeight='bold'>{shipmentData?.provider}</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography color='GrayText' mb={2}>{t('deliveryTimeTithin')}</Typography>
            <Typography fontWeight='bold'>{shipmentData?.PromisedDate?.split('T')[0]}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default Status;

import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { shipmentData } from '../types/shipment.types';
import Loading from './loading';
import { useAppSelector } from '../app/hooks';
import { useTranslation } from 'react-i18next';

interface statusProps {
  shipmentData: shipmentData;
}

function Status({ shipmentData }: statusProps) {
	const { t } = useTranslation();
  
  return (
    <Box mx={2} my={2}>
      <Paper variant="elevation">
        <Grid container padding={2}>
          <Grid item xs={12} md={3} textAlign='start'>
            <Typography color='GrayText' mb={2}>{t('shippingNumber')}:{shipmentData?.TrackingNumber}</Typography>
            <Typography>{shipmentData?.CurrentStatus?.state}</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography color='GrayText' mb={2}>{t('lastUpdate')}</Typography>
            <Typography>{shipmentData?.CurrentStatus?.timestamp?.split('T')[0]}</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography color='GrayText' mb={2}>{t('merchantName')}</Typography>
            <Typography>{shipmentData?.provider}</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography color='GrayText' mb={2}>{t('deliveryTimeTithin')}</Typography>
            <Typography>{shipmentData?.PromisedDate?.split('T')[0]}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default Status;

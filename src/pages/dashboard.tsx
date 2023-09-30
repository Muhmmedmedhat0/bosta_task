import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchShipmentByTrackingNumber } from '../app/features/shipments/shipment-slice';
import { useEffect } from 'react';
import Navbar from '../components/navbar';
import Error from '../components/error';

import Status from '../components/status';
import Loading from '../components/loading';
import { Grid, Typography } from '@mui/material';
import Steppers from '../components/stepper';

import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import BasicTable from '../components/basic-table';
import { useTranslation } from 'react-i18next';
import Information from '../components/information';
function Dashboard() {
  const dispatch = useAppDispatch();
  const { data, error, loading } = useAppSelector((state) => state.shipment);
  const { direction } = useAppSelector((state) => state.language);
  const { t } = useTranslation();

  // Create rtl cache
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

  useEffect(() => {
    dispatch(fetchShipmentByTrackingNumber());
  }, [dispatch]);

  if (loading === 'pending') {
    return <Loading />;
  }
  return (
    <>
      {error ? <Error /> : null}
      <Navbar />
      {data !== null ? (
        <>
          <Status shipmentData={data} />
          {direction === 'rtl' ? (
            <div dir="rtl">
              <CacheProvider value={cacheRtl}>
                <Steppers shipmentData={data} />
              </CacheProvider>
            </div>
          ) : (
            <div dir="ltr">
              <Steppers shipmentData={data} />
            </div>
          )}
          <Grid container padding={2} spacing={3}>
            <Grid item xs={12} lg={7}>
              <Typography color="GrayText" mb={2}>
                {t('shipmentDetails')}
              </Typography>
              <BasicTable shipmentData={data} />
            </Grid>
            <Grid item xs={12} lg={5}>
              <Typography color="GrayText" mb={2}>
                {t('deliveryAddress')}
              </Typography>
              <Information />
            </Grid>
          </Grid>
        </>
      ) : null}
    </>
  );
}

export default Dashboard;

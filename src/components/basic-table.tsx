import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import { shipmentData } from '../types/shipment.types';

function createData(
  hub: string | '',
  timestamp: string | '',
  date: string | '',
  reason: string | '',
) {
  return { hub, timestamp, date, reason };
}

interface BasicTableProps {
  shipmentData: shipmentData;
}

export default function BasicTable({ shipmentData }: BasicTableProps) {
  const { t } = useTranslation();

  // Map shipmentData.TransitEvents to rows
  const rows = shipmentData.TransitEvents.map((event) => {
    const { timestamp, hub, reason } = event;
    return createData(hub!, timestamp!, timestamp!, reason!);
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{backgroundColor: '#ddd'}} >
          <TableRow>
            <TableCell align="right">{t('branch')}</TableCell>
            <TableCell align="right">{t('date')}</TableCell>
            <TableCell align="right">{t('time')}</TableCell>
            <TableCell align="right">{t('details')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.hub}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="right" component="th" scope="row">
                {row.hub}
              </TableCell>
              <TableCell align="right">
                {row.timestamp?.split('T')[0]}
              </TableCell>
              <TableCell align="right">
                {row.timestamp?.split('T')[1].split('.')[0]}
              </TableCell>
              <TableCell align="right">{row.reason}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

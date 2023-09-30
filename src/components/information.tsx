import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
	Typography,
} from '@mui/material';
import qustionImage from '../assets/undraw_questions_re_1fy7.svg'
import { useTranslation } from 'react-i18next';

function Information() {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper} sx={{overflow: 'hidden'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: '#ddd' }}>
          <TableRow>
            <TableCell align="right">{t('mainDeliveryAdrres')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align="right" component="th" scope="row">
              <Box display='flex' alignItems='center' justifyContent='space-around'>
                <Box><img src={qustionImage}/></Box>
                <Box display='flex' flexDirection='column'>
                  <Typography>{t('anyProplem')}</Typography>
                  <Button variant='contained' color='error' size='large' sx={{bgcolor: '#f4050d', borderRadius: '5px'}}>{t('callForProblem')}</Button>
                </Box>
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Information;

import React, { useEffect, useState} from 'react';
import { InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { fetchShipmentByTrackingNumber } from '../app/features/shipments/shipment-slice';
import { useAppDispatch } from '../app/hooks';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    '&[type="number"]': {
      '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
        display: 'none', // Hide increment and decrement buttons
      },
    },
  },
}));

function PrimarySearch() {
  const [searchValue, setSearchValue] = useState<number | string>('');
  const dispatch = useAppDispatch();

  const handleSearch = () => {

    dispatch(fetchShipmentByTrackingNumber(Number(searchValue)))
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
  }, [searchValue]);

  return (
    <Search
      sx={{
        border: '1px solid #ddd',
        borderRadius: '4px',
        margin: '10px 50px !important',
      }}>
      <StyledInputBase
        type="number"
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        value={searchValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
    </Search>
  );
}

export default PrimarySearch;

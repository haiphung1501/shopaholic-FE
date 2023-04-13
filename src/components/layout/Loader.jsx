import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography } from '@mui/material';

export default function Loader() {
    return <>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress disableShrink />
        </Box>
    </>

}

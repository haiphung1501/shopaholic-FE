import React from 'react';
import { Box, Typography } from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

function BannedAccount() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <ErrorOutlineOutlinedIcon sx={{ fontSize: 200, color: 'red' }} />
            <Typography variant="h4" align="center" sx={{ my: 4 }}>
                Oops! Your account has been banned.
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 4 }}>
                Please contact customer support for further assistance.
            </Typography>
        </Box>
    );
}

export default BannedAccount;

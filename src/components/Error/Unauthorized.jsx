import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

function Unauthorized() {
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
                Oops! You are not authorized to view this page.
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 4 }}>
                Please login to continue.
            </Typography>
            <Button variant="contained" component={Link} to="/user/login" sx={{ fontWeight: 'bold' }}>
                Login
            </Button>
        </Box>
    );
}

export default Unauthorized;
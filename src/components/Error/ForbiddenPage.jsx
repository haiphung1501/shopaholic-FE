import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import BlockIcon from '@mui/icons-material/Block';


function ForbiddenPage() {


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
      <BlockIcon sx={{ fontSize: 200, color: 'red' }} />
      <Typography variant="h4" align="center" sx={{ my: 4 }}>
        You do not have permission to access this page.
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 4 }}>
        Please contact the site administrator if you believe this is an error.
      </Typography>
      <Button variant="contained" component={Link} to="/" sx={{ fontWeight: 'bold' }}>
        Home
      </Button>
    </Box>
  );
}

export default ForbiddenPage;
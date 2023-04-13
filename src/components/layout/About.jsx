import React from 'react';
import { Typography, Container, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <Container maxWidth="md">
            <Box sx={{ pb: 25, pt: 4 }}>
                <Typography variant="h2" align="center" gutterBottom>
                    Welcome to Shopaholic!
                </Typography>
                <Typography variant="body1" align="justify" gutterBottom>
                    At Shopaholic, we are committed to providing our customers with the best shopping experience possible. From fashion to electronics, we offer a wide range of products at affordable prices.
                </Typography>
                <Typography variant="body1" align="justify" gutterBottom>
                    Our team is passionate about bringing you the latest and greatest products on the market, and we're always on the lookout for new trends and must-have items. We pride ourselves on excellent customer service, and we're here to help you every step of the way.
                </Typography>
                <Typography variant="body1" align="justify" gutterBottom>
                    So why wait? Browse our selection today and find your next favorite product. And don't forget to check back often, as we're always updating our inventory with new and exciting items!
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary">
                            Shop Now
                        </Button>
                    </Link>

                </Box>
            </Box>
        </Container>
    );
};

export default About;

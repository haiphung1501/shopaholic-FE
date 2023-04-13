import { Box, Button, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { Slide } from '@mui/material'
import { useRef } from "react";

import heroImg from "../../images/hero_illustration.png";
import CustomButton from '../layout/CustomButton'

const Welcome = () => {
    const boxRef = useRef(null);
    const navigate = useNavigate();
    const CustomBox = styled(Box)(({ theme }) => ({
        display: "flex",
        justifyContent: "center",
        gap: theme.spacing(5),
        marginTop: theme.spacing(3),
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
        },
    }));

    const Title = styled(Typography)(({ theme }) => ({
        fontSize: "64px",
        color: "#000336",
        fontWeight: "bold",
        margin: theme.spacing(4, 0, 4, 0),
        [theme.breakpoints.down("sm")]: {
            fontSize: "40px",
        },
    }));

    return (
        <Box sx={{
            mt: -3,
            backgroundColor: "#E6F0FF", minHeight: "80vh"
        }}>
            <Container>
                <CustomBox>
                    <Slide direction="right" in={true} timeout={1000}>
                        <Box sx={{ flex: "1" }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: "30px",
                                    color: "#687690",
                                    fontWeight: "500",
                                    mt: 10,
                                    mb: 4,
                                }}
                            >
                                Welcome to Shopaholic
                            </Typography>
                            <Title variant="h1">
                                Discover a place where you'll love to buy.
                            </Title>
                            <Typography
                                variant="body2"
                                sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
                            >
                                Shop the best deals on a wide range of products from the comfort of your own home with our easy-to-use e-commerce website. Start shopping today and experience the convenience of online shopping!
                            </Typography>
                            <Link to='/about' style={{ textDecoration: 'none' }}>
                                <CustomButton

                                    backgroundColor="#0F1B4C"
                                    color="#fff"
                                    buttonText="More About Us"

                                    heroBtn={true}
                                />
                            </Link>
                        </Box>
                    </Slide>
                    <Slide direction="left" in={true} timeout={1000}>
                        <Box sx={{ flex: "1.25" }}>
                            <img
                                src={heroImg}
                                alt="heroImg"
                                style={{ maxWidth: "100%", marginBottom: "2rem" }}
                            />
                        </Box>
                    </Slide>
                </CustomBox>
            </Container>
        </Box >
    );
};

export default Welcome;

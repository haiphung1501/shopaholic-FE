import { Box, Button, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import shoesImg from "../../images/shoes.png";
import CustomButton from '../layout/CustomButton'

const FeaturedProduct = () => {
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
    const CustomBoxAgain = styled(Box)(({ theme }) => ({
        gap: theme.spacing(5),
        marginTop: theme.spacing(3),
        [theme.breakpoints.down("md")]: {
            marginTop: theme.spacing(-20),
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
            backgroundColor: "#fafafa", minHeight: "40vh"
        }}>
            <Container>
                <CustomBox>
                    <Box sx={{ flex: "1.25" }}>
                        <img
                            src={shoesImg}
                            alt="shoesImg"
                            style={{ maxWidth: "100%", marginBottom: "2rem" }}
                        />
                    </Box>
                    <CustomBoxAgain sx={{ mt: 18, flex: "1" }}>
                        <Title variant="h1" component='span'>
                            PUMA
                        </Title>
                        <Typography sx={{ ml: 3 }} variant='h5' component='span'>
                            Cali Wedge
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
                        >
                            Elevate your style with Puma shoes - the perfect blend of fashion and function. From sleek sneakers to trendy trainers, Puma offers a wide range of lifestyle shoes to suit every taste. Whether you're hitting the streets or running errands, these shoes provide the ultimate comfort and style. So step up your game and grab a pair of Puma shoes today!
                        </Typography>
                        <Link to='/product/642274c0a6c1d010f8d61295' style={{ textDecoration: 'none' }}>
                            <CustomButton
                                backgroundColor="#0F1B4C"
                                color="#fff"
                                buttonText="Learn More"
                                heroBtn={true}
                            />
                        </Link>
                    </CustomBoxAgain>
                </CustomBox>
            </Container>
        </Box >
    );
};

export default FeaturedProduct;

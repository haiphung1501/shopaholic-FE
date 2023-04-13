import { styled, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { Link } from 'react-router-dom'
import React from "react";

import fbIcon from "../../images/fbicon.png";
import twitterIcon from "../../images/twittericon.png";
import linkedinIcon from "../../images/linkedinicon.png";

const Footer = () => {
    const CustomContainer = styled(Container)(({ theme }) => ({
        display: "flex",
        justifyContent: "space-around",
        gap: theme.spacing(5),
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            textAlign: "center",
        },
    }));

    const IconBox = styled(Box)(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        [theme.breakpoints.down("sm")]: {
            justifyContent: "center",
        },
    }));

    const FooterLink = styled("span")(({ theme }) => ({
        fontSize: "16px",
        color: "#7A7A7E",
        fontWeight: "300",
        cursor: "pointer",
        "&:hover": {
            color: "#000",
        },
    }));

    return (
        <Box sx={{ py: 10 }}>
            <CustomContainer>
                <CustomContainer>


                    <Box>
                        <Typography
                            sx={{
                                fontSize: "20px",
                                color: "#1C1C1D",
                                fontWeight: "700",
                                mb: 2,
                            }}
                        >
                            Get in touch
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "16px",
                                color: "#7A7A7E",
                                fontWeight: "500",
                                mb: 2,
                            }}
                        >
                            You’ll find your next product, in any style you prefer.
                        </Typography>

                        <IconBox>
                            <Link to='https://www.facebook.com/impdh/' style={{ textDecoration: 'none' }}>
                                <img src={fbIcon} alt="fbIcon" style={{ cursor: "pointer" }} />
                            </Link>
                            <Link to='https://www.linkedin.com/in/haiph02/' style={{ textDecoration: 'none' }}>
                                <img
                                    src={linkedinIcon}
                                    alt="linkedinIcon"
                                    style={{ cursor: "pointer" }}
                                />
                            </Link>

                        </IconBox>
                    </Box>
                </CustomContainer>
            </CustomContainer>
        </Box>
    );
};

export default Footer;

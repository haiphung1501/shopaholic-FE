import { Box, Card, Grid, Typography, Container, styled } from '@mui/material'
import React, { Fragment } from 'react'
import Product from '../Product/ProductCard'
import Loader from '../layout/Loader'
import { useSelector, useDispatch } from 'react-redux'
// import productSlice from '../Product/productSlice'
import { allProductFailed, allProductRequest, allProductSuccess, clearError } from '../../features/product/productSlice'
import { getAllProductReq } from '../../apis'
import { useEffect } from 'react'
import { useAlert } from 'react-alert'
import ProductCard from '../Product/ProductCard'
import ProductCardHome from '../Product/ProductCardHome'
import Welcome from './Welcome'
import Footer from '../layout/Footer'
import { Link } from 'react-router-dom'
import FeaturedProduct from '../layout/FeaturedProduct'
import CustomButton from '../layout/CustomButton'

export default function Home() {
    const PropertiesTextBox = styled(Box)(({ theme }) => ({
        [theme.breakpoints.down("md")]: {
            textAlign: "center",
        },
    }));

    const dispatch = useDispatch()
    const alert = useAlert()
    const { products, loading, error } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(allProductRequest())
        getAllProductReq()
            .then(({ data }) => {
                dispatch(allProductSuccess(data))
            })
            .catch((error) => {
                dispatch(allProductFailed(error))
            })
    }, [dispatch])

    const featuredProducts = products && products.filter(product => product.category === 'Laptop')
    if (loading) return <Loader />
    if (error) return <Loader />
    return <Fragment>
        <Welcome />
        <FeaturedProduct />
        <Box sx={{ backgroundColor: "#fafafa", mb: 5 }}>
            <Container>
                <Typography
                    sx={{ color: "#000339", fontSize: "35px", fontWeight: "bold" }}
                >
                    Featured Products
                </Typography>
                <PropertiesTextBox>
                    <Grid container spacing={2}>
                        {
                            featuredProducts && featuredProducts.map((product, index) => {
                                return (
                                    <Grid key={index} item xs={12} sm={6} md={4} lg={3} >
                                        <ProductCardHome key={index} product={product} />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mt: 3,
                        pb: 3,

                    }}>
                        <Link style={{ textDecoration: 'none' }} to='products' >
                            <CustomButton
                                backgroundColor="#0F1B4C"
                                color="#fff"
                                buttonText="All Products"
                                heroBtn={true}
                                alignItem='center'
                            />
                        </Link>
                    </Box>
                </PropertiesTextBox>
            </Container>
        </Box>
    </Fragment >
}

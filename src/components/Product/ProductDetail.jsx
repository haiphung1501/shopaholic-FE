import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { Rating, Paper, Button, Box, Grid, Typography, IconButton, TextField } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { productDetailRequest, productDetailSuccess, productDetailFailed } from '../../features/product/productDetailSlice'
import { useAlert } from 'react-alert'
import { getProductDetailReq, createReviewReq } from '../../apis'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ReviewCard from './ReviewCard'
import Loader from '../layout/Loader'
import { addToCartAction } from '../../features/cart/cartSlice'
import ProductCard from './ProductCard'
import { useNavigate } from 'react-router-dom'


export default function ProductDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const alert = useAlert();
    const navigate = useNavigate();
    const { product, loading, error } = useSelector(state => state.productDetail)
    const { products } = useSelector(state => state.product)
    const { isAuthenticated } = useSelector(state => state.user)
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [render, setRender] = useState(false);



    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };


    const decreaseQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
        }
        else {
            setQuantity(1)
        }
    }
    const increaseQuantity = () => {
        if (quantity >= product.stock)
            return alert.error(`The maximum quantity you can add is ${product.stock}`);
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
    }
    const addToCartHandler = () => {
        if (!isAuthenticated) return navigate('/user/login');
        dispatch(addToCartAction(id, quantity))
        alert.success('Product added to cart')
    }

    useEffect(() => {
        if (error) { return alert.error(error) }
        dispatch(productDetailRequest())
        const fetchData = async () => {
            await getProductDetailReq(id)
                .then(({ data }) => {
                    dispatch(productDetailSuccess(data))
                })
                .catch((error) => {
                    dispatch(productDetailFailed(error))
                })
        }
        fetchData();
        const recommended = products.filter(p => p.category === product.category && p._id !== product._id);
        if (recommended.length < 4) {
            const randomProducts = products.filter(p => p._id !== product._id && !recommended.includes(p));
            while (recommended.length < 4 && randomProducts.length > 0) {
                const randomIndex = Math.floor(Math.random() * randomProducts.length);
                recommended.push(randomProducts[randomIndex]);
                randomProducts.splice(randomIndex, 1);
            }
        }
        setRecommendedProducts(recommended);
    }, [dispatch, error, alert, id, render, product.category, product._id, products])


    const handleReviewSubmit = async () => {
        if (rating === 0) return alert.error("Please select a rating");
        await createReviewReq(rating, comment, id);
        setRating(0);
        setComment("");
        setRender(!render)
    };


    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value: product.ratings,
        isHalf: true,
        size: window.innerWidth < 600 ? 15 : 20,
    }


    if (loading) return (<Loader />)
    return (
        <React.Fragment>
            <Box sx={{ pt: 5 }}>

            </Box>
            <Paper sx={{ pb: 3, px: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                        <Carousel>
                            {product.images && product.images.map((image, index) => {
                                return (
                                    <Box
                                        key={index}
                                        component="img"
                                        sx={{
                                            height: 450,
                                            width: 450,
                                            maxHeight: { xs: 450, md: 450 },
                                            maxWidth: { xs: 450, md: 450 },
                                        }}
                                        alt={image.public_id}
                                        src={image.url}
                                    />
                                )
                            })}
                        </Carousel>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Typography variant='h4' fontWeight='bold'>
                            {product.name}
                        </Typography>
                        <Box sx={{ borderTop: 1, pt: 2 }} display='flex'>
                            <ReactStars {...options} component="span" />
                            <Typography sx={{ pl: 1 }} gutterBottom variant="h6" component="span" fontWeight='light' fontStyle='italic'>
                                {product.numOfReviews} Reviews
                            </Typography>
                        </Box>
                        <Typography color='#2196f3' font='Roboto' gutterBottom variant="h6" component="span">
                            {`${product.price.toLocaleString()} VNĐ`}
                        </Typography>
                        <Box sx={{ pt: 2 }} display='flex' alignItems='center'>
                            <IconButton onClick={decreaseQuantity}>
                                <RemoveIcon />
                            </IconButton>
                            <TextField
                                label="Number"
                                value={quantity}
                                size='small'
                                sx={{ width: 100 }}
                            />
                            <IconButton onClick={increaseQuantity}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                        <Typography sx={{ mt: 3 }} fontStyle='italic' fontWeight='bold' color={product.stock > 0 ? 'primary' : 'red'} >
                            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </Typography>
                        <Button onClick={addToCartHandler} sx={{ borderRadius: '20px', mt: 3 }} variant='outlined' endIcon={<AddShoppingCartIcon />}>
                            Add to Cart
                        </Button>
                        <Box sx={{ mt: 3 }}>
                            <Typography fontWeight='bold'>
                                Description
                            </Typography>
                            <Typography sx={{ ml: 2 }}>
                                {product.description}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
            <Box sx={{ borderTop: 1, mt: 2 }}>
                <Grid container spacing={2} >
                    {
                        recommendedProducts.map((product, index) => {
                            return (
                                <Grid key={index} item xs={12} sm={6} md={4} lg={3} sx={{ mt: 1 }}>
                                    <ProductCard product={product} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Box>
            <Box sx={{ borderTop: 1, mt: 8, pb: 3 }}>
                <Paper sx={{ mt: 3, p: 2 }}>
                    <Box style={{ display: "flex", alignItems: "center" }}>
                        <Rating
                            name="rating"
                            value={rating}
                            precision={0.5}
                            onChange={handleRatingChange}
                        />
                        <span style={{ marginLeft: "10px" }}>{"("}{rating}{")"}</span>
                    </Box>
                    <TextField
                        id="comment"
                        label="Comment"
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                        value={comment}
                        onChange={handleCommentChange}
                        style={{ marginTop: "20px" }}
                    />
                    <Button
                        onClick={handleReviewSubmit}
                        type="submit"
                        variant="contained"
                        style={{ marginTop: "20px", backgroundColor: "#1976d2", color: "#fff" }}
                    >
                        Submit
                    </Button>
                </Paper>
                <Grid container spacing={2} sx={{ pb: 2 }}>
                    <Grid sx={{ mt: 1 }} item xs={12} md={12} lg={12} >
                        <Typography align="center" variant="h4"
                            sx={{ color: "#000339", fontSize: "35px", fontWeight: "bold" }}
                        >
                            Reviews
                        </Typography>
                        <Box>
                            {product.reviews && product.reviews.map((review, index) => {
                                return (
                                    <ReviewCard key={index} review={review} />
                                )
                            })}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment >
    )
}

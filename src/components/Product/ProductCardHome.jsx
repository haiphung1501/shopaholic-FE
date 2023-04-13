import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Container } from '@mui/material';
import ReactStars from "react-rating-stars-component"



export default function ProductCard({ product }) {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value: product.ratings,
        isHalf: true,
        size: window.innerWidth < 600 ? 10 : 15,
    }
    return (
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
            <Card sx={{
                height: 300, width: 270, mt: 2,
                [`@media (max-width:600px)`]: {
                    width: "100%"
                }
            }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="150"
                        width="150"
                        image={product.images[0].url}

                    />
                    <CardContent>
                        <Typography variant="body1" fontWeight='bold' component="div">
                            {product.name}
                        </Typography>

                        <Typography color='#2196f3' font='Roboto' variant="body1" component="span" fontWeight='bold'>
                            {`${product.price.toLocaleString()} VNĐ`}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    )
}

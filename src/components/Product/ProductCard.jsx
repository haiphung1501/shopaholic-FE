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
    size: window.innerWidth < 600 ? 15 : 20,
  }
  return <>
    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{
        height: '100%', width: 250, flex: 1, mt: 2, p: 1,
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
            <Typography gutterBottom variant="h5" fontWeight='bold' component="div">
              {product.name}
            </Typography>
            <Box >
              <ReactStars {...options} component="span" />
              <Typography gutterBottom variant="h6" component="span" fontWeight='light'>
                {product.numOfReviews} Reviews
              </Typography>
            </Box>
            <Typography color='#2196f3' font='Roboto' gutterBottom variant="h6" component="span">
              {`${product.price.toLocaleString()} VNĐ`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>

  </>

}

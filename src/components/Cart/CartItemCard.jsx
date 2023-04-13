import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Typography,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Button,
    Grid,
    Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
// import { removeFromCart } from "../redux/actions/cartActions";

export default function CartItemCard({ item }) {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();

    // const handleRemoveFromCart = (productId) => {
    //     dispatch(removeFromCart(productId));
    // };

    const getTotalPrice = () => {
        return cartItems.reduce(
            (accumulator, current) => accumulator + current.price * current.qty,
            0
        );
    };

    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.name}
            />
            <CardContent>
                <Typography variant="subtitle1">{item.name}</Typography>
                <Typography variant="body2">Quantity: {item.qty}</Typography>
                <Typography variant="body2">
                    Price: ${item.price.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                    Total Price: ${(item.price * item.qty).toFixed(2)}
                </Typography>
            </CardContent>
            <Box display="flex" justifyContent="flex-end" p={2}>
                <IconButton
                    aria-label="delete"
                // onClick={() => handleRemoveFromCart(item.product)}
                >
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Card>
    );
};

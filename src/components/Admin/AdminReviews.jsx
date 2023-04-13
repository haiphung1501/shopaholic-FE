import React, { useState, useEffect } from 'react'
import {
    Container,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Paper,
    IconButton,
    Box,
    Grid,
    Backdrop,
    CircularProgress,
    Snackbar,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Rating,
    TextField,
} from '@mui/material'
import { useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { adminGetAllOrders, adminDeleteOrder } from '../../features/order/orderSlice'
import { adminDeleteReview, adminGetAllProduct } from '../../features/product/productSlice';
export default function AdminReviews() {
    const [deleting, setDeleting] = useState(false)
    const [updating, setUpdating] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [productReviewId, setproductReviewId] = useState('')
    const [review, setReview] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(adminGetAllOrders())
    }, [dispatch])

    const handleChange = async (event) => {
        setproductReviewId(event.target.value)
        const item = products.filter((item) => item._id === event.target.value)
        setReview(item[0].reviews)
    }
    const { orders, loading } = useSelector(state => state.orders)
    const { products } = useSelector(state => state.product)

    const onDeleteHandler = async (id) => {
        try {
            const Data = {
                reviewID: id,
                productID: productReviewId
            }
            console.log(Data)
            setDeleting(true)
            await dispatch(adminDeleteReview(Data))
            await dispatch(adminGetAllProduct())

            setReview(review.filter((r) => r._id !== id))

            setDeleting(false)
            setSnackbarOpen(true)
        }
        catch (error) { console.log(error) }
    }
    if (loading) return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '40vh',
        }}>
            <CircularProgress />
        </Box>
    )


    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box align='center'>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="product">Select Product</InputLabel>
                    <Select
                        id='product'
                        label="Select Product"
                        onChange={(e) => handleChange(e)}
                        value={productReviewId}
                    >
                        {products.map((item, index) => (
                            <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <TableContainer sx={{ mt: 3 }} component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell >Name</TableCell>
                            <TableCell >Comment</TableCell>
                            <TableCell align='center'>Rating</TableCell>
                            <TableCell align='center'>Create At</TableCell>
                            <TableCell >Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {review.map((item, index) => (
                            <TableRow

                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {item.name}
                                </TableCell>
                                <TableCell >
                                    <TextField
                                        id="comment"
                                        multiline
                                        rows={2}
                                        fullWidth
                                        variant="outlined"
                                        value={item.comment}
                                    />
                                </TableCell>
                                <TableCell align='center' >
                                    <Rating size='small' value={item.rating} precision={0.5} readOnly />

                                </TableCell>
                                <TableCell align='center'>{moment(item.createdAt).format('DD/MM/YYYY')}</TableCell>
                                <TableCell >
                                    <IconButton
                                        onClick={() => onDeleteHandler(item._id)}
                                        color="error"
                                        aria-label="delete"
                                        size="small"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
            <Backdrop open={deleting} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message="Successfully"
            />
        </Container>
    )
}

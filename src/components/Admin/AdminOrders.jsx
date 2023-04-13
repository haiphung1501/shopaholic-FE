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
    Backdrop,
    CircularProgress,
    Snackbar,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material'
import { useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { adminGetAllOrders, adminDeleteOrder, adminUpdateOrder } from '../../features/order/orderSlice'
export default function AdminOrders() {
    const [deleting, setDeleting] = useState(false)
    const [updating, setUpdating] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(adminGetAllOrders())
    }, [dispatch])
    const onDeleteHandler = async (id) => {
        try {
            setDeleting(true)
            await dispatch(adminDeleteOrder(id))
            await dispatch(adminGetAllOrders())
            setDeleting(false)
            setSnackbarOpen(true)
        }
        catch (error) { console.log(error) }
    }
    const handleChange = async (id, event) => {
        console.log(id);
        console.log(event.target.value);
        try {
            setUpdating(true)
            await dispatch(adminUpdateOrder({ id, orderData: { orderStatus: event.target.value } }))
            await dispatch(adminGetAllOrders())
            setUpdating(false)
            setSnackbarOpen(true)
        } catch (error) { console.log(error) }
    }
    const { orders, loading } = useSelector(state => state.orders)
    const ordersToList = [...orders.orders].reverse()
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
            <TableContainer sx={{ mt: 3 }} component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 5, width: '250px' }}>Order ID</TableCell>
                            <TableCell>Items</TableCell>
                            <TableCell align="center">Create At</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Total</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ordersToList.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ pl: 5 }}>
                                    {item._id}
                                </TableCell>
                                <TableCell >
                                    {item.orderItems[0] ? item.orderItems[0].name + ',' : ''}
                                    {item.orderItems[1] ? ' ' + item.orderItems[1].name + ',' : ' '}
                                    ...
                                </TableCell>
                                <TableCell align="center">{moment(item.createAt).format('DD-MM-YYYY')}</TableCell>
                                <TableCell align="center">

                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                        <InputLabel fid="demo-simple-select-standard-label">Status</InputLabel>
                                        <Select
                                            id="demo-simple-select-standard"
                                            defaultValue={item.orderStatus}
                                            onChange={(e) => handleChange(item._id, e)}
                                        >
                                            <MenuItem value={"Processing"}>
                                                <Typography variant="subtitle"
                                                    sx={{
                                                        textTransform: 'capitalize',
                                                        fontWeight: 500,
                                                        width: 130,
                                                        color: 'primary.main'
                                                    }}
                                                >
                                                    Processing
                                                </Typography>
                                            </MenuItem>
                                            <MenuItem value={"Shipping"}>
                                                <Typography variant="subtitle"
                                                    sx={{
                                                        textTransform: 'capitalize',
                                                        fontWeight: 500,
                                                        width: 130,
                                                        color: 'warning.main',
                                                    }}
                                                >
                                                    Shipping
                                                </Typography>
                                            </MenuItem>
                                            <MenuItem value={"Delivered"}>
                                                <Typography variant="subtitle"
                                                    sx={{
                                                        textTransform: 'capitalize',
                                                        fontWeight: 500,
                                                        width: 130,
                                                        color: 'success.main',
                                                    }}
                                                >
                                                    Delivered
                                                </Typography>
                                            </MenuItem>
                                            <MenuItem value={"Declined"}>
                                                <Typography variant="subtitle"
                                                    sx={{
                                                        textTransform: 'capitalize',
                                                        fontWeight: 500,
                                                        width: 130,
                                                        color: 'error.main',
                                                    }}
                                                >
                                                    Declined
                                                </Typography>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">
                                    {`${item.totalPrice.toLocaleString()} đ`}
                                </TableCell>
                                <TableCell align="center" sx={{ p: 0 }}>
                                    <IconButton onClick={() => { onDeleteHandler(item._id) }} size='small'>
                                        <Link>
                                            <DeleteIcon size='small' />
                                        </Link>
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

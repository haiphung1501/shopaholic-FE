import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, Box, Paper } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllOrders } from '../../features/order/orderSlice';
import moment from 'moment';


function MyOrders() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    const { loading, error, orders } = useSelector(state => state.orders)

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
    if (ordersToList.length === 0) return (
        <Typography align='center' sx={{ pb: 2 }}>
            You have no order!
        </Typography>
    )
    return (
        <Paper sx={{ mb: 4, pb: 4 }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h6">Order ID</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6">Order Item</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6">Create At</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography align='center' variant="h6">Status</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant="h6">Total</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ordersToList.map((order, index) => (
                            <TableRow key={order._id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}>
                                <TableCell>
                                    <Link to={`/me/order/${order._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                        <Typography variant='body2' noWrap overflow="hidden" textOverflow="ellipsis" fontWeight='500'>
                                            {order._id.slice(0, 10)}...
                                        </Typography>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Typography variant='body2' noWrap overflow="hidden" textOverflow="ellipsis">
                                        {order.orderItems[0] ? order.orderItems[0].name + ',' : ''}
                                        {order.orderItems[1] ? ' ' + order.orderItems[1].name + ',' : ' '}
                                        ...
                                    </Typography>
                                </TableCell>

                                <TableCell>{moment(order.createAt).format('DD-MM-YYYY')}</TableCell>
                                <TableCell align='center'>
                                    <Typography variant="body1" align='center'
                                        sx={{
                                            textTransform: 'capitalize',
                                            fontWeight: 500,
                                            border: 1,
                                            borderRadius: 4,
                                            color: 'white',
                                            bgcolor: order.orderStatus === 'Delivered' ? 'success.main' : order.orderStatus === 'Declined' ? 'error.main' : order.orderStatus === 'Shipping' ? 'warning.main' : 'primary.main',
                                        }}
                                    >
                                        {order.orderStatus}
                                    </Typography>
                                </TableCell>
                                <TableCell align='center'>{`${order.totalPrice.toLocaleString()} đ`}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default MyOrders;

import React, { useEffect, useState } from 'react'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, Box, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleOrderReq } from '../../apis/index';
import moment from 'moment'

export default function Order() {
    const [order, setOrder] = useState()
    const [loading, setLoading] = useState(true)

    const { id } = useParams();
    useEffect(() => {
        getSingleOrderReq(id)
            .then(res => {
                console.log(' hello', res.data.order)
                setOrder(res.data.order)
                setLoading(false)
            })
    }, [])

    if (loading) return <CircularProgress />
    return (
        <>
            <Typography fontFamily='Roboto Slab' variant="h5" fontWeight='light' sx={{ pt: 2 }}>Order #{order._id}</Typography>
            <Box sx={{
                mt: 2,
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <Typography fontFamily='Roboto Slab' variant="h6" fontWeight='light'>{moment(order.createAt).format('DD-MM-YYYY')}</Typography>
                <Typography align='center' variant="body1"
                    sx={{
                        alignSelf: 'center',
                        textTransform: 'capitalize',
                        fontWeight: 500,
                        border: 1,
                        borderRadius: 4,
                        width: 130,
                        color: 'white',
                        bgcolor: order.status === 'success' ? 'green' : order.status === 'declined' ? 'red' : 'primary.main',
                    }}
                >
                    {order.orderStatus}
                </Typography>
            </Box>

            <TableContainer sx={{ mt: 3 }} component={Paper}>
                <Table sx={{ minWidth: 650, backgroundColor: 'white' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Total Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.orderItems.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">
                                    <img src={item.image} alt={item.name} height="50" />
                                </TableCell>
                                <TableCell align="center">{item.name}</TableCell>
                                <TableCell align="center">{`${item.price.toLocaleString()} đ`} </TableCell>
                                <TableCell align="center">
                                    {item.qty}
                                </TableCell>
                                <TableCell align="center">{`${(item.qty * item.price).toLocaleString()} đ`}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={4}>
                                <Typography variant="h6"></Typography>
                            </TableCell>
                            <TableCell align="center" >
                                <Typography variant="h6" fontWeight='500'>{
                                    `${order.totalPrice.toLocaleString()} đ`
                                }</Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Box
                sx={{
                    pb: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
            </Box>
        </>
    )
}

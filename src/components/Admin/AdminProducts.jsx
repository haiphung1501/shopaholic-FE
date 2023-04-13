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
    Button
} from '@mui/material'
import { useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminGetAllProduct, adminDeleteProduct } from '../../features/product/productSlice'
export default function AdminProducts() {
    const dispatch = useDispatch()
    const [deleting, setDeleting] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    useEffect(() => {
        dispatch(adminGetAllProduct())
    }, [dispatch])

    const onDeleteHandler = async (id) => {
        try {
            setDeleting(true)
            dispatch(adminDeleteProduct(id))
            setDeleting(false)
            setSnackbarOpen(true)
        } catch (error) {
            console.log(error)

        }
    }
    const { loading, products } = useSelector(state => state.product)

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

            <Grid container justifyContent="flex-end">
                <Link to="/admin/products/new" style={{ textDecoration: 'none' }}>
                    <Button variant="contained">
                        New Product
                    </Button>
                </Link>

            </Grid>


            <TableContainer sx={{ mt: 3 }} component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 5, width: '250px' }}>Product ID</TableCell>
                            <TableCell >Name</TableCell>
                            <TableCell align="center">Stock</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ pl: 5 }}>
                                    {item._id}
                                </TableCell>
                                <TableCell >{item.name}</TableCell>
                                <TableCell align="center">{item.stock}</TableCell>
                                <TableCell align="center">
                                    {`${item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`.replace('₫', 'đ')}
                                </TableCell>
                                <TableCell align="center" sx={{ p: 0 }}>
                                    <IconButton size='small'>
                                        <Link to={`/admin/products/${item._id}`} style={{ textDecoration: 'none' }}>
                                            <EditIcon size='small' />
                                        </Link>
                                    </IconButton>
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
                message="Product deleted successfully"
            />
        </Container>
    )
}

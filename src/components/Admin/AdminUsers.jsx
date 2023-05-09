import React, { useState } from 'react'
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
} from '@mui/material'
import { useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminGetAllUsers, adminDeleteUser, adminUpdateUser } from '../../features/user/userSlice';

export default function AdminUsers() {
    const dispatch = useDispatch()
    const [deleting, setDeleting] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)


    const { users, loading } = useSelector(state => state.user)

    const onDeleteHandler = async (id) => {
        try {
            setDeleting(true)
            await dispatch(adminDeleteUser(id))
            await dispatch(adminGetAllUsers())
            setDeleting(false)
            setSnackbarOpen(true)
        } catch (error) {
            console.log(error)
        }
    }
    const handleChange = async (id, event) => {
        try {
            await dispatch(adminUpdateUser({ id, userData: { role: event.target.value } }))
            await dispatch(adminGetAllUsers())
            setSnackbarOpen(true)
        } catch (error) {
            console.log(error)
        }
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
            <TableContainer sx={{ mt: 3 }} component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 5, width: '250px' }}>User ID</TableCell>
                            <TableCell >Email</TableCell>
                            <TableCell >Name</TableCell>
                            <TableCell align="center">Role</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ pl: 5 }}>
                                    {item._id}
                                </TableCell>
                                <TableCell >{item.email}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell align="center">
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                        <InputLabel fid="demo-simple-select-standard-label">Role</InputLabel>
                                        <Select
                                            id="demo-simple-select-standard"
                                            defaultValue={item.role}
                                            onChange={(e) => handleChange(item._id, e)}
                                        >
                                            <MenuItem value={"user"}>
                                                <Typography variant="subtitle"
                                                    sx={{
                                                        textTransform: 'capitalize',
                                                        fontWeight: 500,
                                                        width: 130,
                                                        color: 'success.main'
                                                    }}
                                                >
                                                    User
                                                </Typography>
                                            </MenuItem>
                                            <MenuItem value={"admin"}>
                                                <Typography variant="subtitle"
                                                    sx={{
                                                        textTransform: 'capitalize',
                                                        fontWeight: 500,
                                                        width: 130,
                                                        color: 'primary.main'
                                                    }}
                                                >
                                                    Admin
                                                </Typography>
                                            </MenuItem>
                                            <MenuItem value={"banned"}>
                                                <Typography variant="subtitle"
                                                    sx={{
                                                        textTransform: 'capitalize',
                                                        fontWeight: 500,
                                                        width: 130,
                                                        color: 'error.main'
                                                    }}
                                                >
                                                    Banned
                                                </Typography>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
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
                message="User deleted successfully"
            />
        </Container>
    )
}

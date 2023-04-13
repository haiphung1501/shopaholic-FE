import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Divider, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import MyOrders from '../Order/MyOrders';
import Loader from '../layout/Loader'
import { Link } from 'react-router-dom'
import { userLoadFailed, userLoadRequest, userLoadSuccess } from '../../features/user/userSlice';
import { userLoadReq } from '../../apis/index'
const Profile = () => {
    const { user, loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userLoadRequest());
        userLoadReq()
            .then((res) => {
                dispatch(userLoadSuccess(res.data));
            })
            .catch((err) => {
                dispatch(userLoadFailed(err.response))
            })
    }, [])


    if (loading) return (
        <Loader />
    )
    return (
        <>
            <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid sx={{}} item xs={12} md={4}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar sx={{ width: 200, height: 200, mt: 4 }} src={user.user.avatar.url} />
                    </Box>
                </Grid>
                <Grid sx={{}} item xs={12} md={8}>
                    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" gutterBottom>
                            Username
                        </Typography>
                        <Typography style={{ marginTop: "-3px", marginBottom: "-1px" }} sx={{ color: 'grey' }} variant="subtitle1" gutterBottom>
                            {user.user.name}
                        </Typography>
                        <Divider />
                        <Typography variant="h6" gutterBottom>
                            Email
                        </Typography>
                        <Typography style={{ marginTop: "-3px", marginBottom: "-1px" }} sx={{ color: 'grey' }} variant="subtitle1" gutterBottom>
                            {user.user.email}
                        </Typography>
                        <Divider />
                        <Box>
                            <Link style={{ textDecoration: 'none' }} to='/me/update/password'>
                                <Button variant="contained" color="primary" sx={{ textTransform: "none", mt: 2, px: 1, width: 150, whiteSpace: 'nowrap' }}>
                                    Change Password
                                </Button>
                            </Link>
                            <Link style={{ textDecoration: 'none' }} to='/me/update'>
                                <Button variant="contained" color="primary" sx={{ textTransform: "none", mt: 2, px: 1, mx: 2, width: 150, whiteSpace: 'nowrap' }}>
                                    Update Profile
                                </Button>
                            </Link>
                            {user.user.role === 'admin' && (
                                <Link style={{ textDecoration: 'none' }} to='/admin/dashboard'>
                                    <Button variant="contained" color="warning" sx={{ textTransform: "none", mt: 2, px: 1, mx: 2, width: 150, whiteSpace: 'nowrap' }}>
                                        Admin
                                    </Button>
                                </Link>
                            )}
                        </Box>

                    </Box>
                </Grid>
            </Grid>
            <Typography align='center'
                sx={{ mt: 5, mb: 2, color: "#000339", fontSize: "25px", fontWeight: "bold" }}
            >
                My Orders
            </Typography>
            <MyOrders />
        </>

    );
};

export default Profile;

import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { adminGetAllProduct } from '../../features/product/productSlice'
import { adminGetAllUsers } from '../../features/user/userSlice';
import { adminGetAllOrders } from '../../features/order/orderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import DoughnutChart from '../Charts/DoughnutChart';
import LineChart from '../Charts/LineChart';



function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

function DashboardContent() {
    const [loading, setLoading] = React.useState(false)
    const [open, setOpen] = React.useState(true);
    const dispatch = useDispatch()
    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(() => {
        setLoading(true)
        const fetchAllData = async () => {
            await Promise.all([
                dispatch(adminGetAllProduct()),
                dispatch(adminGetAllUsers()),
                dispatch(adminGetAllOrders())
            ])
        }
        fetchAllData()
        setLoading(false)

    }, [dispatch])

    const { products } = useSelector(state => state.product)
    const { users } = useSelector(state => state.user)
    const { orders } = useSelector(state => state.orders)

    if (loading || !products || !users || !orders) {
        return <CircularProgress />
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            {/* Chart */}
                            <Grid item xs={12} md={6} lg={3}>
                                <Link to='/admin/products' style={{
                                    textDecoration: 'none',
                                }}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 240,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <ShoppingCartIcon sx={{ fontSize: 72 }} />
                                        <Typography fontFamily='Roboto Slab' fontWeight='bold' variant="h6" sx={{ mt: 2 }}>
                                            Products
                                        </Typography>
                                        <Typography variant="h3" sx={{ mt: 1, color: 'primary.main' }}>
                                            {products.length}
                                        </Typography>
                                    </Paper>
                                </Link>
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <Link to='/admin/users' style={{
                                    textDecoration: 'none',
                                }}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 240,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <AccountCircleIcon sx={{ fontSize: 72 }} />
                                        <Typography fontFamily='Roboto Slab' fontWeight='bold' variant="h6" sx={{ mt: 2 }}>
                                            Users
                                        </Typography>
                                        <Typography variant="h3" sx={{ mt: 1, color: 'primary.main' }}>
                                            {users.length}
                                        </Typography>
                                    </Paper>
                                </Link>
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <Link to='/admin/orders' style={{
                                    textDecoration: 'none',
                                }}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 240,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <ShoppingBasketIcon sx={{ fontSize: 72 }} />
                                        <Typography fontFamily='Roboto Slab' fontWeight='bold' variant="h6" sx={{ mt: 2 }}>
                                            Orders
                                        </Typography>
                                        <Typography variant="h3" sx={{ mt: 1, color: 'primary.main' }}>
                                            {orders.orders.length}
                                        </Typography>
                                    </Paper>
                                </Link>
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={8} lg={8}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 280,
                                    }}
                                >
                                    <LineChart />
                                </Paper>
                            </Grid>

                            {/* Recent Deposits */}
                            <Grid item xs={12} md={4} lg={4}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 280,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <DoughnutChart />
                                </Paper>
                            </Grid>
                            {/* Recent Orders */}
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function AdminDashboard() {
    return <DashboardContent />;
}
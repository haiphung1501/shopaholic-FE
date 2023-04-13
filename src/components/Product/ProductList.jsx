import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allProductFailed, allProductRequest, allProductSuccess, clearError } from '../../features/product/productSlice'
import { getAllProductReq, getAllCategory } from '../../apis'
import { useAlert } from 'react-alert'
import {
    Rating, Slider, Grid, Typography, Pagination, FormGroup, FormControlLabel, Checkbox, Select, MenuItem, FormControl, Box, Accordion, AccordionDetails, AccordionSummary,
} from '@mui/material'
import ProductCard from './ProductCard'
import { useParams } from 'react-router-dom'
import Loader from '../layout/Loader'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMediaQuery } from '@mui/material';
import { useRef } from 'react'


const pageSize = 6;

export default function ProductList() {
    const targetRef = useRef(null)
    const [page, setPage] = useState(1);
    const [categories, setCategories] = useState([])
    const [expanded, setExpanded] = useState(true);
    const [totalPage, setTotalPage] = useState(1);
    const [displayedProduct, setDisplayedProduct] = useState([]);
    const dispatch = useDispatch()
    const { keyword } = useParams()
    const alert = useAlert()
    const { productsCount, products, loading, error, minPrice, maxPrice } = useSelector(state => state.product)
    const [filters, setFilters] = useState({
        ratings: null,
        price: [minPrice, maxPrice],
        category: [],
        sort: ''
    });
    const handleAccordionChange = () => {
        setExpanded(!expanded);
    };
    const handleScroll = () => {
        targetRef.current.scrollIntoView({
            behavior: 'smooth', // Use smooth scrolling
            block: 'start', // Scroll to the top of the element
        });
    }

    useEffect(() => {
        getAllCategory()
            .then(({ data }) => {
                setCategories(data.categories);
            })
    }, [])

    useEffect(() => {
        if (error) { return alert.error(error); }
        dispatch(allProductRequest())
        getAllProductReq(keyword)
            .then(({ data }) => {
                dispatch(allProductSuccess(data))
            })
            .catch((error) => {
                dispatch(allProductFailed(error))
            })
    }, [dispatch, error, alert, keyword])


    useEffect(() => {
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        if (products) {
            const filteredProducts = applyFilters(products, filters);
            const sortedProducts = applySort(filteredProducts, filters);
            const productsToDisplay = sortedProducts.slice(startIndex, endIndex);
            setDisplayedProduct(productsToDisplay);
            setTotalPage(Math.ceil(products.length / pageSize));
        }
    }, [page, products, filters])

    const applyFilters = (products, filters) => {
        let filteredProducts = products;
        if (filters.ratings) {
            filteredProducts = filteredProducts.filter(product => product.ratings >= filters.ratings);
        }
        if (filters.price) {
            filteredProducts = filteredProducts.filter(product => product.price >= filters.price[0] && product.price <= filters.price[1]);
        }
        if (filters.category && filters.category.length > 0) {
            filteredProducts = filteredProducts.filter(product => filters.category.includes(product.category));
        }
        return filteredProducts;
    }

    const applySort = (products, filters) => {
        let sortedProducts = [...products];
        if (filters.sort === 'default') {
            return sortedProducts;
        }
        if (filters.sort === 'price-low-to-high') {
            return sortedProducts.sort((a, b) => a.price - b.price);
        }
        if (filters.sort === 'price-high-to-low') {
            return sortedProducts.sort((a, b) => b.price - a.price);
        }
        return sortedProducts;
    }
    const handleCategoryChange = (e) => {
        if (e.target.checked)
            setFilters({ ...filters, category: [...filters.category, e.target.value] })
        else {
            setFilters({ ...filters, category: filters.category.filter(category => category !== e.target.value) })
        }
    }
    const handleSortchange = (e) => {
        if (e.target.value)
            setFilters({ ...filters, sort: e.target.value });
        else {
            setFilters({ ...filters, sort: null });
        }
    }
    const handleSliderChange = (e, value) => {
        setFilters({ ...filters, price: value })
    }

    if (loading) return <Loader />
    return (
        <>
            <Grid sx={{ mt: 1 }} container spacing={4}>
                <Grid item xs={12} lg={2}>
                    <Accordion
                        sx={{ width: '100%', backgroundColor: 'transparent', boxShadow: 'none' }}
                        expanded={expanded}
                        onChange={handleAccordionChange}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            Filter
                        </AccordionSummary>
                        <Box sx={{ my: 1, py: 1, borderBottom: 1 }}>
                            <Typography sx={{ mt: 4 }} fontWeight='bold' variant='h5' >
                                Price
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Slider
                                    sx={{ width: 150 }}
                                    size='small'
                                    value={filters.price}
                                    getAriaLabel={() => 'Minimum distance'}
                                    valueLabelDisplay="auto"
                                    step={(maxPrice - minPrice) / 10}
                                    marks={[
                                        {
                                            value: minPrice,
                                            label: `${minPrice.toLocaleString()}`
                                        },
                                        {
                                            value: maxPrice,
                                            label: `${maxPrice.toLocaleString()}`
                                        }
                                    ]}
                                    min={minPrice}
                                    max={maxPrice}
                                    onChange={handleSliderChange}
                                    disableSwap
                                />
                            </Box>
                        </Box>
                        <Box sx={{ my: 1, py: 1, borderBottom: 1 }}>
                            <Typography fontWeight='bold' variant='h5' >
                                Categories
                            </Typography>
                            <FormControl>
                                {
                                    categories && categories.map((category, index) => {
                                        return (
                                            <FormControlLabel value={category} onChange={(e) => handleCategoryChange(e)} key={index} control={<Checkbox />} label={category} />
                                        )
                                    })
                                }
                            </FormControl>
                        </Box>
                        <Box sx={{ my: 1, py: 1, borderBottom: 1 }}>
                            <Typography fontWeight='bold' variant='h5' >
                                Sorting
                            </Typography>
                            <FormControl fullWidth>
                                <Select size='small' value={filters.sort} onChange={(e) => handleSortchange(e)}>
                                    <MenuItem value="default">Default</MenuItem>
                                    <MenuItem value="price-low-to-high">Price: Low to High</MenuItem>
                                    <MenuItem value="price-high-to-low">Price: High to Low</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ my: 1, py: 1, borderBottom: 1 }}>
                            <Typography fontWeight='bold' variant='h5' >
                                Rating
                            </Typography>
                            <Rating
                                name="simple-controlled"
                                vaue={filters.ratings}
                                onChange={(e, value) => setFilters({ ...filters, ratings: value })}
                            />
                        </Box>
                    </Accordion>
                </Grid>
                <Grid item xs={12} lg={10} ref={targetRef}>
                    <Typography variant='h5' fontWeight='light'>
                        {keyword ? `Result for "${keyword}"` : 'All products'}
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 3, pr: 2 }} >
                        {
                            displayedProduct && displayedProduct.map((product, index) => {
                                return (
                                    <Grid key={index} item xs={12} sm={12} md={4} lg={4} sx={{ mt: 2, mb: 2 }} >
                                        <ProductCard product={product} />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                    <Grid container sx={{ my: 3, display: 'flex', justifyContent: 'center' }}>
                        <Pagination
                            count={totalPage}
                            page={page}
                            onChange={(e, value) => setPage(value)}
                            onClick={handleScroll}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

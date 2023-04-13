import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Grid,
    Autocomplete,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import { useForm } from "react-hook-form";
import { getAllCategory } from '../../apis';
import { adminUpdateProduct } from '../../features/product/productSlice'
import { useDispatch, useSelector } from 'react-redux';


const AdminUpdateProduct = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [selectedCategory, setSelectedCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [product, setProduct] = useState()
    const { register, handleSubmit, setValue, formState: { errors },
        getValues } = useForm();
    const { products, loading } = useSelector((state) => state.product);

    useEffect(() => {
        const temp = products.find((product) => product._id === id)
        setProduct(temp)
        setSelectedCategory(temp.category)
        const fetchCategory = async () => {
            const response = await getAllCategory();
            setCategories(response.data.categories);
        }
        fetchCategory();
    }, [])

    const onSubmit = (data) => {
        console.log(data);
        dispatch(adminUpdateProduct({ id: id, productData: data }))
    };
    if (!product) return <div>Loading...</div>
    if (loading) return <div>Loading...</div>
    return (
        <Box maxWidth={600} margin="auto" padding={2}>
            <Typography variant="h5" gutterBottom>
                Create Product
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Name"
                    defaultValue={product.name}
                    id="name"
                    name="name"
                    fullWidth
                    margin="normal"
                    required
                    {...register("name", { required: true })}
                />
                <TextField
                    label="Description"
                    defaultValue={product.description}
                    name="description"
                    id='description'
                    fullWidth
                    margin="normal"
                    required
                    multiline
                    minRows={3}
                    maxRows={5}
                    {...register("description", { required: true })}
                />
                <TextField
                    label="Price"
                    defaultValue={product.price}
                    name="price"
                    id='price'
                    fullWidth
                    margin="normal"
                    required
                    {...register("price", { required: true })}
                />
                <TextField
                    label="Stock"
                    name="stock"
                    defaultValue={product.stock}
                    fullWidth
                    margin="normal"
                    required
                    {...register("stock", { required: true })}
                />
                <Autocomplete
                    value={selectedCategory}
                    onChange={(event, newValue) => {
                        setSelectedCategory(newValue);
                        setValue('category', newValue);
                    }}
                    freeSolo
                    options={categories}
                    renderInput={(categories) => <TextField {...categories} label="Category" />}
                />

                <Grid container spacing={2} sx={{ mt: 1 }}>
                    {product.images.map((image, index) => {
                        return (
                            <Grid item key={index}>
                                <Box
                                    component='img'
                                    sx={{
                                        height: 150,
                                        width: 150,
                                        borderRadius: 3,
                                    }}
                                    src={image.url}
                                >
                                </Box>
                            </Grid>
                        )
                    })}
                </Grid>
                <Button sx={{ mt: 5 }} type="submit" variant="contained" color="primary">
                    Update Product
                </Button>
            </form>
        </Box >
    );
};

export default AdminUpdateProduct;
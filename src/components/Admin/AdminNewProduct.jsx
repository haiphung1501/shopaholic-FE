import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Grid,
    Autocomplete,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { useForm, Controller } from "react-hook-form";
import { getAllCategory } from '../../apis';
import { adminCreateProduct } from '../../features/product/productSlice'
import { useDispatch } from 'react-redux';


const AdminNewProduct = () => {
    const dispatch = useDispatch();
    const [previewImages, setPreviewImages] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [inputCategoty, setInputCategory] = useState('')
    const [categories, setCategories] = useState([])
    const { register, handleSubmit, setValue, formState: { errors },
        getValues } = useForm({
            defaultValues: {
                images: [],
            }
        });
    useEffect(() => {
        const fetchCategory = async () => {
            const response = await getAllCategory();
            setCategories(response.data.categories);
        }
        fetchCategory();
    }, [])
    console.log(categories)

    const handleImageChange = (event) => {
        const files = event.target.files;
        const images = [];

        const promises = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            promises.push(
                new Promise((resolve, reject) => {
                    reader.onloadend = () => {
                        images.push(reader.result);
                        resolve();
                    };
                    reader.onerror = () => {
                        reject(reader.error);
                    };
                    reader.readAsDataURL(file);
                })
            );
        }

        Promise.all(promises)
            .then(() => {
                setPreviewImages(images);
                setValue('images', images);
            })
            .catch((error) => {
                console.error(error);
            });
    };



    const onSubmit = (data) => {
        console.log(data);
        dispatch(adminCreateProduct(data)).then((res) => {
            console.log(res)
        });
    };

    return (
        <Box maxWidth={600} margin="auto" padding={2}>
            <Typography variant="h5" gutterBottom>
                Update Product
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Name"
                    id="name"
                    name="name"
                    fullWidth
                    margin="normal"
                    required
                    {...register("name", { required: true })}
                />
                <TextField
                    label="Description"
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
                    fullWidth
                    margin="normal"
                    required
                    {...register("stock", { required: true })}
                />
                <Autocomplete
                    value={inputCategoty}
                    onInputChange={(event, newInputValue) => {
                        setSelectedCategory(newInputValue);
                        setInputCategory(newInputValue);
                        setValue('category', newInputValue);
                    }}
                    freeSolo
                    options={categories}
                    renderInput={(categories) => <TextField {...categories} label="Category" />}
                />

                <input
                    style={{ display: 'none' }}
                    accept="image/*"
                    id="picture-upload"
                    multiple
                    type="file"
                    onChange={handleImageChange}

                />
                <label htmlFor="picture-upload">
                    <Button sx={{ mt: 3 }} variant="contained" component="span">
                        <ImageIcon />
                    </Button>
                </label>
                <Grid container spacing={2}>
                    {Array.isArray(getValues('images')) &&
                        getValues('images').map((image, index) => {
                            console.log("Chay cai nay roi")
                            return (
                                <Grid item key={index}>
                                    <Box
                                        component='img'
                                        sx={{
                                            height: 150,
                                            width: 150,
                                            borderRadius: 3,
                                        }}
                                        src={image}
                                    />
                                </Grid>
                            )
                        })}
                </Grid>
                <Button sx={{ mt: 5 }} type="submit" variant="contained" color="primary">
                    Create Product
                </Button>
            </form>
        </Box >
    );
};

export default AdminNewProduct;
import React from "react";
import { useForm } from "react-hook-form";
import {
    TextField,
    Button,
    Typography,
    Box,
    Grid,
    Snackbar,
    IconButton,
    Avatar,
} from "@mui/material";
import { userUpdateRequest, userUpdateSuccess, userUpdateFailed } from '../../features/user/userSlice'
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { userUpdateReq } from "../../apis";
export default function UpdateProfile() {
    const { user } = useSelector((state) => state.user);
    const [previewImage, setPreviewImage] = useState(user ? user.user.avatar.url : null)
    const [avatarUrl, setAvatarUrl] = useState("")
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const dispatch = useDispatch();

    const updateProfile = async (data) => {
        try {
            dispatch(userUpdateRequest());
            const response = await userUpdateReq(data);
            dispatch(userUpdateSuccess(response.data));
            setOpenSnackbar(true);
        } catch (err) {
            dispatch(userUpdateFailed(err));
            setOpenSnackbar(true);
        }
    }

    const handlePreviewImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    }
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarUrl(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setAvatarUrl("");
        }
    }
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const handleFormSubmit = (data) => {
        console.log(avatarUrl);
        const myForm = new FormData();
        myForm.append('name', data.name);
        myForm.append('avatar', avatarUrl);
        updateProfile(myForm);
        setOpenSnackbar(true);
    };

    return (
        <Box
            sx={{
                pt: 8,
                pb: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: "center"
            }}
        >
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Grid container spacing={2} >
                    <Grid item xs={12} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>

                        <Typography variant="h4" fontWeight='bold' gutterBottom>
                            Update Profile
                        </Typography>
                        <input type="file" id="avatar" name="avatar" accept="image/*" style={{ display: 'none' }} {...register('avatar')} onChange={(e) => { handlePreviewImage(e); handleImageUpload(e); }} />
                        <label htmlFor="avatar">
                            <IconButton component="span">
                                <Avatar sx={{ width: 200, height: 200 }} src={previewImage || avatarUrl} />
                            </IconButton>
                        </label>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            defaultValue={user ? user.user.name : ""}
                            id="name"
                            label="Username"
                            {...register("name")}
                            fullWidth
                        />
                        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                            {errors.name && (
                                <Typography variant="caption" color="error">
                                    This field is required.
                                </Typography>
                            )}
                        </Box>
                    </Grid>

                </Grid>
                <Box mt={2}>
                    <Button variant="contained" type="submit">
                        Update Profile
                    </Button>
                </Box>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Profile updated"
            />
        </Box >
    );
}

import React from 'react'
import { Alert, Button, Box, Grid, Typography, TextField, Container } from '@mui/material'
import { useForm } from "react-hook-form";
import { userUpdatePasswordFailed, userUpdatePasswordRequest, userUpdatePasswordSuccess } from '../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { userUpdatePasswordReq } from '../../apis'
export default function UpdatePassword() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const alert = useAlert();

    const updatePassword = async (data) => {

        dispatch(userUpdatePasswordRequest());
        await userUpdatePasswordReq(data)
            .then((res) => {
                dispatch(userUpdatePasswordSuccess(res.data));
                alert.success('Password updated successfully')
            })
            .catch((err) => {
                console.log("Loi o day", err.response.data)
                dispatch(userUpdatePasswordFailed(err.response));
                alert.error(err.response.data.message)
            })
    }

    const handleFormSubmit = (data) => {
        console.log(data)
        const myFormData = new FormData();
        myFormData.append('oldPassword', data.oldPassword);
        myFormData.append('newPassword', data.newPassword);
        myFormData.append('confirmPassword', data.confirmPassword);
        console.log([...myFormData.entries()]);
        updatePassword(myFormData);
    }
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    pt: 8,
                    pb: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <Typography variant="h4" fontWeight='bold' gutterBottom>
                                Change Password
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="oldPassword"
                                label="Old Password"
                                type="password"
                                id="oldPassword"
                                {...register('oldPassword', {
                                    required: true,
                                    minLength: 6
                                })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="New Password"
                                type="password"
                                id="newPassword"
                                {...register('newPassword', {
                                    required: true,
                                    minLength: 6
                                })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                {...register('confirmPassword', {
                                    required: true,
                                    minLength: 6,
                                    validate: () => {
                                        if (watch('newPassword') != watch('confirmPassword')) {
                                            return "Your password doesn't not match";
                                        }
                                    }
                                })}
                            />
                        </Grid>
                        {Object.keys(errors).length !== 0 && (
                            <Grid item xs={12}>
                                {errors.oldPassword?.type === 'required' &&
                                    <Alert sx={{ my: 0.5 }} severity="error">
                                        Old password is required
                                    </Alert>}
                                {errors.oldPassword?.type === 'minLength' &&
                                    <Alert sx={{ my: 0.5 }} severity="error">
                                        Old password must have at least 6 characters
                                    </Alert>}
                                {errors.newPassword?.type === 'required' &&
                                    <Alert sx={{ my: 0.5 }} severity="error">
                                        New password is required
                                    </Alert>}
                                {errors.newPassword?.type === 'minLength' &&
                                    <Alert sx={{ my: 0.5 }} severity="error">
                                        New password must have at least 6 characters
                                    </Alert>}
                                {errors.confirmPassword?.type === 'minLength' &&
                                    <Alert sx={{ my: 0.5 }} severity="error">
                                        Confirm password must have at least 6 characters
                                    </Alert>}
                                {errors.confirmPassword?.type === 'required' &&
                                    <Alert sx={{ my: 0.5 }} severity="error">
                                        Confirm password is required
                                    </Alert>}
                                {errors.confirmPassword?.type === 'validate' &&
                                    <Alert sx={{ my: 0.5 }} severity="error">
                                        Password doesn't match
                                    </Alert>}
                            </Grid>
                        )}
                    </Grid>
                    <Box mt={2}>
                        <Button variant="contained" type="submit">
                            Change Password
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    )
}

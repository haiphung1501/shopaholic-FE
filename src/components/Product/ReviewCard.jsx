import React from 'react';
import { Avatar, Card, CardContent, CardHeader, Rating, Typography } from '@mui/material';

import Loader from '../layout/Loader';
function ReviewCard(props) {
    const { review } = props;

    const avatarStyle = {
        backgroundColor: '#2196f3',
    };

    return (
        <Card>
            <CardHeader
                avatar={<Avatar style={avatarStyle} src={review.user.avatar.url}></Avatar>}
                title={review.user.name}
                subheader={review.date}
            />
            <CardContent>
                <Rating size='small' value={review.rating} precision={0.5} readOnly />
                <Typography variant="body1" style={{ marginTop: 10 }}>
                    {review.comment}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ReviewCard;

import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import useStyles from "./styles";

function MenuCard({ id, name, price, imageUrl }) {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={imageUrl}
                title={name}
            />
            <CardContent className={classes.content}>
                <Typography variant="h6" component="h2">
                    {name}
                </Typography>
                <Typography variant="body1" component="p">
                    {price}원
                </Typography>
            </CardContent>
        </Card>
    );
}

export default MenuCard;
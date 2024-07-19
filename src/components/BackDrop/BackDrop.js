import React from 'react';
import { useRecoilState } from 'recoil';
import { backdropState } from '../../recoil/atoms.js';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: 2000,
        color: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
}));
export function SimpleBackdrop() {
    const [isOpen] = useRecoilState(backdropState);
    const classes = useStyles();
    if (!isOpen) return null;
    return (
        <Backdrop className={classes.backdrop} open={isOpen}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}
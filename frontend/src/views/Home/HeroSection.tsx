import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import hero from '../../assets/img/hero.jpeg'

const useStyles = makeStyles(theme => ({
    root: {
        height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))

const HeroSection = () => {
    const classes = useStyles()

    return (
        <div className={classes.root} style={{
            background: `url(${hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <Typography variant="h2" style={{
                color: '#fff',
                fontWeight: "bolder"
            }}>
                치노봇
            </Typography>
            <Typography variant="h6" style={{
                color: '#fff',
                fontWeight: 'bolder'
            }}>
                <span style={{
                    textDecoration: 'line-through'
                }}>아무 기능이나 다 때려박은</span> 다기능 봇
            </Typography>
        </div>
    );
};

export default HeroSection;
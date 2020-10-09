import React from 'react';
import connectReducers from "../../utils/connectReducers";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import SideBar from "./SideBar";
import {Menu as MenuIcon} from "@material-ui/icons";

const Header = ({user}: any) => {
    const [sidebar, setSidebar] = React.useState(false)
    return (
        <>
            <AppBar style={{
                boxShadow: 'none'
            }}>
                <Toolbar style={{
                    paddingLeft: 10,
                    paddingRight: 15
                }}>
                    <IconButton color="inherit" style={{
                        marginRight: 10
                    }} onClick={() => setSidebar(true)}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component={Link} to="/" style={{
                        color: '#fff',
                        textDecoration: 'none'
                    }}>
                        치노봇
                    </Typography>
                    <div style={{flexGrow:1}}/>
                    {
                        user ? '' : <Button color="inherit">로그인</Button>
                    }
                </Toolbar>
            </AppBar>
            <SideBar open={sidebar} onClose={() => setSidebar(false)}/>
        </>
    );
};

export default connectReducers(Header)
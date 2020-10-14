import React from 'react';
import {Button, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: '#005eff',
            color: '#fff'
        }}>
            <Typography variant="h4">404 Not Found</Typography>
            <p>페이지를 찾을 수 없습니다.</p>
            <Button component={Link} to="/" color="inherit">
                홈으로
            </Button>
        </div>
    );
}

export default NotFound;
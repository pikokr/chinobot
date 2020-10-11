import React from 'react';
import {Drawer} from "@material-ui/core";

const ServerDrawer = ({open, onClose, guild}: any) => {
    return (
        <Drawer open={open} onClose={onClose} anchor="right">
            Drawer
        </Drawer>
    );
};

export default ServerDrawer;
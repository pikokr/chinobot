import React from 'react';
import {Avatar, Drawer, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import DefaultIcon from "../../../assets/img/icon-default.png";

const ServerDrawer = ({open, onClose, guild}: any) => {
    return (
        <Drawer open={open} onClose={onClose} anchor="right">
            <ListItem>
                <ListItemIcon>
                    <Avatar
                        src={guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}` : DefaultIcon}/>
                </ListItemIcon>
                <ListItemText primary={guild.name}/>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <Avatar
                        src={guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}` : DefaultIcon}/>
                </ListItemIcon>
                <ListItemText primary={guild.name}/>
            </ListItem>
        </Drawer>
    );
};

export default ServerDrawer;
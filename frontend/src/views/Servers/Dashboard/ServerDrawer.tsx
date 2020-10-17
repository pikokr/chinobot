import React from 'react';
import {Avatar, Drawer, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import DefaultIcon from "../../../assets/img/icon-default.png";
import {Dashboard, List, Settings, Warning} from "@material-ui/icons";
import {Link} from "react-router-dom";

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
            <ListItem button component={Link} to={`/servers/${guild.id}`}>
                <ListItemIcon>
                    <Dashboard/>
                </ListItemIcon>
                <ListItemText primary="대시보드"/>
            </ListItem>
            <ListItem button component={Link} to={`/servers/${guild.id}/toggle`}>
                <ListItemIcon>
                    <Settings/>
                </ListItemIcon>
                <ListItemText primary="서버 기능 활성화/비활성화"/>
            </ListItem>
            <ListItem button component={Link} to={`/servers/${guild.id}/list`}>
                <ListItemIcon>
                    <List/>
                </ListItemIcon>
                <ListItemText primary="서버리스트 설정"/>
            </ListItem>
            <ListItem button component={Link} to={`/servers/${guild.id}/warns`}>
                <ListItemIcon>
                    <Warning/>
                </ListItemIcon>
                <ListItemText primary="경고 관리"/>
            </ListItem>
        </Drawer>
    );
};

export default ServerDrawer
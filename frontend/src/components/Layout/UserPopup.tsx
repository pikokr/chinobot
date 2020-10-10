import React, {Component} from 'react';
import {Avatar, ListItem, ListItemIcon, ListItemText, Popover} from "@material-ui/core";
import {Dns, LockOpen} from "@material-ui/icons";
import connectReducers from "../../utils/connectReducers";
import {Link} from "react-router-dom";

class UserPopup extends Component<any> {
    render() {
        const {user, setUser} = this.props
        return (
            <Popover open={this.props.open} anchorEl={this.props.anchorEl} onClose={this.props.onClose}>
                <ListItem>
                    <ListItemIcon>
                        <Avatar src={`https://cdn.discordapp.com/avatars/${user.user.id}/${user.user.avatar}`}/>
                    </ListItemIcon>
                    <ListItemText primary={user.user.tag}/>
                </ListItem>
                <ListItem button component={Link} to="/servers">
                    <ListItemIcon>
                        <Dns/>
                    </ListItemIcon>
                    <ListItemText primary="서버 선택"/>
                </ListItem>
                <ListItem button onClick={() => {
                    localStorage.removeItem('token')
                    setUser(null)
                }}>
                    <ListItemIcon>
                        <LockOpen/>
                    </ListItemIcon>
                    <ListItemText primary="로그아웃"/>
                </ListItem>
            </Popover>
        )
    }
}

export default connectReducers(UserPopup) as any
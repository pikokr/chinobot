import React, {Component} from 'react';
import {Avatar, ListItem, ListItemIcon, ListItemText, Menu} from "@material-ui/core";

class UserPopup extends Component<any> {
    render() {
        const {user} = this.props
        console.log(user)
        return (
            <Menu open={this.props.open} anchorEl={this.props.anchorEl} onClose={this.props.onClose}>
                <ListItem>
                    <ListItemIcon>
                        <Avatar src={`https://cdn.discordapp.com/avatars/${user.user.id}/${user.user.avatar}`}/>
                    </ListItemIcon>
                    <ListItemText primary={user.user.tag}/>
                </ListItem>
            </Menu>
        );
    }
}

export default UserPopup;
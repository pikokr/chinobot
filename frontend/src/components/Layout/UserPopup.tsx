import React, {Component} from 'react';
import {ListItem, ListItemText, Menu} from "@material-ui/core";

class UserPopup extends Component<any> {
    render() {
        const {user} = this.props
        console.log(user)
        return (
            <Menu open={this.props.open} anchorEl={this.props.anchorEl} onClose={this.props.onClose}>
                <ListItem>
                    <ListItemText primary={user.tag}/>
                </ListItem>
            </Menu>
        );
    }
}

export default UserPopup;
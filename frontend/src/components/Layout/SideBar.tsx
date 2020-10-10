import React, {Component} from 'react';
import {Drawer, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Dns as ServerIcon} from "@material-ui/icons";
import {Link} from "react-router-dom";

type SideBarProps = {
    onClose: () => void
    open: boolean
}

class SideBar extends Component<SideBarProps> {
    render() {
        return (
            <Drawer open={this.props.open} onClose={this.props.onClose}>
                <ListItem button component={Link} to="/status" onClick={this.props.onClose}>
                    <ListItemIcon>
                        <ServerIcon/>
                    </ListItemIcon>
                    <ListItemText primary="봇 상태" secondary="치노봇의 상태를 확인하실 수 있습니다."/>
                </ListItem>
            </Drawer>
        );
    }
}

export default SideBar;
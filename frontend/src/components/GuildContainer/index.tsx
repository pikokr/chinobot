import React, {Component} from 'react';
import {Avatar, Card, CardContent, CardHeader, IconButton} from "@material-ui/core";
import DefaultIcon from '../../assets/img/icon-default.png'
import {Menu as MenuIcon} from "@material-ui/icons";
import ServerDrawer from "../../views/Servers/Dashboard/ServerDrawer";

class GuildContainer extends Component<{
    guild: any
}> {
    state = {
        drawer: false
    }

    render() {
        const {guild} = this.props

        return (
            <Card>
                <CardHeader title={guild.name} avatar={
                    <Avatar
                        src={guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}` : DefaultIcon}/>
                } action={<IconButton onClick={() => this.setState({drawer: true})}>
                    <MenuIcon/>
                </IconButton>}/>
                <ServerDrawer guild={guild} open={this.state.drawer} onClose={() => this.setState({drawer: false})}/>
                <CardContent>
                    {this.props.children}
                </CardContent>
            </Card>
        );
    }
}

export default GuildContainer;
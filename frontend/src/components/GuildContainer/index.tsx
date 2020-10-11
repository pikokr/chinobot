import React, {Component} from 'react';
import {Avatar, Card, CardContent, CardHeader, IconButton} from "@material-ui/core";
import DefaultIcon from '../../assets/img/icon-default.png'
import {Menu as MenuIcon} from "@material-ui/icons";

class GuildContainer extends Component<{
    guild: any
}> {
    render() {
        const {guild} = this.props

        return (
            <Card>
                <CardHeader title={guild.name} avatar={
                    <Avatar
                        src={guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}` : DefaultIcon}/>
                } action={<IconButton>
                    <MenuIcon/>
                </IconButton>}/>
                <CardContent>
                    {this.props.children}
                </CardContent>
            </Card>
        );
    }
}

export default GuildContainer;
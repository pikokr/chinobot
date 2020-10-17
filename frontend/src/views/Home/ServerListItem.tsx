import React from 'react';
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    ListItem,
    ListItemText,
    Typography
} from "@material-ui/core";
import DefaultIcon from "../../assets/img/icon-default.png";
import {motion} from "framer-motion";

const ServerListItem = ({guild}: {guild: any}) => {
    guild.brief = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda atque commodi deleniti eius fuga fugit, harum illum inventore iste laborum modi nemo nisi placeat praesentium quo reprehenderit sint tempora, voluptatem?'
    const Content = <>
        <CardHeader avatar={
            <Avatar src={guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}` : DefaultIcon}/>
        } title={guild.name}/>
        <Divider/>
        <ListItem>
            <ListItemText primary={`멤버 수: ${guild.members}`}/>
        </ListItem>
        <Divider/>
        <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
                {guild.brief.length > 100 ? (guild.brief.slice(0,100) + '...') : guild.brief}
            </Typography>
        </CardContent>
    </>

    return <Grid item xs={12} md={4} lg={3} component={motion.div} variants={{
        hidden: {y: 20, opacity: 0},
        visible: {
            y: 0,
            opacity: 1
        }
    }}>
        <Card>
            {Content}
        </Card>
    </Grid>
}

export default ServerListItem;
import React from 'react';
import {
    Avatar, Button,
    Card, CardActions,
    CardContent,
    CardHeader, Collapse,
    Divider,
    Grid, IconButton,
    ListItem,
    ListItemText,
    Typography
} from "@material-ui/core";
import DefaultIcon from "../../assets/img/icon-default.png";
import {motion} from "framer-motion";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {Add, Details, ExpandMore} from "@material-ui/icons";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    }
}))

const ServerListItem = ({guild}: {guild: any}) => {
    const classes = useStyles()
    const [expanded, setExpanded] = React.useState(false)
    const Content = <>
        <CardHeader avatar={
            <Avatar src={guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : DefaultIcon}/>
        } title={guild.name}/>
        <Divider/>
        <ListItem>
            <ListItemText primary={`멤버 수: ${guild.members}`}/>
        </ListItem>
        {
            guild.brief &&
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {guild.brief.length > 100 ? (guild.brief.slice(0,100) + '...') : guild.brief}
                </Typography>
            </CardContent>
        }
        <Divider/>
        <CardActions disableSpacing>
            <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
            >
                <ExpandMore />
            </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Divider/>
            <CardActions>
                <Button variant="contained" color="primary" href={guild.invite} target="_blank">
                    <Add/> 참가하기
                </Button>
                <Button component={Link} to={`/server/${guild.id}`} variant="contained" color="secondary">
                    <Details/> 상세정보
                </Button>
            </CardActions>
        </Collapse>
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
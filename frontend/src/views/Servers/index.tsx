import React, {Component} from 'react';
import Layout from "../../components/Layout";
import {graphql} from "../../utils/graphql";
import {gql} from "@apollo/client";
import {
    Avatar,
    Card, CardActionArea, CardHeader,
    Grid,
    Typography
} from "@material-ui/core";
import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import DefaultIcon from '../../assets/img/icon-default.png'
import connectReducers from "../../utils/connectReducers";
import {INVITE_URL} from "../../config";

class Servers extends Component<any> {
    state: {
        guilds: any
    } = {
        guilds: null
    }

    async componentDidMount() {
        const res = await graphql(gql`
            query {
                me {
                    guilds(type: ADMIN) {
                        bot
                        id
                        name
                        icon
                    }
                }
            }
        `)

        this.setState({guilds: res.me?.guilds || []})
    }

    render() {
        return (
            <Layout>
                {
                    this.props.user ? this.state.guilds ? this.state.guilds.length ? (
                        (
                            <Grid container spacing={1} style={{
                                width: '100%'
                            }} component={motion.div} variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        when: 'beforeChildren',
                                        staggerChildren: 0.1
                                    }
                                }
                            }} initial="hidden"
                                  animate="visible">
                                {
                                    this.state.guilds.map((guild: any, i: number) => {
                                        const Content = <CardActionArea component="div">
                                            {/*<CardMedia
                                                image={guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}` : DefaultIcon}
                                                title={guild.name} style={{
                                                height: 0,
                                                paddingTop: '50%',
                                            }}/>
                                                <CardContent>
                                                <Typography variant="h6">
                                                {guild.name}
                                                </Typography>
                                                </CardContent>*/}
                                                <CardHeader avatar={
                                                    <Avatar src={guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}` : DefaultIcon}/>
                                                } title={guild.name}/>
                                        </CardActionArea>
                                        return (
                                        <Grid item xs={12} md={4} lg={3} component={motion.div} variants={{
                                            hidden: {y: 20, opacity: 0},
                                            visible: {
                                                y: 0,
                                                opacity: 1
                                            }
                                        }} key={i}>
                                            <Card>
                                                {
                                                    guild.bot ? <Link to={`/servers/${guild.id}`} style={{
                                                        color: '#000',
                                                        textDecoration: 'none'
                                                    }}>
                                                        {Content}
                                                    </Link> : <div onClick={() => {
                                                        window.open(`${INVITE_URL}&guild_id=${guild.id}`, '', 'width=350;height=400')
                                                    }}>
                                                        {Content}
                                                    </div>
                                                }
                                            </Card>
                                        </Grid>
                                    ) })
                                }
                            </Grid>
                        )
                    ) : '관리자 권한이 있는 서버가 없습니다' : '서버 목록 로딩중..' : (
                        <Typography variant="h4">
                            로그인 해주세요
                        </Typography>
                    )
                }
            </Layout>
        );
    }
}

export default connectReducers(Servers)
import React, {Component} from 'react';
import Layout from "../../components/Layout";
import {Button, Card, CardContent, Grid, Typography} from "@material-ui/core";
import DefaultIcon from "../../assets/img/icon-default.png";
import {graphql} from "../../utils/graphql";
import {gql} from "@apollo/client";
import {Add} from "@material-ui/icons";

class ServerListDetails extends Component<any> {
    state: {
        guild: any
    } = {
        guild: null
    }

    async componentDidMount() {
        const data = await graphql(gql`
            query {
                listGuild(id: "${this.props.match.params.id}") {
                    icon
                    id
                    name
                    members
                    description
                    invite
                    brief
                }
            }
        `)
        if (data.listGuild) {
            this.setState({guild: data.listGuild})
        } else {
            this.setState({guild: false})
        }
    }

    render() {
        const {guild} = this.state

        return (
            <Layout>
                {guild === null ? '로딩중....' : guild ?
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={4} md={2}>
                                            <img style={{
                                                width: '100%'
                                            }}
                                                 src={guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}` : DefaultIcon}
                                                 alt="server icon"/>
                                        </Grid>
                                        <Grid item xs={8} md={10}>
                                            <Typography variant="h4">
                                                {guild.name}
                                            </Typography>
                                            <Typography variant="body1">
                                                멤버 {guild.members}명
                                            </Typography>
                                            <Typography variant="body1">
                                                {guild.brief}
                                            </Typography>
                                            <Button variant="contained" color="primary" href={guild.invite} target="_blank">
                                                <Add/> 참가하기
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        {
                            guild.description &&
                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent>{guild.description}</CardContent>
                                    </Card>
                                </Grid>
                        }
                    </Grid> : '로드 실패'}
            </Layout>
        );
    }
}

export default ServerListDetails;
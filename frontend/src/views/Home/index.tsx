import React, {Component} from 'react';
import Layout from "../../components/Layout";
import {Container, Grid, Typography} from "@material-ui/core";
import {graphql} from "../../utils/graphql";
import {gql} from "@apollo/client";
import {motion} from "framer-motion";
import ServerListItem from "./ServerListItem";
import HeroSection from "./HeroSection";

class Home extends Component {
    state: {
        servers: any
    } = {
        servers: null
    }

    async componentDidMount() {
        const data = await graphql(gql`
            query {
                listGuilds {
                    guilds {
                        id
                        icon
                        invite
                        members
                        name
                        brief
                    }
                    pages
                }
            }
        `)
        if (data.listGuilds) {
            this.setState({
                servers: data.listGuilds
            })
        }
    }

    render() {
        const {servers} = this.state

        return (
            <Layout noContainer>
                <HeroSection/>
                <Container>
                    <Typography variant="h5">서버 랭킹(?)</Typography>
                    {
                        servers === null ? '서버 목록 로드중...' : servers ? (
                            <Grid container spacing={1} style={{
                                width: '100%'
                            }} component={motion.div} variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        when: 'beforeChildren',
                                        staggerChildren: .1
                                    }
                                }
                            }} initial="hidden"
                                  animate="visible">
                                {
                                    servers.guilds?.map((guild: any, i: number) => <ServerListItem guild={guild} key={i}/>)
                                }
                            </Grid>
                        ) : '서버 목록 로딩 실패'
                    }
                </Container>
            </Layout>
        );
    }
}

export default Home;
import React, {Component} from 'react';
import Layout from "../../../../components/Layout";
import {graphql} from "../../../../utils/graphql";
import {gql} from "@apollo/client";
import GuildContainer from "../../../../components/GuildContainer";
import {Card, CardContent, CardHeader, DialogContent, Grid, Switch, Typography} from "@material-ui/core";
import {QuestionAnswer} from "@material-ui/icons";

const categories = [
    {
        name: '기본',
        items: [
            {
                name: '도움말',
                code: 'help',
                icon: QuestionAnswer
            }
        ]
    }
]

class Toggle extends Component<any> {
    state: {
        guild: any
    } = {
        guild: null
    }

    async componentDidMount() {
        const data = await graphql(gql`
            query {
                guild(id: "${this.props.match.params.id.replace('"', '\\"')}") {
                    icon
                    id
                    name
                }
            }
        `)
        if (data.guild) {
            this.setState({
                guild: data.guild
            })
        } else {
            this.setState({
                guild: false
            })
        }
    }

    render() {
        const {guild} = this.state

        return (
            <Layout>
                <GuildContainer guild={guild}>
                    {
                        categories.map((category, i) => (
                            <div key={i}>
                                <Typography variant="h5">
                                    {category.name}
                                    <Grid container spacing={2}>
                                        {
                                            category.items.map((item,idx) => (
                                                <Grid item xs={12} md={4}>
                                                    <Card key={idx} variant="outlined">
                                                        <CardHeader title={item.name} avatar={<item.icon/>} action={
                                                            <Switch/>
                                                        }/>
                                                    </Card>
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                </Typography>
                            </div>
                        ))
                    }
                </GuildContainer>
            </Layout>
        );
    }
}

export default Toggle;
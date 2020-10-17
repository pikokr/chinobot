import React, {Component} from 'react';
import Layout from "../../../../components/Layout";
import {
    Dialog,
    DialogActions,
    DialogContent, Switch, Typography,
} from "@material-ui/core";
import GuildContainer from "../../../../components/GuildContainer";
import {graphql} from "../../../../utils/graphql";
import {gql} from "@apollo/client";

class List extends Component<any> {
    state: {
        guild: any
        loading: boolean
    } = {
        guild: null,
        loading: true
    }

    async componentDidMount() {
        const data = await graphql(gql`
            query {
                guild(id: "${this.props.match.params.id.replace('"', '\\"')}") {
                    icon
                    id
                    name
                    disabled
                    serverListEnabled
                }
            }
        `)
        if (data.guild) {
            this.setState({
                guild: data.guild,
                disables: data.guild.disabled,
                loading: false
            })
        } else {
            this.setState({
                guild: false,
                loading: false
            })
        }
    }

    render() {
        const {guild} = this.state

        return (
            <Layout>
                <Dialog open={this.state.loading}>
                    <DialogContent>
                        데이터 처리중입니다. 잠시만 기다려주세요..
                    </DialogContent>
                    <DialogActions/>
                </Dialog>
                <GuildContainer guild={guild}>
                    <Typography style={{
                        display: 'flex'
                    }} variant="h5">
                        <div style={{flexGrow: 1}}>서버리스트 설정</div>
                        <Typography align="right" variant="caption">
                            <Switch checked={guild && guild.serverListEnabled} onChange={async (event, checked) => {
                                if (checked === guild.serverListEnabled) return
                                this.setState({loading: true})
                                if (checked) {
                                    await graphql(gql`
                                        query {
                                            guild(id: "${this.props.match.params.id.replace('"', '\\"')}") {
                                                enableServerList
                                            }
                                        }
                                    `)
                                } else {
                                    await graphql(gql`
                                        query {
                                            guild(id: "${this.props.match.params.id.replace('"', '\\"')}") {
                                                disableServerList
                                            }
                                        }
                                    `)
                                }
                                await this.componentDidMount.bind(this)()
                            }}/>
                        </Typography>
                    </Typography>
                    {
                        guild && guild.serverListEnabled && <div>
                            테스트
                        </div>
                    }
                </GuildContainer>
            </Layout>
        );
    }
}

export default List;
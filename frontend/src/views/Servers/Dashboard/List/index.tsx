import React, {Component} from 'react';
import Layout from "../../../../components/Layout";
import {
    Button, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent, Switch, TextField, Typography,
} from "@material-ui/core";
import GuildContainer from "../../../../components/GuildContainer";
import {graphql} from "../../../../utils/graphql";
import {gql} from "@apollo/client";

class List extends Component<any> {
    state: {
        guild: any
        loading: boolean,
        updatingData: boolean,
        desc: string,
        brief: string
    } = {
        guild: null,
        loading: true,
        updatingData: false,
        desc: '',
        brief: ''
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
                    description
                    brief
                }
            }
        `)
        if (data.guild) {
            this.setState({
                guild: data.guild,
                disables: data.guild.disabled,
                loading: false,
                brief: data.guild.brief || '',
                desc: data.guild.description || ''
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
                            <TextField onChange={e => this.setState({brief: e.target.value})} label="짧은 설명(홈에 표시됩니다)" fullWidth value={this.state.brief} disabled={this.state.updatingData}/>
                            <p/>
                            <TextField onChange={e => this.setState({desc: e.target.value})} label="설명(서버 정보 페이지에 표시됩니다)" disabled={this.state.updatingData} value={this.state.desc} fullWidth multiline/>
                            <p/>
                            <Typography align="right">
                                <Button disabled={this.state.updatingData} variant="contained" onClick={async () => {
                                    this.setState({
                                        updatingData: true
                                    })
                                    await graphql(gql`
                                        query {
                                            guild(id: "${this.props.match.params.id.replace('"', '\\"')}") {
                                                setDescription(description: "${this.state.desc.replace('"', '\\"')}")
                                                setBrief(brief: "${this.state.brief.replace('"', '\\"')}")
                                            }
                                        }
                                    `)
                                    await this.componentDidMount.bind(this)()
                                    this.setState({
                                        updatingData: false
                                    })
                                }}>{
                                    this.state.updatingData ? <CircularProgress size={20}/> : '저장'
                                }</Button>
                            </Typography>
                        </div>
                    }
                </GuildContainer>
            </Layout>
        );
    }
}

export default List;
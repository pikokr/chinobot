import React, {Component} from 'react';
import Layout from "../../../../components/Layout";
import {graphql} from "../../../../utils/graphql";
import {gql} from "@apollo/client";
import GuildContainer from "../../../../components/GuildContainer";
import {
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    Grid, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText,
    Switch,
    Typography
} from "@material-ui/core";
import {
    Code,
    Info,
    ListAlt,
    PlayArrow,
    SkipNext,
    Stop,
    Warning,
    List as ListIcon,
    ClearAll,
    Block, MusicNote, SurroundSound, ExitToApp, Dashboard
} from "@material-ui/icons";

const categories = [
    {
        name: '기본',
        items: [
            {name: '대시보드', code: 'dashboard', icon: Dashboard},
            {name: '개발자', code: 'developer', icon: Code},
        ]
    },
    {
        name: '정보',
        items: [
            {name: '서버 정보', code: 'guild_info', icon: Info}
        ]
    },
    {
        name: '관리',
        items: [
            {name: '경고', code: 'warn', icon: Warning},
            {name: '경고 목록', icon: ListAlt, code: 'warn_list'},
            {code: 'warn_stack', icon: ListIcon, name: '경고 스택 설정'},
            {name: '채팅청소', code: 'clear', icon: ClearAll},
            {name: '차단', code: 'ban', icon: Block},
            {name: '추방', code: 'kick', icon: ExitToApp}
        ]
    },
    {
        name: '음악',
        items: [
            {name: '재생', icon: PlayArrow, code: 'play'},
            {name: '정지', icon: Stop, code: 'stop'},
            {name: '스킵', icon: SkipNext, code: 'skip'},
            {name: '볼륨', icon: SurroundSound, code: 'volume'},
            {name: '현재곡', icon: MusicNote, code: 'now_playing'}
        ]
    }
]

class Toggle extends Component<any> {
    state: {
        guild: any
        disables: string[],
        loading: boolean
    } = {
        guild: null,
        disables: [],
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
                        데이터 처리중입니다...
                    </DialogContent>
                    <DialogActions/>
                </Dialog>
                <GuildContainer guild={guild}>
                    {
                        categories.map((category, i) => (
                            <div key={i}>
                                <Typography variant="h5">
                                    {category.name}
                                    <Grid container spacing={2}>
                                        {
                                            category.items.map((item, idx) => (
                                                <Grid item xs={12} md={4} key={idx}>
                                                    <Card variant="outlined">
                                                        <List>
                                                            <ListItem>
                                                                <ListItemIcon>
                                                                    <item.icon/>
                                                                </ListItemIcon>
                                                                <ListItemText primary={item.name}/>
                                                                <ListItemSecondaryAction>
                                                                    <Switch
                                                                        checked={!this.state.disables.includes(item.code)}
                                                                        onChange={async (event, checked) => {
                                                                            this.setState(
                                                                                {
                                                                                    loading: true
                                                                                }
                                                                            )
                                                                            if (this.state.disables.includes(item.code)) {
                                                                                const data = await graphql(gql`
                                                                        query {
                                                                            guild(id: "${this.props.match.params.id.replace('"', '\\"')}") {
                                                                                enable(command: ${item.code})
                                                                            }
                                                                        }
                                                                    `)
                                                                                this.setState({
                                                                                    disables: data.guild.enable,
                                                                                    loading: false
                                                                                })
                                                                            } else {
                                                                                const data = await graphql(gql`
                                                                        query {
                                                                            guild(id: "${this.props.match.params.id.replace('"', '\\"')}") {
                                                                                disable(command: ${item.code})
                                                                            }
                                                                        }
                                                                    `)
                                                                                this.setState({
                                                                                    disables: data.guild.disable,
                                                                                    loading: false
                                                                                })
                                                                            }
                                                                        }}/>
                                                                </ListItemSecondaryAction>
                                                            </ListItem>
                                                        </List>
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
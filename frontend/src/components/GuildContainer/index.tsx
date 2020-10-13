import React, {Component} from 'react';
import {Avatar, Card, CardContent, CardHeader, IconButton, Typography} from "@material-ui/core";
import DefaultIcon from '../../assets/img/icon-default.png'
import {Menu as MenuIcon} from "@material-ui/icons";
import ServerDrawer from "../../views/Servers/Dashboard/ServerDrawer";

class GuildContainer extends Component<{
    guild: any
}> {
    state = {
        drawer: false
    }

    render() {
        const {guild} = this.props

        return (
            <Card>
                {
                    guild === null ? '로딩중..' : guild === false ? <CardContent>
                        이 페이지는 다음 이유로 표시되지 않았습니다.
                        <Typography>
                            서버가 존재하지 않음
                        </Typography>
                        <Typography>
                            로그인하지 않음
                        </Typography>
                        <Typography>
                            봇이 서버에 없음
                        </Typography>
                        <Typography>
                            유저에게 관리자 권한이 없음
                        </Typography>
                        <Typography>
                            해당 서버를 핸들중인 샤드가 서버에 없음
                        </Typography>
                        <Typography>
                            API 서버에 오류가 발생함
                        </Typography>
                    </CardContent> : (
                        <>
                            <CardHeader title={guild.name} avatar={
                                <Avatar
                                    src={guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}` : DefaultIcon}/>
                            } action={<IconButton onClick={() => this.setState({drawer: true})}>
                                <MenuIcon/>
                            </IconButton>}/>
                            <ServerDrawer guild={guild} open={this.state.drawer} onClose={() => this.setState({drawer: false})}/>
                            <CardContent>
                                {this.props.children}
                            </CardContent>
                        </>
                    )
                }
            </Card>
        );
    }
}

export default GuildContainer;
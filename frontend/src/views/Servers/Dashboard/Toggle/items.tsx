import {
    Block,
    ClearAll,
    Code,
    Dashboard,
    ExitToApp,
    Info,
    List as ListIcon,
    ListAlt, MusicNote, PlayArrow, Search, SkipNext, Stop, SurroundSound, Timer,
    Warning, Wifi
} from "@material-ui/icons";
import React from "react";

export default [
    {
        name: '기본',
        items: [
            {name: '대시보드', code: 'dashboard', icon: <Dashboard/>},
            {name: '개발자', code: 'developer', icon: <Code/>},
            {name: '핑', code: 'ping', icon: <Wifi/>},
            {name: '업타임', code: 'uptime', icon: <Timer/>}
        ]
    },
    {
        name: '정보',
        items: [
            {name: '서버 정보', code: 'guild_info', icon: <Info/>}
        ]
    },
    {
        name: '관리',
        items: [
            {name: '경고', code: 'warn', icon: <Warning/>},
            {name: '경고 목록', icon: <ListAlt/>, code: 'warn_list'},
            {code: 'warn_stack', icon: <ListIcon/>, name: '경고 스택 설정'},
            {name: '채팅청소', code: 'clear', icon: <ClearAll/>},
            {name: '차단', code: 'ban', icon: <Block/>},
            {name: '추방', code: 'kick', icon: <ExitToApp/>}
        ]
    },
    {
        name: '음악',
        items: [
            {name: '재생', icon: <PlayArrow/>, code: 'play'},
            {name: '정지', icon: <Stop/>, code: 'stop'},
            {name: '스킵', icon: <SkipNext/>, code: 'skip'},
            {name: '볼륨', icon: <SurroundSound/>, code: 'volume'},
            {name: '현재곡', icon: <MusicNote/>, code: 'now_playing'}
        ]
    },
    {
        name: '검색',
        items: [
            {
                icon: <Search/>,
                code: 'npm',
                name: 'NPM 검색'
            }
        ]
    },
    {
        name: '코딩',
        items: [
            {
                name: '바벨 트랜스파일',
                code: 'babel',
                icon: <Code/>
            },
            {
                name: '타입스크립트 트랜스파일',
                code: 'typescript',
                icon: <Code/>
            },
            {
                name: 'Discord.JS 검색',
                code: 'search_djs',
                icon: <Search/>
            },
            {
                name: 'Discord.js-Commando 검색',
                code: 'search_commando',
                icon: <Search/>
            },
            {
                name: 'discord-akairo 검색',
                code: 'search_akairo',
                icon: <Search/>
            }
        ]
    }
]
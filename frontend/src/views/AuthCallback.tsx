import React, {Component} from 'react';
import {Button, Grid, Typography} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {graphql} from "../utils/graphql";
import {gql} from "@apollo/client";

class AuthCallback extends Component {
    state = {
        loading: true,
        error: false
    }

    async componentDidMount() {
        const query = new URLSearchParams(window.location.search.replace('?', ''))
        const code = query.get('code')
        if (localStorage.getItem('token')) {
            this.setState({
                loading: false,
                error: false
            })
            localStorage.redirect ? window.location.assign(localStorage.redirect) : window.location.assign('/')
            delete localStorage.redirect
        }
        if (!code) {
            this.setState({
                loading: false,
                error: true
            })
            return
       }
        const data = await graphql(gql`            
            mutation {
                login(code: "${code!.replace('"','\\""')}")
            }
        `)
        if (data.login) {
            localStorage.setItem('token', data.login)
            this.setState({
                loading: false,
                error: false
            })
            localStorage.redirect ? window.location.assign(localStorage.redirect) : window.location.assign('/')
        } else {
            this.setState({
                loading: false,
                error: true
            })
            return
        }
    }

    render() {
        return (
            <Grid container justify="center" alignItems="center" style={{
                height: '100vh',
                flexDirection: 'column'
            }}>
                <FontAwesomeIcon icon={['fab', 'discord']} size="3x"/>
                <div style={{height: 20}}/>
                <Typography>
                    {
                        this.state.loading ? '디스코드 로그인 처리중입니다....' : this.state.error ? (
                            <>
                                로그인 처리중 오류가 발생했습니다
                            </>
                        ): (
                            <>
                                로그인이 완료되었습니다. 리다이렉트중...
                            </>
                        )
                    }
                </Typography>
                {
                    this.state.error && <Button onClick={() => {
                        localStorage.redirect ? window.location.assign(localStorage.redirect) : window.location.assign('/')
                        delete localStorage.redirect
                    }}>돌아가기</Button>
                }
            </Grid>
        );
    }
}

export default AuthCallback;
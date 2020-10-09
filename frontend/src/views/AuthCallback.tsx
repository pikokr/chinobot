import React, {Component} from 'react';
import {Grid, Typography} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class AuthCallback extends Component {
    state = {
        loading: true,
        error: false
    }

    componentDidMount() {
        if (!window.opener) {
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
                height: '100vh'
            }}>
                <FontAwesomeIcon icon={['fab', 'discord']}/>
                <Typography>
                    {
                        this.state.loading ? '디스코드 로그인 처리중입니다....' : this.state.error ? '로그인 처리중 오류가 발생했습니다': '로그인이 완료되었습니다. 리다이렉트중...'
                    }
                </Typography>
            </Grid>
        );
    }
}

export default AuthCallback;
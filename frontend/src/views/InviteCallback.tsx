import React, {Component} from 'react';

class InviteCallback extends Component {

    componentDidMount() {
        if (!window.opener) return
        window.opener.location.reload()
        window.close()
    }

    render() {
        return (
            <div>
                처리중입니다...
            </div>
        );
    }
}

export default InviteCallback;
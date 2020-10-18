import React, {Component} from 'react';
import {graphql} from "../utils/graphql";
import {gql} from "@apollo/client";

class InviteCallback extends Component {
    async componentDidMount() {
        if (!window.opener) return
        const params = new URLSearchParams(window.location.search.slice(1))
        await graphql(gql`
            mutation {
                invite(code: "${params.get('code')?.replace('"', '\\""')}")
        }
        `)
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
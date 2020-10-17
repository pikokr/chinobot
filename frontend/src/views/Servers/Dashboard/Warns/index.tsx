import React, {Component} from 'react';
import Layout from "../../../../components/Layout";
import {graphql} from "../../../../utils/graphql";
import {gql} from "@apollo/client";
import GuildContainer from "../../../../components/GuildContainer";
import MaterialTable from "material-table";

class Warns extends Component<any> {
    state: {
        guild: any,
        warns: any[]|null,
        loading: boolean
    } = {
        guild: null,
        warns: null,
        loading: true
    }

    async componentDidMount() {
        const data = await graphql(gql`
            query {
                guild(id: "${this.props.match.params.id.replace('"', '\\"')}") {
                    icon
                    id
                    name
                    warns {
                        id
                        member
                        reason
                    }
                }
            }
        `)
        console.log(data)
        if (data.guild) {
            this.setState({
                guild: data.guild,
                warns: data.guild.warns,
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
        const {guild, loading} = this.state

        return (
            <Layout>
                <GuildContainer guild={guild}>
                    <MaterialTable columns={[{
                        title: 'ID',
                        field: 'id'
                    }, {
                        title: '멤버',
                        field: 'member'
                    }, {
                        title: '사유',
                        field: 'reason'
                    }]} data={this.state.warns || []} localization={{
                        pagination: {
                            nextTooltip: '다음 페이지',
                            firstTooltip: '첫 페이지',
                            lastTooltip: '마지막 페이지',
                            previousTooltip: '이전 페이지',
                            labelRowsSelect: '개씩 표시'
                        },
                        toolbar: {
                            searchPlaceholder: '검색',
                            searchTooltip: '검색'
                        },
                        header: {
                            actions: <>작업</>
                        },
                        body: {
                            emptyDataSourceMessage: '경고가 없습니다',
                            addTooltip: '추가',
                            deleteTooltip: '삭제'
                        }
                    }} isLoading={loading} title="경고 관리" editable={{
                        onRowDelete: async oldData => {
                            const data = [...this.state.warns!]
                            const idx = data.indexOf(oldData)
                            if (idx !== -1) data.splice(idx,1)
                            console.log(data)
                        }
                    }}/>
                </GuildContainer>
            </Layout>
        );
    }
}

export default Warns;
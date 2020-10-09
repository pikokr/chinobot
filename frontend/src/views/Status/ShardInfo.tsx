import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Grid} from "@material-ui/core";
import _ from 'lodash'
import {Pagination} from "@material-ui/lab";

const ShardInfo = ({data}: any) => {
    const [page, setPage] = React.useState(0)
    const chunks = _.chunk(data, 20)
    const chunk = chunks[page]
    return (
        <>
            <Grid container spacing={1}>
                {
                    chunk ?
                    chunk.map((shard: any, i: number) => (
                        <Grid item xs={12} md={4}>
                            <Accordion key={i} defaultExpanded>
                                <AccordionSummary>
                                    샤드 #{shard.id}
                                </AccordionSummary>
                                <AccordionDetails style={{
                                    display: 'grid'
                                }}>
                                    <div>
                                        상태: {shard.online ? '온라인' : '오프라인'}
                                    </div>
                                    {
                                        shard.online && (
                                            <>
                                                <div>
                                                    핸들중인 서버 수: {shard.guilds}
                                                </div>
                                                <div>
                                                    핸들중인 유저 수: {shard.users}
                                                </div>
                                            </>
                                        )
                                    }
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    )) : '페이지를 찾을 수 없습니다'
                }
            </Grid>
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: 20
            }}>
                <Pagination count={chunks.length} onChange={(e,v) => setPage(v-1)}/>
            </div>
        </>
    );
};

export default ShardInfo;
import {GRAPHQL_URL} from "../config";
import {DocumentNode} from "graphql";

function getGqlString(doc: DocumentNode) {
    return doc.loc && doc.loc.source.body;
}

export async function graphql(data: DocumentNode) {
    const res = (await fetch(GRAPHQL_URL, {
        headers: {
            Authorization: (localStorage.getItem('token') && `Bearer ${localStorage.getItem('token')}`) || '',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: getGqlString(data)
        }),
        method: 'POST'
    }))
    const text = await res.text()
    const json = JSON.parse(text)
    return json.data
}

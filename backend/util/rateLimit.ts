import fetch, {Response} from "node-fetch";

export const req = (...data: [
    RequestInfo,
    RequestInit?
]) : Promise<Response> => new Promise(async resolve => {
    // @ts-ignore
    await fetch(...data).then(async result => {
        if (result.status === 429) {
            const json = await result.json()
            console.log(json)
            return resolve(new Promise(r2=>setTimeout(r2, json.retry_after)).then(() => req(...data)))
        }
        return resolve(result)
    })
})
export default function (str: string, parameters: any) {
    return str.replace(/{{|}}|{(\d+)}/g, function (m, i) {
        if (m == "{{") return "{"
        if (m == "}}") return "}"
        console.log(m)
        return i
    })
}
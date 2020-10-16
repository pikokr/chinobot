export function formatTime(duration: number) {
    const d = new Date(0)
    d.setMilliseconds(duration)
    return d.toISOString().substr(11, 8)
}
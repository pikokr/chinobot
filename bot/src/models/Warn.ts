import * as mongoose from 'mongoose'

interface Warn extends mongoose.Document {
    id: string
    guild: string
    reason: string
}

const schema = new mongoose.Schema({
    id: {type: String, required: true},
    guild: {type: String, required: true},
    reason: {type: String, required: true, default: '사유 없음'},
    createdAt: {type: Number, required: true, default: () => Date.now()}
})

let warn: mongoose.Model<Warn>

try {
    warn = mongoose.model('warn')
} catch (e) {
    warn = mongoose.model('warn', schema)
}
export default warn

import * as mongoose from 'mongoose'

interface Guild extends mongoose.Document {
    id: string
    warnStack: number
}

const schema = new mongoose.Schema({
    id: {type: String, required: true},
    warnStack: {type: Number, required: true, default: 0}
})

let warn: mongoose.Model<Guild>

try {
    warn = mongoose.model('guild')
} catch (e) {
    warn = mongoose.model('guild', schema)
}
export default warn

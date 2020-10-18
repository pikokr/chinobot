import * as mongoose from 'mongoose'

interface Guild extends mongoose.Document {
    id: string
    warnStack: number
    disabledCommands: string[]
    serverListEnabled: boolean
    brief: string|null
    description: string|null
}

const schema = new mongoose.Schema({
    id: {type: String, required: true},
    warnStack: {type: Number, required: true, default: 0},
    disabledCommands: {
        type: Array,
        required: true,
        default: []
    },
    serverListEnabled: {
        type: Boolean,
        required: true,
        default: false
    },
    brief: {
        type: String,
        required: false,
        default: null
    },
    description: {
        type: String,
        required: false,
        default: null
    }
})

let guild: mongoose.Model<Guild>

try {
    guild = mongoose.model('guild')
} catch (e) {
    guild = mongoose.model('guild', schema)
}
export default guild

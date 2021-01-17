import mongoose from 'mongoose'

const Schema = mongoose.Schema

const worldSchema = new Schema({
    code: { type: String, required: true, unique: true },
    datetime: { type: Number, required: true },
    alliances: Array,
    players: Array,
    cities: Array
})

export default mongoose.model('World', worldSchema)
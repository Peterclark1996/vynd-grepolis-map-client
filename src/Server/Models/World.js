import mongoose from 'mongoose'

const Schema = mongoose.Schema

const worldSchema = new Schema({
    code: String,
    datetime: Number,
    alliances: Array,
    players: Array,
    cities: Array,
})

export default mongoose.model('Character', worldSchema)
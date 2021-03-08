import mongoose from 'mongoose'

const Schema = mongoose.Schema

const mapImageSchema = new Schema({
    code: { type: String, required: true },
    ocean: { type: Number, required: true },
    imageData: String
})

export default mongoose.model('MapImage', mapImageSchema)
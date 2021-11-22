const mongoose = require('mongoose')
const Schema = mongoose.Schema
// 
const Itinerary = new Schema({
    /* --- */
    name: String,
    description: String,
    distance: Number,
    location: Number,
    active: Boolean,
   
    difficulty: {
        type: String,
        enum: ["EASY","NORMAL",HARD]

    }
    /* park_id: { type: Schema.Types.ObjectId, ref: 'Park' } */
})

module.exports = mongoose.model('Itinerary', Itinerary)
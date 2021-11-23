const mongoose = require('mongoose')
const Schema = mongoose.Schema
// 
const Itinerary = new Schema({
   
    name: String,
    distance: Number,
    
   
    difficulty: {
        type: String,
        enum: ["EASY", "NORMAL", "HARD", "HELL IN THE EARTH"]

    },

    description: {
        type: String,
        enum: ["ASPHALT", "GRAVEL", "ENDURO", "HARD ENDURO", "DAKAR"]

    },
    location: [{
        type: {
             type: String,
        },
        coordinates: [Number]
    }],

    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    /* park_id: { type: Schema.Types.ObjectId, ref: 'Park' } */
})

Itinerary.index({ location: '2dsphere' }); 

module.exports = mongoose.model('Itinerary', Itinerary)
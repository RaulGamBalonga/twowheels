const mongoose = require('mongoose')
const Schema = mongoose.Schema
// 
const Itinerary = new Schema({
    /* --- */
    name: String,
    description: String,
    distance: Number,
    
   
    difficulty: {
        type: String,
        enum: ["EASY","NORMAL","HARD"]

    },
    location: [{
        type: {
            type: "Point"
        },
        coordinates: [Number]
    }],

    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    /* park_id: { type: Schema.Types.ObjectId, ref: 'Park' } */
})

itinerarySchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Itinerary', Itinerary)
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// 
const Motorbike = new Schema({
    /* --- */
    name: {
        type: String,
        require: True,
        unique: True,
    },

    typesMotorbike: {
        type: String,
        require: True,
        unique: True,
        enum: ["URBAN","TRAIL","CUSTOM"]
    },
    
    description: String,
    
    brand:{
        type: String,
        require: True,
        unique: True,
        enum : ["BMW", "HONDA","HARLEY-DAVIDSON"]
    },
    
   cc: Number,
   
   active: Boolean,
  
   weigth: Number,

   imageURL: String,

   license: {
       type: String,
       require: True,
       unique: True,
       enum: ["A1", "A2", "A"],
    },


   },
    
    
    /* park_id: { type: Schema.Types.ObjectId, ref: 'Park' } */
})

module.exports = mongoose.model('Motorbike', Motorbike)
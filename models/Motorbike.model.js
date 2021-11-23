const mongoose = require('mongoose')
const Schema = mongoose.Schema
// 
const Motorbike = new Schema({
   
    name: {
        type: String,
        required: true,
       
    },

    typesMotorbike:{
        type: String,
        required: true,
        
        enum: ["URBAN","TRAIL","CUSTOM"]
    },
    
    description: String,
    
    brand:{
        type: String,
        required: true,
        
        enum : ["BMW", "HONDA","HARLEY-DAVIDSON"]
    },
    
   cc: Number,
   
   
  
   weight: Number,

   imageURL: String,

   license: {
       type: String,
       required: true,
       enum: ["A1", "A2", "A"],
    },

    user_id: { type: Schema.Types.ObjectId, ref: 'User' },


   },
   
   { 

     

        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,

    
    
    /* park_id: { type: Schema.Types.ObjectId, ref: 'Park' } */
})

module.exports = mongoose.model('Motorbike', Motorbike)
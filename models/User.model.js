const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      require: True,
      unique: True,

      // unique: true -> Ideally, should be unique, but its up to you
    },
    password: {
    type:String,
    require: True,
    unique: True,
  },
  
  license: {
    type: String,
    require: True,
    unique: True,
    enum: ["A1","A2","A"],
  },
  motorbike: {
    type: String,  /* >OWN? */
    },

  itenerary: {
    type: String,
  },

  usertype: {
    type: String,
    require: True,
    unique: True,
    enum: ["USER","ADMIN"]

  },
  
  active: Boolean,

  imageURL: String,

  motorbike_id: { type: Schema.Types.ObjectId, ref: 'Motorbike' },

  itinerary_id: { type: Schema.Types.ObjectId, ref: 'Itenerary' }

  
  {

    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

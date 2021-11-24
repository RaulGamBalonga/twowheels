const { Schema, model } = require("mongoose");

// Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,


      // unique: true -> Ideally, should be unique, but its up to you
    },
    password: {
      type: String,
      required: true,

    },

    license: {
      type: String,
      required: true,
      enum: ["A1", "A2", "A"],
    },


    usertype: {
      type: String,
      required: true,
      default: 'USER',
      enum: ["USER", "ADMIN"]

    },



    imageURL: String,

  },
  {

    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

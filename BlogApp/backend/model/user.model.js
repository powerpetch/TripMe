import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
    require: false,
  },
  instagram: {
    type: String,
    reuiqred: false,
  },
  facebook: {
    type: String,
    required: false,
  },

  likes: {
    type:[String] ,
    default: [],
    required: false
  }
});

const User = mongoose.model("users", userSchema);

export default User;

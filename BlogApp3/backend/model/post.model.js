import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
      require: true,
    },
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      require: false,
    },
    comment: [commentSchema],
    
    likeby: {
      type: [String],
      required: false
    }
  },
  { timestamps: true }
);



const Post = mongoose.model("post", postSchema);


export default Post;

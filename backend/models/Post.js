const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
{
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    username:String,

    text:String,

    image:String,

    likes:[
        {
            userId:String,
            username:String
        }
    ],

    comments:[
        {
            username:String,
            text:String,
            createdAt:{
                type:Date,
                default:Date.now
            }
        }
    ]
},
{timestamps:true}
);

module.exports = mongoose.model("Post",postSchema);
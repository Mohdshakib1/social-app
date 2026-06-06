const express=require("express");
const multer=require("multer");

const Post=require("../models/Post");
const auth=require("../middleware/authMiddleware");

const router=express.Router();

const storage=multer.diskStorage({

destination:(req,file,cb)=>{
cb(null,"uploads/");
},

filename:(req,file,cb)=>{
cb(null,Date.now()+file.originalname);
}

});

const upload=multer({storage});

router.post(
"/",
auth,
upload.single("image"),
async(req,res)=>{

try{

const post=await Post.create({

userId:req.user.id,

username:req.user.username,

text:req.body.text,

image:req.file
? `/uploads/${req.file.filename}`
: ""

});

res.json(post);

}catch(error){
res.status(500).json(error);
}

}
);

router.get("/",async(req,res)=>{

const posts=
await Post.find()
.sort({createdAt:-1});

res.json(posts);

});

router.put("/:id/like",auth,async(req,res)=>{

const post=
await Post.findById(req.params.id);

const alreadyLiked=
post.likes.find(
like=>like.userId===req.user.id
);

if(alreadyLiked){

post.likes=
post.likes.filter(
like=>like.userId!==req.user.id
);

}else{

post.likes.push({
userId:req.user.id,
username:req.user.username
});

}

await post.save();

res.json(post);

});

router.post("/:id/comment",auth,async(req,res)=>{

const post=
await Post.findById(req.params.id);

post.comments.push({

username:req.user.username,

text:req.body.text

});

await post.save();

res.json(post);

});

module.exports=router;
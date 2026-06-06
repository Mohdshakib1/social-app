require("dotenv").config();

const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");

const app=express();

app.use(cors());

app.use(express.json());

app.use(
"/uploads",
express.static("uploads")
);

app.use(
"/api/auth",
require("./routes/authRoutes")
);

app.use(
"/api/posts",
require("./routes/postRoutes")
);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{

console.log("Mongo Connected");

app.listen(5000,()=>{
console.log("Server Running");
});

});
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

const app = express();
dotenv.config();
 const PORT = 3000;

 //import from other files

 const authRouter = require("./routes/auth");
 
//Routers -- Middleware
app.use(express.json());
app.use("/api/auth",authRouter);


app.get("/home",(req,res)=>{
    console.log("get to hone");
    res.send("hai");
})


//Connection
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
    console.log("connected to mongoose");
}).catch((e)=>{
    console.log(e);
})

//PORT
app.listen(PORT,"0.0.0.0",()=>{
    console.log(`connected at port  ${PORT}`);

} )



import express from "express"
import connectDb from "./src/config/mongoDbConfig.mjs";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors"
const app=express();

//aanand




// Middleware

//for  Logging Requests
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());


//routes
app.get("/",(req,res)=>{
    res.send("hello")
})

//connect to DB
connectDb()
const PORT=process.env.PORT||3000
app.listen(PORT,()=>{
    console.log(`port is running on ${PORT}`  )
})
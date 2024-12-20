import express from "express"
import connectDb from "./src/config/mongoDbConfig.mjs";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors"
import adminRoutes from './src/routes/adminRoutes.mjs';
const app=express();
//routes import
import bedRoutes from "./src/routes/bedRoutes.mjs"
import roomRoutes from './src/routes/roomRoutes.mjs';
import addressRoutes from './src/routes/addressRoutes.mjs';
import hostelRoutes from "./src/routes/hostelRoutes.mjs"

// Middleware

//for  Logging Requests
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());


//routes




app.use('/api/addresses', addressRoutes);
app.use('/api/hostel', hostelRoutes);
app.use('/api/room', roomRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/bed', bedRoutes);

app.get("/",(req,res)=>{
    res.send("hello")
})

//connect to DB
connectDb()
const PORT=process.env.PORT||3000
app.listen(PORT,()=>{
    console.log(`port is running on ${PORT}`  )
})
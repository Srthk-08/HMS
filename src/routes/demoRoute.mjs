import express from "express"
const router=express.Router();

import jwt from "jsonwebtoken";


router.get("/",(req,res)=>{
     let No_of_Rooms=10
    if (No_of_Rooms) {
        let data = []
        for (let i = 1; i <= No_of_Rooms; i++) {
          data.push({
            Room_no: i,
            Floor_no: i,
            Floor_id: i,
            is_Full: false
          })
        }
        console.log(data)
        res.send("hiiii")

      }})


export default router;
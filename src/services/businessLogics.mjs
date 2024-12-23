import Hostel from "../models/Hostel.mjs";
import Floor from "../models/Floor.mjs";
import Room from "../models/Room.mjs";
import Bed from "../models/Bed.mjs";

class BusinessLogics{

    async deleteBed(bad_id){
        try{
            const deletedBed=await Bed.findByIdAndDelete(bad_id);

            return {"message":"ok",data:deletedBed}

        }catch(err){
            return {"message":"notOk",error:err}
        }
    }
    
    async deleteRoom(room_Id){
        try{
            const deletedRoom=await Room.findByIdAndDelete(room_Id);
            if(!deletedRoom){
                return {"message":"notOk",error:deletedRoom,"status":"rooms are not deleted"}
            }
            const flore=await Floor.findById(deletedRoom,{No_of_Rooms:true})
            const updateFloor=await Floor.findByIdAndUpdate(deletedRoom.Floor_id,{No_of_Rooms:flore.No_of_Rooms-1})
            if(deletedRoom.No_of_Beds>0){
                const deletedBed=await Bed.deleteMany({Room_id:deletedRoom.id});
            }


        }catch(err){
            console.log("deleteRoom catch block")
            return {"message":"notOk","error":err
            }

        }
        
    }

                    }
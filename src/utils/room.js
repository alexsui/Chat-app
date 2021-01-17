const rooms=[];

const addNewRoom=(room)=>{
    room=room.trim().toLowerCase();
    if(!room){
        return {
            error:"Room's name is required"
        }
    }
    const existingRoom=rooms.find((room)=>room===room);
    rooms.push(room);
    return {room};
}
const removeRoom=(room)=>{
    const index=rooms.findIndex((room)=>room===room);
    if(index!==-1){
       return rooms.splice(index,1)[0];
    }else{
        return {
            error:"Room not found"
        }
    } 
}

const getAllRooms=()=>{
    return rooms;
}
const isRoomExist=(targetRoom)=>{
    const isExist=rooms.find((room)=>room===targetRoom);
    if(isExist){
        return true;
    }else{
        return false;
    }
}
// const room=addNewRoom("green");
// console.log(getAllRooms());
// console.log(room);
// removeRoom('green')
// addNewRoom("red")
// console.log(getAllRooms());
// console.log(isRoomExist("red"))


module.exports={
    addNewRoom,
    removeRoom,
    getAllRooms,
    isRoomExist
}
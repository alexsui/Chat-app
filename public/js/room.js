const socket=io();
const $listOfRoom=document.querySelector("#listOfRoom");

socket.on('listOfRooms',({rooms})=>{
    // const html=Mustache.render($listOfRoomTemplate,{rooms});
    console.log(rooms)
    if(rooms.length===0){
        let option=document.createElement("option");
        option.value="";
        option.text="No room availabe";
        $listOfRoom.add(option);
    }
    for(let room of rooms){
        let option=document.createElement("option");
        option.value=room;
        option.text=`${room}`
        $listOfRoom.add(option);
    }
   
})
import {Server} from "socket.io"

let io;

export function initSocket(httpServer){

    io = new Server(httpServer,{
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    })

    console.log("Socket.io server is run")

    io.on("connection", (socket) => {
        
       console.log("A user connected: " + socket.id)
    })

    // io.on("connection", (socket) => {
    //   console.log(socket.handshake.headers.cookie);
    //   console.log(socket.user);
    //   console.log(socket.id);
    // });

}


export function getIO(){

    if(!io){
        throw new Error("Socket.io not initialized")
    }

    return io
}
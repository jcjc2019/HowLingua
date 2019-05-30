import socketIO from "socket.io-client";

export default class SocketHandler{
    //constructor() {}

    static connect = token => {
        console.log("WS connecting...");
        this.io = socketIO("http://localhost:8080/", {
            transportOptions: {
            polling: {
                //send extra headers to socket-io
                extraHeaders: {
                    //'Authorization': `Bearer ${localStorage.getItem('token')}`
                    Authorization: `Bearer ${token}`
                    }
                }
            }
        });     
    };

    static on = (emitType, callback) => {
        console.log("listener registered");
        this.io.on(emitType, callback);
    };

    static emit = (emitType, payload) => {
        console.log("heeeeelp")
        console.log(this.io)
        this.io.emit(emitType, payload)
    };
    
    // static off = (emitType, callback) => {
    //     this.io.off(emitType, callback)
    // }
}
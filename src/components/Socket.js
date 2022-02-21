import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:5000");
//const socket = io.connect("https://project-4-ummibobbins-fe.herokuapp.com"); //for link to heroku

console.log("ss", socket);

const Socket = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if ((username !== "") & (room !== "")) {
      //emit means send data to backend socket
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join a Chat</h3>
          <input
            type="text"
            placeholder="Enter Name..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
};

export default Socket;

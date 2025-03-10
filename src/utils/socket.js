import { io } from "socket.io-client";
import getUserIdFromToken from "./decodeToken"; // Function to get userId from token

const socket = io("http://localhost:9000", { transports: ["websocket"] });

socket.on("connect", () => {
  const userId = getUserIdFromToken(); // Get user ID from token
  if (userId) {
    socket.emit("user-online", userId); // Register user ID on backend
    console.log(`✅ Registered with userId: ${userId}`);
  }
});

export default socket;

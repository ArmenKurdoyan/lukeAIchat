import { io } from "socket.io-client";

export const socket = io("http://13.49.80.149:3001", {
  transports: ["websocket"],
});

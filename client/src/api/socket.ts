import { io } from "socket.io-client";

export const socket = io("https://armenkurdoyan.github.io/lukeAIchat", {
  transports: ["websocket"],
});

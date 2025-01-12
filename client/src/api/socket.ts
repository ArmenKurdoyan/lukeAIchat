import { io } from "socket.io-client";

export const socket = io("https://luke-a-ichat.vercel.app", {
  transports: ["websocket"],
});

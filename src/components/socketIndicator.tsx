import React from "react";
import { useSocket } from "./providers/socketProvider";

export default function SocketIndicator() {
  const isConnected = useSocket();

  return <></>;
}

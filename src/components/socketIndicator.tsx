"use client";
import React from "react";
import { useSocket } from "./providers/socketProvider";
import { Badge } from "./ui/badge";

export default function SocketIndicator() {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge variant="outline" className="bg-yellow-600 text-white border-none">
        Fallback: Polly every 1s
      </Badge>
    );
  }

  return (
    <>
      <Badge
        variant="outline"
        className="bg-emerald-600 text-white border-none"
      >
        Fallback: Polly every 1s
      </Badge>
    </>
  );
}

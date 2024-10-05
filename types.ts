import { Server as Netserver, Socket } from "net";
import { Server as SocketIOServer } from "socket.io";
import { NextApiResponse } from "next";
import { Server, Members, Profile } from "@prisma/client";

export type serverWithMembersWithProfile = Server & {
  members: (Members & { profile: Profile })[];
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: Netserver & {
      io: SocketIOServer;
    };
  };
};

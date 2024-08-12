import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import currentProfile from "@/lib/currentProfile";
import db from "@/db/db";
// import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channel: {
          create: [{ name: "general", profileId: profile.id }],
        },
        member: {
          create: [
            {
              profileId: profile.id,
              role: "ADMIN",
            },
          ],
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_POST]", error);
    return new NextResponse("Internet Error", { status: 500 });
  }
}

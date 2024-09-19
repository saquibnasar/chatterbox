import { NextResponse } from "next/server";
import currentProfile from "@/lib/currentProfile";
import db from "@/db/db";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get("serverId");
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (name === "general") {
      return new NextResponse("Name cannot be 'general'", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: ["ADMIN", "MODERATOR"],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name,
            type,
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_POST]", error);
    return new NextResponse("Internet Error", { status: 500 });
  }
}

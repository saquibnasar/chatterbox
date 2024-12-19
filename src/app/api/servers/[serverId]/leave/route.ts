import db from "@/db/db";
import currentProfile from "@/lib/currentProfile";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, props: { params: Promise<{ serverId: string }> }) {
  const params = await props.params;
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: {
          not: profile.id,
        },
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (eror) {
    console.log("[SERVER_ID]", eror);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

import db from "@/db/db";
import currentProfile from "@/lib/currentProfile";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

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
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });
    return NextResponse.json(server);
  } catch (eror) {
    console.log("[SERVER_ID]", eror);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

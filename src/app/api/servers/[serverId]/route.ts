import db from "@/db/db";
import currentProfile from "@/lib/currentProfile";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, props: { params: Promise<{ serverId: string }> }) {
  const params = await props.params;
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const server = await db.server.delete({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
    });
    return NextResponse.json(server);
  } catch (eror) {
    console.log("[SERVER_ID_DELETE]", eror);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request, props: { params: Promise<{ serverId: string }> }) {
  const params = await props.params;
  try {
    const profile = await currentProfile();
    const { name, imageUrl } = await req.json();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });
    return NextResponse.json(server);
  } catch (eror) {
    console.log("[SERVER_ID_PATCH]", eror);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

import currentProfile from "@/lib/currentProfile";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }
  } catch (eror) {
    console.log("[SERVER_ID]", eror);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

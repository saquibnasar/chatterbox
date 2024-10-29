import currentProfile from "@/lib/currentProfile";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
  } catch (error) {
    console.log("[MESSAGES_GET]", error);
    return new NextResponse("Internet Error", { status: 500 });
  }
}

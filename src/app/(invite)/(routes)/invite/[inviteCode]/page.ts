import db from "@/db/db";
import currentProfile from "@/lib/currentProfile";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type InviteCodePageProps = {
  params: {
    inviteCode: string;
  };
};

export default async function InviteCodePage({ params }: InviteCodePageProps) {
  const profile = await currentProfile();
  if (!profile) {
    return auth().redirectToSignIn();
  }
  if (!params.inviteCode) {
    return redirect("/");
  }
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }
  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
            role: "GUEST",
          },
        ],
      },
    },
  });
  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  return null;
}

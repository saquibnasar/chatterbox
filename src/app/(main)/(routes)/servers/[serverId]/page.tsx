import db from "@/db/db";
import currentProfile from "@/lib/currentProfile";
import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type ServerIdPageProps = {
  params: {
    serverId: string;
  };
};
export default async function ServerIdPage({ params }: ServerIdPageProps) {
  const profile = await currentProfile();
  if (!profile) {
    return auth().redirectToSignIn();
  }
  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },

    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  const initialChannel = server?.channels[0];
  if (initialChannel?.name !== "general") {
    return null;
  }
  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`);
}

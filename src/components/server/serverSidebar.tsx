import db from "@/db/db";
import currentProfile from "@/lib/currentProfile";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

type serverSidebarProps = {
  serverId: string;
};
export default async function ServerSidebar({ serverId }: serverSidebarProps) {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channel: {
        orderBy: {
          createdAt: "asc",
        },
      },
      member: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });
  const textChannels = server?.channel.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server?.channel.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channel.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  const members = server?.member.filter(
    (member) => member.profileId !== profile.id
  );
  return <div>serverSidebar</div>;
}

import db from "@/db/db";
import currentProfile from "@/lib/currentProfile";
import { redirect } from "next/navigation";
import ServerHeader from "./serverHeader";

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
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const textChannels = server?.channels.filter(
    (channel) => channel.type === "TEXT"
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === "AUDIO"
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === "VIDEO"
  );
  const members = server?.members.filter(
    (member) => member.profileId !== profile.id
  );
  if (!server) {
    return redirect("/");
  }

  const role = server?.members.filter(
    (member) => member.profileId === profile.id
  )[0].role;

  return (
    <>
      <div
        className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31]
       bg-[#f2f3f5]"
      >
        <ServerHeader server={server} role={role} />
      </div>
    </>
  );
}

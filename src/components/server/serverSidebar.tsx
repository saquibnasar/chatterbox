import db from "@/db/db";
import currentProfile from "@/lib/currentProfile";
import { redirect } from "next/navigation";
import ServerHeader from "./serverHeader";
import { ScrollArea } from "../ui/scroll-area";
import ServerSearch from "./serverSearch";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "../ui/separator";
import ServerSection from "./serverSection";
import { channel } from "diagnostics_channel";
import ServerChannel from "./serverChannel";
import ServerMember from "./serverMember";

type serverSidebarProps = {
  serverId: string;
};
const iconMap: any = {
  TEXT: <Hash className="mr-2 h-4 w-4" />,
  AUDIO: <Mic className="mr-2 h-4 w-4" />,
  VIDEO: <Video className="mr-2 h-4 w-4" />,
};
const roleIconMap: any = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="mr-2 h-4 w-4 text-indigo-500" />,
  ADMIN: <ShieldAlert className="mr-2 h-4 w-4 text-rose-500" />,
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

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <>
      <div
        className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31]
       bg-[#f2f3f5]"
      >
        <ServerHeader server={server} role={role} />
        <ScrollArea className="flex-1 px-3">
          <div className="mt-2">
            <ServerSearch
              data={[
                {
                  label: "Text Chennels",
                  type: "channel",
                  data: textChannels?.map((channel) => ({
                    id: channel.id,
                    name: channel.name,
                    icon: iconMap[channel.type],
                  })),
                },
                {
                  label: "Voice Chennels",
                  type: "channel",
                  data: audioChannels?.map((channel) => ({
                    id: channel.id,
                    name: channel.name,
                    icon: iconMap[channel.type],
                  })),
                },
                {
                  label: "Vidio Chennels",
                  type: "channel",
                  data: videoChannels?.map((channel) => ({
                    id: channel.id,
                    name: channel.name,
                    icon: iconMap[channel.type],
                  })),
                },
                {
                  label: "Members",
                  type: "member",
                  data: members?.map((member) => ({
                    id: member.id,
                    name: member.profile.name,
                    icon: roleIconMap[member.role],
                  })),
                },
              ]}
            />
            <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
            {!!textChannels?.length && (
              <div className="mb-2">
                <ServerSection
                  sectionType="channels"
                  channelType="TEXT"
                  role={role}
                  label="Text Channels"
                  server={server}
                />

                <div className="space-y-[2px]">
                  {textChannels.map((channel) => (
                    <ServerChannel
                      key={channel.id}
                      channel={channel}
                      server={server}
                      role={role}
                    />
                  ))}
                </div>
              </div>
            )}
            {!!audioChannels?.length && (
              <div className="mb-2">
                <ServerSection
                  sectionType="channels"
                  channelType="AUDIO"
                  role={role}
                  label="Voice Channels"
                  server={server}
                />

                <div className="space-y-[2px]">
                  {audioChannels.map((channel) => (
                    <ServerChannel
                      key={channel.id}
                      channel={channel}
                      server={server}
                      role={role}
                    />
                  ))}
                </div>
              </div>
            )}
            {!!videoChannels?.length && (
              <div className="mb-2">
                <ServerSection
                  sectionType="channels"
                  channelType="VIDEO"
                  role={role}
                  label="Video Channels"
                  server={server}
                />

                <div className="space-y-[2px]">
                  {videoChannels.map((channel) => (
                    <ServerChannel
                      key={channel.id}
                      channel={channel}
                      server={server}
                      role={role}
                    />
                  ))}
                </div>
              </div>
            )}
            {!!members?.length && (
              <div className="mb-2">
                <ServerSection
                  sectionType="members"
                  role={role}
                  label="Members"
                  server={server}
                />

                <div className="space-y-[2px]">
                  {members.map((member) => (
                    <ServerMember
                      key={member.id}
                      server={server}
                      member={member}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}

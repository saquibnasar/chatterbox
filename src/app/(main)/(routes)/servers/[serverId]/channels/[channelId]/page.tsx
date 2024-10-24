import ChatHeader from "@/components/chat/chatHeader";
import ChatInput from "@/components/chat/chatInput";
import ChatMessages from "@/components/chat/chatMessages";
import db from "@/db/db";
import currentProfile from "@/lib/currentProfile";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type ChannelIdPageProps = {
  params: {
    serverId: string;
    channelId: string;
  };
};
export default async function ChannelIdPage({ params }: ChannelIdPageProps) {
  const profile = await currentProfile();
  if (!profile) {
    return auth().redirectToSignIn();
  }
  const channel = await db.channel.findFirst({
    where: {
      id: params.channelId,
    },
  });
  const member = await db.members.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });
  if (!channel || !member) {
    redirect("/");
  }
  return (
    <>
      <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
        <ChatHeader
          name={channel.name}
          serverId={channel.serverId}
          type="channel"
        />

        <ChatMessages
          name={channel.name}
          member={member}
          ChatId={channel.id}
          type="channel"
          apiUrl="/api/socket/messages"
          socketQuery={{
            channelId: channel.id,
            serverId: channel.serverId,
          }}
          paramKey="channelId"
          paramValue={channel.id}
        />
        <ChatInput
          name={channel.name}
          type="channel"
          apiUrl="/api/socket/messages"
          query={{ channelId: channel.id, serverId: channel.serverId }}
        />
      </div>
    </>
  );
}

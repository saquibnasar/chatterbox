"use client";

import { Members, Messages, Profile } from "@prisma/client";
import { format } from "date-fns";
import ChatWelcome from "./chatWelcome";
import { useChatQuery } from "@/hooks/useChatQuery";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment } from "react";
import ChatItem from "./chatItem";
import { useChatSocket } from "@/hooks/useChatSocket";

const DATE_FORMAT = "d MMM yyyy, HH:MM";

type MessageWithMemberWithProfile = Messages & {
  member: Members & {
    profile: Profile;
  };
};

interface ChatMessagesProps {
  name: string;
  member: Members;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}

export default function ChatMessages({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) {
  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({ queryKey, apiUrl, paramKey, paramValue });
  useChatSocket({ queryKey, addKey, updateKey });
  if (status === "pending") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loadding Messages...
        </p>
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          something went wrong!
        </p>
      </div>
    );
  }
  return (
    <>
      <div className="flex-1 flex flex-col py-4 overflow-y-auto">
        <div className="flex-1">
          <ChatWelcome type={type} name={name} />
        </div>
        <div className="flex flex-col-reverse mt-auto">
          {data?.pages?.map((group, i) => {
            return (
              <Fragment key={i}>
                {group.items.map((message: MessageWithMemberWithProfile) => (
                  <ChatItem
                    key={message.id}
                    id={message.id}
                    member={message.member}
                    currentMember={member}
                    content={message.content}
                    fileUrl={message.fileUrl}
                    deleted={message.deleted}
                    timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                    isUpdated={message.updatedAt !== message.createdAt}
                    socketUrl={socketUrl}
                    socketQuery={socketQuery}
                  />
                ))}
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}

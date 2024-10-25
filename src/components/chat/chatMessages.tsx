"use client";

import { Members } from "@prisma/client";
import ChatWelcome from "./chatWelcome";
import { useChatQuery } from "@/hooks/useChatQuery";

interface ChatMessagesProps {
  name: string;
  member: Members;
  ChatId: string;
  apiUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}

export default function ChatMessages({
  name,
  member,
  ChatId,
  apiUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) {
  const queryKey = `chat:${ChatId}`;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({ queryKey, apiUrl, paramKey, paramValue });
  return (
    <>
      <div className="flex-1 flex flex-col py-4 overflow-y-auto">
        <div className="flex-1">
          <ChatWelcome type={type} name={name} />
        </div>
      </div>
    </>
  );
}

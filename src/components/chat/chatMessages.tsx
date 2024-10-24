"use client";

import { Members } from "@prisma/client";
import ChatWelcome from "./chatWelcome";

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
  return (
    <>
      <div className="flex-1 flex flex-col py-4 overflow-y-auto">
        <div className="flex-1">
          test
          <ChatWelcome type={type} name={name} />
        </div>
      </div>
    </>
  );
}

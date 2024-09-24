"use client";

import { cn } from "@/lib/utils";
import { Channel, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import ActionTooltip from "../actionTooltip";
import { useModal } from "@/hooks/useModalStore";

type serverChannelProps = {
  channel: Channel;
  server: Server;
  role?: "GUEST" | "MODERATOR" | "ADMIN" | string;
};
const iconMap: any = {
  TEXT: Hash,
  AUDIO: Mic,
  VIDEO: Video,
};
export default function ServerChannel({
  channel,
  server,
  role,
}: serverChannelProps) {
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();

  const Icon = iconMap[channel.type];

  return (
    <>
      <button
        className={cn(
          "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
          params?.channelId === channel.id && "bg-zinc-700/20 dark-zinc-700"
        )}
      >
        <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
        <p
          className={cn(
            "line-clamp01 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
            params?.channelId === channel.id &&
              "text-primary dark:text-zinc-200 dark:group-hover:text-white"
          )}
        >
          {channel.name}
        </p>
        {channel.name !== "general" && role !== "GUEST" && (
          <div className="ml-auto flex items-center gap-x-2">
            <ActionTooltip label="edit">
              <Edit
                onClick={() => onOpen("editChannel", { server, channel })}
                className="hidden group-hover:block w-4 h-4 text-zinc-500
               hover:text-zinc-600 dark:text-zinc-400
                dark:hover:text-zinc-300 transition"
              />
            </ActionTooltip>
            <ActionTooltip label="Delete">
              <Trash
                onClick={() => onOpen("deleteChannel", { server, channel })}
                className="hidden group-hover:block w-4 h-4 text-zinc-500
               hover:text-zinc-600 dark:text-zinc-400
                dark:hover:text-zinc-300 transition"
              />
            </ActionTooltip>
          </div>
        )}
        {channel.name === "general" && (
          <Lock className="ml-auto w-4 h-4 text-zinc-500 dark:text:zinc-400" />
        )}
      </button>
    </>
  );
}

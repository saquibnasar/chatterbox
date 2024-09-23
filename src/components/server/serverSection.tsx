"use client";
import { Plus, Settings } from "lucide-react";
import { serverWithMembersWithProfile } from "../../../types";
import ActionTooltip from "../actionTooltip";
import { useModal } from "@/hooks/useModalStore";

type serverSidebarProps = {
  label: string;
  role?: "GUEST" | "MODERATOR" | "ADMIN" | string;
  sectionType: "channels" | "members";
  channelType?: "TEXT" | "AUDIO" | "VIDEO";
  server?: serverWithMembersWithProfile;
};
export default function ServerSection({
  label,
  role,
  sectionType,
  channelType,
  server,
}: serverSidebarProps) {
  const { onOpen } = useModal();
  console.log(server);
  return (
    <>
      <div className="flex items-center justify-between py-2">
        <p className="text-xs upercase font-semibold text-zinc-500 dark:text-zinc-400">
          {label}
        </p>
        {role !== "GUEST" && sectionType === "channels" && (
          <ActionTooltip label="Create Channel" side="top">
            <button
              onClick={() => onOpen("createChannel")}
              className="tex-zinc-500 hover:text-zinc-600 dark:text-zinc-400
             dark:hover:text-zinc-300 transition"
            >
              <Plus className="h-4 w-4" />
            </button>
          </ActionTooltip>
        )}

        {role === "ADMIN" && sectionType === "members" && (
          <ActionTooltip label="Manage Members" side="top">
            <button
              onClick={() => onOpen("members", { server })}
              className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            >
              <Settings calcMode="h-4 w-4" />
            </button>
          </ActionTooltip>
        )}
      </div>
    </>
  );
}

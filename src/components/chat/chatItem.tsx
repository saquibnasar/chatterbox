import { Members, Profile } from "@prisma/client";
import UserAvatar from "../ui/UserAvatar";
import ActionTooltip from "../actionTooltip";
import { FileIcon, ShieldAlert, ShieldCheck } from "lucide-react";
import Image from "next/image";

interface ChatItemProps {
  id: string;
  content: string;
  member: Members & {
    profile: Profile;
  };
  timestamp: string;
  fileUrl: string | null;
  deleted: Boolean;
  currentMember: Members;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}
const roleIconMap: any = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 text-rose-500" />,
};
export default function ChatItem({
  id,
  content,
  member,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
}: ChatItemProps) {
  const fileTypes = fileUrl?.split(".").pop();

  const isAdmin = currentMember.role === "ADMIN";
  const isModerator = currentMember.role === "MODERATOR";
  const isOwner = currentMember.id === member.id;
  const canDeleteMessages = !deleted && (isAdmin || isModerator || isOwner);
  const canEditMessages = !deleted && isOwner && !fileUrl;
  const isPDF = fileTypes === "pdf" && fileUrl;
  const isImage = !isPDF && fileUrl;

  return (
    <>
      <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
        <div className="group flex gap-x-2 items-start w-full">
          <div className="cursor-pointer hover:drop-shadow-md transition">
            <UserAvatar src={member.profile.imageUrl} />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-x-2">
              <div className="flex items-center">
                <p className="font-semibold text-sm hover:underline cursor-pointer">
                  {member.profile.name}{" "}
                </p>
                <ActionTooltip label={member.role}>
                  <p> {roleIconMap[member.role]}</p>
                </ActionTooltip>
              </div>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {timestamp}
              </span>
            </div>
            {isImage && (
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center 
                bg-secondary h-48 w-48"
              >
                <Image
                  src={fileUrl}
                  alt={content}
                  fill
                  className="object-cover"
                />
              </a>
            )}
            {isPDF && (
              <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                >
                  pdf File
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

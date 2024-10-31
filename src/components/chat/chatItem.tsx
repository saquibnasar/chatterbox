import { Members, Profile } from "@prisma/client";
import UserAvatar from "../ui/UserAvatar";
import ActionTooltip from "../actionTooltip";
import { Edit, FileIcon, ShieldAlert, ShieldCheck, Trash } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

const formSchema = z.object({
  content: z.string().min(1),
});

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
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setisDeleting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: content,
    },
  });

  useEffect(() => {
    form.reset({
      content: content,
    });
  }, [form, content]);

  const fileTypes = fileUrl?.split(".").pop();

  const isAdmin = currentMember.role === "ADMIN";
  const isModerator = currentMember.role === "MODERATOR";
  const isOwner = currentMember.id === member.id;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !deleted && isOwner && !fileUrl;
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
            {!fileUrl && !isEditing && (
              <p
                className={cn(
                  "text-sm text-zinc-600 dark:text-zinc-300",
                  deleted &&
                    "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
                )}
              >
                {content}
                {isUpdated && !deleted && (
                  <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                    (edited)
                  </span>
                )}
              </p>
            )}
          </div>
        </div>

        {canDeleteMessage && (
          <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm">
            {canEditMessage && (
              <ActionTooltip label="Edit">
                <Edit className="cursor-pointer ml-auto w-4 h-4text-zinc-500 hover:text-zinc-600 dark:hover: text-zinc-300 transition" />
              </ActionTooltip>
            )}
            <ActionTooltip label="delte">
              <Trash className="cursor-pointer ml-auto w-4 h-4text-zinc-500 hover:text-zinc-600 dark:hover: text-zinc-300 transition" />
            </ActionTooltip>
          </div>
        )}
      </div>
    </>
  );
}

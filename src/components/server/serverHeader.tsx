"use client";
import { ChevronDown } from "lucide-react";
import { serverWithMembersWithProfile } from "../../../types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type ServerHeaderProps = {
  server: serverWithMembersWithProfile;
  role?: "ADMIN" | "GUEST" | "MODERATOR";
};

export default function ServerHeader({ server, role }: ServerHeaderProps) {
  const isAdmin = role === "ADMIN";
  const isModerator = isAdmin || role === "MODERATOR";
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button
            className="w-full text-md font-semibold px-3 flex items-center h-12
           border-neutral-200 dark:border-neutral-800 border-b-2
            hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
          >
            {server.name}
            <ChevronDown className="h-5 w-5 ml-auto" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 text-xs font-medium text-black
         dark:text-neutral-400 space-y-[2px]"
        ></DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

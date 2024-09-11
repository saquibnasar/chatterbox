"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModalStore";
import { serverWithMembersWithProfile } from "../../../types";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../ui/UserAvatar";
import {
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 text-rose-500" />,
};
export default function MembersModal() {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const [loadingId, setLoadingId] = useState("");

  const isModalOpen = isOpen && type === "members";
  const { server } = data as { server: serverWithMembersWithProfile };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Mangeg Members
              <DialogDescription className="text-center text-zinc-500">
                {server?.members?.length} Members
              </DialogDescription>
            </DialogTitle>
            <div className="p-6">
              <ScrollArea className="mt-8 max-h-[420px] pr-6">
                {server?.members?.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-x-2 mb-6"
                  >
                    <UserAvatar src={member.profile.imageUrl} />
                    <div className="flex flex-col gap-y-1">
                      <div className="text-xs font-semibold flex items-center">
                        {member.profile.name} {roleIconMap[member.role]}
                      </div>
                      <div className="text-xs text-zinc-500">
                        {member.profile.email}
                      </div>
                    </div>
                    {server.profileId !== member.profileId &&
                      loadingId !== member.id && (
                        <div className="ml-auto">
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <MoreVertical />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="left">
                              <DropdownMenuSub>
                                <DropdownMenuSubTrigger className="flex items-center">
                                  <ShieldQuestion className="w-4 h-4 mr-2" />
                                  <span>role</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                  <DropdownMenuSubContent>
                                    <DropdownMenuItem>
                                      <Shield className="h-4 w-4 mr-2" /> GUEST
                                    </DropdownMenuItem>
                                  </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                              </DropdownMenuSub>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      )}
                  </div>
                ))}
              </ScrollArea>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

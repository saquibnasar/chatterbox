"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModalStore";
import { useOrigin } from "@/hooks/useOrigin";
import { serverWithMembersWithProfile } from "../../../types";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../ui/UserAvatar";

export default function MembersModal() {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const origin = useOrigin();

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
                    <div className="flex flex-col gap-y-1"></div>
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

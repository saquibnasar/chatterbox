"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModalStore";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Copy } from "lucide-react";

export default function InviteModal() {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "invite";

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Invite Friend
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Give your server a personality with a name and an image. you can
              always change it later.
            </DialogDescription>
            <div className="p-6">
              <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                Server Invite Link
              </Label>
              <div className="flex items-center mt-2 gap-x-2">
                <Input
                  className="bg-zinc-300/50 border-0 focus-visible:ring-0
                 text-black focus-visible:ring-offset-0"
                  value="invite-link"
                />
                <Button size="icon">
                  <Copy className="" />
                </Button>
              </div>

              <Button
                size="sm"
                variant="link"
                className="text-xs text-zinc-500 mt-4"
              >
                Generate a new link
                <Copy className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

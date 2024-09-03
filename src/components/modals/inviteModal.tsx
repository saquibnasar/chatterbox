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
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useOrigin } from "@/hooks/useOrigin";
import { useState } from "react";
import axios from "axios";

export default function InviteModal() {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === "invite";
  const { server } = data;

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );
      onOpen("invite", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
                  disabled={isLoading}
                  className="bg-zinc-300/50 border-0 focus-visible:ring-0
                 text-black focus-visible:ring-offset-0"
                  value={inviteUrl}
                  onChange={() => {}}
                />
                <Button disabled={isLoading} onClick={onCopy} size="icon">
                  {copied ? <Check /> : <Copy className="" />}
                </Button>
              </div>

              <Button
                onClick={onNew}
                disabled={isLoading}
                size="sm"
                variant="link"
                className="text-xs text-zinc-500 mt-4"
              >
                Generate a new link
                <RefreshCcw className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

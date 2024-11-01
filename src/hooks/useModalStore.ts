import { Channel, Server } from "@prisma/client";
import { create } from "zustand";
export type ModalTypes =
  | "createServer"
  | "invite"
  | "editServer"
  | "members"
  | "createChannel"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel"
  | "editChannel"
  | "messageFile"
  | "deleteMessage";
type MoadlData = {
  server?: Server;
  channel?: Channel;
  channelType?: "TEXT" | "AUDIO" | "VIDEO";
  apiUrl?: string;
  query?: Record<string, any>;
};

type ModalStore = {
  type: ModalTypes | null;
  data: MoadlData;
  isOpen: boolean;
  onOpen: (type: ModalTypes, data?: MoadlData) => void;
  onClose: () => void;
};
export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));

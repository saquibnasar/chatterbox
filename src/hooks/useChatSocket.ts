import { useSocket } from "@/components/providers/socketProvider";

type ChatSocketProps = {
  addKey: string;
  updateKey: string;
  queryKey: string;
};
export const useChatSocket = ({
  addKey,
  updateKey,
  queryKey,
}: ChatSocketProps) => {};

import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "./avatar";

type UserAvatarProps = {
  src?: string;
  className?: string;
};
export default function UserAvatar({ src, className }: UserAvatarProps) {
  return (
    <>
      <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
        <AvatarImage src={src} />
      </Avatar>
    </>
  );
}

import { useEffect, useState } from "react";

type ChatScrollProps = {
  chatRef: React.RefObject<HTMLDivElement>;
  bottomRef: React.RefObject<HTMLDivElement>;
  shouldLaodMore: boolean;
  laodMore: () => void;
  count: number;
};

export const useChatScroll = ({
  chatRef,
  bottomRef,
  shouldLaodMore,
  laodMore,
  count,
}: ChatScrollProps) => {
  const [hasIniTialized, setHasinitiallized] = useState(false);

  useEffect(() => {
    const topDiv = chatRef?.current;
    const handScroll = () => {
      const scrollTop = topDiv?.scrollTop;

      if (scrollTop === 0 && shouldLaodMore) {
        laodMore();
      }
    };

    topDiv?.addEventListener("scroll", handScroll);
    return () => {
      topDiv?.removeEventListener("scroll", handScroll);
    };
  }, [shouldLaodMore, chatRef, laodMore]);

  useEffect(() => {
    const bottomDiv = bottomRef?.current;
    const topDiv = chatRef?.current;

    const shouldAutoScrool = () => {
      if (!hasIniTialized && bottomDiv) {
        setHasinitiallized(true);
        return true;
      }
      if (!topDiv) {
        return false;
      }

      const distanceFromBottom =
        topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
      return distanceFromBottom <= 100;
    };
    if (shouldAutoScrool()) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  }, [bottomRef, chatRef, count, hasIniTialized]);
};

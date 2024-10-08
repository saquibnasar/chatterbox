import db from "@/db/db";
import currentProfile from "@/lib/currentProfile";
import { redirect } from "next/navigation";
import NavigationAction from "./navigationAction";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavigationItem from "./navigationItem";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";

export default async function NavigationSidebar() {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }
  const server = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  return (
    <>
      <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1e1f22] bg-[#E3E5E8] py-3">
        <NavigationAction />
        <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md mx-auto" />
        <ScrollArea className="flex-1 w-full">
          {server.map((server) => {
            return (
              <div key={server.id} className="mb-4">
                <NavigationItem
                  id={server.id}
                  name={server.name}
                  imageUrl={server.imageUrl}
                />
              </div>
            );
          })}
        </ScrollArea>
        <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
          <ModeToggle />
          <UserButton
            afterSwitchSessionUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-[48px] w-[48px]",
              },
            }}
          />
        </div>
      </div>
    </>
  );
}

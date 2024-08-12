import db from "@/db/db";
import currentProfile from "@/lib/currentProfile";
import { redirect } from "next/navigation";

export default async function NavigationSidebar() {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }
  const server = await db.server.findMany({
    where: {
      member: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  return (
    <>
      <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1e1f22] py-3">
        dfsf
      </div>
    </>
  );
}

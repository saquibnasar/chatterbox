import ServerSidebar from "@/components/server/serverSidebar";
import db from "@/db/db";
import currentProfile from "@/lib/currentProfile";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function ServerIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) {
  const profile = await currentProfile();
  if (!profile) {
    return <RedirectToSignIn />;
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      member: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }
  return (
    <div className="h-full">
      <div className="md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
}

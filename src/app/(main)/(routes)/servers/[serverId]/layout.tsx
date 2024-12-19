import ServerSidebar from "@/components/server/serverSidebar";
import db from "@/db/db";
import currentProfile from "@/lib/currentProfile";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ServerIdLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ serverId: string }>;
  }
) {
  const params = await props.params;

  const {
    children
  } = props;

  const profile = await currentProfile();
  if (!profile) {
    return auth().redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
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
      <div className="md:!flex h-full w-60 z-20 flex-col fixed inset-y-0 hidden">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
}

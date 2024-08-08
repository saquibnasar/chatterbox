import { initialProfile } from "@/lib/initial-profile";
import db from "@/db/db";
import { redirect } from "next/navigation";
import InitialModal from "@/components/modals/initial-modal";

export default async function page() {
  const profile = await initialProfile();
  const server = await db.server.findFirst({
    where: {
      member: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (server) {
    return redirect(`/server/${server.id}`);
  }
  return <InitialModal />;
}

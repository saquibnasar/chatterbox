import { initialProfile } from "@/lib/initial-profile";
import db from "@/db/db";

export default async function page() {
  const profile = await initialProfile();
  const server = await db.server.findFirst({
    where: {
      member: {},
    },
  });
  return <>create a serverf</>;
}

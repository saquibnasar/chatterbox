import { Server, Members, Profile } from "@prisma/client";

export type serverWithMembersWithProfile = Server & {
  members: (Members & { profile: Profile })[];
};

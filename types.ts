import { Server, Members, Profile } from "@prisma/client";

export type serverWithMembersWithProfile = server & {
  member: (Members & { profile: Profile })[];
};

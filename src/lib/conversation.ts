import db from "@/db/db";

export default async function findConversation(
  memberOneId: string,
  memberTowId: string
) {
  return await db.conversation.findFirst({
    where: {
      AND: [{ memberOneId: memberOneId }, { memberTwoId: memberTowId }],
    },
  });
}

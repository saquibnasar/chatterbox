import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "../../../types";
import currentProfilePages from "@/lib/currentProfilePages";
import { error } from "console";
import db from "@/db/db";

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const profile = await currentProfilePages(req);
    const { content, fileUrl } = req.body;
    const { serverId, channelId } = req.query;

    if (!profile) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!serverId) {
      return res.status(400).json({ error: "Server ID Missing " });
    }

    if (!channelId) {
      return res.status(400).json({ error: "Channel ID Missing " });
    }

    if (!content) {
      return res.status(400).json({ error: "Content Missing " });
    }
    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        members: true,
      },
    });
    if (!server) {
      return res.status(404).json({ error: "Server Not Found" });
    }

    const channel = await db.channel.findFirst({
      where: {
        id: serverId as string,
        serverId: serverId as string,
      },
    });

    if (!channel) {
      return res.status(404).json({ error: "Channel Not Found" });
    }

    const member = server.members.find(
      (member) => member.profileId === profile.id
    );

    if (!member) {
      return res.status(404).json({ error: "Member Not Found" });
    }

    const message = await db.messages.create({
      data: {
        content,
        fileUrl,
        channelId: channelId as string,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    const channelKey = `chat:${channelId}:messages`;
    res?.socket?.server?.io?.emit(channelKey, message);

    return res.status(200).json(message);
  } catch (error) {
    console.log("[CHANNEL_ID_DELETE]", error);
    return res.status(500).json({ error: "Internal Error" });
  }
}

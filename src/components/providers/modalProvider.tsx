"use client";
import { useEffect, useState } from "react";
import CreateServerModal from "@/components/modals/createServerModal";
import InviteModal from "@/components/modals/inviteModal";
import EditServerModal from "@/components/modals/editServerModal";
import MembersModal from "@/components/modals/MembersModal";
import CreateChannelModal from "@/components/modals/createChannelModal";
import LeaveServerModal from "@/components/modals/leaveServerModal";
import DeleteServerModal from "@/components/modals/deleteServerModal";
import DeleteChannelModal from "../modals/deleteChannelModal";
import EditChannelModal from "../modals/editChannelModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
    </>
  );
};

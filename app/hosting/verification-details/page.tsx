import getCurrentUser from "@/app/actions/getCurrentUser";
import HostVerificationFormClient from "./HostVerificationFormClient";
import { Host, User } from "@prisma/client";

interface UserIncludesHost extends User{
  host : Host
}

export default async function HostVerificationForm() {
  const currentUser = await getCurrentUser() as UserIncludesHost;
  return (
    <HostVerificationFormClient currentUser={currentUser} />
  );
}

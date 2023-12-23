import getCurrentUser from "@/app/actions/getCurrentUser";
import HostVerificationFormClient from "./HostVerificationFormClient";


export default async function HostVerificationForm() {
  const currentUser = await getCurrentUser();
  return (
    <HostVerificationFormClient currentUser={currentUser} />
  );
}

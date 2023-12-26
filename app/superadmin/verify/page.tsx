import { redirect, useRouter } from "next/navigation";
import isAdminAuthenticated from "@/app/actions/isAdminAuthenticated";
import { getHosts, getUnverifiedHosts, getVerifiedHosts } from "@/app/actions/getHosts";
import VerifyClient from "./verifyClient";
import { Host, User } from "@prisma/client";

interface HostsIncludeProps extends Host {
  user?: User | undefined; // 
}

const SortableTable = async () => {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return redirect("/superadmin/login");
  }

  const verifiedHosts: HostsIncludeProps[] = await getVerifiedHosts();
  const notVerifiedHosts: HostsIncludeProps[] = await getUnverifiedHosts();
  const hosts: HostsIncludeProps[] = await getHosts();

  return (
   <>
    <VerifyClient verifiedHosts={verifiedHosts} notVerifiedHosts={notVerifiedHosts} hosts={hosts}/>
   </>
  );
}

export default SortableTable;

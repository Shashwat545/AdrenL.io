import { redirect } from "next/navigation";
import isAdminAuthenticated from "@/app/actions/isAdminAuthenticated";
import { getHosts, getUnverifiedHosts, getVerifiedHosts } from "@/app/actions/getHosts";
import VerifyClient from "./verifyClient";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import { Host, User } from "@prisma/client";

interface HostsIncludeProps extends Host {
    user?: User | undefined; // 
}

const verifyKYCPage = async () => {
    const isAdmin = await isAdminAuthenticated();
    if(!isAdmin) {
        return redirect("/superadmin/login");
    }

    try {
        const verifiedHosts: HostsIncludeProps[] = await getVerifiedHosts();
        const notVerifiedHosts: HostsIncludeProps[] = await getUnverifiedHosts();
        const hosts: HostsIncludeProps[] = await getHosts();

        return (
            <VerifyClient verifiedHosts={verifiedHosts} notVerifiedHosts={notVerifiedHosts} hosts={hosts} />
        );
    } catch (error) {
        console.error("Error occurred at verify/page.tsx:", error);
        return (
            <ClientOnly>
                <EmptyState title="Uh Oh" subtitle="Something went wrong!"/>
            </ClientOnly>
        );
    }
};

export default verifyKYCPage;
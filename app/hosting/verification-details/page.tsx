import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import HostVerificationFormClient from "./HostVerificationFormClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { Host, User } from "@prisma/client";

interface UserIncludesHost extends User{
    host : Host;
}

const HostVerificationFormPage = async () => {
    const currentUser = await getCurrentUser() as UserIncludesHost;

    if(!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please login"/>
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <HostVerificationFormClient currentUser={currentUser} />
        </ClientOnly>
    );
};

export default HostVerificationFormPage;
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import HostVerificationFormClient from "./HostVerificationFormClient";
import getCurrentUser from "@/app/actions/getCurrentUser";

const HostVerificationFormPage = async () => {
    const currentUser = await getCurrentUser();

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
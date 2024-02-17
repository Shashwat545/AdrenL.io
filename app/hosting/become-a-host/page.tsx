import getCurrentUser from "@/app/actions/getCurrentUser";
import BecomeAHostClient from "./BecomeAHostClient";
import { Host, User } from "@prisma/client";

interface UserIncludesHost extends User{
    host : Host
}

const BecomeAHost = async () => {
    const currentUser = await getCurrentUser() as UserIncludesHost;
    
    return (
        <BecomeAHostClient currentUser={currentUser}/>
    );
};

export default BecomeAHost;
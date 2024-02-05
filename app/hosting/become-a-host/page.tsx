import getCurrentUser from "@/app/actions/getCurrentUser";
import BecomeAHostClient from "./BecomeAHostClient";
import { Host, User } from "@prisma/client";

interface UserIncludesHostProps extends User{
    host : Host
}

const BecomeAHost = async () => {
    const currentUser = await getCurrentUser() as UserIncludesHostProps;
    
    return (
        <BecomeAHostClient currentUser={currentUser}/>
    );
};

export default BecomeAHost;
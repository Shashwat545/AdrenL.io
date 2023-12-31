import getCurrentUser from "@/app/actions/getCurrentUser";
import BecomeAHostClient from "./BecomeAHostClient";

const BecomeAHost = async () => {
    const currentUser = await getCurrentUser();
    
    return (
        <BecomeAHostClient currentUser={currentUser}/>
    );
};

export default BecomeAHost;
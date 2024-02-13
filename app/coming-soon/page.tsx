import ClientOnly from "../components/ClientOnly";
import ComingSoonClient from "./ComingSoonClient";

const ComingSoonPage = () => {
    return (
        <ClientOnly>
            <ComingSoonClient />
        </ClientOnly>
    );
};

export default ComingSoonPage;
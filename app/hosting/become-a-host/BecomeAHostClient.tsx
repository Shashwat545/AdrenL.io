'use client';

import { Host, User } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import useHostModal from "@/app/hooks/useHostModal";

interface BecomeAHostClientProps {
    currentUser: User & {host: Host};
}

const BecomeAHostClient: React.FC<BecomeAHostClientProps> = ({ currentUser }) => {
    const router = useRouter();
    const HostModalHook=useHostModal();

    const handleClick = () => {
        if(!currentUser) {
            return toast.error("You are not logged in!");
        }
        if(currentUser.host) {
            return toast.error("You are already registered as a host with us.");
        }

        axios.post('/api/hosting/become-a-host', {id: currentUser.id})
        .then(() => {
            toast.success("You are now a host!");
        })
        .catch(() => {
            toast.error("Something went wrong!");
        })
        .finally(() => {  
            router.push('/hosting');
            return HostModalHook.onOpen();
        })
    };

    return (
        <div className="flex flex-wrap">
            <div className="w-full sm:w-8/12 mb-10">
                <div className="container mx-auto h-full sm:p-10">
                    <nav className="flex px-4 justify-between items-center">
                        <div className="text-4xl font-bold">
                            AdrenL<span className="text-red-700">.</span>
                        </div>
                        <div>
                        </div>
                    </nav>
                    <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
                        <div className="w-full">
                            <h1 className="text-4xl lg:text-6xl font-bold">Unleash your<span className="text-red-700">Adventure</span> </h1>
                            <div className="w-20 h-2 bg-red-700 my-4"></div>
                            <p className="text-xl mb-10">Are you passionate about providing unforgettable adventure experiences? Join our platform as a trusted supplier and let your thrilling activities reach a global audience! At AdrenL, we are dedicated to connecting adventure seekers with the most exhilarating activities around the world.</p>
                            <button className="bg-red-500 text-white text-2xl font-medium px-4 py-2 rounded shadow" onClick={handleClick}>Register as a host</button>
                        </div>
                    </header>
                </div>
            </div>
            <img src="https://images.unsplash.com/photo-1682687220801-eef408f95d71?q=80&w=1887&auto=format&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=720&q=80" alt="Leafs" className="w-full h-48 object-cover sm:h-screen sm:w-4/12" />
        </div> 
    );
};

export default BecomeAHostClient;
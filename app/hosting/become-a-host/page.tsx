import getCurrentUser from "@/app/actions/getCurrentUser";
import Button from "@/app/components/Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import BecomeAHostClient from "./BecomeAHostClient";
import { Host, User } from "@prisma/client";

interface UserIncludesHostProps extends User{
    host : Host
  }

export default async function BecomeAHost () {
    const currentUser = await getCurrentUser() as UserIncludesHostProps;
    
    return( 
       <>
       <BecomeAHostClient currentUser={currentUser}/> 

       </> 
    );
}
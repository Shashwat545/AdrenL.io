"use client"
import EmptyState from "@/app/components/EmptyState";
import useConversation from "@/app/hooks/chat/isOpen";
import clsx from "clsx";

const Inbox = () => {
    const { isOpen } = useConversation();
    return (
        <div className={clsx(
            'lg:pl-80 h-full lg:block', 
            isOpen ? 'block' : 'hidden'
          )}>
            <EmptyState title="Select a Chat to Start Messaging" subtitle=" "/>
          </div>
    )
}

export default Inbox;
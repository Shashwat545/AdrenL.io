import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from 'react-icons/hi';
import {  HiUsers } from 'react-icons/hi2';
import useConversation from "./isOpen";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(() => [
    { 
      label: 'Chat', 
      href: '/inbox', 
      icon: HiChat,
      active: pathname === '/inbox' || !!conversationId
    },
    { 
      label: 'Users', 
      href: '/users', 
      icon: HiUsers, 
      active: pathname === '/users'
    },
  ], [pathname, conversationId]);

  return routes;
};

export default useRoutes;

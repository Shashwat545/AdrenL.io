import ConversationList from "@/app/components/chat/ConversationList";
import Sidebar from "@/app/components/chat/SideBar/SiderBar";
import getConversations from "@/app/hooks/chat/getConversations";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
}

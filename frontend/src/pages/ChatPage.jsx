import { useState } from 'react';
import { Container } from '@/components';
import ChatList from '@/components/Chat/ChatList';
import ChatWindow from '@/components/Chat/ChatWindow';

function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <Container className="py-8 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <h2 className="text-2xl font-bold mb-4">Your Chats</h2>
          <ChatList onSelectChat={setSelectedChat} />
        </div>
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-bold mb-4">Messages</h2>
          <div className="border rounded-lg h-[600px] overflow-hidden">
            <ChatWindow 
              chat={selectedChat} 
              onClose={() => setSelectedChat(null)} 
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ChatPage;
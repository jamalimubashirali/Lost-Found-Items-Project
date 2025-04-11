import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import chatService from '@/services/chat.services';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

function ChatList({ onSelectChat }) {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.userData);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await chatService.getUserChats();
        setChats(response.chats);
      } catch (error) {
        console.error('Error fetching chats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [user]);

  if (loading) return <div>Loading chats...</div>;

  return (
    <div className="space-y-2">
      {chats.map((chat) => (
        <div 
          key={chat._id}
          onClick={() => onSelectChat(chat)}
          className="flex items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={chat.participant?.avatar} />
            <AvatarFallback>{chat.participant?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <div className="font-medium">{chat.participant?.name}</div>
            <div className="text-sm text-gray-500 truncate">
              {chat.lastMessage?.message || 'No messages yet'}
            </div>
          </div>
          {chat.unreadCount > 0 && (
            <Badge className="ml-auto">{chat.unreadCount}</Badge>
          )}
        </div>
      ))}
    </div>
  );
}

export default ChatList;
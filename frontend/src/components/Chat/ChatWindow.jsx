import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
// import messageService from '@/services/message.services';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function ChatWindow({ chat, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const user = useSelector((state) => state.user.userData);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!chat) return;
      
      try {
        const response = await messageService.getChatMessages(chat._id);
        setMessages(response.messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await messageService.sendMessage({
        chatId: chat._id,
        message: newMessage
      });
      
      // Optimistically update UI
      setMessages(prev => [...prev, {
        _id: Date.now().toString(), // Temporary ID
        chatId: chat._id,
        senderId: user._id,
        message: newMessage,
        createdAt: new Date().toISOString()
      }]);
      
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!chat) return <div className="flex items-center justify-center h-full">Select a chat to start messaging</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b">
        <Avatar className="h-10 w-10">
          <AvatarImage src={chat.participant?.avatar} />
          <AvatarFallback>{chat.participant?.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <div className="font-medium">{chat.participant?.name}</div>
          <div className="text-sm text-gray-500">Online</div>
        </div>
        <Button variant="ghost" onClick={onClose} className="ml-auto">
          Close
        </Button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {loading ? (
          <div>Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message._id}
              className={`flex mb-4 ${message.senderId === user._id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.senderId === user._id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-gray-100'}`}
              >
                {message.message}
                <div className={`text-xs mt-1 ${message.senderId === user._id ? 'text-primary-foreground/70' : 'text-gray-500'}`}>
                  {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
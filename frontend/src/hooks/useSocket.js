// hooks/useSocket.js
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function useSocket() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_API_BASE_URL, {
      withCredentials: true
    });
    
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return socket;
}
import Conversations from '@/containers/chat/Conversations/Conversations';
import { useCallback, useState, type Dispatch, type SetStateAction } from 'react';
import Messages from './Messages/Messages';

export type User = {
  id: string;
  name: string;
  username: string;
  image: string;
}

export type ChatState = {
  currentConversationId: string | null;
  setCurrentConversationId: Dispatch<SetStateAction<string | null>>;
  currentRecipient: User | null;
  setCurrentRecipient: Dispatch<SetStateAction<User | null>>;
}

export default function Chat() {
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [currentRecipient, setCurrentRecipient] = useState<User | null>(null);

  const selectConversation = useCallback((conversationId: string, recipient: User | null) => {
    setCurrentConversationId(Math.random() + "");
    setCurrentRecipient(recipient);
  }, []);
  return (
    <div>
      {!currentConversationId && <Conversations
        selectConversation={selectConversation}
      />}
      {currentConversationId && (
        <Messages
          currentConversationId={currentConversationId}
          currentRecipient={currentRecipient}
          setCurrentRecipient={setCurrentRecipient}
        />
      )}
    </div>
  )
}
import Conversations from '@/containers/chat/Conversations/Conversations';
import { useCallback, useState, type Dispatch, type SetStateAction } from 'react';
import Messages from './Messages/Messages';
import Image from 'next/image';
import IconButton from '@/components/IconButton/IconButton';
import { IoChatboxOutline } from 'react-icons/io5';

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
  const [showConversations, setShowConversations] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [currentRecipient, setCurrentRecipient] = useState<User | null>(null);
  const [conversationQueue, setConversationQueue] = useState<{ conversationId: string, recipient: User }[]>([]);

  const selectConversation = useCallback((conversationId: string, recipient: User | null) => {
    setCurrentConversationId(Math.random() + "");
    setCurrentRecipient(recipient);
    setShowConversations(false);
  }, []);
  const closeMessages = useCallback(() => {
    setCurrentConversationId(null);
    setCurrentRecipient(null);
  }, []);
  const addConToQueue = useCallback((conversationId: string, recipient: User) => {
    setConversationQueue(values => [{ conversationId, recipient }, ...values])
    closeMessages();
  }, [closeMessages]);
  const removeConFromQueue = useCallback((conversationId: string) => {
    setConversationQueue(values => values.filter(item => item.conversationId !== conversationId))
  }, []);
  return (
    <div>
      <IconButton onClick={() => setShowConversations(value => !value)} shouldFill={showConversations}>
        <IoChatboxOutline />
      </IconButton>
      {showConversations && <Conversations
        selectConversation={selectConversation}
      />}
      {currentConversationId && (
        <Messages
          currentConversationId={currentConversationId}
          currentRecipient={currentRecipient}
          setCurrentRecipient={setCurrentRecipient}
          queueLength={conversationQueue.length}
          addConToQueue={addConToQueue}
          closeMessages={closeMessages}
        />
      )}
      {!!conversationQueue.length && (
        <ul className='fixed bottom-4 right-4 space-y-3'>
          {conversationQueue.map(conversationEntry => {
            return (
              <li key={conversationEntry.conversationId} className='leading-[0]'>
                <button onClick={(e) => {
                  e.stopPropagation();
                  setCurrentConversationId(conversationEntry.conversationId);
                  setCurrentRecipient(conversationEntry.recipient);
                  removeConFromQueue(conversationEntry.conversationId);
                }}>
                  <Image
                    alt='avatar image'
                    src={conversationEntry.recipient.image}
                    className='w-12 h-12 rounded-full'
                    width={48}
                    height={48}
                  />
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
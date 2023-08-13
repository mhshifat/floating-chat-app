import IconButton from "@/components/IconButton/IconButton";
import useOnChange from "@/hooks/useOnChange";
import { api } from "@/utils/api";
import { type KeyboardEvent, useCallback, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { type ChatState } from "../../Chat";

export default function NewMessageTextarea({ currentConversationId, currentRecipient, setCurrentConversationId }: Pick<ChatState, 'currentConversationId' | 'currentRecipient' | 'setCurrentConversationId'>) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const {
    values: { message },
    setValues,
    handleChange,
  } = useOnChange({
    message: "",
  });
  const sendMessageMutation = api.chat.sendMessage.useMutation();
  const utils = api.useContext();

  const resizeTextArea = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 144) + 'px';
    }
  }, [])

  const sendMessage = useCallback(() => {
    if (message) {
      sendMessageMutation.mutate({
        messageText: message,
        ...currentConversationId === 'newMessage' ? { userId: currentRecipient?.id } : { conversationId: currentConversationId }
      }, {
        onSettled: (data, error) => {
          if (currentConversationId !== 'newMessage') {
            void utils.chat.conversations.invalidate();
            void utils.chat.messages.invalidate({ conversationId: currentConversationId! });
          }
          if (data?.id) {
            setCurrentConversationId(data.id as string)
          }
          if (error) {
            console.error(error);
          }
          setValues({ message: '' });
        }
      })
    }
  }, [currentConversationId, currentRecipient?.id, message, sendMessageMutation, setCurrentConversationId, setValues, utils.chat.conversations, utils.chat.messages])

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.altKey && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
    if (e.key === 'Enter' && e.altKey) {
      e.preventDefault();
      setValues({ message: message + '\r\n' })
    }
  }, [message, sendMessage, setValues]);

  useEffect(() => {
    resizeTextArea()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message])

  return (
    <div className="flex space-x-1 items-center">
      <textarea
        ref={textareaRef}
        placeholder="Message"
        name="message"
        className="max-h-36 h-10 w-full resize-none rounded-lg bg-level2 px-3 py-2 outline-none placeholder:text-quaternaryText"
        value={message}
        onKeyDown={onKeyDown}
        onChange={handleChange}
      />
      {message !== "" && (
        <IconButton onClick={sendMessage}>
          <IoSend />
        </IconButton>
      )}
    </div>
  );
}

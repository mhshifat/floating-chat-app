import { type ChatState } from "../Chat";
import MessagesHeader from "./MessagesHeader/MessagesHeader";
import MessagesSection from "./MessagesSection/MessagesSection";
import NewConversationUserInput from "./NewConversationUserInput/NewConversationUserInput";
import NewMessageTextarea from "./NewMessageTextarea/NewMessageTextarea";

export default function Messages({
  currentRecipient,
  setCurrentRecipient
}: Omit<ChatState, "setCurrentConversationId">) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-0 right-0 flex flex-col space-y-5 rounded-xl bg-level1 p-5 shadow-sm max-md:left-0 max-md:top-0 md:bottom-4 md:right-4 md:h-[540px] md:w-96"
    >
      <MessagesHeader currentRecipient={currentRecipient} />
      {currentRecipient === null && <NewConversationUserInput setCurrentRecipient={setCurrentRecipient} />}
      {currentRecipient !== null && <MessagesSection currentRecipient={currentRecipient} />}
      {currentRecipient !== null && <NewMessageTextarea />}
    </div>
  );
}

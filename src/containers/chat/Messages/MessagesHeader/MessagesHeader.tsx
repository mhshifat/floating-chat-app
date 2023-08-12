import IconButton from "@/components/IconButton/IconButton";
import { type ChatState } from "../../Chat";
import { IoCloseOutline, IoRemoveOutline } from "react-icons/io5";
import Image from "next/image";

export default function MessagesHeader({
  currentRecipient,
}: Pick<ChatState, 'currentRecipient'>) {
  return (
    <div className="flex justify-between items-center">
      {!currentRecipient ? (
        <p>New Message</p>
      ) : (
        <div className="flex">
          <Image
            alt="avatar image"
            src={currentRecipient.image}
            className="rounded-full w-11 h-11 mr-2"
            width={44}
            height={44}
          />

          <div className="flex flex-col">
            <p>{currentRecipient?.name}</p>
            <p className="text-tertiaryText text-sm">{currentRecipient?.username}</p>
          </div>
        </div>
      )}
      <div className="flex">
        {currentRecipient && (
          <IconButton>
            <IoRemoveOutline />
          </IconButton>
        )}
        <IconButton>
          <IoCloseOutline />
        </IconButton>
      </div>
    </div>
  );
}

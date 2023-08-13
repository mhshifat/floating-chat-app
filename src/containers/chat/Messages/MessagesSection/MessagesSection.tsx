import { useCallback } from "react";
import { type ChatState } from "../../Chat";
import Image from "next/image";

const messages = [
  {
    id: "4",
    messageText: "This is a message",
    userId: "3",
    createdAt: new Date(),
  },
  {
    id: "1",
    messageText: "Hello",
    userId: "2",
    createdAt: new Date(),
  },
];

export default function MessagesSection({ currentRecipient }: Pick<ChatState, 'currentRecipient'>) {
  const getTimeStamp = useCallback((msgs: typeof messages, index: number) => {
    const currentDate = msgs[index]?.createdAt;
    const previousDate = index !== 0 ? msgs[index - 1]?.createdAt : null;
    if (previousDate) {
      if (previousDate.getDate() === currentDate?.getDate() && previousDate.getMonth() === currentDate?.getMonth() && previousDate.getFullYear() === currentDate?.getFullYear()) {
        return;
      }
    }

    return new Intl.DateTimeFormat(undefined, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(currentDate);
  }, []);

  return (
    <ul className="flex h-full flex-col space-y-5 overflow-y-auto">
      {messages.map((message, idx) => {
        const timestamp = getTimeStamp(messages, idx);
        return (
          <li key={message.id} className="flex flex-col w-full">
            {timestamp !== null && <p className="text-quaternaryText mb-5 text-center empty:hidden">{timestamp}</p>}
            {message.userId === currentRecipient?.id ? (
              <div className="flex">
                <Image
                  alt="avatar image"
                  src={currentRecipient.image!}
                  className="rounded-full w-7 h-7 self-end mr-2"
                  width={28}
                  height={28}
                />

                <div className="bg-level2 p-2 flex flex-col rounded-xl min-w-[60%] max-w-[60%]">
                  <p className="mb-2 whitespace-pre-line">{message.messageText}</p>

                  <p className="text-tertiaryText text-xs self-end">{new Intl.DateTimeFormat(undefined, {
                    hour: 'numeric',
                    minute: 'numeric'
                  }).format(message.createdAt)}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col rounded-xl p-2 bg-primaryText self-end min-w-[60%] max-w-[60%]">
                <p className="text-invertedPrimaryText mb-2 whitespace-pre-line">{message.messageText}</p>

                <p className="text-invertedTertiaryText text-xs self-end">{new Intl.DateTimeFormat(undefined, {
                    hour: 'numeric',
                    minute: 'numeric'
                  }).format(message.createdAt)}</p>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

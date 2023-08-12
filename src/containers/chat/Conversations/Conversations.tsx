import IconButton from "@/components/IconButton/IconButton";
import Image from "next/image";
import { IoAddOutline, IoChevronBackOutline } from "react-icons/io5";

export interface ConversationsProps {
  _?: never;
}

const conversations = [
  {
    userId: 1,
    conversation: {
      id: 2,
      conversationUsers: [
        {
          id: 1,
          name: 'Me',
          image: 'https://picsum.photos/200'
        },
        {
          id: 3,
          name: 'John',
          image: 'https://picsum.photos/200'
        },
      ],
      messages: [
        {
          id: 4,
          messageText: 'This is a message'
        }
      ]
    }
  }
]

export default function Conversations({}: ConversationsProps) {
  return (
    <div className="md:w-96 md:h-[540px] fixed bottom-0 left-0 right-0 top-0 bg-level1 md:bottom-[unset] md:left-[unset] md:top-[76px] md:rounded-xl md:shadow-sm md:right-4 flex flex-col p-5 space-y-5">
      <div className="flex items-center justify-between">
        <IconButton className="md:hidden">
          <IoChevronBackOutline />
        </IconButton>
        <p className="text-lg pb-0">Messages</p>
        <IconButton>
          <IoAddOutline />
        </IconButton>
      </div>
      <ul>
        {conversations.map(conversationInfo => {
          const recipient = conversationInfo.conversation.conversationUsers[0]?.id === conversationInfo.userId ? conversationInfo.conversation.conversationUsers[1] : conversationInfo.conversation.conversationUsers[0];

          return (
            <li className="hover:bg-level1Hover py-2 rounded-lg" key={conversationInfo.conversation.id}>
              <button className="flex items-center text-left space-x-2 mx-2">
                <Image
                  alt="avatar image"
                  src={recipient!.image}
                  className="rounded-full w-12 h-12"
                  width={48}
                  height={48}
                />

                <div className="space-y-1">
                  <p>{recipient?.name}</p>
                  <p className="text-tertiaryText text-sm">{conversationInfo.conversation.messages[0]?.messageText}</p>
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

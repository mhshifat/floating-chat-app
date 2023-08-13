import useOnChange from "@/hooks/useOnChange";
import { useRef, useEffect, useState } from "react";
import { type ChatState } from "../../Chat";
import { type User } from '@prisma/client';
import Image from "next/image";
import { api } from "@/utils/api";

export default function NewConversationUserInput({ setCurrentRecipient }: Pick<ChatState, 'setCurrentRecipient'>) {
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const { values: { user }, handleChange } = useOnChange({
    user: '',
  });
  const { data: users, isLoading, error, refetch } = api.user.users.useQuery({ user: user! }, { enabled: false })
  const [searchResults, setSearchResults] = useState<User[]>([]);

  useEffect(() => {
    if (user) {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => void refetch(), 200);
    } else {
      setSearchResults([]);
    }
  }, [refetch, user]);

  useEffect(() => {
    if (!users) return;
    setSearchResults(users as unknown as User[]);
  }, [users])
  
  return (
    <div className="relative !mt-0">
      <input
        type="text"
        className="h-10 w-full rounded-lg bg-level2 px-3 py-2 placeholder:text-quaternaryText"
        placeholder="Search User"
        name="user"
        value={user}
        onChange={handleChange}
        autoComplete="off"
      />

      {((isLoading && user !== '') ?? error) && (
        <div className="absolute left-0 ring-0 top-[calc(100%+12px)] w-full">
          <p>{isLoading ? 'Loading...' : `Error: ${error.message}`}</p>
        </div>
      )}
      {!!searchResults.length && (
        <ul className="absolute left-0 ring-0 top-[calc(100%+12px)] w-full">
          {searchResults.map(user => (
            <li key={user.id} className="bg-level2 hover:bg-level2Hover first:rounded-t-lg last:rounded-b-lg">
              <button onClick={() => setCurrentRecipient(user)} className="flex text-left w-full p-3">
                <Image
                  alt="avatar image"
                  src={user.image ?? ''}
                  className="rounded-full mr-2 w-11 h-11"
                  width={44}
                  height={44}
                />

                <div>
                  <p>{user.name}</p>
                  <p className="text-tertiaryText text-sm">{user.username}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

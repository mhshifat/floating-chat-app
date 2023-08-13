import { type HTMLProps } from "react";
import IconButton from "../IconButton/IconButton";
import { IoMoonOutline } from "react-icons/io5";
import Image from "next/image";
import Chat from "@/containers/chat/Chat";
import { signIn, useSession } from "next-auth/react";

export interface NavbarProps extends HTMLProps<HTMLElement> {
  _: never;
}

export default function Navbar() {
  const { data: sessionData } = useSession();

  return (
    <nav className="z-50 bg-level1 fixed top-0 flex h-14 w-full items-center justify-end shadow-sm space-x-2 px-4">
      {sessionData?.user?.id ? (
        <>
          <IconButton>
            <IoMoonOutline />
          </IconButton>
          <Chat />
          <IconButton>
            <Image
              src={sessionData.user.image ?? ''}
              className="h-8 w-8 rounded-full"
              alt="avatar image"
              width={32}
              height={32}
            />
          </IconButton>
        </>
      ) : (
        <button className="" onClick={() => void signIn()}>Sign In</button>
      )}
    </nav>
  );
}

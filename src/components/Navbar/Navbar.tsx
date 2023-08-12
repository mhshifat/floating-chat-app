import { useState, type HTMLProps } from "react";
import IconButton from "../IconButton/IconButton";
import { IoChatboxOutline, IoMoonOutline } from "react-icons/io5";
import Image from "next/image";
import Chat from "@/containers/chat/Chat";
import { createPortal } from "react-dom";

export interface NavbarProps extends HTMLProps<HTMLElement> {
  _: never;
}

export default function Navbar() {
  const [showChat, setShowChat] = useState(false);

  return (
    <nav className="z-50 bg-level1 fixed top-0 flex h-14 w-full items-center justify-end shadow-sm space-x-2 px-4">
      <IconButton>
        <IoMoonOutline />
      </IconButton>
      <IconButton onClick={() => setShowChat(value => !value)} shouldFill={showChat}>
        <IoChatboxOutline />
        {showChat && createPortal(<Chat />, document.body)}
      </IconButton>
      <IconButton>
        <Image
          src="https://picsum.photos/200"
          className="h-8 w-8 rounded-full"
          alt="avatar image"
          width={32}
          height={32}
        />
      </IconButton>
    </nav>
  );
}

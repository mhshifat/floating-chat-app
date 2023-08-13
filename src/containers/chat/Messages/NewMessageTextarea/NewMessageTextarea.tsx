import IconButton from "@/components/IconButton/IconButton";
import useOnChange from "@/hooks/useOnChange";
import { type KeyboardEvent, useCallback, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";

export default function NewMessageTextarea() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const {
    values: { message },
    setValues,
    handleChange,
  } = useOnChange({
    message: "",
  });

  const resizeTextArea = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 144) + 'px';
    }
  }, [])

  const sendMessage = useCallback(() => {
    setValues({ message: '' });
  }, [setValues])

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
        <IconButton>
          <IoSend />
        </IconButton>
      )}
    </div>
  );
}

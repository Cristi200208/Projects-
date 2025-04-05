import React, { useContext, useEffect, useState } from "react";
import { AuthContextProps, IMessages } from "../types/users";
import { AuthContext } from "../providers/AuthContext";
import MessageCard from "../components/MessageCard";

const Messages: React.FC = (): JSX.Element => {
  const { user } = useContext(AuthContext) as AuthContextProps;
  const [mesages, setMessages] = useState<IMessages[]>([]);

  useEffect(() => {
    if (user?.messages) {
      setMessages(user?.messages as IMessages[]);
    }
  }, [user?.messages]);

  console.log(mesages);

  if (mesages.length === 0) {
    return (
      <span className=" flex justify-center items-center text-3xl">
        No Messages
      </span>
    );
  }

  return (
    <div className="flex flex-col gap-14 2xl:px-[25%] xl:px-80 py-9 md:p-20 sm:p-20 xxs:p-5">
      <h1 className=" flex justify-center items-center text-3xl border-b-2 border-gray-400 p-2">
        My Messages
      </h1>
      {mesages.map((message, index) => (
        <MessageCard key={index} data={message} />
      ))}
    </div>
  );
};

export default Messages;

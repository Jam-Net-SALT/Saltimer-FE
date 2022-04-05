import { createContext, ReactChild, useEffect, useState } from "react";
import {
  HubConnectionBuilder,
  LogLevel,
  HubConnection,
} from "@microsoft/signalr";
import { MobTimerConnection } from "../Pages/JoinSession/types";

export interface SaltimerContextInterface {
  message: string[];
  joinRoom: (data: MobTimerConnection) => Promise<void>;
}

enum HubEndPints {
  ReceiveMessage = "ReceiveMessage",
  JoinRoom = "JoinRoom",
}

function SaltimerActions(): SaltimerContextInterface {
  let connection: HubConnection;
  const [message, setMessage] = useState<string[]>([]);

  const connectWebSocket = async () => {
    console.log("Saltimer hub started");
    try {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      connection = new HubConnectionBuilder()
        .withUrl(process.env.REACT_APP_SALTIMER_SOCKET)
        .configureLogging(LogLevel.Information)
        .build();

      registerListeners();
      await connection.start();
    } catch (e) {
      console.log(e);
    }
  };

  const registerListeners = () => {
    connection.on(HubEndPints.ReceiveMessage, (user, message) => {
      const newMessage = "Sender: " + user + "  Message: " + message;
      setMessage((m) => [...m, newMessage]);
    });
  };

  const joinRoom = async (data: MobTimerConnection) => {
    await connectWebSocket();
    await connection.invoke(HubEndPints.JoinRoom, data);
  };

  return { message, joinRoom };
}

export const SaltimerContext = createContext<SaltimerContextInterface | null>(
  null
);

export const SaltimerProvider = ({ children }: { children: ReactChild }) => {
  const saltimerHub = SaltimerActions();

  return (
    <SaltimerContext.Provider value={saltimerHub}>
      {children}
    </SaltimerContext.Provider>
  );
};

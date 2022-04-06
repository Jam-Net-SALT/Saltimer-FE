import { createContext, ReactChild, useEffect, useState } from "react";
import {
  HubConnectionBuilder,
  LogLevel,
  HubConnection,
} from "@microsoft/signalr";
import { MobTimerConnection } from "../../Pages/JoinSession/types";
import {
  ServerInfoResponse,
  SessionInfoResponse,
  SessionTimerResponse,
} from "./type";
import { User } from "../../types/User";
import { useNavigate } from "react-router-dom";

export interface SaltimerContextInterface {
  sessionInfo: SessionInfoResponse | undefined;
  sessionTimer: SessionTimerResponse | undefined;
  onlineMember: User[] | undefined;
  serverInfo: ServerInfoResponse | undefined;
  clearServerInfo: () => void;
  setUpConnection: () => Promise<void>;
  disconnectHub: () => void;
  joinSession: (data: MobTimerConnection) => Promise<void>;
}

enum HubEndPints {
  ReceiveSession = "ReceiveSession",
  JoinSession = "JoinSession",
  ReceiveOnlineMember = "ReceiveOnlineMember",
  NotifyClient = "NotifyClient",
  ReceiveUserLeaveSession = "ReceiveUserLeaveSession",
}

function SaltimerActions(): SaltimerContextInterface {
  const navigator = useNavigate();
  const [connection, setConnection] = useState<HubConnection | undefined>();
  const [sessionInfo, setSessionInfo] = useState<
    SessionInfoResponse | undefined
  >();
  const [sessionTimer, setSessionTimer] = useState<
    SessionTimerResponse | undefined
  >();
  const [onlineMember, setOnlineMember] = useState<User[] | undefined>();
  const [serverInfo, setServerInfo] = useState<
    ServerInfoResponse | undefined
  >();

  const setUpConnection = async (): Promise<void> => {
    try {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const hub = new HubConnectionBuilder()
        .withUrl(process.env.REACT_APP_SALTIMER_SOCKET)
        .configureLogging(LogLevel.Information)
        .build();
      registerListeners(hub);
      setConnection(hub);
    } catch (e) {
      console.log(e);
    }
  };

  const registerListeners = (hub: HubConnection) => {
    hub.on(
      HubEndPints.ReceiveSession,
      (
        sessionInfo: SessionInfoResponse,
        sessionTimer: SessionTimerResponse
      ) => {
        setSessionInfo(sessionInfo);
        console.log("sessionInfo: ", sessionInfo);
        setSessionTimer(sessionTimer);
        console.log("sessionTimer: ", sessionTimer);
      }
    );

    hub.on(HubEndPints.ReceiveOnlineMember, (onlineUsers: User[]) => {
      console.log("onlineUsers: ", onlineUsers);
      setOnlineMember(onlineUsers);
    });

    hub.on(HubEndPints.NotifyClient, ({ ...info }: ServerInfoResponse) => {
      setServerInfo(info);
      console.log("info: ", info);
    });

    hub.on(
      HubEndPints.ReceiveUserLeaveSession,
      ({ ...info }: ServerInfoResponse) => {
        setServerInfo(info);
        console.log("info: ", info);
      }
    );
  };

  const disconnectHub = () => {
    if (connection?.state === "Connected") {
      connection.stop();
    }
  };

  const joinSession = async (data: MobTimerConnection) => {
    if (connection?.state === "Disconnected") {
      await connection.start();
    }

    await connection?.invoke(HubEndPints.JoinSession, data);
    window.localStorage.setItem("session", await JSON.stringify(data));
  };

  const clearServerInfo = () => setServerInfo(undefined);

  return {
    setUpConnection,
    joinSession,
    sessionInfo,
    sessionTimer,
    onlineMember,
    serverInfo,
    clearServerInfo,
    disconnectHub,
  };
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

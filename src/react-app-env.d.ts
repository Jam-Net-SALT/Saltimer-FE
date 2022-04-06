/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    PUBLIC_URL: string;
    REACT_APP_SALTIMER_API: string;
    REACT_APP_SALTIMER_SOCKET: string;
  }
}
interface Window {
  Stripe: any;
}

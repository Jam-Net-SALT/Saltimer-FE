import { Progress, Title } from "@mantine/core";
import { MutableRefObject, useContext, useEffect, useRef } from "react";
import Countdown, { CountdownTimeDelta } from "react-countdown";
import { useSpeechSynthesis } from "react-speech-kit";
import {
  addMinutes,
  differenceInMinutes,
  millisecondsToSeconds,
} from "date-fns";
import { MobTimerPauseButton, MobTimerPlayButton } from "../ActionIconButtons";
import useStyles from "./style";
import {
  SaltimerContext,
  SaltimerContextInterface,
} from "../../services/SaltimerProvider";
import { User } from "../../types/User";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/CurrentUser";

const MobTimerRemote = () => {
  const { classes } = useStyles();
  const user = useSelector(selectUser);
  const hub = useContext<SaltimerContextInterface | null>(SaltimerContext);
  const timerRef = useRef() as MutableRefObject<Countdown>;
  const { speak } = useSpeechSynthesis();

  console.log("Renderd");
  useEffect(() => {
    if (hub?.sessionTimer) {
      if (hub?.sessionTimer.isPaused) getTimerApi().pause();

      if (!hub?.sessionTimer.isPaused) getTimerApi().start();
    }

    return () => {};
  });

  const getCurrentDriver = (): User | undefined => {
    if (hub?.sessionTimer && hub?.onlineMember) {
      return hub?.onlineMember[
        hub.sessionTimer?.totalRoundCount % hub?.onlineMember?.length
      ];
    }
  };

  const getNextDriver = (): User | undefined => {
    if (hub?.sessionTimer && hub?.onlineMember) {
      return hub?.onlineMember[
        (hub.sessionTimer?.totalRoundCount + 1) % hub?.onlineMember?.length
      ];
    }
  };

  const messages = () :string[] | undefined => {
    const current = getCurrentDriver()?.firstName;
    const next = getNextDriver()?.firstName;
    
  if(current && next){
    return [
      `Hi ${current} your time is over. Now its ${next}s turn.`,
      `Hello ${current} you scallywanker, your time is over. Now its ${next}s turn.`,
      `Goodday ${current} mate your time is ovah. Now its ${next}s turn.`,
      `Hi ${current} your time is over. Now its ${next}s turn. Please hurry up slowpokes.`,
      `Soisoisoisoi ${current} your time is up. Now its ${next}s turn. Godspeed.`,
    ]
  }
  }

  const randomMessage = () => {
    
    const randMessage = messages();
    
    if(randMessage) return randMessage[Math.floor(Math.random()*messages.length)]
  };

  const timerCompleteHandler = async () => {
    if (
      user?.username === getCurrentDriver()?.username ||
      user?.username === getNextDriver()?.username
    ) {
      speak({ text: randomMessage() });
    }

    if (user?.username === getCurrentDriver()?.username) {
      await hub?.stepToNextDriver({ Uuid: hub.sessionInfo?.uniqueId });
    }
  };

  const timerPlayHandler = async () => {
    await hub?.playSessionTimer({ Uuid: hub.sessionInfo?.uniqueId });
  };

  const timerPauseHandler = async () => {
    await hub?.pauseSessionTimer({ Uuid: hub.sessionInfo?.uniqueId });
  };

  const getTimerPercentage = (currentTime: string | number | Date) =>
    hub?.sessionInfo?.roundTime &&
    (millisecondsToSeconds(Number(currentTime)) /
      (hub?.sessionInfo?.roundTime * 60)) *
      100;

  const getTimerApi = () => timerRef.current.getApi();

  const getTime = () => {
    if (
      hub?.sessionTimer?.startTime &&
      hub?.sessionTimer?.pausedTime &&
      hub.sessionInfo?.roundTime
    ) {
      if (hub?.sessionTimer?.isPaused) {
        return addMinutes(
          Date.now(),
          hub.sessionInfo?.roundTime -
            differenceInMinutes(
              new Date(hub?.sessionTimer?.pausedTime),
              new Date(hub?.sessionTimer?.startTime)
            )
        );
      }
      return addMinutes(
        Date.now(),
        hub.sessionInfo?.roundTime +
          differenceInMinutes(
            new Date(hub?.sessionTimer?.pausedTime),
            new Date(hub?.sessionTimer?.startTime)
          )
      );
    }

    if (hub?.sessionInfo?.roundTime)
      return addMinutes(
        hub?.sessionTimer?.startTime
          ? new Date(hub?.sessionTimer?.startTime)
          : Date.now(),
        hub?.sessionInfo?.roundTime
      );
  };
  return (
    <Countdown
      key={"mob-timer-item"}
      date={getTime()}
      daysInHours
      intervalDelay={1000}
      autoStart={!hub?.sessionTimer?.isPaused}
      zeroPadTime={2}
      ref={timerRef}
      onComplete={async () => await timerCompleteHandler()}
      renderer={({ total }: { total: string | number | Date }) => (
        <div style={{ width: "50%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {hub?.sessionTimer?.isPaused ? (
              <MobTimerPlayButton
                handler={async () => await timerPlayHandler()}
              />
            ) : (
              <MobTimerPauseButton
                handler={async () => await timerPauseHandler()}
              />
            )}
            <Title order={2} align='center' className={classes.counterText}>
              {new Date(total).getMinutes() +
                " : " +
                new Date(total).getSeconds()}
            </Title>
          </div>
          <Progress
            mt='md'
            size='xl'
            radius='xl'
            value={getTimerPercentage(total)}
            color='#FF7A62'
          />
        </div>
      )}
    />
  );
};

export default MobTimerRemote;

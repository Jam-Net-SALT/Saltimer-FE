import { Progress, Title } from "@mantine/core";
import { MutableRefObject, useRef, useState } from "react";
import Countdown, { CountdownTimeDelta } from "react-countdown";
import { useSpeechSynthesis } from "react-speech-kit";
import {
  addMinutes,
  differenceInMinutes,
  millisecondsToSeconds,
} from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  pauseMobTimer,
  selectLocalMobSession,
  startMobTimer,
  stepToNextDriver,
} from "../../store/LocalMobSession";
import { MobTimerPauseButton, MobTimerPlayButton } from "../ActionIconButtons";
import useStyles from "./style";

const MobTimerLocal = () => {
  const { classes } = useStyles();
  const session = useSelector(selectLocalMobSession);
  const dispatch = useDispatch();
  const timerRef = useRef() as MutableRefObject<Countdown>;
  const [isPaused, setIsPaused] = useState(true);
  const { speak } = useSpeechSynthesis();

  const getCurrentDriver = session.members.find(
    (m) => m.turn === session.currentTurn
  );

  const getNextDriver = session.members.find(
    (m) =>
      m.turn ===
      (session.currentTurn + 1 >= session.members.length
        ? 0
        : session.currentTurn + 1)
  );
  
  const messages = [
    `Hi ${getCurrentDriver?.name} your time is over. Now its ${getNextDriver?.name}s turn.`,
    `Hello ${getCurrentDriver?.name} you scallywanker, your time is over. Now its ${getNextDriver?.name}s turn.`,
    `Goodday ${getCurrentDriver?.name} mate your time is ovah. Now its ${getNextDriver?.name}s turn.`,
    `Hi ${getCurrentDriver?.name} your time is over. Now its ${getNextDriver?.name}s turn. Please hurry up slowpokes.`,
    `Soisoisoisoi ${getCurrentDriver?.name} your time is up. Now its ${getNextDriver?.name}s turn. Godspeed.`,
  ]

  const randomMessage= messages[Math.floor(Math.random()*messages.length)];

  const timerCompleteHandler = (p: CountdownTimeDelta) => {
    speak({ text: randomMessage });
    getTimerApi().start();
    dispatch(stepToNextDriver());
  };

  const timerPlayHandler = () => {
    dispatch(startMobTimer());
    getTimerApi().start();
    setIsPaused(false);
  };

  const timerPauseHandler = () => {
    dispatch(pauseMobTimer());
    getTimerApi().pause();
    setIsPaused(true);
  };

  const getTimerPercentage = (currentTime: string | number | Date) =>
    (millisecondsToSeconds(Number(currentTime)) / (session.driverTime * 60)) *
    100;

  const getTimerApi = () => timerRef.current.getApi();

  const getTime = () => {
    if (session.startTime && session.pausedTime) {
      if (isPaused) {
        return addMinutes(
          Date.now(),
          session.driverTime -
            differenceInMinutes(
              new Date(session.pausedTime),
              new Date(session.startTime)
            )
        );
      }
      return addMinutes(
        Date.now(),
        session.driverTime +
          differenceInMinutes(
            new Date(session.pausedTime),
            new Date(session.startTime)
          )
      );
    }

    return addMinutes(Date.now(), session.driverTime);
  };
  return (
    <Countdown
      key={"mob-timer-item"}
      date={getTime()}
      daysInHours
      intervalDelay={1000}
      autoStart={false}
      zeroPadTime={2}
      ref={timerRef}
      onComplete={timerCompleteHandler}
      renderer={({ total }: { total: string | number | Date }) => (
        <div style={{ width: "50%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isPaused ? (
              <MobTimerPlayButton handler={timerPlayHandler} />
            ) : (
              <MobTimerPauseButton handler={timerPauseHandler} />
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

export default MobTimerLocal;

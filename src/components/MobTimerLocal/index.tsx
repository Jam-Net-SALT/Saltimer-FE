import { Center, Grid, Progress, Title } from "@mantine/core";
import React, { MutableRefObject, useRef, useState } from "react";
import Countdown, { CountdownTimeDelta } from "react-countdown";
import { useSpeechSynthesis } from "react-speech-kit";
import {
  addMinutes,
  differenceInMilliseconds,
  differenceInMinutes,
  getMinutes,
  millisecondsToSeconds,
  sub,
  subMinutes,
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

  const timerCompleteHandler = (p: CountdownTimeDelta) => {
    const speechNxtDriver = `Hi ${getCurrentDriver?.name} your time is over. Now its ${getNextDriver?.name} time.`;
    speak({ text: speechNxtDriver });
    getTimerApi().start();
    dispatch(stepToNextDriver());
  };

  const timerPlayHandler = () => {
    getTimerApi().start();
    setIsPaused(false);
  };

  const timerPauseHandler = () => {
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
      onStart={() => dispatch(startMobTimer())}
      onPause={() => dispatch(pauseMobTimer())}
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

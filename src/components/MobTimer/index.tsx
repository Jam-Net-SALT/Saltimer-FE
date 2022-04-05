import { Progress, Title } from "@mantine/core";
import { MutableRefObject, useRef, useState } from "react";
import Countdown, { CountdownTimeDelta } from "react-countdown";
import { useSpeechSynthesis } from 'react-speech-kit';
import { addMinutes, millisecondsToSeconds } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLocalMobSession,
  startMobTimer,
  stepToNextDriver,
} from "../../store/LocalMobSession";
import { MobTimerPauseButton, MobTimerPlayButton } from "../ActionIconButtons";
import useStyles from "./style";

const MobTimer = () => {
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
    (m) => m.turn === (session.currentTurn + 1 >= session.members.length ? 0 : session.currentTurn + 1)
  );

  const timerCompleteHandler = (p: CountdownTimeDelta) => {
    const speechNxtDriver = `Hi ${getCurrentDriver?.name} your time is over. Now its ${getNextDriver?.name} time.`;
    speak({ text: speechNxtDriver });
    getTimerApi().pause();
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

  return (
    <Countdown
      key={"mob-timer-item" + isPaused}
      date={addMinutes(Date.now(), session.driverTime)}
      daysInHours
      intervalDelay={1000}
      autoStart={!isPaused}
      zeroPadTime={2}
      ref={timerRef}
      onStart={() => dispatch(startMobTimer())}
      onComplete={timerCompleteHandler}
      renderer={({ total }: { total: string | number | Date }) => (
        <div style={{ width: "50%" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
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
            mt="md"
            size="xl"
            radius="xl"
            value={getTimerPercentage(total)}
            color="#FF7A62"
          />
        </div>
      )}
    />
  );
};

export default MobTimer;

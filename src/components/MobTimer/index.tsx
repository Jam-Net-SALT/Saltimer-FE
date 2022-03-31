import { Grid, Progress, Title } from "@mantine/core";
import React, { MutableRefObject, useRef, useState } from "react";
import Countdown, { CountdownTimeDelta } from "react-countdown";
import { addMinutes, millisecondsToSeconds } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLocalMobSession,
  startMobTimer,
  stepToNextDriver,
} from "../../store/LocalMobSession";
import { MobTimerPauseButton, MobTimerPlayButton } from "../ActionIconButtons";

const MobTimer = () => {
  const session = useSelector(selectLocalMobSession);
  const dispatch = useDispatch();
  const timerRef = useRef() as MutableRefObject<Countdown>;
  const [isPaused, setIsPaused] = useState(false);

  const timerCompleteHandler = (p: CountdownTimeDelta) => {
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

  return (
    <Grid>
      <Grid.Col>
        <Countdown
          key={"mob-timer-item"}
          date={addMinutes(Date.now(), session.driverTime)}
          daysInHours
          intervalDelay={1000}
          zeroPadTime={2}
          ref={timerRef}
          onStart={() => dispatch(startMobTimer())}
          onComplete={timerCompleteHandler}
          renderer={({ total }: { total: string | number | Date }) => (
            <div>
              <Title order={2} align='center'>
                {new Date(total).getMinutes() +
                  " : " +
                  new Date(total).getSeconds()}
              </Title>
              <Progress size='xl' value={getTimerPercentage(total)} />
            </div>
          )}
        />
      </Grid.Col>
      <Grid.Col>
        {isPaused ? (
          <MobTimerPlayButton handler={timerPlayHandler} />
        ) : (
          <MobTimerPauseButton handler={timerPauseHandler} />
        )}
      </Grid.Col>
    </Grid>
  );
};

export default MobTimer;

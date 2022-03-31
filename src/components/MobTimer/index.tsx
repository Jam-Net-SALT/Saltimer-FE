import { Progress, Title } from "@mantine/core";
import React, { MutableRefObject, useRef, useState } from "react";
import Countdown, { CountdownTimeDelta } from "react-countdown";
import { addMinutes, millisecondsToSeconds } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLocalMobSession,
  startMobTimer,
  stepToNextDriver,
} from "../../store/LocalMobSession";

const MobTimer = () => {
  const session = useSelector(selectLocalMobSession);
  const dispatch = useDispatch();
  const timerRef = useRef() as MutableRefObject<Countdown>;
  const [counter, setCounter] = useState(0);

  const timerStopHandler = (p: CountdownTimeDelta) => {
    setCounter(counter + 1);
    timerRef.current.getApi().start();
    dispatch(stepToNextDriver());
  };

  const getTimerPercentage = (currentTime: string | number | Date) =>
    (millisecondsToSeconds(Number(currentTime)) / (session.driverTime * 60)) *
    100;

  return (
    <Countdown
      key={"key-" + counter}
      date={addMinutes(Date.now(), session.driverTime)}
      daysInHours
      intervalDelay={1000}
      zeroPadTime={2}
      ref={timerRef}
      onStart={() => dispatch(startMobTimer())}
      onComplete={(p) => timerStopHandler(p)}
      renderer={({ total }: { total: string | number | Date }) => (
        <div>
          <Title order={2}>
            {new Date(total).getMinutes() +
              " : " +
              new Date(total).getSeconds()}
          </Title>
          <Progress size='xl' value={getTimerPercentage(total)} />
        </div>
      )}
    />
  );
};

export default MobTimer;

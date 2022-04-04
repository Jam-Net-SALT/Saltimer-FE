import { Center, Grid, Progress, Title } from "@mantine/core";
import React, {MutableRefObject, useEffect, useRef, useState} from "react";
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
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

const MobTimer = () => {
  const { classes } = useStyles();
  const session = useSelector(selectLocalMobSession);
  const dispatch = useDispatch();
  const timerRef = useRef() as MutableRefObject<Countdown>;
  const [isPaused, setIsPaused] = useState(true);
  const { speak } = useSpeechSynthesis();
  const [connection, setConnection] = useState<null | HubConnection>(null);

  const getCurrentDriver = session.members.find(
    (m) => m.turn === session.currentTurn
  );

  const getNextDriver = session.members.find(
    (m) => m.turn === (session.currentTurn + 1 >= session.members.length ? 0 :  session.currentTurn + 1)
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

  useEffect(() => {
    const connect = new HubConnectionBuilder()
        .withUrl("https://localhost:7165/test/application")
        .withAutomaticReconnect()
        .build();

    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
          .start()
          .then(() => {
            connection.on("ReceiveMessage", (message) => {
              getTimerApi();
            });
          })
          .catch((error) => console.log(error));
    }
  }, [connection]);

  const sendMessage = async () => {
    if (connection) await connection.send("SendMessage", getTimerApi); // <--- This will most likely have to be changed
    getTimerApi(); // <--- This will most likely have to be changed
     };

  return (
    <Grid>
      <Grid.Col>
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
            <div style={{ display: "flex", alignItems: "center" }}>
              {isPaused ? (
                <MobTimerPlayButton handler={timerPlayHandler} />
              ) : (
                <MobTimerPauseButton handler={timerPauseHandler} />
              )}
              <div>
                <Title order={2} align='center' className={classes.counterText}>
                  {new Date(total).getMinutes() +
                    " : " +
                    new Date(total).getSeconds()}
                </Title>
                <Progress
                  size='xl'
                  value={getTimerPercentage(total)}
                  className={classes.counterText}
                />
              </div>
            </div>
          )}
        />
      </Grid.Col>
      <Grid.Col></Grid.Col>
    </Grid>
  );
};

export default MobTimer;

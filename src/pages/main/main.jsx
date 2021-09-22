import actions from "../../socket/socket-events";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import socket from "../../socket/socket";
import { v4 } from "uuid";

export const MainPage = () => {
  const [rooms, updateRooms] = useState([]);
  const history = useHistory();

  useEffect(() => {
    socket.on(actions.share, (data = []) => {
      if (data !== []) {
        updateRooms(data);
      }
      console.log(data);
    });
  }, []);

  return (
    <>
      <h1> List rooms </h1>
      <ul>
        {rooms.map(roomID => {
          return (
            <li key={roomID}>
              {roomID}
                <button onClick={() => {
                  history.push("/room/" + roomID);
                }}>
                  Join
                </button>
            </li>
          )
        })}
      </ul>
      <button onClick={() => {
        history.push('/room/' + v4())
      }}>
        create
      </button>
    </>
  );
};

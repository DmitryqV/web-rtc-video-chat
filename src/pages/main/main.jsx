import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { socket } from "../../socket/socket";
import actions from "../../socket/socket-events";
import {v4} from "uuid";

export const MainPage = () => {
  const history = useHistory();
  const [rooms, updateRooms] = useState([]);
  useEffect(() => {
    socket.on(actions.share, ({rooms = []} = {}) => {
      updateRooms(rooms);
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
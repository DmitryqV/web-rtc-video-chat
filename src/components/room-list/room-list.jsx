import { useHistory } from "react-router";
import './room-list.css';

export const RoomList = ({rooms}) => {  
  const history = useHistory();
  return (
    <section className="room-list">
      <h1 className="room-list__title"> Room list </h1>
      {rooms.map(roomID => {
          return (
            <div className="room-list__item" key={roomID} onClick={() => {
              history.push("/room/" + roomID);
            }} title={"/room/" + roomID}>
              <span className="room-list__item-content">
                <div className="room-list__item-avatar"> 
                  {roomID[0]}
                </div>
                <p className="room-list__item-title">{roomID}</p>
              </span>
            </div>
          )
        })}
    </section>
  );
};
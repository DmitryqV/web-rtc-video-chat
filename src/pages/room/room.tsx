import React, { FC } from 'react';
import { useParams } from 'react-router';
import { webRTC } from '../../services/webrtc';
interface IRoomParam {
  id: string
};

export const RoomPage: FC = () => {
  const { id: roomId } = useParams<IRoomParam>();
  const { users, provideMedia }: any = webRTC(roomId);
  console.log(users);
  return (
    <>
      <h5>Welcome to room page! {roomId}</h5>
      {users.map((el: string) => {
        console.log(el);
        return (
          <video
            key={el}
            autoPlay
            playsInline
            muted={el === 'LOCAL_USER'}
            ref={(inst) => {
              provideMedia(el, inst);
            }}
          />
        );
      })}
    </>
  );
};

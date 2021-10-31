import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { webRTC } from '../../services/webrtc';
import { RoomChat } from '../../components/room-chat/room-chat';
import './room.css';

interface IRoomParam {
  id: string
};

export const RoomPage: FC = () => {
  const { id: roomId } = useParams<IRoomParam>();
  const { users, provideMedia }: any = webRTC(roomId);
  useEffect(() => {
    users.map((el: string) => {
      const element = document.getElementById(el);
      if (element) {
        console.log(element.id, (element as HTMLVideoElement));
      }
      return element;
    })
  }, [users]);

  return (
    <>
      <header className='room-header'>
        <h5>Welcome to room page! {roomId}</h5>
      </header>
      <RoomChat />
      <main className='view-content'>
        {users.map((el: string) => {
          return (
            <video
              key={el}
              id={el}
              width='100%'
              height='100%'
              autoPlay
              playsInline
              muted={el === 'localhost'}
              className='user-video'
              ref={(inst) => provideMedia(el, inst)}
            />
          );
        })}
      </main>
    </>
  );
};

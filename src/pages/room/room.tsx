import React, { FC } from 'react';
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

  return (
    <>
      <header className='room-header'>
        <h5>Welcome to room page! {roomId}</h5>
      </header>
      <RoomChat />
      <main className='view-content'>
        {users.map((el: string, index: number) => {
          return (
            <div key={el + index} id={el}>
              <video
                width='100%'
                height='100%'
                key={el}
                autoPlay
                playsInline
                muted={el === 'localhost'}
                className='user-video'
                ref={(inst) => provideMedia(el, inst)}
              />
            </div>
          );
        })}
      </main>
    </>
  );
};

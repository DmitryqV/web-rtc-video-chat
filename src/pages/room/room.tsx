import React, { FC } from 'react';
import { webRTC } from '@services/webrtc';
import { RoomChat } from '@components/room-chat/room-chat';
import { Link, useParams } from 'react-router-dom';
import { actions } from '@socket/socket-events';
import { socket } from '@socket/socket';
import { IRoomParam, IWebRTC } from './room.interfaces';
import './room.css';

export const RoomPage: FC = () => {
  const { id: roomId } = useParams<IRoomParam>();
  const { users, provideMedia }: IWebRTC = webRTC(roomId);

  return (
    <>
      <header className='room-header'>
        <Link to='/'>
          <button className='room-leave' onClick={() => socket.emit(actions.leave)}>
            leave
          </button>
        </Link>
        <h5>Welcome to room page! {roomId}</h5>
      </header>
      <RoomChat />
      <main className='view-content'>
        {users.filter((val: string, index: number, arr: string[]) => arr[index] !== arr[index + 1]).map((el: string) => {
          return (
            <video
              id={el}
              key={el}
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

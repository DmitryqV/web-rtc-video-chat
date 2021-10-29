import React, { FC } from 'react';
import { useParams } from 'react-router';
import { webRTC } from '../../services/webrtc';
import './room.css';

interface IRoomParam {
  id: string
};

const layout = (clientsNumber = 1) => {
  const pairs = Array.from({ length: clientsNumber })
    .reduce((acc: string[], next, index: number, arr: any) => {
      if (index % 2 === 0) {
        acc.push(arr.slice(index, index + 2));
      }

      return acc;
    }, []);

  const rowsNumber = pairs.length;
  const height = `${100 / rowsNumber}%`;

  return pairs.map((row: any, index: number, arr: any) => {
    if (index === arr.length - 1 && row.length === 1) {
      return [{
        width: '100%',
        height,
      }];
    }

    return row.map(() => ({
      width: '50%',
      height,
    }));
  }).flat();
};

export const RoomPage: FC = () => {
  const { id: roomId } = useParams<IRoomParam>();
  const { users, provideMedia }: any = webRTC(roomId);
  const videoLayout = layout(users.length);
  return (
    <>
      <header className='room-header'>
        <h5>Welcome to room page! {roomId}</h5>
      </header>
      <main className='view-content'>
        {users.map((el: string, index: number) => {
          return (
            <div key={el + index} style={videoLayout[index]} id={el}>
              <video
                width='100%'
                height='100%'
                key={el}
                autoPlay
                playsInline
                muted={el === 'localhost'}
                ref={(inst) => provideMedia(el, inst)}
              />
            </div>
          );
        })}
      </main>
    </>
  );
};

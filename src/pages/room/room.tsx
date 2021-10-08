import React, { FC } from 'react';
import { useParams } from 'react-router';

interface IRoomParam {
  id: string
}

export const RoomPage: FC = () => {
  const { id: roomId } = useParams<IRoomParam>();
  console.log(roomId);
  return <h5>Welcome to room page!</h5>;
};

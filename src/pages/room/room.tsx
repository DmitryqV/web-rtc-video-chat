import React, { FC } from 'react';
import { useParams } from 'react-router';

interface IRoomParam {
  id: string
};

export const RoomPage: FC = () => {
  const { id: roomId } = useParams<IRoomParam>();
  return <h5>Welcome to room page! {roomId}</h5>;
};

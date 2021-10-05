import React, { FC } from 'react';
import { useHistory } from 'react-router';
import { RoomList } from '../../components/room-list/room-list';
import { IRooms } from '../../myInterfaces';
import { v4 } from 'uuid';

export const MainPage: FC<IRooms> = ({ rooms }) => {
  const history = useHistory<unknown>();
  return (
    <>
      <RoomList rooms={rooms} />
      <button onClick={() => history.push('/room/' + v4())}>
        create
      </button>
    </>
  );
};

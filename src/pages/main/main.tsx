import React, { FC } from 'react';
import { RoomList } from '@components/room-list/room-list';
import { IRooms } from './main.interfaces';
import './main.css';

export const MainPage: FC<IRooms> = ({ rooms }) => {
  return (
    <section className='main-section'>
      <RoomList rooms={rooms} />
      <p className='main-title'>
        <span className='main-title_border'>Join or create </span>
        <span className='main-title_target-word'>room</span> !
      </p>
    </section>
  );
};

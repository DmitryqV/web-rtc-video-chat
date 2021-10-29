// @ts-nocheck
import React, { FC } from 'react';
import { UserAcccess } from './user-access/user-access';
import { useHistory } from 'react-router-dom';
import { IRooms } from '../../myInterfaces';
import { v4 } from 'uuid';
import './room-list.css';

export const RoomList: FC<IRooms> = ({ rooms }) => {
  const history = useHistory<unknown>();
  return (
    <section className='room-list'>
      <h1 className='room-list__title'> Room list </h1>
      <section className='room_list-items'>
        {
          rooms !== undefined && rooms.map((roomID: string) => {
            return (
              <div className='room-list__item' key={roomID} onClick={() => {
                history.push('/room/' + roomID);
              }} title={'/room/' + roomID}>
                <span className='room-list__item-content'>
                  <div className='room-list__item-avatar'>
                    {roomID[0]}
                  </div>
                  <p className='room-list__item-title'>{roomID}</p>
                </span>
              </div>
            );
          })
        }
      </section>
      <button className='room-list__create' onClick={() => history.push('/room/' + v4())}>
        +
      </button>
      <UserAcccess />
    </section>
  );
};

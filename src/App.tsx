import { actions } from './socket/socket-events';
import { socket } from './socket/socket';
import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { MainPage, RoomPage, NotFoundPage } from './pages/index';
import { IRooms } from './myInterfaces';

const App: FC = () => {
  const [rooms, updateRooms] = useState<string[]>([]);

  useEffect(() => {
    socket.on(actions.share, ({ rooms }: IRooms) => {
      if (rooms !== undefined) updateRooms(rooms);
    });
  }, [rooms]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={() => <MainPage rooms={rooms} />} exact />
        <Route path='/room/:id' component={RoomPage} exact />
        <Route path='*' component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

export { App };

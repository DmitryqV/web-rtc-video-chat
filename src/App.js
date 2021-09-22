import actions from './socket/socket-events';
import socket from "./socket/socket";
import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MainPage, RoomPage, NotFoundPage } from "./pages/index";

const App = () => {
  const [rooms, updateRooms] = useState([]);

  useEffect(() => {
    socket.on(actions.share, ({rooms} = []) => {
      if (rooms !== []) updateRooms(rooms);
    });
  }, [rooms]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={() => <MainPage rooms={rooms}/>} exact />
        <Route path="/room/:id" component={RoomPage} exact />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

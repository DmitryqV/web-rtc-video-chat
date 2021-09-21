import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MainPage, RoomPage, NotFoundPage } from "./pages/index";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/room/:id" component={RoomPage} exact />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

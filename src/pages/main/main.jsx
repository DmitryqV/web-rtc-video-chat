import { useHistory } from "react-router";
import { RoomList } from "../../components/room-list/room-list";
import { v4 } from "uuid";

export const MainPage = ({rooms}) => {
  const history = useHistory();
  return (
    <>
      <RoomList rooms={rooms} />
      <button onClick={() => history.push('/room/' + v4())}>
        create
      </button>
    </>
  );
};

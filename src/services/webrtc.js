import { useCallback, useEffect, useRef } from 'react';
import { socket } from '../socket/socket';
import actions from '../socket/socket-events';
import { useCustomCB } from './customCB';
const localRecord = 'LOCAL_USER';

export const webRTC = (roomID) => {
  const [users, setUsers] = useCustomCB([]);
  const localStream = useRef(null);
  const mediaElements = useRef({
    localRecord: null
  });
  // const connections = useRef({});

  const addNewUser = useCallback((nUser, cb) => {
    if (!users.includes(nUser)) {
      setUsers((users) => [...users, nUser], cb);
    };
  }, [users, setUsers]);

  useEffect(() => {
    const startRecord = async () => {
      localStream.current = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 800,
          height: 600
        },
        audio: true
      });
      addNewUser(localRecord, () => {
        const videoElements = mediaElements.current[localRecord];
        console.warn(videoElements);
        if (videoElements) {
          videoElements.volume = 0;
          videoElements.srcObject = localStream.current;
        };
      });
    };
    startRecord()
      .then(() => {
        socket.emit(actions.join, { room: roomID });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [roomID]);
  const provideMedia = useCallback((id, node) => {
    console.log(id, node);
    mediaElements.current[id] = node;
  }, []);

  return { users, provideMedia };
};

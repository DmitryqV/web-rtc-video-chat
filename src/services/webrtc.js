import { useCallback, useEffect, useRef } from 'react';
import { socket } from '../socket/socket';
import actions from '../socket/socket-events';
import { useCustomCB } from './customCB';
import freeice from 'freeice';
const localRecord = 'localhost';

export const webRTC = (roomID) => {
  const mediaElements = useRef({ localRecord: null });
  const [users, setUsers] = useCustomCB([]);
  const localStream = useRef(null);
  const connections = useRef({});

  const addNewUser = useCallback((nUser, cb) => {
    if (!users.includes(nUser)) {
      setUsers((users) => [...users, nUser], cb);
    };
  }, [users, setUsers]);

  const newPeerHandler = async ({ peerID, createOffer }) => {
    if (peerID in connections.current) {
      return null;
    };

    connections.current[peerID] = new RTCPeerConnection({ iceServers: freeice() });

    connections.current[peerID].onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit(actions.relayIce, { peerID, iceCandidate: e.candidate });
      };
    };

    let trackNumber = 0;
    connections.current[peerID].ontrack = ({ streams: [remoteStream] }) => {
      trackNumber++;
      if (trackNumber === 2) {
        addNewUser(peerID, () => mediaElements.current[peerID].srcObject = remoteStream);
      };
    };

    localStream.current.getTracks().forEach((track) => {
      connections.current[peerID].addTrack(track, localStream.current);
    });

    if (createOffer) {
      const offer = await connections.current[peerID].createOffer();
      await connections.current[peerID].setLocalDescription(offer);
      socket.emit(actions.relaySdp, {
        peerID,
        sessionDescription: offer
      });
    }
  };

  socket.on(actions.addPeer, newPeerHandler);

  const setRemote = async ({ peerID, sessionDescription }) => {
    await connections.current[peerID].setRemoteDescription(new RTCSessionDescription(sessionDescription));

    if (sessionDescription.type === 'offer') {
      const answer = await connections.current[peerID].createAnswer();
      await connections.current[peerID].setLocalDescription(answer);
      socket.emit(actions.relaySdp, {
        peerID,
        sessionDescription: answer
      });
    };
  };

  socket.on(actions.sessionDescription, setRemote);

  socket.on(actions.iceCandidate, ({ peerID, iceCandidate }) => {
    connections.current[peerID].addIceCandidate(new RTCIceCandidate(iceCandidate));
  });

  socket.on(actions.removePeer, ({ peerID }) => {
    if (connections.current[peerID]) connections.current[peerID].close();

    delete connections.current[peerID];
    delete mediaElements.current[peerID];

    setUsers((list) => list.filter((u) => u !== peerID));
  });

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

        if (videoElements) {
          videoElements.volume = 0;
          videoElements.srcObject = localStream.current;
        };
      });
    };

    startRecord()
      .then(() => socket.emit(actions.join, { room: roomID }))
      .catch((err) => console.error(err));

    return () => {
      localStream.current.getTracks().forEach((track) => track.stop());
      socket.emit(actions.leave);
    };
  }, [roomID]);

  const provideMedia = useCallback((id, node) => mediaElements.current[id] = node, []);

  return { users, provideMedia };
};

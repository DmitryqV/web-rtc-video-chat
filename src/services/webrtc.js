/* eslint-disable */
import { useCallback, useEffect, useRef } from 'react';
import { socket } from '../socket/socket';
import { actions } from '../socket/socket-events.ts';
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

  useEffect(() => {
    const newPeerHandler = async ({ peerID, createOffer }) => {
      if (peerID in connections.current) {
        return null;
      };

      connections.current[peerID] = new RTCPeerConnection({ iceServers: freeice() });

      connections.current[peerID].onicecandidate = (e) => {
        if (e.candidate) {
          socket.emit(actions.relayIce, { peerID, iceCandidate: e.candidate });
        }
      };

      connections.current[peerID].ontrack = ({ streams: [remoteStream] }) => {
        addNewUser(peerID, () => {
          mediaElements.current[peerID].srcObject = remoteStream;
        });
      };

      localStream.current.getTracks().forEach((track) => {
        connections.current[peerID].addTrack(track, localStream.current);
      });

      if (createOffer) {
        const offer = await connections.current[peerID].createOffer();
        await connections.current[peerID].setLocalDescription(offer);
        socket.emit(actions.relaySdp, {
          peerID, sessionDescription: offer
        });
      };
    };

    socket.on(actions.addPeer, newPeerHandler);
  }, []);

  useEffect(() => {
    const setRemote = async ({ peerID, sessionDescription }) => {
      await connections.current[peerID].setRemoteDescription(
        new RTCSessionDescription(sessionDescription)
      );
      if (sessionDescription.type === 'offer') {
        const answer = await connections.current[peerID].createAnswer();
        await connections.current[peerID].setLocalDescription(answer);
        socket.emit(actions.relaySdp, {
          peerID, sessionDescription: answer
        });
      };
    };
    socket.on(actions.sessionDescription, setRemote);
  }, []);

  useEffect(() => {
    socket.on(actions.iceCandidate, ({ peerID, iceCandidate }) => {
      connections.current[peerID].addIceCandidate(
        new RTCIceCandidate(iceCandidate)
      );
    });
  }, []);

  useEffect(() => {
    socket.on(actions.removePeer, ({ peerID }) => {
      if (connections.current[peerID]) {
        connections.current[peerID].close();
      };
      delete connections.current[peerID];
      delete mediaElements.current[peerID];
      setUsers((list) => list.filter((u) => u !== peerID));
    });
  }, []);

  useEffect(() => {
    const startRecord = async ({ video, audio }) => {
      localStream.current = await navigator.mediaDevices.getUserMedia({ video, audio });
      addNewUser(localRecord, () => {
        const videoElements = mediaElements.current[localRecord];
        if (videoElements) {
          videoElements.volume = 0;
          videoElements.srcObject = localStream.current;
        };
      });
    };
    // ====================================================
    // connect to switcher in user-access / user-access.tsx;
    // =====================================================
    startRecord({ video: true, audio: true })
      .catch((e) => {
        console.warn(e);
      })
      .finally(() => {
        socket.emit(actions.join, { room: roomID });
      });

    return () => {
      localStream.current.getTracks().forEach((track) => track.stop());
      socket.emit(actions.leave);
    };
  }, [roomID]);

  const provideMedia = useCallback((id, node) => {
    mediaElements.current[id] = node;
  }, []);

  return { users, provideMedia };
};

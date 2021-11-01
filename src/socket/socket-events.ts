import { IActions } from "./socket-events.interfaces";
export const actions: IActions = {
  join: 'join',
  leave: 'leave',
  share: 'share_room',
  addPeer: 'add_peer',
  removePeer: 'remove_peer',
  relayIce: 'relay_ice',
  relaySdp: 'relay_sdp',
  iceCandidate: 'ice_candidate',
  sessionDescription: 'description',
};

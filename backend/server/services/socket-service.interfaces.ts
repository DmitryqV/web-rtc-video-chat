export interface IRelaySdp {
  peerID: string;
  sessionDescription: string;
};

export interface IRelayIce {
  peerID: string;
  iceCandidate: string;
};

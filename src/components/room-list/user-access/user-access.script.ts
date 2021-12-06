import { ISettings } from "./user-access.interfaces";

const MediaConfig: ISettings = { video: true, audio: true };

export const AudioController = (): boolean => {
  return MediaConfig.audio = !MediaConfig.audio;
};

export const VideoController = (): boolean => {
  return MediaConfig.video = !MediaConfig.video;
};

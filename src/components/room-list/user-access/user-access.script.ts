import { ISettings } from "./user-access.interfaces";

const MediaConfig: ISettings = {
  video: true, audio: true
};

export const AudioController = () => {
  MediaConfig.audio = !MediaConfig.audio;
  return MediaConfig;
};

export const VideoController = () => {
  MediaConfig.video = !MediaConfig.video;
  return MediaConfig;
};

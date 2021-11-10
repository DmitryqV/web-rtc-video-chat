import { ISettings } from "./user-access.interfaces";

const MediaConfig: ISettings = {
  video: true, audio: true
};

export const AudioController = (): boolean => {
  return MediaConfig.audio = !MediaConfig.audio;;
};

export const VideoController = (): boolean => {
  return MediaConfig.video = !MediaConfig.video;
};

// export class MediaObserver {
//   private observers: any;
//   private MediaConfig: ISettings;

//   constructor() {
//     this.observers = [];
//     this.MediaConfig = {
//       video: true, audio: true
//     };
//   };

//   subscribe(fn: Function) {
//     this.observers.push(fn);
//   };

//   unsubscribe(fn: Function) {
//     this.observers = this.observers.filter((subscriber: any) => subscriber !== fn);
//   };

//   broadcast(data: Function) {
//     this.observers.forEach((subscriber: any) => subscriber(data));
//   };

// };

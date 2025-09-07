export default interface LogData {
  timeStamp: string;
  infoType: string;
  userName: string;
  fileName?: string;
  fileNames?: string[];
}

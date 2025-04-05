export interface INewFlat {
  firstName: string;
  city: string;
  streetName: string;
  streetNumber: number;
  areaSize: number;
  hasAc: boolean;
  yearBuilt: number;
  rentPrice: number;
  dataAvailable: string;
  description: string;
  quantity: number;
  userId: string;
  messages?: IMessage[] | undefined;
}

export interface IMessage {
  senderId: string;
  firstName: string;
  messageText: string;
  timeStamp: string | Date;
}

export interface IFlats extends INewFlat {
  _id: string;
}

export interface IFavoriteFlat {
  _id: string;
  quantity: number;
}

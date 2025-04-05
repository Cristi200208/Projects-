export interface IFlats {
  id: string;
  email: string;
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
  image?: File;
  imageUrl: string;
  quantity: number;
  userUid?: string;
}

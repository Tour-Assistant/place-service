export interface Place {
  id: string;
  name: string;
  alternativeNames?: string[];
  postCode: number;
  area?: string;
  thana?: string;
  district?: string;
  division?: string;
  country?: string;
}

import { Place } from "./IPlace";

export interface MiddyRequest {
  body?: Partial<Place>;
  pathParameters?: {
    id: string;
  };
}

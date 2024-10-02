// Define a generic interface for dynamic key-value pairs
export interface Groupe<T = any> {
  groupName: string;
  origin: string;
  travelType: string; // Car, Bus, Plane
  classType: string;  // Business, Economy, First Class
  headCount: number;
  emissions: number;
  [key: string]: Array<T> | string | number; // key-value pair, where value is an array of type T or other fields like string/number
}

// Partner Interface as an example type for the dynamic value
export interface Partner {
  partnerName: string;
  contact: string;
}

// Event Level
export interface IEvent<T = any> {
  eventName: string;
  location: string;
  time: string;
  groups: Array<Groupe<T>>; // Pass the dynamic type T here for groups
}

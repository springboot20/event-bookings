import { SeatInterface } from './seat';
import { UserInterface } from './user';

export interface EventInterface {
  _id: string;
  title: string;
  description: string;
  price: number;
  owner: UserInterface;
  location: string;
  eventDate: string;
  image: {
    url: string;
    public_id: string;
  };
  time: {
    from: string;
    to: string;
  };
  capacity: number;
  category: CategoryInterface;
  seatId?: {
    _id: string;
    seats: Array<SeatInterface>;
  };
}

export interface CategoryInterface {
  name: string;
  _id: string;
}

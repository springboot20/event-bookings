export interface EventInterface {
  _id: string;
  title: string;
  description: string;
  price: number;
  owner: string;
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
  category: string | CategoryInterface;
}

export interface CategoryInterface {
  name: string;
  _id: string;
}

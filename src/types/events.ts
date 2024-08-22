export interface EventInterface {
  _id:string
  title: string;
  description: string;
  price: number;
  owner: string;
  location: string;
  eventDate: string;
  time: {
    from: string;
    to: string;
  };
  capacity: number;
  category: string | CategoryInteface;
}

export interface CategoryInteface {
  name: string;
  image: string;
  category: string;
  _id: string;
}

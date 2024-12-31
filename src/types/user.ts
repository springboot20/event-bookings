import { AcceptedPersmissonRoles } from '../util';

export interface UserInterface {
  _id: string;
  avatar: {
    url: string;
    public_id: string;
  };
  username: string;
  email: string;
  role: AcceptedPersmissonRoles;
  isEmailVerified: boolean;

  [x: string]: any;
}

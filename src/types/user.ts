export interface UserInterface {
  _id: string;
  avatar: {
    url: string;
    public_id: string;
  };
  username: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
}

export interface User {
  profile: {
    name: string
  };
  _id?: string;
  email: string;
  createdAt?: Date;
  updateAt?: Date;
  password?: string;
}
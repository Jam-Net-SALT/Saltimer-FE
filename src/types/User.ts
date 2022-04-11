export interface AnonymsUser {
  id: string;
  name: string;
  imageUrl: string;
  turn: number | undefined;
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  profileImage: string;
  emailAddress: string;
  createdAt: Date;
}

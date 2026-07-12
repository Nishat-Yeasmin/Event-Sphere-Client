export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "organizer" | "admin";
  createdAt?: string;
  updatedAt?: string;
}
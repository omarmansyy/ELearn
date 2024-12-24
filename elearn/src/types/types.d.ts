import { User } from './users/users.schema';  // Adjust the import according to where your User model/schema is defined

declare global {
  namespace Express {
    interface Request {
      user: User & { _id: string };  // Here, assume User is your user schema model and include _id if it's not already part of your User type
    }
  }
}

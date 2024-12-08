import 'express';

declare module 'express' {
    import { UserDocument } from '../users/user.schema';  // Adjust the import path to where your User model/schema is defined

    interface Request {
        user?: UserDocument;  // Use optional chaining if user may not always be set
    }
}

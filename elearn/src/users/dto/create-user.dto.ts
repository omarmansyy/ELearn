import { Course } from "src/courses/courses.schema";
export class CreateUserDto {
    email:string
    name: string;
    age: Number;
    role:string
    courses: Course[];
    password:string
  }

import { Course } from "src/courses/courses.schema";


export class RegisterRequestDto {
   
    email:string
    name: string;
    age: Number;
    courses:Course[]=[]
    password:string
    role:string= "student"
  }
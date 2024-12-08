// src/users/dto/student-update.dto.ts
import { IsString, IsArray, ArrayNotEmpty, IsOptional } from 'class-validator';

export class StudentUpdateDto {
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    learningPreferences: string[];

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    subjectsOfInterest: string[];
}

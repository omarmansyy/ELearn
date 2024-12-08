// src/users/dto/instructor-update.dto.ts
import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class InstructorUpdateDto {
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    expertiseAreas: string[];

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    teachingInterests: string[];
}


export class UpdateCourseDto {
    readonly title?: string;
    readonly description?: string;
    
    readonly modules?: {
        title: string;
        content: string;
      }[];
  }
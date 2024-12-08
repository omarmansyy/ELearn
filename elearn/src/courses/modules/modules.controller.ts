import { Controller, Post, Get, Put, Body, Param, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { FilesInterceptor } from '@nestjs/platform-express';  
import * as fs from 'fs';
import * as path from 'path';
import * as multer from 'multer';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Modules') // Tagging the controller for better categorization in Swagger UI
@Controller('modules')
export class ModulesController {
  constructor(private modulesService: ModulesService) {}

  @Post(':courseId')
  @ApiOperation({ summary: 'Create a new module for a course' }) // Operation summary
  @ApiParam({ name: 'courseId', description: 'ID of the course to create the module for' }) // Param documentation
  @ApiResponse({ status: 201, description: 'Module successfully created' }) // Successful response documentation
  @ApiResponse({ status: 400, description: 'Invalid input data' }) // Error response documentation
  async createModule(@Param('courseId') courseId: string, @Body() createModuleDto: CreateModuleDto) {
    return this.modulesService.createModule(courseId, createModuleDto);
  }

  @Get(':courseId')
  @ApiOperation({ summary: 'Get all modules for a specific course' }) // Operation summary
  @ApiParam({ name: 'courseId', description: 'ID of the course to retrieve modules for' }) // Param documentation
  @ApiResponse({ status: 200, description: 'List of modules for the course' }) // Successful response documentation
  @ApiResponse({ status: 404, description: 'Course not found' }) // Error response documentation
  async getModulesByCourse(@Param('courseId') courseId: string) {
    return this.modulesService.getModulesByCourse(courseId);
  }

  @Get(':moduleId/versions')
  @ApiOperation({ summary: 'Get previous versions of a module' }) // Operation summary
  @ApiParam({ name: 'moduleId', description: 'ID of the module to get versions for' }) // Param documentation
  @ApiResponse({ status: 200, description: 'List of previous versions of the module' }) // Successful response documentation
  @ApiResponse({ status: 404, description: 'Module not found' }) // Error response documentation
  async getModuleVersions(@Param('moduleId') moduleId: string) {
    const module = await this.modulesService.getModuleById(moduleId);
    if (!module) {
      throw new Error('Module not found');
    }
    return module.previousVersions;
  }

  @Put(':moduleId')
  @ApiOperation({ summary: 'Update an existing module' }) // Operation summary
  @ApiParam({ name: 'moduleId', description: 'ID of the module to update' }) // Param documentation
  @ApiResponse({ status: 200, description: 'Module successfully updated' }) // Successful response documentation
  @ApiResponse({ status: 400, description: 'Invalid data' }) // Error response documentation
  @ApiResponse({ status: 404, description: 'Module not found' }) // Error response documentation
  async updateModule(@Param('moduleId') moduleId: string, @Body() updateData: Partial<CreateModuleDto>) {
    return this.modulesService.updateModule(moduleId, updateData);
  }

  // Endpoint for uploading resources (videos, PDFs)
  @Post(':moduleId/upload')
  @UseInterceptors(FilesInterceptor('files', 10, {  // Limits to 10 files
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const uploadPath = './uploads/modules/';
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);  // Set directory path
      },
      filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);
        const fileName = Date.now() + fileExtension;  // Ensure unique file names
        cb(null, fileName);  // Set filename
      }
    }),
    limits: {
      fileSize: 10 * 1024 * 1024,  // Limit file size to 10MB
    }
  }))
  @ApiOperation({ summary: 'Upload resources (videos, PDFs) for a module' }) // Operation summary
  @ApiParam({ name: 'moduleId', description: 'ID of the module to upload resources for' }) // Param documentation
  @ApiResponse({ status: 200, description: 'Resources successfully uploaded' }) // Successful response documentation
  @ApiResponse({ status: 400, description: 'Invalid file or no files uploaded' }) // Error response documentation
  async uploadFile(@Param('moduleId') moduleId: string, @UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new Error('No files uploaded');
    }

    // Generate URLs for the uploaded files
    const fileUrls = files.map(file => `/uploads/modules/${file.filename}`);

    // Store file URLs in the module's resources
    return this.modulesService.addResources(moduleId, fileUrls);  
  }
}

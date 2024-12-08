import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Module, ModuleDocument } from './modules.schema';
import { CreateModuleDto } from './dto/create-module.dto';

@Injectable()
export class ModulesService {
  constructor(@InjectModel(Module.name) private moduleModel: Model<ModuleDocument>) {}

  // Create a new module
  async createModule(courseId: string, createModuleDto: CreateModuleDto): Promise<Module> {
    const module = new this.moduleModel({
      ...createModuleDto,
      courseId,
    });
    return module.save();
  }

  // Get all modules for a specific course
  async getModulesByCourse(courseId: string): Promise<Module[]> {
    return this.moduleModel.find({ courseId }).exec();
  }

  // Update a module with version control
  async updateModule(moduleId: string, updateData: Partial<Module>): Promise<Module> {
    const module = await this.moduleModel.findById(moduleId);

    if (!module) {
      throw new Error('Module not found');
    }

    // Save the current version to `previousVersions`
    module.previousVersions = module.previousVersions || []; // Ensure it's initialized
    module.previousVersions.push({
      title: module.title,
      content: module.content,
      resources: module.resources,
      version: module.version,
      createdAt: module.createdAt,
    });

    module.version += 1;

    Object.assign(module, updateData);

    return module.save();
  }

  // Get previous versions of a module
  async getModuleVersions(moduleId: string): Promise<any[]> {
    const module = await this.moduleModel.findById(moduleId);

    if (!module) {
      throw new Error('Module not found');
    }

    return module.previousVersions;
  }

  // Get a module by ID
  async getModuleById(moduleId: string): Promise<Module> {
    return this.moduleModel.findById(moduleId).exec();
  }

  // Add resources (file URLs) to a module
  async addResources(moduleId: string, resources: string[]): Promise<Module> {
    return this.moduleModel.findByIdAndUpdate(
      moduleId,
      {
        $push: { resources: { $each: resources } },
      },
      { new: true }
    ).exec();
  }
}

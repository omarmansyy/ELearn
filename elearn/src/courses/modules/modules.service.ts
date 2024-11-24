import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Module, ModuleDocument } from './modules.schema';

@Injectable()
export class ModulesService {
  constructor(@InjectModel(Module.name) private moduleModel: Model<ModuleDocument>) {}

  async findAll(): Promise<Module[]> {
    return this.moduleModel.find().exec();
  }

  async findOne(id: string): Promise<Module> {
    return this.moduleModel.findById(id).exec();
  }

  async create(module: Module): Promise<Module> {
    const newModule = new this.moduleModel(module);
    return newModule.save();
  }

  async update(id: string, module: Module): Promise<Module> {
    return this.moduleModel.findByIdAndUpdate(id, module, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.moduleModel.findByIdAndDelete(id).exec();
  }
}

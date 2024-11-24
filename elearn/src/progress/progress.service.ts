import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Progress, ProgressDocument } from './progress.schema';

@Injectable()
export class ProgressService {
  constructor(@InjectModel(Progress.name) private progressModel: Model<ProgressDocument>) {}

  async findAll(): Promise<Progress[]> {
    return this.progressModel.find().populate('userId').populate('courseId').exec();
  }

  async findOne(id: string): Promise<Progress> {
    return this.progressModel.findById(id).populate('userId').populate('courseId').exec();
  }

  async create(progress: Progress): Promise<Progress> {
    const newProgress = new this.progressModel(progress);
    return newProgress.save();
  }

  async update(id: string, progress: Progress): Promise<Progress> {
    return this.progressModel.findByIdAndUpdate(id, progress, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.progressModel.findByIdAndDelete(id).exec();
  }
}

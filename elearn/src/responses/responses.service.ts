import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response, ResponseDocument } from './responses.schema';

@Injectable()
export class ResponsesService {
  constructor(@InjectModel(Response.name) private responseModel: Model<ResponseDocument>) {}

  async findAll(): Promise<Response[]> {
    return this.responseModel.find().populate('userId').populate('quizId').exec();
  }

  async findOne(id: string): Promise<Response> {
    return this.responseModel.findById(id).populate('userId').populate('quizId').exec();
  }

  async create(response: Response): Promise<Response> {
    const newResponse = new this.responseModel(response);
    return newResponse.save();
  }

  async update(id: string, response: Response): Promise<Response> {
    return this.responseModel.findByIdAndUpdate(id, response, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.responseModel.findByIdAndDelete(id).exec();
  }
}
